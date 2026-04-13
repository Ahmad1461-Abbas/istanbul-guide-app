import random

class RecommendationSystem:
    def __init__(self, items):
        self.items = items
        self.user_preferences = {}

    def set_user_preferences(self, user_id, preferences):
        self.user_preferences[user_id] = preferences

    def recommend(self, user_id):
        if user_id not in self.user_preferences:
            return random.choice(self.items)  # return a random item if no preferences

        preferences = self.user_preferences[user_id]
        recommended_item = None
        max_score = -1

        for item in self.items:
            score = self._calculate_score(item, preferences)
            if score > max_score:
                max_score = score
                recommended_item = item

        return recommended_item

    def _calculate_score(self, item, preferences):
        score = 0
        for preference in preferences:
            if preference in item:
                score += 1  # Increase score based on matches
        return score

# Example items and how to use the Recommendation System
items = ['Item A - Tech', 'Item B - Health', 'Item C - Travel', 'Item D - Food']

recommender = RecommendationSystem(items)
recommender.set_user_preferences('user1', ['Tech', 'Food'])
print(recommender.recommend('user1'))  # Recommended item based on preferences

# This code sets up a basic recommendation system that matches user preferences with items.