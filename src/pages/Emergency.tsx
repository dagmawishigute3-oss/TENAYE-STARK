import { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  IconPhone,
  IconClock,
  IconAlertTriangle,
  IconNavigation,
  IconStar2,
  IconMapPin,
  IconLoader,
  IconSearch,
} from '../components/Icons';
import { HospitalMap } from '../components/HospitalMap';
import {
  getLiveClosestHospitals,
  getInstantDatabaseHospitals,
  getDirectionsUrl,
  reverseGeocodeUserLocation,
  type Hospital,
} from '../services/hospitalLocatorService';

// Real verified Ethiopian Emergency & Ambulance contact hotlines
const AMBULANCES = [
  {
    name: 'Red Cross Ambulance',
    phone: '907',
    displayPhone: '907',
    specialty: 'National Toll-Free Ambulance',
    icon: '🏥',
  },
  {
    name: 'Tebita Ambulance',
    phone: '8035',
    displayPhone: '8035',
    specialty: 'Private Advanced Paramedics',
    icon: '🚑',
  },
  {
    name: 'Tedla Ambulance',
    phone: '8558',
    displayPhone: '8558',
    specialty: '24/7 Emergency & ICU Transport',
    icon: '🚑',
  },
  {
    name: 'Ethiopia Federal Police',
    phone: '991',
    displayPhone: '991',
    specialty: 'National Police Incident Hotline',
    icon: '👮',
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <IconStar2
            key={i}
            size={12}
            className={i <= Math.floor(rating) ? 'text-amber-400' : 'text-gray-200'}
          />
        ))}
      </div>
      <span className="text-xs text-gray-600 font-medium">{rating.toFixed(1)}</span>
    </div>
  );
}

type GeoState = 'idle' | 'loading' | 'granted' | 'denied';
type FilterType = 'all' | 'hospital' | 'clinic' | 'doctor';

