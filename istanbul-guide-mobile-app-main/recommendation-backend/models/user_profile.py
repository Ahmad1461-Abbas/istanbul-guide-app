from database.db_connection import DatabaseConnection
import statistics

class UserProfile:
    def __init__(self, name=None, interests=None):
        self.db = DatabaseConnection()
        self.name = name or "Guest"
        self.interests = interests or []
        # No user_id, using global storage

    def update_interests(self, new_interests):
        self.interests = new_interests
        # No DB update since no user_id

    def get_interests(self):
        return self.interests

    def add_rating(self, place_name, rating):
        """Add a global rating for a place"""
        if 1 <= rating <= 5:
            self.db.add_rating(place_name, rating)
            return True
        return False

    def get_ratings(self):
        """Get all global ratings"""
        return self.db.get_all_ratings()

    def get_average_rating(self):
        """Calculate average global rating given"""
        ratings = self.get_ratings()
        if not ratings:
            return 0.0
        scores = [r['rating'] for r in ratings]
        return round(statistics.mean(scores), 2)

    def mark_visited(self, place_name):
        """Mark a place as visited globally"""
        self.db.add_visited_place(place_name)

    def get_visited_places(self):
        """Get globally visited places"""
        return self.db.get_visited_places()

    def get_profile_summary(self):
        """Get global profile summary"""
        ratings = self.get_ratings()
        visited = self.get_visited_places()

        return {
            'name': self.name,
            'interests': self.interests,
            'total_ratings': len(ratings),
            'average_rating_given': self.get_average_rating(),
            'visited_places': len(visited),
            'recent_ratings': ratings[-5:] if ratings else [],  # Last 5 ratings
            'recent_visits': visited[-5:] if visited else []   # Last 5 visits
        }