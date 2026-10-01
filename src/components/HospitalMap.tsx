import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getDirectionsUrl, type Hospital } from '../services/hospitalLocatorService';

interface HospitalMapProps {
  userLocation: { lat: number; lng: number } | null;
  hospitals: Hospital[];
  selectedHospitalId?: string | null;
  onSelectHospital?: (hospital: Hospital) => void;
  onLocationChange?: (lat: number, lng: number) => void;
}

export function HospitalMap({
  userLocation,
  hospitals,
  selectedHospitalId,
  onSelectHospital,
  onLocationChange,
}: HospitalMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const markersMapRef = useRef<Map<string, L.Marker>>(new Map());
  const initialBoundsFittedRef = useRef<string>('');

  // 1. Initialize Leaflet Map once
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const initialLat = userLocation?.lat ?? 9.0142;
    const initialLng = userLocation?.lng ?? 38.7496;

    const map = L.map(mapContainerRef.current, {
      center: [initialLat, initialLng],
      zoom: 13,
      zoomControl: false,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      touchZoom: true,
      boxZoom: true,
    });

    // High performance OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Zoom control at top-right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Metric scale at bottom-left
    L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map);

    // Allow user to click anywhere on map to set/adjust their exact location
    map.on('click', (e: L.LeafletMouseEvent) => {
      if (onLocationChange) {
        onLocationChange(e.latlng.lat, e.latlng.lng);
      }
    });

    const layerGroup = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;
    layerGroupRef.current = layerGroup;

    // Invalidate size once DOM has painted to eliminate tile glitches
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      clearTimeout(timer);
      map.remove();
      mapInstanceRef.current = null;
      layerGroupRef.current = null;
    };
  }, [onLocationChange]);

  // 2. Render Markers & Fit Bounds only when hospitals or userLocation changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layerGroup = layerGroupRef.current;
    if (!map || !layerGroup) return;

    layerGroup.clearLayers();
    markersMapRef.current.clear();

    const bounds = L.latLngBounds([]);

    // 2.1 Add User Location Marker (Draggable so desktop users can adjust if Wi-Fi placed them in wrong neighborhood)
    if (userLocation) {
      const userLatLng = L.latLng(userLocation.lat, userLocation.lng);
      bounds.extend(userLatLng);

      const userIcon = L.divIcon({
        className: 'custom-user-marker',
        html: `
          <div class="relative flex items-center justify-center w-8 h-8 pointer-events-auto cursor-grab active:cursor-grabbing">
            <span class="absolute inline-flex h-full w-full rounded-full bg-[#119197] opacity-40 animate-ping"></span>
            <span class="relative inline-flex rounded-full h-5 w-5 bg-[#119197] border-2 border-white shadow-md items-center justify-center">
              <span class="w-2 h-2 rounded-full bg-white"></span>
            </span>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const userMarker = L.marker(userLatLng, { icon: userIcon, zIndexOffset: 1000, draggable: true })
        .addTo(layerGroup)
        .bindPopup(
          `
          <div class="p-1 font-sans text-center max-w-[190px]">
            <p class="font-bold text-gray-900 text-xs flex items-center justify-center gap-1">
              📍 <span>Your Location</span>
            </p>
            <p class="text-[10px] text-gray-500 mt-0.5">Searching within 25 km</p>
            <p class="text-[9px] text-[#119197] font-semibold mt-1">💡 Drag pin or click map to adjust exact spot</p>
          </div>
        `,
          { closeButton: false, offset: [0, -10] }
        );

      userMarker.on('dragend', (e) => {
        const newPos = (e.target as L.Marker).getLatLng();
        if (onLocationChange) {
          onLocationChange(newPos.lat, newPos.lng);
        }
      });

      markersMapRef.current.set('user', userMarker);
    }

    // 2.2 Add Hospital & Clinic Markers
    hospitals.forEach((h, index) => {
      const hospitalLatLng = L.latLng(h.lat, h.lng);
      bounds.extend(hospitalLatLng);

      const isHospital = h.type === 'Hospital';
      const markerColor = isHospital ? 'bg-[#119197]' : 'bg-[#0c6e73]';

      const hospitalIcon = L.divIcon({
        className: 'custom-hospital-marker',
        html: `
          <div class="group relative flex items-center justify-center cursor-pointer transition-transform hover:scale-115">
            <div class="${markerColor} text-white w-7 h-7 rounded-xl shadow-lg border-2 border-white flex items-center justify-center font-bold text-xs">
              ${index + 1}
            </div>
            <div class="absolute -bottom-1 w-2 h-2 bg-gray-900 rotate-45 opacity-60"></div>
          </div>
        `,
        iconSize: [28, 32],
        iconAnchor: [14, 30],
        popupAnchor: [0, -28],
      });

      const directionsUrl = getDirectionsUrl(h, userLocation);
      const hasDirectPhone = Boolean(h.phone && h.phone !== 'Not listed' && !h.phone.startsWith('907'));

      const popupContent = `
        <div class="p-2 font-sans max-w-[260px]">
          <div class="flex items-center gap-1.5 mb-1.5 flex-wrap">
            <span class="inline-block px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 text-[10px] font-bold">${h.type}</span>
            ${h.distanceKm !== undefined ? `<span class="text-[11px] font-bold text-[#119197]">${h.distanceKm} km away</span>` : ''}
          </div>
          <h4 class="font-bold text-gray-900 text-xs leading-tight mb-1">${h.name}</h4>
          <p class="text-[11px] text-gray-500 mb-1 leading-tight">${h.address}</p>
          <p class="text-[11px] font-bold text-gray-800 mb-2 flex items-center gap-1">📞 ${hasDirectPhone ? h.phone : 'Direct phone not listed'}</p>
          <div class="flex gap-2 pt-1 border-t border-gray-100">
            <a href="tel:${hasDirectPhone ? h.phone : '907'}" class="flex-1 py-1.5 rounded-lg bg-red-600 text-white text-center text-[11px] font-bold no-underline hover:bg-red-700 shadow-xs">
              ${hasDirectPhone ? 'Call' : 'Emergency (907)'}
            </a>
            <a href="${directionsUrl}" target="_blank" rel="noreferrer" class="flex-1 py-1.5 rounded-lg bg-[#119197] text-white text-center text-[11px] font-bold no-underline hover:bg-[#0c6e73] shadow-xs">
              🧭 Directions
            </a>
          </div>
        </div>
      `;

      const marker = L.marker(hospitalLatLng, { icon: hospitalIcon })
        .addTo(layerGroup)
        .bindPopup(popupContent, { offset: [0, -26] });

      marker.on('click', () => {
        if (onSelectHospital) {
          onSelectHospital(h);
        }
      });

      markersMapRef.current.set(h.id, marker);
    });

    // 2.3 Fit bounds ONLY once per new set of hospitals
    const currentSignature = hospitals.map((h) => h.id).join(',');
    if (bounds.isValid() && initialBoundsFittedRef.current !== currentSignature) {
      initialBoundsFittedRef.current = currentSignature;
      map.fitBounds(bounds, { padding: [45, 45], maxZoom: 15 });
    }
  }, [userLocation, hospitals]);

  // 3. Highlight marker & pan smoothly when selectedHospitalId changes from list or map
  useEffect(() => {
    if (!selectedHospitalId || !mapInstanceRef.current) return;
    const marker = markersMapRef.current.get(selectedHospitalId);
    if (marker) {
      const latLng = marker.getLatLng();
      mapInstanceRef.current.panTo(latLng, { animate: true, duration: 0.5 });
      if (!marker.isPopupOpen()) {
        marker.openPopup();
      }
    }
  }, [selectedHospitalId]);

  // Recenter map on user location
  const handleRecenter = () => {
    if (!mapInstanceRef.current || !userLocation) return;
    mapInstanceRef.current.flyTo([userLocation.lat, userLocation.lng], 14, {
      animate: true,
      duration: 1,
    });
  };

  // Fit all markers in view
  const handleFitAll = () => {
    if (!mapInstanceRef.current) return;
    const bounds = L.latLngBounds([]);
    if (userLocation) bounds.extend([userLocation.lat, userLocation.lng]);
    hospitals.forEach((h) => bounds.extend([h.lat, h.lng]));
    if (bounds.isValid()) {
      mapInstanceRef.current.fitBounds(bounds, { padding: [45, 45], maxZoom: 15 });
    }
  };

  return (
    <div className="relative w-full h-[360px] sm:h-[440px] rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-gray-100 z-0">
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Floating Badges */}
      <div className="absolute top-3 left-3 z-[400] flex flex-wrap items-center gap-2 pointer-events-none">
        <span className="px-3 py-1 rounded-lg bg-white/95 backdrop-blur-xs border border-gray-200/80 shadow-xs text-xs font-semibold text-gray-800 flex items-center gap-1.5 pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Live OpenStreetMap
        </span>
        <span className="px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-xs border border-gray-200/80 shadow-xs text-[11px] font-medium text-gray-600 pointer-events-auto">
          Max Radius: 25 km
        </span>
      </div>

      {/* Quick Navigation Controls */}
      <div className="absolute bottom-3 right-3 z-[400] flex items-center gap-2">
        <button
          onClick={handleFitAll}
          className="px-3 py-1.5 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 shadow-md text-xs font-bold text-gray-700 flex items-center gap-1 transition-all cursor-pointer"
          title="Fit all hospitals in view"
        >
          <span>🔍</span> Fit All
        </button>
        {userLocation && (
          <button
            onClick={handleRecenter}
            className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 shadow-md text-xs font-bold text-[#119197] flex items-center gap-1.5 transition-all cursor-pointer"
            title="Recenter to my location"
          >
            <span>🎯</span> My GPS
          </button>
        )}
      </div>
    </div>
  );
}
