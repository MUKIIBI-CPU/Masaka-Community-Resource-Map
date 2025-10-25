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

// Add North Arrow
const northArrow = L.control({position: 'topright'});
northArrow.onAdd = function(map) {
    const div = L.DomUtil.create('div', 'north-arrow');
    div.innerHTML = '<i class="fas fa-arrow-up"></i>';
    return div;
};
northArrow.addTo(map);

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
            
            map.setView([lat, lng], 18);
            
            btn.classList.remove('active');
            
            const address = await getAddressFromCoordinates(lat, lng);
            showLocationDetails(lat, lng, address);
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

// Initialize statistics
updateStatistics();