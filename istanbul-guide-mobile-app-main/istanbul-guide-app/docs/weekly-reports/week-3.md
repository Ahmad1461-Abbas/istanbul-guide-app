# Istanbul Guide Mobile App  
## Weekly Development Report – Week 03  
### User Interface Enhancement and Screen Implementation

**Course:** Software Engineering  
**Student:** Asad Ullah Baig  
**Student ID:** 2500009626  
**Lecturer:** Prof. Dr. Akhan AKBULUT  
**Teaching Asst.:** Büşra Kocaçınar  
**University:** Istanbul Kültür University  
**Date:**  

---

## Table of Contents

- [Introduction](#introduction)
- [Objectives](#objectives)
- [Technologies and Tools](#technologies-and-tools)
- [System Design and Implementation](#system-design-and-implementation)
  - [Main Screen Structure](#main-screen-structure)
  - [Map Interface Redesign](#map-interface-redesign)
  - [Explore Screen Development](#explore-screen-development)
  - [User Interface Improvements](#user-interface-improvements)
  - [Interaction Enhancements](#interaction-enhancements)
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

This week’s development focused on improving the overall usability and visual quality of the Istanbul Smart Tourism Guide application. While the initial goal was to implement the main application screens, the work naturally shifted towards refining the interface and resolving issues that became visible during testing.

Building on the interactive map system developed in the previous week, several improvements were introduced to make the application feel more polished, responsive, and easier to use in real-world scenarios.

---

# Objectives

The main objectives for this week were:

- Implement the main application screens and navigation structure  
- Improve the visual design of the map interface  
- Develop the Explore screen for browsing landmarks  
- Resolve layout and spacing issues  
- Fix marker rendering and visibility problems  
- Enhance user interaction across the application  

---

# Technologies and Tools

The technologies used during this phase remained consistent with the previous week, including React Native, Expo, React Native Maps, Expo Location API, Geolib, and TypeScript. These tools continued to support both interface development and location-based functionality.

---

# System Design and Implementation

This week focused more on improving structure, usability, and presentation rather than introducing entirely new core features.

## Main Screen Structure

The application was organized into multiple main screens, allowing users to navigate between different sections more easily. This improved the overall flow of the application and made the experience feel more complete and structured.

## Map Interface Redesign

The map interface was redesigned to follow a more modern layout. A search bar and category filters were introduced at the top of the screen, making key actions more accessible while still keeping the map as the main focus.

## Explore Screen Development

An Explore screen was introduced to allow users to browse landmarks in a more structured format. This provides an alternative to map-based exploration and improves accessibility for users who prefer browsing through lists.

## User Interface Improvements

Several visual improvements were made across the application. These included refining spacing, improving alignment, and ensuring consistent styling between components. The bottom navigation was also updated to better match the overall theme of the application.

## Interaction Enhancements

User interaction was improved to make the application feel more natural. For example, tapping on the map now closes any open detail card, reducing clutter and improving the overall interaction flow.

---

# User Interface Design

The interface was carefully refined to balance usability and visual clarity. UI elements were positioned in a way that allows users to access features easily without blocking important parts of the map. This required several adjustments to achieve a clean and intuitive layout.

---

# Challenges and Problem Solving

During development, several challenges were encountered while refining both the interface and map functionality.

### Marker Rendering Issues

Marker icons sometimes flickered or failed to render correctly, particularly on Android devices. This required adjustments to the rendering structure to ensure more stable behavior.

### Marker Visibility Problems

Markers were not visible unless a location was selected, and in some cases they disappeared shortly after appearing. This issue was resolved by improving how markers were linked to the dataset and ensuring consistent rendering.

### Layout and Safe Area Issues

Some interface elements overlapped with the device’s status bar and navigation areas. This was addressed by adjusting layout spacing and properly handling safe areas.

### Interface Balance

Maintaining a balance between map visibility and UI controls required multiple design iterations. Overlay elements were repositioned to ensure that the map remained the main focus.

### API Connectivity Issues

While testing on physical devices, issues were encountered when connecting to the backend using a local IP address. This required additional configuration to ensure stable connectivity.

---

# Achievements

- Implementation of main application screens and navigation  
- Improved and modernized map interface  
- Introduction of Explore screen  
- Better UI consistency and layout  
- Improved marker stability and visibility  
- Enhanced overall user interaction  

---

# Future Work

While the current implementation meets the objectives for this week, further improvements can be made in future iterations.

Planned enhancements include:

- Adding real-world data sources  
- Improving performance  
- Enhancing UI animations and transitions  
- Implementing marker clustering  
- Expanding landmark information and content  

---

# Conclusion

This week marked an important step in improving the usability and overall quality of the application. By refining the interface, introducing new screens, and resolving key issues, the application has become more stable and user-friendly.

These improvements provide a strong foundation for the next stages of development.

---

# Reflection and Learning Outcomes

This week highlighted the importance of revisiting and improving existing features rather than focusing only on adding new functionality. Many of the issues addressed only became visible during real usage, showing how important testing and iteration are in the development process.

Working through UI adjustments and debugging marker-related problems provided a better understanding of how mobile interfaces should be structured. It also reinforced the need to consider both functionality and user experience at the same time.

Overall, this week helped strengthen both technical skills and design thinking, which will be valuable for the next stages of the project.

---

# System Architecture Overview

The application continues to follow a modular structure, where different components handle specific responsibilities such as map rendering, user interface elements, and data handling. This structure improves maintainability and allows future features to be added more easily.

---

# System Demonstration

Users can interact with the map, browse landmarks through the Explore screen, search for locations, and discover nearby places using the improved interface. The application now provides a smoother and more consistent user experience.

---

# Screenshots

The following screenshots illustrate the main interface improvements and new screens implemented during this week.

## Welcome Screen
![Welcome Screen](images/week-3/welcome.png)  
*Figure 1: Welcome screen introducing the application*

## Sign In Screen
![Sign In](images/week-3/signin.png)  
*Figure 2: Sign-in screen allowing users to access personalized features*

## Map Interface
![Map UI](images/week-3/map-ui.png)  
*Figure 3: Updated map interface with search and category filters*

## Explore Screen
![Explore](images/week-3/explore.png)  
*Figure 4: Explore screen providing structured access to landmarks*

## Categories Screen
![Categories](images/week-3/categories.png)  
*Figure 5: Categories screen for browsing landmarks by type*

## Saved Trips
![Saved](images/week-3/saved.png)  
*Figure 6: Saved trips showing curated journeys*

## Profile Screen
![Profile](images/week-3/profile.png)  
*Figure 7: Profile screen displaying user information*

## Marker Interaction
![Detail Card](images/week-3/detail.png)  
*Figure 8: Marker interaction displaying landmark detail card*

## Marker Overcrowding Issue

The following screenshot illustrates a limitation observed during development when a large number of markers are rendered simultaneously without clustering.

![Marker Issue](images/week-3/marker-issue.png)  
*Figure 9: Example of marker overcrowding on the map*

This highlights the need for implementing marker clustering in future improvements to maintain map readability and performance.