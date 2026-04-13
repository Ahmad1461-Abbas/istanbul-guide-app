import sqlite3
import os
from datetime import datetime

class DatabaseConnection:
    def __init__(self, db_path="database/istanbul_recommendations.db"):
        self.db_path = db_path
        self.init_database()

    def get_connection(self):
        return sqlite3.connect(self.db_path)

    def init_database(self):
        """Initialize database tables"""
        conn = self.get_connection()
        cursor = conn.cursor()

        # Users table - removed, no user_id
        # Ratings table - global ratings
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS ratings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                place_name TEXT UNIQUE,
                rating REAL,
                timestamp TEXT
            )
        ''')

        # Visited places table - global visited
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS visited_places (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                place_name TEXT UNIQUE,
                visit_date TEXT
            )
        ''')

        # Cache table for LLM responses
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS llm_cache (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                cache_key TEXT UNIQUE,
                response TEXT,
                created_at REAL,
                ttl INTEGER
            )
        ''')

        conn.commit()
        conn.close()

    def create_user(self, name, interests=None):
        """Create a global profile - not used anymore"""
        pass

    def get_user(self, name):
        """Get global profile - not used"""
        return None

    def update_user_interests(self, interests):
        """Not used - interests handled in session/memory"""
        pass

    def add_rating(self, place_name, rating):
        """Add or update a global rating for a place"""
        now = datetime.now().isoformat()

        conn = self.get_connection()
        cursor = conn.cursor()
        # Check if rating exists
        cursor.execute('''
            SELECT id FROM ratings WHERE place_name = ?
        ''', (place_name,))

        existing = cursor.fetchone()
        if existing:
            cursor.execute('''
                UPDATE ratings SET rating = ?, timestamp = ? WHERE id = ?
            ''', (rating, now, existing[0]))
        else:
            cursor.execute('''
                INSERT INTO ratings (place_name, rating, timestamp)
                VALUES (?, ?, ?)
            ''', (place_name, rating, now))
        conn.commit()
        conn.close()

    def get_all_ratings(self):
        """Get all global ratings"""
        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT place_name, rating, timestamp FROM ratings')
        ratings = cursor.fetchall()
        conn.close()

        return [{'place_name': r[0], 'rating': r[1], 'timestamp': r[2]} for r in ratings]

    def get_place_average_rating(self, place_name):
        """Get average rating for a place"""
        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT AVG(rating) FROM ratings WHERE place_name = ?', (place_name,))
        avg = cursor.fetchone()[0]
        conn.close()
        return avg if avg else 0.0

    def add_visited_place(self, place_name):
        """Mark a place as visited globally"""
        now = datetime.now().isoformat()

        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT OR IGNORE INTO visited_places (place_name, visit_date)
            VALUES (?, ?)
        ''', (place_name, now))
        conn.commit()
        conn.close()

    def get_visited_places(self):
        """Get globally visited places"""
        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT place_name, visit_date FROM visited_places')
        visited = cursor.fetchall()
        conn.close()

        return [{'place_name': v[0], 'visit_date': v[1]} for v in visited]

    def cache_llm_response(self, cache_key, response, ttl=3600):
        """Cache LLM response"""
        import time
        now = time.time()

        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT OR REPLACE INTO llm_cache (cache_key, response, created_at, ttl)
            VALUES (?, ?, ?, ?)
        ''', (cache_key, response, now, ttl))
        conn.commit()
        conn.close()

    def get_cached_llm_response(self, cache_key):
        """Get cached LLM response if not expired"""
        import time
        now = time.time()

        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute('''
            SELECT response, created_at, ttl FROM llm_cache WHERE cache_key = ?
        ''', (cache_key,))
        result = cursor.fetchone()
        conn.close()

        if result:
            response, created_at, ttl = result
            if now - created_at < ttl:
                return response
        return None

    def clear_expired_cache(self):
        """Clear expired cache entries"""
        import time
        now = time.time()

        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute('DELETE FROM llm_cache WHERE (? - created_at) > ttl', (now,))
        conn.commit()
        conn.close()