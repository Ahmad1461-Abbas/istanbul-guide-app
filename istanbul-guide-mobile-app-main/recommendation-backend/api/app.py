from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from recommendation.recommender import recommend_items, generate_itinerary, search_places
from llm.explanation_generator import generate_explanation
from models.user_profile import UserProfile
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Istanbul Recommendation API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RecommendationRequest(BaseModel):
    interests: List[str]
    limit: Optional[int] = 5
    exclude_visited: Optional[bool] = False

class InterestUpdate(BaseModel):
    interests: List[str]

class RatingRequest(BaseModel):
    place_name: str
    rating: float

class ItineraryRequest(BaseModel):
    interests: List[str]
    days: int

class SearchRequest(BaseModel):
    query: str
    category: Optional[str] = None
    min_rating: Optional[float] = None

@app.get("/")
def root():
    return {"message": "🕌 Istanbul Guided Recommendation API", "version": "2.0.0"}

@app.post("/recommendations")
def get_recommendations(request: RecommendationRequest):
    """Get personalized recommendations with AI explanations"""
    try:
        recommendations = recommend_items(
            request.interests,
            request.limit,
            request.exclude_visited
        )

        # Add LLM explanations with duplicate prevention
        seen_explanations = set()
        for rec in recommendations:
            explanation = generate_explanation(rec, request.interests)
            # Ensure unique explanations
            while explanation in seen_explanations:
                explanation = generate_explanation(rec, request.interests)  # Regenerate if duplicate
            seen_explanations.add(explanation)
            rec["explanation"] = explanation

        return {
            "status": "success",
            "recommendations": recommendations
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/itinerary")
def get_itinerary(request: ItineraryRequest):
    """Generate a custom itinerary"""
    try:
        if not 1 <= request.days <= 7:
            raise HTTPException(status_code=400, detail="Days must be between 1-7")

        itinerary = generate_itinerary(request.interests, request.days)

        return {
            "status": "success",
            "days": request.days,
            "interests": request.interests,
            "itinerary": itinerary
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/interests")
def add_interest(request: InterestUpdate):
    """Update interests - stored globally"""
    try:
        # Since no user_id, this is just for validation
        return {
            "status": "success",
            "message": f"Interests updated",
            "interests": request.interests
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/ratings")
def add_rating(request: RatingRequest):
    """Add or update a rating for a place"""
    try:
        if not 1 <= request.rating <= 5:
            raise HTTPException(status_code=400, detail="Rating must be between 1-5")

        profile = UserProfile()
        if profile.add_rating(request.place_name, request.rating):
            return {
                "status": "success",
                "message": f"Rating {request.rating} added for {request.place_name}"
            }
        else:
            raise HTTPException(status_code=400, detail="Failed to add rating")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/profile")
def get_user_profile():
    """Get global profile information"""
    try:
        profile = UserProfile()
        summary = profile.get_profile_summary()

        return {
            "status": "success",
            "profile": summary
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/places")
def get_all_places():
    """Get all available places and events"""
    try:
        from recommendation.recommender import load_places, load_events
        places = load_places()
        events = load_events()

        return {
            "status": "success",
            "places": places,
            "events": events,
            "total": len(places) + len(events)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/search")
def search_attractions(request: SearchRequest):
    """Search places by query with optional filters"""
    try:
        results = search_places(request.query, request.category, request.min_rating)

        return {
            "status": "success",
            "query": request.query,
            "results": results,
            "count": len(results)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/places/{place_name}")
def get_place_details(place_name: str):
    """Get detailed information about a specific place"""
    try:
        from recommendation.recommender import load_places, load_events
        places = load_places()
        events = load_events()
        all_items = places + events

        for item in all_items:
            if item['name'].lower() == place_name.lower():
                # Add average rating from database
                from database.db_connection import DatabaseConnection
                db = DatabaseConnection()
                avg_rating = db.get_place_average_rating(item['name'])

                item_copy = item.copy()
                item_copy['average_user_rating'] = round(avg_rating, 2) if avg_rating else 0.0

                return {
                    "status": "success",
                    "place": item_copy
                }

        raise HTTPException(status_code=404, detail="Place not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))