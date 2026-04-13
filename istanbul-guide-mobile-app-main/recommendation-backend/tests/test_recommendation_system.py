import pytest
from recommendation.recommender import recommend_items
from models.user_profile import UserProfile
from database.db_connection import DatabaseConnection

def test_recommend_items():
    """Test recommendation system"""
    interests = ['history', 'culture']
    recommendations = recommend_items(interests, limit=3)

    assert len(recommendations) <= 3
    assert all('hybrid_score' in rec for rec in recommendations)
    assert all(rec['hybrid_score'] >= 0 for rec in recommendations)

    # Test variability - run multiple times to check different results
    recommendations2 = recommend_items(interests, limit=3)
    # Should be different due to randomization
    assert recommendations != recommendations2 or len(recommendations) <= 1

def test_user_profile():
    """Test user profile creation and management"""
    profile = UserProfile('Test User', ['history'])

    assert profile.name == 'Test User'
    assert 'history' in profile.get_interests()

    # Test rating
    success = profile.add_rating('Hagia Sophia', 5)
    assert success

    ratings = profile.get_ratings()
    assert len(ratings) >= 1  # May have existing ratings
    # Check if our rating was added
    hagias_ratings = [r for r in ratings if r['place_name'] == 'Hagia Sophia']
    assert len(hagias_ratings) >= 1

def test_database_operations():
    """Test database operations"""
    db = DatabaseConnection()

    # Add rating
    db.add_rating('Test Place', 4.5)

    # Get average rating
    avg_rating = db.get_place_average_rating('Test Place')
    assert avg_rating == 4.5

def test_explanation_uniqueness():
    """Test that LLM explanations are cached and unique"""
    from llm.explanation_generator import generate_explanation

    item = {
        'name': 'Hagia Sophia',
        'category': 'historical',
        'tags': ['history', 'architecture']
    }
    interests = ['history', 'culture']

    # Generate explanation
    explanation1 = generate_explanation(item, interests)

    # Generate again - should be cached
    explanation2 = generate_explanation(item, interests)

    assert explanation1 == explanation2  # Should be the same due to caching


def test_explanation_non_generic_fallback():
    """Fallback explanation should not be boilerplate generic phrase"""
    from llm.explanation_generator import generate_explanation

    item = {
        'name': 'Taksim Square',
        'category': 'cultural',
        'tags': ['culture', 'urban']
    }
    interests = ['culture']

    explanation = generate_explanation(item, interests)
    assert 'matches your interest' not in explanation
    assert 'unique' in explanation or 'immersive' in explanation or 'experience' in explanation


if __name__ == "__main__":
    pytest.main([__file__])