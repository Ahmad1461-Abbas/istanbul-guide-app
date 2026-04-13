# Istanbul Guide Mobile App  
## Requirement Analysis, Methodology & Module Planning

**Project:** Istanbul Guide Mobile Application   
**Course:** Software Engineering  
**Instructor:** Büşra Kocaçınar  
**Group:** 19  

---

# 1. Introduction

The Istanbul Guide Mobile Application is a smart city exploration system designed to improve how tourists and residents explore Istanbul. The application will provide information about historical landmarks, museums, cultural venues, restaurants, transportation options, and local events.

The system will integrate GPS navigation, interactive maps, route optimization, and personalized recommendations. It will also support offline access and multilingual content. The goal is to create a focused, user-friendly, and intelligent digital guide specifically for Istanbul.

---

# 2. Similar Projects 

## 2.1 Google Maps

### Methods Used
- GPS-based navigation
- Route optimization algorithms
- Real-time traffic updates
- Location-based discovery
- User reviews and ratings
- AI-based personalization

### Technical Approach
Google Maps uses large-scale geospatial databases, cloud infrastructure, and routing engines. It integrates map rendering APIs with backend services that process location data and calculate routes.

### Feasibility for Our Project
City-level routing and POI listing are feasible using existing SDKs. However, global traffic prediction systems are outside the academic scope.

### Strengths
- Accurate navigation
- Real-time route updates
- Strong search functionality
- Intelligent recommendations

### Weaknesses
- Not focused on Istanbul specifically
- Limited cultural storytelling
- Overloaded interface

### Critical Aspects
- Dependence on external map APIs
- Complexity of real-time routing
- Data freshness is essential

---

## 2.2 TripAdvisor

### Methods Used
- User-generated reviews
- Ranking algorithms
- Category filtering
- Tourism-focused content presentation

### Technical Approach
TripAdvisor uses centralized databases for attractions and reviews, search indexing systems, and ranking logic based on ratings and user feedback.

### Feasibility for Our Project
A simplified review system and ranking mechanism can be implemented within the project scope.

### Strengths
- Strong tourism focus
- Community-based trust
- Rich place descriptions

### Weaknesses
- Weak route optimization
- Not offline-friendly
- Not city-specific

### Critical Aspects
- Review moderation challenges
- Risk of outdated information
- Ranking bias issues

---

# 3. Potential Technologies & Tools

## Mobile Development
- React Native (Expo) or Flutter
- SQLite or Realm for local storage

## Maps & Navigation
- Google Maps SDK or Mapbox SDK

## Backend & Database
- Node.js (Express or NestJS)
- PostgreSQL database

## Optional Enhancements
- Redis (caching)
- AI-based assistant for recommendations

## Development Tools
- GitHub for version control
- Figma for UI/UX
- Postman for API testing

---

# 4. Requirements Specification 

## 4.1 Functional Requirements

FR1. The system shall display nearby attractions within a 5 km radius based on GPS location.  
FR2. The system shall allow users to search and filter places by category, rating, and distance.  
FR3. The system shall show an interactive map with clickable markers.  
FR4. The system shall generate optimized routes between selected places.  
FR5. The system shall allow users to create and manage itineraries.  
FR6. The system shall display local events with time and location details.  
FR7. The system shall support Turkish and English languages.  

## 4.2 Non-Functional Requirements

NFR1. The main screen shall load within 2 seconds under normal conditions.  
NFR2. Saved places shall be accessible offline.  
NFR3. User authentication data shall be stored securely.  
NFR4. Location permission shall be optional.  
NFR5. The backend shall support at least 5,000 concurrent users.  
NFR6. A new user shall reach a place detail screen within three interactions.  
NFR7. The system shall follow modular architecture for maintainability.  

---

# 5. Development Methodology (Group)

## Selected Methodology: Agile Scrum

### Justification
Agile Scrum allows incremental development and adaptation to changes. Since the project includes evolving features such as AI suggestions and offline support, iterative sprints are suitable.

### Process
- 2-week sprints
- Sprint planning and review
- Kanban task tracking
- Regular team meetings

---

# 6. Main Project Modules

## 6.1 POI & Content Management
Subtasks:
- Design database schema
- Populate initial dataset
- Implement CRUD operations
Proposed Responsible: Member A

## 6.2 Maps & GPS
Subtasks:
- Integrate Maps SDK
- Implement location tracking
- Show nearby markers
Proposed Responsible: Member B

## 6.3 Search & Filters
Subtasks:
- Search UI
- Backend filtering logic
Proposed Responsible: Member C

## 6.4 Route Planner & Itinerary
Subtasks:
- Multi-stop routing
- Itinerary management
Proposed Responsible: Member B & C

## 6.5 Offline Access
Subtasks:
- Local caching
- Sync mechanism
Proposed Responsible: Member C

## 6.6 Reviews & Ratings
Subtasks:
- Review submission
- Display ratings
Proposed Responsible: Member A

---

# 7. Feasibility Analysis

## Technical Feasibility
All required technologies are well-documented and suitable for academic use. The system focuses on a single city, which reduces complexity.

## Operational Feasibility
Users are familiar with map-based applications. No special hardware is required.

## Time Feasibility
By prioritizing an MVP (Map + Places + Search), the core system can be completed within the semester.

---

# 8. Risk Analysis

## Technical Risks
- API limits
- Performance issues

## Data Risks
- Outdated event data
- Incomplete place information

## Scope Risks
- Adding too many advanced features

Mitigation:
- Focus on MVP first
- Keep advanced AI features optional

---

# 9. References

[1] Google, “Google Maps,” 2024.  
[2] TripAdvisor, “TripAdvisor Platform,” 2024.  
[3] Google Developers, “Google Maps Platform Documentation,” 2024.
