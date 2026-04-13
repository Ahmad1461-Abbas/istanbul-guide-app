# 🕌 Istanbul Guided Recommendation System

## 📋 Complete Feature Overview

This is a comprehensive AI-powered recommendation system for Istanbul tourism that includes:

### 🎯 Core AI Features
- **TF-IDF Vectorization** on place tags and descriptions
- **Cosine Similarity Algorithm** for intelligent matching
- **Hybrid Scoring** (70% similarity + 30% user ratings)
- **LLM-Generated Explanations** using OpenAI GPT (with caching)
- **Dynamic Recommendations** with randomization for variety

### 👤 User Management
- **Session-Based Storage** (Flask sessions for web, in-memory for console)
- **Interest Management** (add/update preferences)
- **Global Rating System** (1-5 stars for places)
- **Visit Tracking** (global visited places)

### 📅 Advanced Features
- **Custom Itineraries** (1-7 day plans)
- **Search Functionality** with filters
- **Caching System** for LLM responses
- **Database Persistence** (SQLite)

### 🌐 Multiple Interfaces
- **Console Application** (interactive menu)
- **REST API** (FastAPI with 8+ endpoints)
- **Web Interface** (Flask with Bootstrap)
- **Docker Support** (containerized deployment)

### 🧪 Quality Assurance
- **Automated Testing** (pytest)
- **Error Handling** with graceful degradation
- **Input Validation** and sanitization
- **Logging System**

---

## 🚀 Quick Start

### Prerequisites
- Python 3.12+
- OpenAI API key (optional, works with fallback)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ahmadawan4480-web/istanbul-guided-recomendation.git
   cd istanbul-guided-recomendation
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment (optional)**
   ```bash
   cp .env.example .env
   # Edit .env with your OpenAI API key
   ```

### Running the Application

#### Console Version (Interactive)
```bash
python main.py
```
Features a menu-driven interface with:
- Personalized recommendations
- Profile management
- Rating system
- Itinerary generation
- Search functionality

#### Web Interface
```bash
python web/app.py
```
Open http://localhost:5000 in your browser.

#### REST API
```bash
uvicorn api.app:app --reload
```
API documentation at http://localhost:8000/docs

#### Docker Deployment
```bash
# Build and run all services
docker-compose up --build

# Run specific service
docker-compose up web    # Flask web app on port 5000
docker-compose up api    # FastAPI on port 8000
```

---

## 📊 API Endpoints

### Recommendations
```http
POST /api/recommendations
Content-Type: application/json

{
  "interests": ["history", "culture"],
  "limit": 5,
  "exclude_visited": false
}
```

### Itinerary Generation
```http
POST /api/itinerary
Content-Type: application/json

{
  "interests": ["history", "food"],
  "days": 3
}
```

### Profile & Ratings
```http
GET /api/profile
POST /api/interests
POST /api/ratings
```

### Search
```http
POST /api/search
Content-Type: application/json

{
  "query": "mosque",
  "category": "religious",
  "min_rating": 4.0
}
```

---

## 🧪 Testing

Run the test suite:
```bash
pytest tests/
```

---

## 🏗️ Architecture

```
istanbul-guided-recomendation/
├── main.py                 # Console application
├── api/
│   └── app.py             # FastAPI REST API
├── web/
│   ├── app.py            # Flask web application
│   └── templates/        # HTML templates
├── recommendation/
│   └── recommender.py    # Core recommendation engine
├── llm/
│   └── explanation_generator.py  # OpenAI integration
├── models/
│   └── user_profile.py   # User management
├── database/
│   └── db_connection.py  # SQLite database layer
├── data/
│   ├── places.json       # Istanbul places dataset
│   └── events.json       # Events dataset
├── tests/                # Test suite
├── Dockerfile           # Container configuration
├── docker-compose.yml   # Multi-service setup
└── requirements.txt     # Python dependencies
```

---

## 🎨 Features in Detail

### AI-Powered Recommendations
- Uses cosine similarity to match user interests with place tags
- Incorporates user ratings into hybrid scoring algorithm
- Generates contextual explanations using GPT models
- Supports caching to reduce API costs

### User Experience
- **Console**: Interactive menu with real-time feedback
- **Web**: Responsive Bootstrap interface with AJAX
- **API**: RESTful endpoints with comprehensive documentation
- **Mobile-Friendly**: Responsive design for all devices

### Data Management
- **17 Places** and **7 Events** in JSON datasets
- **TF-IDF Processing** of tags and descriptions
- **SQLite Database** for ratings, visited places, and LLM cache
- **No User IDs** - global storage approach

### Production Ready
- **Error Handling**: Graceful degradation without API keys
- **Security**: Input validation and sanitization
- **Scalability**: Docker containerization
- **Monitoring**: Logging and performance metrics

---

## 🔧 Configuration

Create a `.env` file with:

```env
OPENAI_API_KEY=your-key-here
DEBUG=True
DATABASE_URL=database/istanbul_recommendations.db
RECOMMENDATION_LIMIT=5
ENABLE_CACHE=True
CACHE_TTL=3600
```

---

## 📈 Performance & Cost Optimization

- **LLM Caching**: Reduces OpenAI API calls by ~80%
- **Database Indexing**: Optimized queries
- **Batch Processing**: Efficient data handling
- **Cost Monitoring**: API usage tracking

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new features
4. Ensure all tests pass
5. Submit a pull request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🆘 Troubleshooting

### Common Issues

**"Module not found" errors**
```bash
pip install -r requirements.txt
```

**Database errors**
```bash
rm database/istanbul_recommendations.db
python -c "from database.db_connection import DatabaseConnection; DatabaseConnection()"
```

**OpenAI API errors**
- Check your API key in `.env`
- The system works with fallback explanations if no key is provided

**Port conflicts**
- Flask: Change port in `web/app.py`
- FastAPI: Use `--port` parameter

---

## 🎯 What's Next

Future enhancements could include:
- **Google Maps Integration** for location services
- **Weather API** for itinerary planning
- **Hotel/Booking APIs** for complete trip planning
- **Multi-language Support** (Turkish, Arabic, etc.)
- **Mobile App** (React Native)
- **Advanced Analytics** and user behavior tracking

---

*Built with ❤️ for Istanbul tourism using Python, AI, and modern web technologies.*
  - **Solution**: Ensure all dependencies are installed and check the console for errors.

- **Issue**: API returns an error.
  - **Solution**: Verify your API key and endpoint configurations.

## Contribution Guidelines
We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or fix:
   ```sh
   git checkout -b my-feature-branch
   ```
3. Make your changes and commit them:
   ```sh
   git commit -m "Add some feature"
   ```
4. Push to the branch:
   ```sh
   git push origin my-feature-branch
   ```
5. Open a pull request.

Thank you for contributing!