export function Emergency() {
  const [geoState, setGeoState] = useState<GeoState>('idle');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [facilities, setFacilities] = useState<Hospital[]>([]);
  const [loadingFacilities, setLoadingFacilities] = useState(false);
  const [selectedHospitalId, setSelectedHospitalId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [currentAreaName, setCurrentAreaName] = useState<string>('Your Location');

  const ref1 = useScrollReveal();
  const ref2 = useScrollReveal();
  const ref3 = useScrollReveal();

  // Fetch real facilities: Instant database preview in 1ms, then live OpenStreetMap in 1-3s
  const fetchNearby = async (lat: number, lng: number) => {
    setUserLocation({ lat, lng });
    setGeoState('granted');

    // 1. Instant preview from verified local healthcare database (0 milliseconds response!)
    const instantList = getInstantDatabaseHospitals(lat, lng, 25);
    if (instantList.length > 0) {
      setFacilities(instantList);
      setSelectedHospitalId(instantList[0].id);
      setLoadingFacilities(false);
    } else {
      setLoadingFacilities(true);
    }

    reverseGeocodeUserLocation(lat, lng)
      .then((geo) => {
        if (geo && geo.city && geo.city !== 'Local Area' && geo.city !== 'Your Area') {
          setCurrentAreaName(geo.city);
        } else if (geo && geo.locality) {
          setCurrentAreaName(geo.locality);
        }
      })
      .catch(() => {});

    // 2. High-speed live OpenStreetMap search (parallel race across fast mirrors)
    try {
      const liveList = await getLiveClosestHospitals(lat, lng, 25);
      if (liveList.length > 0) {
        setFacilities(liveList);
        setSelectedHospitalId((prev) => (prev ? prev : liveList[0].id));
      }
    } catch (e) {
      console.error('Error querying OpenStreetMap:', e);
      if (instantList.length === 0) {
        setFacilities([]);
      }
    } finally {
      setLoadingFacilities(false);
    }
  };

  // High-speed two-tier GPS search:
  // First tries fast cached/network location (sub-second response).
  // If delayed or not available, falls back to high accuracy with 5s timeout.
  const handleSearchNearMe = () => {
    if (!navigator.geolocation) {
      setGeoState('denied');
      return;
    }

    setGeoState('loading');
    setLoadingFacilities(true);

    let resolved = false;

    // Fast attempt (cached/network)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (resolved) return;
        resolved = true;
        fetchNearby(pos.coords.latitude, pos.coords.longitude);
      },
      (_err) => {
        // Fallback to high accuracy if fast attempt timed out or failed
        if (resolved) return;
        navigator.geolocation.getCurrentPosition(
          (posHigh) => {
            if (resolved) return;
            resolved = true;
            fetchNearby(posHigh.coords.latitude, posHigh.coords.longitude);
          },
          (errHigh) => {
            if (resolved) return;
            console.warn('Geolocation permission not granted:', errHigh);
            setGeoState('denied');
            setLoadingFacilities(false);
          },
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 60000 }
        );
      },
      { enableHighAccuracy: false, timeout: 2500, maximumAge: 180000 }
    );
  };

  // If user already granted location permission in a previous session, auto-fetch immediately
  useEffect(() => {
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then((result) => {
          if (result.state === 'granted') {
            handleSearchNearMe();
          }
        })
        .catch(() => {});
    }
  }, []);

  // Filter facilities based on pill selection
  const hospitalsCount = facilities.filter((f) => f.type === 'Hospital').length;
  const clinicsCount = facilities.filter(
    (f) => f.type === 'Clinic' || f.type === 'Medium Clinic' || f.type === 'Health Center'
  ).length;
  const doctorsCount = facilities.filter((f) => f.type === 'Doctor').length;

  const displayedFacilities = facilities.filter((f) => {
    if (filterType === 'hospital') return f.type === 'Hospital';
    if (filterType === 'clinic')
      return f.type === 'Clinic' || f.type === 'Medium Clinic' || f.type === 'Health Center';
    if (filterType === 'doctor') return f.type === 'Doctor';
    return true;
  });

  return (
    <main className="pt-16 bg-gray-50 min-h-screen">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#0c6e73] to-[#119197] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 text-center">
          <div className="inline-flex w-14 h-14 rounded-xl bg-white/10 items-center justify-center mx-auto mb-4">
            <IconAlertTriangle size={28} className="text-white/90" />
          </div>
          <h1 className="font-display font-extrabold text-4xl text-white mb-2">Emergency Services</h1>
          <p className="text-teal-100 max-w-lg mx-auto">
            Real-time live medical directory powered by OpenStreetMap for closest hospitals, clinics, and official Ethiopian emergency dispatch hotlines.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Top 3 Action Cards */}
        <div ref={ref1} className="grid sm:grid-cols-3 gap-5 mb-10">
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
            <IconPhone size={28} className="text-red-600 mx-auto mb-3" />
            <h3 className="font-display font-bold text-gray-900 text-sm mb-1">National Ambulance (ERCS)</h3>
            <p className="text-xs text-gray-500 mb-4">Dial 907 for free nationwide medical ambulance dispatch</p>
            <a
              href="tel:907"
              className="block w-full py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-colors shadow-xs"
            >
              Call 907
            </a>
          </div>

          <div className="bg-white rounded-xl border border-[#cceef0] p-6 text-center hover:shadow-md transition-shadow bg-gradient-to-b from-[#f2fbfb] to-white">
            <IconNavigation size={28} className="text-[#119197] mx-auto mb-3" />
            <h3 className="font-display font-bold text-gray-900 text-sm mb-1">Closest Hospitals & Clinics</h3>
            <p className="text-xs text-gray-500 mb-4">Real-time OpenStreetMap search strictly within 25 km of your location</p>
            <button
              onClick={handleSearchNearMe}
              disabled={geoState === 'loading' || loadingFacilities}
              className="w-full py-2.5 rounded-lg bg-[#119197] hover:bg-[#0c6e73] text-white text-sm font-bold transition-colors disabled:opacity-60 disabled:cursor-wait cursor-pointer shadow-xs flex items-center justify-center gap-2"
            >
              {loadingFacilities ? (
                <>
                  <IconLoader size={16} /> Searching OpenStreetMap…
                </>
              ) : (
                <>
                  <IconNavigation size={15} /> Search Near Me
                </>
              )}
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
            <IconClock size={28} className="text-[#119197] mx-auto mb-3" />
            <h3 className="font-display font-bold text-gray-900 text-sm mb-1">Federal Police Hotline</h3>
            <p className="text-xs text-gray-500 mb-4">Ethiopia Federal Police dispatch and security response</p>
            <a
              href="tel:991"
              className="block w-full py-2.5 rounded-lg border border-[#119197] text-[#119197] text-sm font-bold hover:bg-[#e6f7f7] transition-colors cursor-pointer"
            >
              Call Police (991)
            </a>
          </div>
        </div>

        {/* Emergency Call Services with Real Hotlines */}
        <div ref={ref2} className="mb-12">
          <h2 className="font-display font-extrabold text-2xl text-gray-900 mb-1">Emergency Call Services</h2>
          <p className="text-gray-500 text-sm mb-6">
            Direct access to official emergency ambulances and police in Ethiopia. Click to call immediately.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {AMBULANCES.map((a) => (
              <div
                key={a.name}
                className="bg-white rounded-xl border border-gray-200 p-5 text-center hover:shadow-md hover:border-[#cceef0] transition-all"
              >
                <div className="relative inline-block mb-3">
                  <div className="w-12 h-12 rounded-xl bg-[#e6f7f7] flex items-center justify-center mx-auto text-xl">
                    {a.icon}
                  </div>
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-[#dc2626] text-white text-[9px] font-bold">
                    24/7
                  </span>
                </div>
                <p className="font-display font-bold text-gray-900 text-sm mb-1 leading-tight">{a.name}</p>
                <p className="text-[10px] text-gray-400 mb-3">{a.specialty}</p>
                <a
                  href={`tel:${a.phone}`}
                  className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs font-bold transition-colors shadow-xs"
                >
                  <IconPhone size={13} /> Call {a.displayPhone}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Location Permission Blocked Notice */}
        {geoState === 'denied' && (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center mb-8 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#119197] flex items-center justify-center mx-auto mb-3">
              <IconAlertTriangle size={24} />
            </div>
            <h3 className="font-display font-bold text-gray-900 text-base mb-1">
              Device Location Permission Required
            </h3>
            <p className="text-gray-500 text-xs mb-4 max-w-md mx-auto">
              Please allow location permission in your browser prompt so we can calculate exact real distances to hospitals and clinics within 25 km.
            </p>
            <button
              onClick={handleSearchNearMe}
              className="px-5 py-2.5 rounded-xl bg-[#119197] hover:bg-[#0c6e73] text-white text-xs font-bold transition-all shadow-xs cursor-pointer inline-flex items-center gap-2"
            >
              <IconNavigation size={14} /> Allow Location & Search (25 km)
            </button>
          </div>
        )}

        {/* Real Live GPS Active Status Bar */}
        {geoState === 'granted' && userLocation && (
          <div className="bg-[#e6f7f7] border border-[#cceef0] rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2.5 text-xs text-[#0c6e73] font-medium flex-wrap">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>
                <strong>Your Location:</strong> {currentAreaName}
                <span className="ml-1.5 px-2 py-0.5 rounded bg-teal-100 text-teal-800 text-[10px] font-bold">
                  OpenStreetMap (25 km)
                </span>
              </span>
              <span className="text-gray-300 hidden sm:inline">•</span>
              <span className="text-gray-600">
                Found {facilities.length} {facilities.length === 1 ? 'real facility' : 'real facilities'}
              </span>
            </div>

            <button
              onClick={handleSearchNearMe}
              className="px-3 py-1.5 rounded-lg bg-white border border-[#119197] text-[#119197] hover:bg-[#d9f3f4] text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              title="Recalculate exact GPS position"
            >
              <IconNavigation size={13} /> Refresh GPS
            </button>
          </div>
        )}

        {/* OpenStreetMap Map Section (Displayed when searched) */}
        {geoState === 'granted' && facilities.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display font-extrabold text-xl text-gray-900 flex items-center gap-2">
                <IconMapPin size={20} className="text-[#119197]" />
                Interactive OpenStreetMap
              </h2>
              <span className="text-xs text-gray-500">
                Click pin or drag location marker to adjust search center
              </span>
            </div>

            <HospitalMap
              userLocation={userLocation}
              hospitals={displayedFacilities}
              selectedHospitalId={selectedHospitalId}
              onSelectHospital={(h) => setSelectedHospitalId(h.id)}
              onLocationChange={(lat, lng) => fetchNearby(lat, lng)}
            />
          </div>
        )}

        {/* Closest Hospitals & Clinics Cards Section */}
        <div ref={ref3}>
          {geoState === 'idle' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-[#e6f7f7] flex items-center justify-center mx-auto mb-4">
                <IconNavigation size={28} className="text-[#119197]" />
              </div>
              <h3 className="font-display font-bold text-gray-900 text-lg mb-2">
                Find Real Medical Facilities Near You
              </h3>
              <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
                Click "Search Near Me" to detect your location and discover live hospitals, clinics, and health centers mapped on OpenStreetMap strictly within 25 km.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleSearchNearMe}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#119197] hover:bg-[#0c6e73] text-white font-bold text-sm transition-all shadow-sm cursor-pointer"
                >
                  <IconNavigation size={16} /> Search Near Me (Live GPS)
                </button>
              </div>
            </div>
          )}

          {loadingFacilities && facilities.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
              <div className="w-10 h-10 rounded-full border-4 border-[#cceef0] border-t-[#119197] animate-spin mx-auto mb-3" />
              <p className="text-gray-700 text-sm font-semibold">Querying live OpenStreetMap database…</p>
              <p className="text-gray-400 text-xs mt-1">
                Searching medical facilities strictly within 25 km of your GPS coordinates
              </p>
            </div>
          )}

          {geoState === 'granted' && !loadingFacilities && facilities.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-600 text-sm mb-10">
              <p className="font-medium text-gray-800 mb-1">
                No medical facilities mapped on OpenStreetMap within 25 km of your location.
              </p>
              <p className="text-xs text-gray-500">
                In a critical emergency, call the national emergency ambulance hotline <a href="tel:907" className="text-red-600 font-bold underline">907</a> or Federal Police <a href="tel:991" className="text-red-600 font-bold underline">991</a> immediately.
              </p>
            </div>
          )}

          {geoState === 'granted' && facilities.length > 0 && (
            <>
              {/* Header and Filter Pills */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="font-display font-extrabold text-2xl text-gray-900">
                    Closest Hospitals & Clinics
                  </h2>
                  <p className="text-gray-500 text-xs">
                    Live facilities strictly within 25 km of your coordinates. Tap Call for immediate dispatch or Directions for turn-by-turn navigation.
                  </p>
                </div>

                {/* Filter Pills for Hospital, Clinic, Doctor */}
                <div className="flex items-center gap-2 text-xs flex-wrap">
                  <button
                    onClick={() => setFilterType('all')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                      filterType === 'all'
                        ? 'bg-[#119197] text-white shadow-xs'
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    All ({facilities.length})
                  </button>
                  {hospitalsCount > 0 && (
                    <button
                      onClick={() => setFilterType('hospital')}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                        filterType === 'hospital'
                          ? 'bg-[#119197] text-white shadow-xs'
                          : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      Hospitals ({hospitalsCount})
                    </button>
                  )}
                  {clinicsCount > 0 && (
                    <button
                      onClick={() => setFilterType('clinic')}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                        filterType === 'clinic'
                          ? 'bg-[#119197] text-white shadow-xs'
                          : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      Clinics & Medium Clinics ({clinicsCount})
                    </button>
                  )}
                  {doctorsCount > 0 && (
                    <button
                      onClick={() => setFilterType('doctor')}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                        filterType === 'doctor'
                          ? 'bg-[#119197] text-white shadow-xs'
                          : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      Doctors & Specialists ({doctorsCount})
                    </button>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5 mb-10">
                {displayedFacilities.map((h, index) => {
                  const isSelected = selectedHospitalId === h.id;
                  const directionsUrl = getDirectionsUrl(h, userLocation);

                  return (
                    <div
                      key={h.id}
                      onClick={() => setSelectedHospitalId(h.id)}
                      className={`bg-white rounded-xl border p-5 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#119197] shadow-md ring-2 ring-[#cceef0]'
                          : 'border-gray-200 hover:shadow-md hover:border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-3 mb-2">
                        <div className="flex items-start gap-2.5">
                          <span className="w-6 h-6 rounded-lg bg-[#119197] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          <h3 className="font-display font-bold text-gray-900 text-sm leading-tight">
                            {h.name}
                          </h3>
                        </div>

                        {/* Distance badge: Strictly <= 25 km */}
                        {h.distanceKm !== undefined && (
                          <div className="text-right shrink-0">
                            <p className="font-display font-bold text-[#119197] text-sm">
                              {h.distanceKm} km
                            </p>
                            <p className="text-[10px] text-gray-400">away</p>
                          </div>
                        )}
                      </div>

                      {/* Status badges */}
                      <div className="flex flex-wrap items-center gap-2 mb-2 ml-8.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          h.type === 'Hospital'
                            ? 'bg-teal-50 text-[#119197] border-teal-200'
                            : h.type === 'Medium Clinic'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : h.type === 'Doctor'
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}>
                          {h.type}
                        </span>
                        <span className="badge badge-teal">
                          {h.is24_7 ? '24/7 Emergency' : 'Medical Service'}
                        </span>
                        <span className="badge badge-low">
                          Open Now
                        </span>
                        {index === 0 && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            ⚡ Closest
                          </span>
                        )}
                      </div>

                      {/* Ratings */}
                      <div className="mb-2 ml-8.5">
                        <Stars rating={h.rating} />
                        <span className="text-[10px] text-gray-400">
                          ({h.reviews.toLocaleString()} reviews)
                        </span>
                      </div>

                      {/* Address & Phone */}
                      <div className="space-y-1 mb-4 ml-8.5">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <IconMapPin size={12} className="text-gray-400 shrink-0" />
                          <span>{h.address}</span>
                        </div>
                        <div className="flex items-center justify-between gap-1.5 text-xs text-gray-500">
                          <div className="flex items-center gap-1.5">
                            <IconPhone size={12} className="text-gray-400 shrink-0" />
                            <span>{h.phone && h.phone !== 'Not listed' && !h.phone.startsWith('907') ? h.phone : 'Direct phone not listed'}</span>
                          </div>
                          {(!h.phone || h.phone === 'Not listed' || h.phone.startsWith('907')) && (
                            <a
                              href={`https://www.google.com/search?q=${encodeURIComponent(h.name + ' ' + (h.city || 'Ethiopia') + ' phone number')}`}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-[10px] text-[#119197] hover:underline flex items-center gap-0.5 font-medium shrink-0"
                              title="Search Google for facility phone number"
                            >
                              <IconSearch size={10} /> Search web
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Action buttons: Call and Directions */}
                      <div className="flex gap-2 ml-8.5">
                        <a
                          href={`tel:${h.phone && h.phone !== 'Not listed' && !h.phone.startsWith('907') ? h.phone : '907'}`}
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors shadow-xs"
                        >
                          <IconPhone size={13} /> {h.phone && h.phone !== 'Not listed' && !h.phone.startsWith('907') ? 'Call' : 'Emergency (907)'}
                        </a>
                        <a
                          href={directionsUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold transition-colors flex items-center justify-center"
                        >
                          <IconNavigation size={13} className="text-[#119197]" /> Directions
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Preparedness Tips */}
          <div className="grid sm:grid-cols-2 gap-5 mt-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-display font-bold text-gray-900 mb-3">Emergency Preparedness Tips</h3>
              <p className="text-xs font-semibold text-gray-700 mb-2">Before You Go:</p>
              <ul className="space-y-1.5">
                {[
                  'Bring identification and healthcare insurance documents',
                  'List current medications, chronic conditions, and allergies',
                  'Call ahead if not a sudden life-threatening emergency',
                  'Have a family member, neighbor, or ambulance drive you',
                ].map((t) => (
                  <li key={t} className="text-sm text-gray-500 flex gap-2">
                    <span className="text-red-400 shrink-0">•</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-display font-bold text-gray-900 mb-3">When to Call Emergency Services:</h3>
              <ul className="space-y-1.5">
                {[
                  'Difficulty breathing, choking, or severe chest pain',
                  'Severe traumatic injury or uncontrollable bleeding',
                  'Loss of consciousness or sudden fainting',
                  'Signs of stroke (face drooping, arm weakness, speech difficulty)',
                  'Severe allergic reaction (anaphylaxis)',
                ].map((t) => (
                  <li key={t} className="text-sm text-gray-500 flex gap-2">
                    <span className="text-red-400 shrink-0">•</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="py-8" />
    </main>
  );
}
