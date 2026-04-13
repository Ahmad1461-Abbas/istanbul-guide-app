from recommendation.recommender import recommend_items, generate_itinerary, search_places
from llm.explanation_generator import generate_explanation
from models.user_profile import UserProfile
import os

def print_header():
    print("🕌 Istanbul Guided Recommendation System")
    print("=" * 50)

def get_user_profile():
    """Get or create global user profile"""
    name = input("Enter your name (optional): ").strip() or "Guest"
    interests_input = input("Enter your interests (comma-separated, e.g., history, culture): ").strip()
    interests = [i.strip() for i in interests_input.split(',') if i.strip()]
    profile = UserProfile(name, interests)
    print(f"✅ Profile created for {name}!")
    return profile

def show_menu():
    print("\n📍 Main Menu:")
    print("1. Get Personalized Recommendations")
    print("2. Add/Update Interests")
    print("3. Rate a Place/Event")
    print("4. View My Profile")
    print("5. Generate Itinerary")
    print("6. Search Places")
    print("7. Exit")
    return input("Choose an option (1-7): ").strip()

def handle_recommendations(profile):
    print("\n🎯 Getting Recommendations...")
    interests = profile.get_interests()
    if not interests:
        print("❌ No interests found. Please add interests first.")
        return

    recommendations = recommend_items(interests, limit=5)

    if not recommendations:
        print("❌ No recommendations found. Try different interests.")
        return

    print(f"\n✨ Top {len(recommendations)} Recommendations for {profile.name}:")
    print("-" * 60)

    for i, rec in enumerate(recommendations, 1):
        explanation = generate_explanation(rec, interests)
        print(f"{i}. 🏛️  {rec['name']}")
        print(f"   Category: {rec['category']}")
        print(f"   Score: ⭐ {rec['hybrid_score']:.3f}")
        print(f"   💡 Why: {explanation}")
        print()

def handle_add_interests(profile):
    print("\n➕ Add/Update Interests")
    current = profile.get_interests()
    if current:
        print(f"Current interests: {', '.join(current)}")

    interests_input = input("Enter new interests (comma-separated): ").strip()
    if interests_input:
        interests = [i.strip() for i in interests_input.split(',') if i.strip()]
        profile.update_interests(interests)
        print("✅ Interests updated!")

def handle_rate_place(profile):
    print("\n⭐ Rate a Place/Event")
    place_name = input("Enter place/event name: ").strip()
    if not place_name:
        return

    try:
        rating = float(input("Enter rating (1-5): ").strip())
        if profile.add_rating(place_name, rating):
            print(f"✅ Rated {place_name} with {rating} stars!")
        else:
            print("❌ Invalid rating. Must be between 1-5.")
    except ValueError:
        print("❌ Invalid rating format.")

def handle_view_profile(profile):
    print("\n👤 User Profile")
    summary = profile.get_profile_summary()

    print(f"Name: {summary['name']}")
    print(f"Interests: {', '.join(summary['interests'])}")
    print(f"Total Ratings Given: {summary['total_ratings']}")
    print(f"Average Rating Given: {summary['average_rating_given']}/5")
    print(f"Places Visited: {summary['visited_places']}")

    if summary['recent_ratings']:
        print("\nRecent Ratings:")
        for rating in summary['recent_ratings'][-3:]:
            print(f"  • {rating['place_name']}: {rating['rating']} ⭐")

    if summary['recent_visits']:
        print("\nRecent Visits:")
        for visit in summary['recent_visits'][-3:]:
            print(f"  • {visit['place_name']} ({visit['visit_date'][:10]})")

def handle_generate_itinerary(profile):
    print("\n📅 Generate Itinerary")
    interests = profile.get_interests()
    if not interests:
        print("❌ No interests found. Please add interests first.")
        return

    try:
        days = int(input("Enter number of days (1-7): ").strip())
        if not 1 <= days <= 7:
            print("❌ Days must be between 1-7.")
            return
    except ValueError:
        print("❌ Invalid number of days.")
        return

    itinerary = generate_itinerary(interests, days)

    print(f"\n📅 {days}-Day Itinerary for {profile.name}")
    print("=" * 50)

    for day, activities in itinerary.items():
        print(f"\n{day}:")
        if activities:
            for activity in activities:
                print(f"  {activity['time']} - {activity['activity']}")
                print(f"    └─ {activity['description']}")
        else:
            print("  No activities planned for this day.")

def handle_search():
    print("\n🔍 Search Places")
    query = input("Enter search query: ").strip()
    if not query:
        return

    category = input("Filter by category (optional): ").strip() or None
    min_rating_input = input("Minimum rating (optional): ").strip()
    min_rating = float(min_rating_input) if min_rating_input else None

    results = search_places(query, category, min_rating)

    if results:
        print(f"\n🔍 Found {len(results)} results:")
        for result in results[:10]:  # Show top 10
            print(f"• {result['name']} ({result['category']}) - ⭐ {result['rating']}")
    else:
        print("❌ No results found.")

def main():
    print_header()

    # Get user profile
    profile = get_user_profile()

    while True:
        choice = show_menu()

        if choice == '1':
            handle_recommendations(profile)
        elif choice == '2':
            handle_add_interests(profile)
        elif choice == '3':
            handle_rate_place(profile)
        elif choice == '4':
            handle_view_profile(profile)
        elif choice == '5':
            handle_generate_itinerary(profile)
        elif choice == '6':
            handle_search()
        elif choice == '7':
            print("\n👋 Goodbye! Safe travels in Istanbul! 🕌")
            break
        else:
            print("❌ Invalid option. Please choose 1-7.")

        input("\nPress Enter to continue...")

if __name__ == "__main__":
    main()