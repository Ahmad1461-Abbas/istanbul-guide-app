import json
import math
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity as sklearn_cosine_similarity
from database.db_connection import DatabaseConnection

def load_places():
    with open("data/places.json", "r") as file:
        places = json.load(file)
    return places

def load_events():
    with open("data/events.json", "r") as file:
        events = json.load(file)
    return events

def cosine_similarity(vec1, vec2):
    """Calculate cosine similarity between two vectors"""
    dot_product = sum(a * b for a, b in zip(vec1, vec2))
    norm1 = math.sqrt(sum(a * a for a in vec1))
    norm2 = math.sqrt(sum(b * b for b in vec2))

    if norm1 == 0 or norm2 == 0:
        return 0.0

    return dot_product / (norm1 * norm2)

def create_vector(text_list, all_terms):
    """Create a vector from a list of terms"""
    return [1 if term in text_list else 0 for term in all_terms]

def get_all_terms():
    """Get all unique terms from places and events - for backward compatibility"""
    places = load_places()
    events = load_events()
    all_items = places + events

    all_terms = set()
    for item in all_items:
        all_terms.update(item.get('tags', []))

    return sorted(list(all_terms))

def create_tfidf_vectors():
    """Create TF-IDF vectors for all items"""
    places = load_places()
    events = load_events()
    all_items = places + events

    # Create documents from tags and descriptions
    documents = []
    for item in all_items:
        tags_str = ' '.join(item.get('tags', []))
        desc = item.get('description', '')
        documents.append(f"{tags_str} {desc}")

    # Create TF-IDF vectorizer
    vectorizer = TfidfVectorizer(stop_words='english', max_features=100)
    tfidf_matrix = vectorizer.fit_transform(documents)

    return vectorizer, tfidf_matrix, all_items

def recommend_items(user_interests, limit=5, exclude_visited=False):
    """
    Recommend places and events using TF-IDF and cosine similarity
    Returns top N recommendations with scores
    """
    # Create TF-IDF vectors
    vectorizer, tfidf_matrix, all_items = create_tfidf_vectors()

    # Create user interest document
    user_doc = ' '.join(user_interests)
    user_vector = vectorizer.transform([user_doc])

    db = DatabaseConnection()
    recommendations = []

    for i, item in enumerate(all_items):
        item_vector = tfidf_matrix[i]

        # Calculate cosine similarity
        similarity = sklearn_cosine_similarity(user_vector, item_vector).flatten()[0]

        # Get place rating (if available)
        place_rating = db.get_place_average_rating(item['name']) or item.get('rating', 0.0)
        normalized_rating = place_rating / 5.0  # Normalize to 0-1

        # Hybrid scoring: 70% similarity + 30% rating
        hybrid_score = (similarity * 0.7) + (normalized_rating * 0.3)

        # Exclude visited places if requested
        if exclude_visited:
            visited = db.get_visited_places()
            visited_names = [v['place_name'] for v in visited]
            if item['name'] in visited_names:
                continue

        if hybrid_score > 0:  # Only include items with some match
            recommendations.append({
                'item': item,
                'similarity_score': round(similarity, 3),
                'rating_score': round(normalized_rating, 3),
                'hybrid_score': round(hybrid_score, 3)
            })

    # Sort by hybrid score (descending)
    recommendations.sort(key=lambda x: x['hybrid_score'], reverse=True)

    # Add slight randomization for dynamic results
    import random
    random.seed()  # Use current time for randomness
    # Shuffle top 10 results to avoid identical ordering
    if len(recommendations) > 5:
        top_recommendations = recommendations[:10]
        random.shuffle(top_recommendations)
        recommendations = top_recommendations + recommendations[10:]

    # Return top N
    top_recommendations = recommendations[:limit]

    # Return just the items with scores
    return [{
        'name': rec['item']['name'],
        'category': rec['item']['category'],
        'tags': rec['item']['tags'],
        'rating': rec['item']['rating'],
        'description': rec['item'].get('description', ''),
        'image_url': rec['item']['image_url'],
        'similarity_score': rec['similarity_score'],
        'hybrid_score': rec['hybrid_score']
    } for rec in top_recommendations]

def recommend_places(user_interests, limit=5):
    """Backward compatibility"""
    return recommend_items(user_interests, limit)

def generate_itinerary(interests, days=3):
    """
    Generate a day-by-day itinerary based on user interests
    """
    recommendations = recommend_items(interests, limit=days * 3)  # Get more recommendations

    itinerary = {}
    daily_activities = [recommendations[i:i+3] for i in range(0, len(recommendations), 3)]

    time_slots = [
        ("9:00 AM", "11:00 AM"),
        ("1:00 PM", "3:00 PM"),
        ("6:00 PM", "8:00 PM")
    ]

    for day in range(min(days, len(daily_activities))):
        day_name = f"Day {day + 1}"
        itinerary[day_name] = []

        activities = daily_activities[day]
        for i, activity in enumerate(activities):
            if i < len(time_slots):
                start_time, end_time = time_slots[i]
                itinerary[day_name].append({
                    'time': f"{start_time} - {end_time}",
                    'activity': activity['name'],
                    'category': activity['category'],
                    'description': f"Visit {activity['name']}, a {activity['category']} attraction"
                })

    return itinerary

def search_places(query, category=None, min_rating=None):
    """
    Search places by name, category, or tags
    """
    places = load_places()
    events = load_events()
    all_items = places + events

    results = []
    query_lower = query.lower()

    for item in all_items:
        # Search in name, category, or tags
        searchable_text = f"{item['name']} {item['category']} {' '.join(item.get('tags', []))}".lower()

        if query_lower in searchable_text:
            # Apply filters
            if category and item['category'].lower() != category.lower():
                continue
            if min_rating and item['rating'] < min_rating:
                continue

            results.append(item)

    return results