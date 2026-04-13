from flask import Flask, render_template, request, jsonify, session
import sys
import os

# Add parent directory to Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from recommendation.recommender import recommend_items, generate_itinerary, search_places
from llm.explanation_generator import generate_explanation
from models.user_profile import UserProfile

app = Flask(__name__)
app.secret_key = 'istanbul-recommendation-secret-key'  # For session management

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/recommendations')
def recommendations():
    return render_template('recommendations.html')

@app.route('/itinerary')
def itinerary():
    return render_template('itinerary.html')

@app.route('/api/recommend', methods=['POST'])
def api_recommend():
    data = request.json
    interests = data.get('interests', session.get('interests', []))

    recommendations = recommend_items(interests, limit=5)

    # Add explanations with duplicate prevention
    seen_explanations = set()
    for rec in recommendations:
        explanation = generate_explanation(rec, interests)
        # Ensure unique explanations
        while explanation in seen_explanations:
            explanation = generate_explanation(rec, interests)  # Regenerate if duplicate
        seen_explanations.add(explanation)
        rec['explanation'] = explanation

    return jsonify({
        'success': True,
        'recommendations': recommendations
    })

@app.route('/api/rate', methods=['POST'])
def api_rate():
    data = request.json
    place_name = data.get('place_name')
    rating = data.get('rating')

    profile = UserProfile()
    if profile.add_rating(place_name, rating):
        return jsonify({
            'success': True,
            'message': f'Rated {place_name} with {rating} stars'
        })
    return jsonify({
        'success': False,
        'message': 'Invalid rating'
    })

@app.route('/api/itinerary', methods=['POST'])
def api_generate_itinerary():
    data = request.json
    interests = data.get('interests', [])
    days = data.get('days', 3)

    itinerary = generate_itinerary(interests, days)
    return jsonify({
        'success': True,
        'itinerary': itinerary
    })

@app.route('/api/search', methods=['POST'])
def api_search():
    data = request.json
    query = data.get('query', '')
    category = data.get('category')
    min_rating = data.get('min_rating')

    results = search_places(query, category, min_rating)
    return jsonify({
        'success': True,
        'results': results
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)