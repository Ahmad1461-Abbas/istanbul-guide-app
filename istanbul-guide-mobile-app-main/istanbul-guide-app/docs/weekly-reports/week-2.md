# Istanbul Smart Tourism Guide  
## Weekly Development Report – Week 2  
### Interactive Map System Implementation

**Course:** Software Engineering  
**Student:** Asad Ullah Baig  
**Student ID:** 2500009626  
**University:** Istanbul Kültür University  

---

## Table of Contents

- [Introduction](#introduction)
- [Objectives](#objectives)
- [Technologies and Tools](#technologies-and-tools)
- [System Design and Implementation](#system-design-and-implementation)
  - [Interactive Map Integration](#interactive-map-integration)
  - [User Location Detection](#user-location-detection)
  - [Landmark Marker Representation](#landmark-marker-representation)
  - [Category Filtering](#category-filtering)
  - [Search Functionality](#search-functionality)
  - [Nearby Landmark Discovery](#nearby-landmark-discovery)
  - [Marker Interaction](#marker-interaction)
- [User Interface Design](#user-interface-design)
- [Challenges and Problem Solving](#challenges-and-problem-solving)
- [Achievements](#achievements)
- [Future Work](#future-work)
- [Conclusion](#conclusion)
- [Reflection and Learning Outcomes](#reflection-and-learning-outcomes)
- [System Architecture Overview](#system-architecture-overview)
- [System Demonstration](#system-demonstration)
- [Screenshots](#screenshots)

---

# Introduction

The primary objective of this week’s development was to build the interactive map system for the Istanbul Smart Tourism Guide mobile application. The map functions as the central feature of the application, allowing users to visually explore historical landmarks and events throughout Istanbul.

To support this functionality, the system integrates location-based services to detect the user’s current position and display nearby historical sites on the map. By combining interactive markers, search capabilities, and category filtering, the map provides users with an intuitive way to discover places of historical significance across the city.

---

# Objectives

The primary objectives for this development cycle were:

- Integrate an interactive map into the mobile application
- Detect and display the user's current location
- Display historical landmarks and events on the map
- Organize landmarks into meaningful categories
- Enable filtering of locations based on category
- Implement a search system for locating historical sites
- Allow users to view detailed information about each location

These objectives ensure that users can explore Istanbul's historical heritage through a spatially interactive interface.

---

# Technologies and Tools

| Technology | Purpose |
|-----------|--------|
| React Native | Framework used for building cross-platform mobile applications |
| Expo | Development platform simplifying React Native setup |
| React Native Maps | Library used to render the interactive map interface |
| Expo Location API | Used to retrieve the user’s geographic location |
| Geolib | Calculates distances between geographic coordinates |
| TypeScript | Provides type safety and improves code maintainability |

---

# System Design and Implementation

## Interactive Map Integration

The interactive map was implemented using the React Native Maps library. The map initially displays Istanbul and allows users to zoom, pan, and interact with landmarks represented as markers.

Markers are dynamically generated from a dataset of historical locations, allowing the map to update in response to search queries or category filters.

---

## User Location Detection

User location detection was implemented using the Expo Location API. Upon launching the application, users are prompted to grant permission for location access. If permission is granted, the map automatically centers on the user’s position.

---

## Landmark Marker Representation

Historical landmarks and events are represented on the map through interactive markers. Each marker corresponds to a record in the historical dataset and contains key information such as:

- Landmark name
- Category
- Historical description
- Geographic coordinates
- Historical period

Different marker icons are used to visually distinguish between categories of landmarks, making it easier for users to interpret the map at a glance.

Example categories include:

- Mosques
- Palaces
- Museums
- Monuments
- Historical Events

This visual categorization improves map readability and allows users to quickly identify locations that match their interests.

---

## Category Filtering

A category filtering feature allows users to choose which types of landmarks appear on the map.

When a category is selected, the application dynamically filters the landmark dataset and updates the markers displayed on the map. This reduces visual clutter and helps users focus on specific historical themes.

For example, a user interested in Ottoman architecture can choose to display only mosques and palaces.

---

## Search Functionality

A search bar allows users to locate landmarks by name, description, or historical period. As the user types, the system dynamically filters the dataset and updates the visible markers.

---

## Nearby Landmark Discovery

The Nearby Places feature enhances location-based exploration.

Using the user’s coordinates, the system calculates the distance between the user and each landmark using the Geolib library. The locations are sorted by proximity and the closest landmarks are displayed.

Users can select a nearby landmark to automatically move the map to that location and view its details.

---

## Marker Interaction

When a marker is selected, a detail card appears displaying additional information about the landmark.

The detail card includes:

- Landmark title
- Description
- Historical period
- Distance from the user's location

This interaction model allows users to explore information without leaving the map interface.

---

# User Interface Design

The map interface was designed with the goal of maintaining clear map visibility while still providing users with easy access to essential controls.

The main UI components include:

- Interactive map
- Search bar
- Category filter
- Nearby places toggle
- Recenter location button
- Landmark detail card

These elements are displayed as overlay components above the map, ensuring that the map remains the primary focus while users interact with the application.

---

# Challenges and Problem Solving

Several technical challenges emerged during development.

### Marker Rendering Issues

Custom map markers initially caused rendering problems on Android devices, where marker icons would flicker or briefly disappear. The issue was resolved by modifying the marker rendering structure and improving view handling.

### Marker Visibility and Persistence

Another issue occurred with marker visibility. Icons would not appear unless a location was selected, and sometimes disappeared after a short time. This behavior was traced to conditional rendering logic and resolved by ensuring markers were consistently tied to the landmark dataset.

### Map Layout and Interface Balance

Interface components initially overlapped with important map areas. The layout was refined so that overlay elements remained accessible without obstructing the map.

### Location Permission Handling

Handling cases where users deny location permission required implementing fallback behavior. The map now defaults to a central location in Istanbul so users can still explore landmarks.

---

# Achievements

- Interactive map displaying historical landmarks
- Automatic user location detection
- Category-based landmark filtering
- Dynamic search functionality
- Nearby landmark discovery system
- Interactive marker information display
- Custom recenter location button

---

# Future Work

Future improvements include:

- Implementing marker clustering to reduce map clutter
- Adding images to landmark detail cards
- Providing navigation directions to landmarks
- Improving marker icons using vector graphics
- Expanding historical descriptions and timelines

These enhancements would further improve both the usability and educational value of the application.

---

# Conclusion

This week marked an important step in the development of the Istanbul Smart Tourism Guide application with the introduction of the interactive map system.

The map now supports user location detection, displays nearby landmarks, and allows users to filter places by category. Together, these features begin to shape a more intuitive way for users to explore historical sites throughout Istanbul.

---

# Reflection and Learning Outcomes

This week’s development provided a deeper understanding of how location-based mobile applications operate in practice.

Integrating the map interface and working with GPS data highlighted how many small technical details are involved in building seemingly simple features. Handling location permissions and ensuring markers appeared correctly required careful debugging and experimentation.

Another key lesson was the importance of testing features from the user’s perspective. Some issues only became apparent during real usage rather than during initial implementation.

Overall, the work completed this week strengthened the core foundation of the project and provided insights that will guide the next stages of development.

---

# System Architecture Overview

The map system follows a component-based architecture where the application is divided into reusable modules.

### Map Screen

Responsible for rendering the map, managing location detection, displaying markers, and coordinating UI interactions.

### Landmark Dataset

Stores historical landmark data including coordinates, categories, descriptions, and historical periods.

### Category Filter Component

Filters landmarks by category and dynamically updates map markers.

### Landmark Detail Card

Displays contextual information about a selected landmark.

### Nearby Places System

Calculates distances between the user and nearby landmarks.

This modular architecture improves maintainability and supports future feature expansion.

---

# System Demonstration

The implemented map system provides several interactive capabilities.

### Map Exploration
Users can navigate the map using zoom and pan gestures.

### Marker Interaction
Markers represent historical locations and display detailed information when selected.

### Category Filtering
Users can display specific types of landmarks using category filters.

### Search Functionality
Users can search for landmarks using keywords.

### Nearby Locations
Users can discover historical landmarks close to their current location.

---

# Screenshots

Add screenshots of the application here.

Example:

![Map View](images/map-view.png)

![Search Feature](images/search.png)

![Nearby Landmarks](images/nearby.png)

![Landmark Detail Card](images/landmark-detail.png)