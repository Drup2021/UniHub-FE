// MapSearch.jsx
import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapSearch = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const routeControlRef = useRef(null);
  const userMarkerRef = useRef(null);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [showTo, setShowTo] = useState(false);

  // Predefined IIEST Locations
  const locations = {
    "Main Gate": [22.5574817, 88.3068391],
    "Second Gate": [22.5577984, 88.3034766],
    "Third Gate": [22.5546, 88.3006],
    "Main Building": [22.555365, 88.306116],
    "Library": [22.5554112, 88.3091287],
    "Hostel 7": [22.556879, 88.302084],
    "Hostel 8": [22.557190, 88.302546],
    "Hostel 9": [22.556931, 88.302913],
    "Hostel 10": [22.556635, 88.302968],
    "Hostel 11": [22.556513, 88.302052],
    "Hostel 13": [22.555617, 88.309802],
    "Hostel 14": [22.555453, 88.310338],
    "Hostel 15": [22.555971, 88.309937],
    "Hostel 16": [22.555828, 88.310416],
    "Richardson Hall": [22.5569425, 88.3083227],
    "Macdonald Hall": [22.556748, 88.309114],
    "Sen Hall": [22.5561199, 88.3094778],
    "Sengupta Hall": [22.5560023, 88.3103015],
    "Wolfenden Hall": [22.5571259, 88.304705],
    "Sister Nivedita Ladies Hostel": [22.5567754, 88.3040248],
    "Pandya Hall": [22.5569494, 88.3061595],
    "Lt. William Hall": [22.5551524, 88.30311026],
    "Swimming Pool": [22.5540532, 88.3029164],
    "Oval Ground": [22.5557784, 88.3044607],
    "Lords Ground": [22.5558546, 88.3082808],
    "Basketball Court": [22.556679, 88.305152],
    "Gymnasium": [22.555490, 88.303426],
    "Science and Technology Building": [22.5560, 88.3073],
    "Workshop Complex": [22.5559, 88.3071],
    "Office of the Dean": [22.5557, 88.3069],
    "Office of the Controller of Examinations": [22.5555, 88.3067],
    "Slater Hall": [22.5562, 88.3072],
    "Student Activity Centre": [22.5554, 88.3070],
    "Campus Hospital": [22.5552, 88.3068],
    "Guest House": [22.5548, 88.3065],
    "Canteen": [22.5546, 88.3063],
    "Bidisha Lake": [22.5530, 88.3085],
    "Neem Lake": [22.5528, 88.3087],
    "Main Avenue": [22.5561, 88.3074],
    "Lords Avenue": [22.5565, 88.3077],
    "Oval Road": [22.5568, 88.3079],
    "Hostel Road": [22.5542, 88.3058],
    "Academic Road": [22.5563, 88.3072]
  };

  useEffect(() => {
    const map = L.map(mapRef.current, {
      center: [22.5550, 88.3073],
      zoom: 17,
      maxZoom: 19,
      minZoom: 15,
    });
    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
    }).addTo(map);

    const campusBounds = L.latLngBounds(
      L.latLng(22.5510, 88.3030),
      L.latLng(22.5600, 88.3110)
    );
    map.setMaxBounds(campusBounds);

    let watchId;
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLatLng = L.latLng(latitude, longitude);

          if (userMarkerRef.current) {
            userMarkerRef.current.setLatLng(userLatLng);
          } else {
            userMarkerRef.current = L.marker(userLatLng, {
              icon: L.divIcon({
                className: 'user-marker',
                html: '📍',
                iconSize: [30, 30],
              }),
            })
              .addTo(map)
              .bindPopup("You are here!")
              .openPopup();
          }

          if (campusBounds.contains(userLatLng)) {
            setShowTo(false);
          } else {
            setShowTo(true);
          }
        },
        (error) => console.error('Geolocation error:', error),
        { enableHighAccuracy: true }
      );
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
      map.remove();
    };
  }, []);

  const handleSearch = () => {
    if (!to || !locations[to]) {
      alert('Please select a valid destination');
      return;
    }

    let waypoints = [];
    if (from) {
      if (!locations[from]) {
        alert('Please select a valid "From" location');
        return;
      }
      waypoints = [L.latLng(locations[from]), L.latLng(locations[to])];
    } else {
      if (!userMarkerRef.current) {
        alert('User location not available');
        return;
      }
      const userLatLng = userMarkerRef.current.getLatLng();
      waypoints = [userLatLng, L.latLng(locations[to])];
    }

    if (routeControlRef.current) {
      mapInstanceRef.current.removeControl(routeControlRef.current);
    }

    routeControlRef.current = L.Routing.control({
      waypoints,
      router: L.Routing.osrmv1({ serviceUrl: 'https://router.project-osrm.org/route/v1' }),
      lineOptions: { styles: [{ color: '#007bff', weight: 4 }] },
      show: false,
      addWaypoints: false,
      createMarker: () => null,
    }).addTo(mapInstanceRef.current);

    routeControlRef.current.on('routesfound', function (event) {
      const route = event.routes[0];
      const instructions = route.instructions || [];
      displayInstructions(instructions);
    });
  };

  const displayInstructions = (instructions) => {
    const instructionContainer = document.getElementById('instructions');
    instructionContainer.innerHTML = '';

    instructions.forEach((step, index) => {
      const stepElement = document.createElement('div');
      stepElement.className = 'instruction-step';
      stepElement.innerHTML = `<strong>Step ${index + 1}:</strong> ${step.text}`;
      instructionContainer.appendChild(stepElement);
    });
  };

  const showSuggestions = (value, type) => {
    const filtered = Object.keys(locations).filter((location) =>
      location.toLowerCase().includes(value.toLowerCase())
    );
    type === 'from'
      ? setFromSuggestions(filtered)
      : setSuggestions(filtered);
  };

  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 1000, background: '#A075e6', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', display: 'flex', gap: '10px', maxWidth: '90%' }}>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="From..."
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              showSuggestions(e.target.value, 'from');
            }}
            style={{ padding: '8px 12px', border: '1px solid #ddd', backgroundColor: '#e3d5f8', borderRadius: '4px', minWidth: '200px' }}
          />
          {fromSuggestions.length > 0 && (
            <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', border: '1px solid #ddd', borderRadius: '4px', marginTop: '4px', maxHeight: '200px', overflowY: 'auto', zIndex: 1001 }}>
              {fromSuggestions.map((location) => (
                <div
                  key={location}
                  onClick={() => {
                    setFrom(location);
                    setFromSuggestions([]);
                  }}
                  style={{ padding: '8px 12px', cursor: 'pointer', transition: 'background 0.2s' }}
                >
                  {location}
                </div>
              ))}
            </div>
          )}
        </div>

        {showTo && (
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="To..."
              value={to}
              onChange={(e) => {
                setTo(e.target.value);
                showSuggestions(e.target.value, 'to');
              }}
              style={{ padding: '8px 12px', border: '1px solid #ddd', backgroundColor: '#e3d5f8', borderRadius: '4px', minWidth: '200px' }}
            />
            {suggestions.length > 0 && (
              <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', border: '1px solid #ddd', borderRadius: '4px', marginTop: '4px', maxHeight: '200px', overflowY: 'auto', zIndex: 1001 }}>
                {suggestions.map((location) => (
                  <div
                    key={location}
                    onClick={() => {
                      setTo(location);
                      setSuggestions([]);
                    }}
                    style={{ padding: '8px 12px', cursor: 'pointer', transition: 'background 0.2s' }}
                  >
                    {location}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <button
          onClick={handleSearch}
          style={{ background: '#5b21b6', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', transition: 'background 0.3s' }}
        >
          SEARCH
        </button>
      </div>

      <div id="map" ref={mapRef} style={{ height: '100vh' }}></div>

      <div id="directions-panel" style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(255, 255, 255, 0.9)', padding: '10px', borderRadius: '5px', fontSize: '14px', zIndex: 1000 }}></div>

      <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'white', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', maxWidth: '300px', overflowY: 'auto', maxHeight: '300px', zIndex: 10000 }}>
        <h3>Navigation Instructions</h3>
        <div id="instructions"></div>
      </div>
    </div>
  );
};

export default MapSearch;