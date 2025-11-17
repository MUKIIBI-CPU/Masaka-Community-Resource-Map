// Initialize the map centered on Masaka with maximum zoom capabilities
const map = L.map('map', {
    center: MASAKA_CENTER,
    zoom: 13,
    maxZoom: 19,
    minZoom: 10
}).setView(MASAKA_CENTER, 13);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
}).addTo(map);

// Add custom scale control
const scale = L.control.scale({
    imperial: false,
    metric: true,
    position: 'bottomleft'
}).addTo(map);

// Move scale to our custom container
setTimeout(() => {
    const scaleElement = document.querySelector('.leaflet-control-scale');
    if (scaleElement) {
        document.getElementById('map-scale').appendChild(scaleElement);
    }
}, 100);

// Create custom icons for different resource types
function createCustomIcon(type, iconName) {
    let className;
    
    switch(type) {
        case 'health':
            className = 'health-marker';
            break;
        case 'education':
            className = 'education-marker';
            break;
        case 'safety':
            className = 'safety-marker';
            break;
    }
    
    return L.divIcon({
        html: `<div class="custom-marker ${className}">
                <i class="fas fa-${iconName} marker-icon"></i>
                </div>`,
        className: 'custom-div-icon',
        iconSize: [28, 28],
        iconAnchor: [14, 14]
    });
}

// Create layer groups for each resource type
const healthLayer = L.layerGroup();
const educationLayer = L.layerGroup();
const safetyLayer = L.layerGroup();

// Store all markers for search functionality
const allMarkers = [];

// Add resources to the map and appropriate layer groups
resources.forEach(resource => {
    let layerGroup;
    
    switch(resource.type) {
        case 'health':
            layerGroup = healthLayer;
            break;
        case 'education':
            layerGroup = educationLayer;
            break;
        case 'safety':
            layerGroup = safetyLayer;
            break;
    }
    
    const icon = createCustomIcon(resource.type, resource.icon);
    
    const marker = L.marker(resource.coordinates, { icon: icon })
        .bindPopup(`
            <div class="popup-content">
                ${resource.imageUrl ? `<div class="popup-image">
                    <img src="${resource.imageUrl}" alt="${resource.name}" onerror="this.style.display='none'">
                </div>` : ''}
                <div class="popup-title">${resource.name}</div>
                <div class="popup-detail"><strong>Type:</strong> <span class="popup-type type-${resource.type}">${resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}</span></div>
                <div class="popup-detail"><strong>Address:</strong> ${resource.address}</div>
                <div class="popup-detail"><strong>Contact:</strong> ${resource.contact}</div>
                ${resource.services ? `<div class="popup-detail"><strong>Services:</strong> ${resource.services}</div>` : ''}
            </div>
        `);
    
    marker.resourceData = resource;
    layerGroup.addLayer(marker);
    allMarkers.push(marker);
    
    // Add click event to set as destination when marker is clicked
    marker.on('click', function() {
        document.getElementById('destination-input').value = resource.name;
        document.getElementById('destination-coords').value = `${resource.coordinates[0]}, ${resource.coordinates[1]}`;
    });
});

// Add all layer groups to the map initially
healthLayer.addTo(map);
educationLayer.addTo(map);
safetyLayer.addTo(map);

// Filter functionality
document.getElementById('health-filter').addEventListener('change', updateMapLayers);
document.getElementById('education-filter').addEventListener('change', updateMapLayers);
document.getElementById('safety-filter').addEventListener('change', updateMapLayers);

function updateMapLayers() {
    const showHealth = document.getElementById('health-filter').checked;
    const showEducation = document.getElementById('education-filter').checked;
    const showSafety = document.getElementById('safety-filter').checked;
    
    if (showHealth) {
        map.addLayer(healthLayer);
    } else {
        map.removeLayer(healthLayer);
    }
    
    if (showEducation) {
        map.addLayer(educationLayer);
    } else {
        map.removeLayer(educationLayer);
    }
    
    if (showSafety) {
        map.addLayer(safetyLayer);
    } else {
        map.removeLayer(safetyLayer);
    }
    
    updateStatistics();
}

