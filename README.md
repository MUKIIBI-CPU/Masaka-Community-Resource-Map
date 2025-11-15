# Masaka-Community-Resource-Map

## Overview

The Masaka Community Resource Map is a web-based interactive mapping application that helps community members locate essential services in Masaka District, Uganda. The application displays health centers, education facilities, and safety services on an interactive map with filtering, search, and location-based features.

## Features

### Core Functionality
- **Interactive Map**: Built with Leaflet.js using OpenStreetMap tiles
- **Resource Categories**: 
  - Health Centers (hospitals, clinics, medical services)
  - Education Facilities (primary schools, secondary schools, universities)
  - Safety Facilities (police stations, fire stations, emergency services)
- **Filtering**: Toggle visibility of different resource types
- **Search**: Find facilities by name, address, services, or type
- **Location Services**: Get your current location with address information

### User Interface
- **Responsive Design**: Works on desktop and mobile devices
- **Interactive Sidebar**: Contains filters, statistics, and information
- **Map Controls**: Reset view and locate user position
- **Legend**: Visual guide to map markers and symbols
- **Detailed Popups**: Show facility information when markers are clicked

### Advanced Features
- **Statistics**: Real-time counts of visible facilities
- **Location Sharing**: Copy or share your current coordinates
- **Scale Control**: Map distance measurement
- **North Arrow**: Orientation indicator

## File Structure
masaka-community-map/
├── index.html # Main HTML file
├── style.css # CSS styles and responsive design
├── script.js # JavaScript application logic
├── data.js # Resource data and coordinates
└── README.md # This documentation file

text

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Mapping**: Leaflet.js with OpenStreetMap tiles
- **Icons**: Font Awesome 6.4.0
- **Geolocation**: HTML5 Geolocation API
- **Reverse Geocoding**: Nominatim (OpenStreetMap)

## Setup Instructions

### Prerequisites
- A modern web browser with JavaScript enabled
- Internet connection (for map tiles and geolocation services)

### Installation
1. Download all project files to a directory on your web server
2. Ensure all files are in the same directory:
   - `index.html`
   - `style.css`
   - `script.js`
   - `data.js`
3. Open `index.html` in a web browser

### Local Development
For local development, you can use a simple HTTP server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
Then navigate to http://localhost:8000 in your browser.

Usage Guide
Basic Navigation
Zoom: Use mouse wheel or +/- buttons

Pan: Click and drag the map

Reset View: Click "Reset View" button to return to default map position

Finding Facilities
By Type: Use checkboxes in the sidebar to show/hide health, education, or safety facilities

By Search: Type in the search box to find facilities by name, address, or services

By Clicking: Click on any marker to see detailed information in a popup

Using Your Location
Click the "My Location" button to center the map on your current position

Grant location permissions when prompted by your browser

View your coordinates and address in the location details panel

Use "Copy Coordinates" or "Share Location" as needed

Understanding the Map
Health Centers: Red markers with medical icons

Education Facilities: Blue markers with school/university icons

Safety Facilities: Orange markers with safety/service icons

Your Location: Green marker with person icon

Data Sources
Map Data: OpenStreetMap contributors

Resource Data: Manually curated list of facilities in Masaka District

Geocoding: Nominatim (OpenStreetMap's geocoding service)

Browser Compatibility
Chrome 60+

Firefox 55+

Safari 11+

Edge 79+

Privacy Notice
Location data is only used when you explicitly request it via the "My Location" feature

No personal data is stored or transmitted to external servers

Map usage may be subject to OpenStreetMap's tile usage policy

Customization
Adding New Facilities
Edit data.js and add new objects to the resources array following this format:

javascript
{
    id: 17, // Unique ID
    name: "Facility Name",
    type: "health", // "health", "education", or "safety"
    contact: "+256 XXX XXX XXX",
    coordinates: [latitude, longitude],
    address: "Physical address",
    services: "Description of services offered",
    icon: "font-awesome-icon-name" // Without the "fa-" prefix
}
Styling Changes
Modify style.css to change colors, layouts, or responsive breakpoints. Key CSS variables control the color scheme:

Health facilities: #e74c3c (red)

Education facilities: #3498db (blue)

Safety facilities: #f39c12 (orange)

Troubleshooting
Common Issues
Map not loading: Check internet connection and ensure all files are in the correct location

Location not working: Ensure browser has location permissions enabled

Search not working: Verify JavaScript is enabled in browser settings

Mobile display issues: Refresh page or check for responsive design conflicts

Performance Tips
The application works best with a stable internet connection

Limit the number of simultaneously visible markers for better performance

Use filtering to focus on specific facility types

License
This project is for educational and community use. Please attribute OpenStreetMap contributors when using map data.

Support
For technical issues or feature requests, please contact the development team.

Developed for the Masaka Community | By MUKIIBI DEOGRACIUS
