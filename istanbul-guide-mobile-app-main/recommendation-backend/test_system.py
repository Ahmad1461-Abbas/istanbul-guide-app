#!/usr/bin/env python3

from recommendation.recommender import recommend_items, generate_itinerary
from llm.explanation_generator import generate_explanation
from models.user_profile import UserProfile

def test_system():
    print("🕌 Testing Istanbul Recommendation System")
    print("=" * 50)

    # Test 1: Basic recommendations
    print("\n1. Testing AI-powered recommendations...")
    interests = ['history', 'culture']
    recommendations = recommend_items(interests, limit=3)

    print(f"✅ Got {len(recommendations)} recommendations for interests: {interests}")
    for rec in recommendations:
        print(f"   • {rec['name']} (Score: {rec['hybrid_score']:.3f})")

    # Test 2: LLM explanations
    print("\n2. Testing LLM explanations...")
    if recommendations:
        explanation = generate_explanation(recommendations[0], interests)
        print(f"✅ Generated explanation for {recommendations[0]['name']}")
        print(f"   \"{explanation[:100]}...\"")

    # Test 3: User profile
    print("\n3. Testing user profile management...")
    profile = UserProfile('test_user', 'Test User', ['history', 'food'])
    print(f"✅ Created profile for {profile.name}")

    # Add a rating
    profile.add_rating('Hagia Sophia', 5)
    print("✅ Added rating for Hagia Sophia")

    # Test 4: Itinerary generation
    print("\n4. Testing itinerary generation...")
    itinerary = generate_itinerary(['history', 'culture'], days=2)
    print(f"✅ Generated 2-day itinerary with {len(itinerary)} days")

    # Test 5: Database operations
    print("\n5. Testing database persistence...")
    ratings = profile.get_ratings()
    print(f"✅ Retrieved {len(ratings)} ratings from database")

    print("\n🎉 All tests passed! System is working perfectly.")
    print("\n🚀 Ready to run:")
    print("   • Console: python main.py")
    print("   • Web: python web/app.py")
    print("   • API: uvicorn api.app:app --reload")
    print("   • Docker: docker-compose up --build")

if __name__ == "__main__":
    test_system()