function updateStatistics() {
    const showHealth = document.getElementById('health-filter').checked;
    const showEducation = document.getElementById('education-filter').checked;
    const showSafety = document.getElementById('safety-filter').checked;
    
    let visibleCount = 0;
    let healthCount = 0;
    let educationCount = 0;
    let safetyCount = 0;
    
    resources.forEach(resource => {
        if ((resource.type === 'health' && showHealth) ||
            (resource.type === 'education' && showEducation) ||
            (resource.type === 'safety' && showSafety)) {
            visibleCount++;
            
            if (resource.type === 'health') healthCount++;
            if (resource.type === 'education') educationCount++;
            if (resource.type === 'safety') safetyCount++;
        }
    });
    
    document.getElementById('total-count').textContent = visibleCount;
    document.getElementById('health-count').textContent = healthCount;
    document.getElementById('education-count').textContent = educationCount;
    document.getElementById('safety-count').textContent = safetyCount;
}

// My Location functionality
let userLocationMarker = null;
let userLocation = null;

document.getElementById('my-location').addEventListener('click', function() {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
        return;
    }
    
    const btn = this;
    btn.classList.add('active');
    
    navigator.geolocation.getCurrentPosition(
        async function(position) {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            userLocation = [lat, lng];
            
            if (userLocationMarker) {
                map.removeLayer(userLocationMarker);
            }
            
            const userIcon = L.divIcon({
                html: '<div class="custom-marker user-location-marker"><i class="fas fa-user marker-icon" style="color: white;"></i></div>',
                className: 'user-location-icon',
                iconSize: [28, 28],
                iconAnchor: [14, 14]
            });
            
            userLocationMarker = L.marker([lat, lng], { icon: userIcon })
                .addTo(map)
                .bindPopup('Your Current Location')
                .openPopup();
            
            map.setView([lat, lng], 16);
            
            btn.classList.remove('active');
            
            const address = await getAddressFromCoordinates(lat, lng);
            showLocationDetails(lat, lng, address);
            
            // Set current location as start point
            document.getElementById('start-input').value = 'My Current Location';
            document.getElementById('start-coords').value = `${lat}, ${lng}`;
        },
        function(error) {
            alert('Unable to retrieve your location: ' + error.message);
            btn.classList.remove('active');
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000
        }
    );
});

// Get address from coordinates using Nominatim
async function getAddressFromCoordinates(lat, lng) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
        const data = await response.json();
        
        if (data && data.display_name) {
            return data.display_name;
        }
        return 'Address not available';
    } catch (error) {
        console.error('Error fetching address:', error);
        return 'Address not available';
    }
}

// Get coordinates from place name using Nominatim
async function getCoordinatesFromPlace(placeName) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(placeName)}&limit=1`);
        const data = await response.json();
        
        if (data && data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lng: parseFloat(data[0].lon),
                address: data[0].display_name
            };
        }
        return null;
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        return null;
    }
}

// Show location details
function showLocationDetails(lat, lng, address) {
    document.getElementById('current-lat').textContent = lat.toFixed(6);
    document.getElementById('current-lng').textContent = lng.toFixed(6);
    document.getElementById('current-address').textContent = address;
    
    const locationDetails = document.getElementById('location-details');
    locationDetails.classList.remove('hidden');
}

// Close location details
document.getElementById('close-location-details').addEventListener('click', function() {
    document.getElementById('location-details').classList.add('hidden');
});

// Copy coordinates
document.getElementById('copy-coordinates').addEventListener('click', function() {
    const lat = document.getElementById('current-lat').textContent;
    const lng = document.getElementById('current-lng').textContent;
    const coordinates = `${lat}, ${lng}`;
    
    navigator.clipboard.writeText(coordinates).then(() => {
        alert('Coordinates copied to clipboard!');
    });
});

// Share location
document.getElementById('share-location').addEventListener('click', function() {
    const lat = document.getElementById('current-lat').textContent;
    const lng = document.getElementById('current-lng').textContent;
    const text = `My current location: ${lat}, ${lng}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'My Location',
            text: text,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(text).then(() => {
            alert('Location copied to clipboard!');
        });
    }
});

// Reset view functionality
document.getElementById('reset-view').addEventListener('click', function() {
    map.setView(MASAKA_CENTER, 13);
    clearRoute();
});

// Search functionality
const searchInput = document.getElementById('search-input');
const clearSearch = document.getElementById('clear-search');

searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        clearSearch.style.display = 'none';
        updateMapLayers();
        return;
    }
    
    clearSearch.style.display = 'block';
    
    map.removeLayer(healthLayer);
    map.removeLayer(educationLayer);
    map.removeLayer(safetyLayer);
    
    const searchResultsLayer = L.layerGroup();
    
    allMarkers.forEach(marker => {
        const resource = marker.resourceData;
        if (resource.name.toLowerCase().includes(searchTerm) ||
            resource.address.toLowerCase().includes(searchTerm) ||
            resource.services.toLowerCase().includes(searchTerm) ||
            resource.type.toLowerCase().includes(searchTerm)) {
            
            searchResultsLayer.addLayer(marker);
        }
    });
    
    searchResultsLayer.addTo(map);
    
    if (searchResultsLayer.getLayers().length > 0) {
        const group = new L.featureGroup(searchResultsLayer.getLayers());
        map.fitBounds(group.getBounds().pad(0.1));
    }
});

// Clear search functionality
clearSearch.addEventListener('click', function() {
    searchInput.value = '';
    clearSearch.style.display = 'none';
    updateMapLayers();
});

// Footer button functionality
document.getElementById('print-map').addEventListener('click', function() {
    window.print();
});

document.getElementById('share-map').addEventListener('click', function() {
    if (navigator.share) {
        navigator.share({
            title: 'Masaka Community Resource Map',
            text: 'Check out this community resource map for Masaka District',
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('Map link copied to clipboard!');
        });
    }
});

document.getElementById('export-pdf').addEventListener('click', function() {
    alert('PDF export functionality would be implemented here. This would typically use a library like jsPDF or generate a server-side PDF.');
});

// Routing functionality
let routingControl = null;

document.getElementById('calculate-route').addEventListener('click', function() {
    calculateRoute();
});

document.getElementById('clear-route').addEventListener('click', function() {
    clearRoute();
});

document.getElementById('use-my-location').addEventListener('click', function() {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
        return;
    }
    
    const btn = this;
    btn.classList.add('active');
    
    navigator.geolocation.getCurrentPosition(
        function(position) {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            userLocation = [lat, lng];
            
            if (userLocationMarker) {
                map.removeLayer(userLocationMarker);
            }
            
            const userIcon = L.divIcon({
                html: '<div class="custom-marker user-location-marker"><i class="fas fa-user marker-icon" style="color: white;"></i></div>',
                className: 'user-location-icon',
                iconSize: [28, 28],
                iconAnchor: [14, 14]
            });
            
            userLocationMarker = L.marker([lat, lng], { icon: userIcon })
                .addTo(map)
                .bindPopup('Your Current Location')
                .openPopup();
            
            // Set current location as start point
            document.getElementById('start-input').value = 'My Current Location';
            document.getElementById('start-coords').value = `${lat}, ${lng}`;
            
            btn.classList.remove('active');
        },
        function(error) {
            alert('Unable to retrieve your location: ' + error.message);
            btn.classList.remove('active');
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000
        }
    );
});

// Handle start point input for place names
let startInputTimeout;
document.getElementById('start-input').addEventListener('input', function() {
    clearTimeout(startInputTimeout);
    const input = this.value.trim();
    
    // Don't geocode if it's "My Current Location" or empty
    if (input === 'My Current Location' || input === '') {
        return;
    }
    
    // Wait for user to stop typing
    startInputTimeout = setTimeout(async () => {
        const coords = await getCoordinatesFromPlace(input);
        if (coords) {
            document.getElementById('start-coords').value = `${coords.lat}, ${coords.lng}`;
        } else {
            document.getElementById('start-coords').value = '';
            alert('Could not find location. Please try a different place name or use coordinates.');
        }
    }, 1000);
});

async function calculateRoute() {
    let startCoords = document.getElementById('start-coords').value;
    const destinationCoords = document.getElementById('destination-coords').value;
    const startInput = document.getElementById('start-input').value.trim();
    
    // If start coordinates are empty but we have a place name, try to geocode it
    if (!startCoords && startInput && startInput !== 'My Current Location') {
        const coords = await getCoordinatesFromPlace(startInput);
        if (coords) {
            startCoords = `${coords.lat}, ${coords.lng}`;
            document.getElementById('start-coords').value = startCoords;
        } else {
            alert('Could not find start location. Please try a different place name or use coordinates.');
            return;
        }
    }
    
    if (!startCoords || !destinationCoords) {
        alert('Please set both start and destination points');
        return;
    }
    
    // Parse coordinates
    const start = startCoords.split(',').map(coord => parseFloat(coord.trim()));
    const destination = destinationCoords.split(',').map(coord => parseFloat(coord.trim()));
    
    if (start.length !== 2 || destination.length !== 2 || 
        isNaN(start[0]) || isNaN(start[1]) || 
        isNaN(destination[0]) || isNaN(destination[1])) {
        alert('Invalid coordinates format. Please use format: lat, lng');
        return;
    }
    
    // Remove any existing routing controls
    if (routingControl) {
        map.removeControl(routingControl);
    }
    
    // Add routing control
    routingControl = L.Routing.control({
        waypoints: [
            L.latLng(start[0], start[1]),
            L.latLng(destination[0], destination[1])
        ],
        routeWhileDragging: false,
        showAlternatives: false,
        lineOptions: {
            styles: [{color: '#3498db', opacity: 0.7, weight: 5}]
        },
        createMarker: function(i, waypoint, n) {
            if (i === 0) {
                // Start marker
                return L.marker(waypoint.latLng, {
                    icon: L.divIcon({
                        html: '<div class="custom-marker user-location-marker"><i class="fas fa-play marker-icon" style="color: white;"></i></div>',
                        className: 'route-start-icon',
                        iconSize: [28, 28],
                        iconAnchor: [14, 14]
                    })
                });
            } else if (i === n - 1) {
                // Destination marker
                return L.marker(waypoint.latLng, {
                    icon: L.divIcon({
                        html: '<div class="custom-marker" style="background: #e74c3c; border-color: #e74c3c;"><i class="fas fa-flag marker-icon" style="color: white;"></i></div>',
                        className: 'route-destination-icon',
                        iconSize: [28, 28],
                        iconAnchor: [14, 14]
                    })
                });
            }
            return null;
        }
    }).addTo(map);
    
    // Calculate initial distance and travel times
    const distance = calculateDistance(start, destination);
    calculateTravelTimes(distance);
    
    // Fit bounds to show both locations and route
    const bounds = L.latLngBounds([start, destination]);
    map.fitBounds(bounds, { padding: [50, 50] });
    
    // Listen for route found event to get actual distance
    routingControl.on('routesfound', function(e) {
        const routes = e.routes;
        if (routes && routes.length > 0) {
            const actualDistance = routes[0].summary.totalDistance / 1000; // Convert to km
            document.getElementById('route-distance').textContent = `${actualDistance.toFixed(1)} km`;
            calculateTravelTimes(actualDistance);
        }
    });
}

function clearRoute() {
    if (routingControl) {
        map.removeControl(routingControl);
        routingControl = null;
    }
    
    // Clear route info
    document.getElementById('route-distance').textContent = '-';
    document.getElementById('route-foot-time').textContent = '-';
    document.getElementById('route-motorcycle-time').textContent = '-';
    document.getElementById('route-car-time').textContent = '-';
}

// Calculate estimated travel times
function calculateTravelTimes(distance) {
    // Estimated speeds (km/h)
    const walkingSpeed = 5;
    const motorcycleSpeed = 30;
    const carSpeed = 50;
    
    // Calculate times in minutes
    const walkingTime = Math.round((distance / walkingSpeed) * 60);
    const motorcycleTime = Math.round((distance / motorcycleSpeed) * 60);
    const carTime = Math.round((distance / carSpeed) * 60);
    
    // Update the route info
    document.getElementById('route-foot-time').textContent = `${walkingTime} min`;
    document.getElementById('route-motorcycle-time').textContent = `${motorcycleTime} min`;
    document.getElementById('route-car-time').textContent = `${carTime} min`;
}

// Calculate distance between two coordinates using Haversine formula
function calculateDistance(coord1, coord2) {
    const R = 6371; // Earth's radius in km
    const dLat = (coord2[0] - coord1[0]) * Math.PI / 180;
    const dLon = (coord2[1] - coord1[1]) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(coord1[0] * Math.PI / 180) * Math.cos(coord2[0] * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance;
}

// Make facilities clickable
function makeFacilitiesClickable() {
    const facilityItems = document.querySelectorAll('.facility-item');
    
    facilityItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const facilityId = parseInt(this.getAttribute('data-id'));
            const resource = resources.find(r => r.id === facilityId);
            
            if (resource) {
                // Find the marker for this facility
                const marker = allMarkers.find(m => m.resourceData.id === resource.id);
                
                if (marker) {
                    // Open the popup and center the map on the facility
                    map.setView(resource.coordinates, 16);
                    marker.openPopup();
                    
                    // Set as destination
                    document.getElementById('destination-input').value = resource.name;
                    document.getElementById('destination-coords').value = `${resource.coordinates[0]}, ${resource.coordinates[1]}`;
                }
            }
        });
    });
}

// Initialize statistics and make facilities clickable
updateStatistics();
makeFacilitiesClickable();