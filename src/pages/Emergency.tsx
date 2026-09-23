import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { IconPhone, IconMapPin, IconClock, IconAlertTriangle, IconNavigation, IconStar2, IconSearch } from '../components/Icons';

const AMBULANCES = [
  { name: 'Red Cross Ambulance',       phone: '907', specialty: 'General Emergency',   icon: '🏥' },
  { name: 'Tebita Ambulance',          phone: '907', specialty: 'Ambulance Service',    icon: '🚑' },
  { name: 'Tedla Ambulance',           phone: '907', specialty: 'Medical Transport',    icon: '🚑' },
  { name: 'Ethiopia Federal Police',   phone: '991', specialty: 'Police Emergency',     icon: '👮' },
];

const HOSPITALS = [
  { name: 'Tikur Anbessa Specialized Hospital', address: 'Lideta Sub-city, Addis Ababa', phone: '+251 11 551 8185', distance: '2.5 km', rating: 4.2, reviews: 850 },
  { name: "St. Paul's Hospital Millennium Medical College", address: 'Gulele Sub-city, Addis Ababa', phone: '+251 11 275 4080', distance: '3.8 km', rating: 4.5, reviews: 1200 },
  { name: 'Zewditu Memorial Hospital', address: 'Kirkos Sub-city, Addis Ababa', phone: '+251 11 551 2291', distance: '1.9 km', rating: 4.0, reviews: 620 },
  { name: 'Minilik II Referral Hospital', address: 'Arada Sub-city, Addis Ababa', phone: '+251 11 155 0600', distance: '2.2 km', rating: 3.9, reviews: 480 },
  { name: 'Yekatit 12 Hospital Medical College', address: 'Arada Sub-city, Addis Ababa', phone: '+251 11 156 4072', distance: '3.1 km', rating: 4.1, reviews: 740 },
  { name: 'Myungsung Christian Medical Center (Korean Hospital)', address: 'Kolle Keranio Sub-city, Addis Ababa', phone: '+251 11 629 3162', distance: '4.5 km', rating: 4.6, reviews: 920 },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1,2,3,4,5].map(i => (
          <IconStar2 key={i} size={12} className={i <= Math.floor(rating) ? 'text-amber-400' : 'text-gray-200'} />
        ))}
      </div>
      <span className="text-xs text-gray-600 font-medium">{rating}</span>
    </div>
  );
}

type GeoState = 'idle' | 'loading' | 'granted' | 'denied';

export function Emergency() {
  const [geoState, setGeoState] = useState<GeoState>('idle');
  const [query, setQuery] = useState('');
  const [showAllHospitals, setShowAllHospitals] = useState(false);
  const ref1 = useScrollReveal();
  const ref2 = useScrollReveal();
  const ref3 = useScrollReveal();

  const handleSearchNearMe = () => {
    if (!navigator.geolocation) {
      setGeoState('denied');
      return;
    }
    setGeoState('loading');
    navigator.geolocation.getCurrentPosition(
      () => {
        setGeoState('granted');
        setShowAllHospitals(true);
      },
      () => setGeoState('denied'),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 },
    );
  };

  const filteredAmbulances = AMBULANCES.filter(a =>
    !query ||
    a.name.toLowerCase().includes(query.toLowerCase()) ||
    a.phone.includes(query) ||
    a.specialty.toLowerCase().includes(query.toLowerCase())
  );

  const filteredHospitals = HOSPITALS.filter(h =>
    !query ||
    h.name.toLowerCase().includes(query.toLowerCase()) ||
    h.address.toLowerCase().includes(query.toLowerCase()) ||
    h.phone.includes(query)
  );

  return (
    <main className="pt-16 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0c6e73] to-[#119197] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 text-center">
          <div className="inline-flex w-14 h-14 rounded-xl bg-white/10 items-center justify-center mx-auto mb-4">
            <IconAlertTriangle size={28} className="text-white/80" />
          </div>
          <h1 className="font-display font-extrabold text-4xl text-white mb-2">Emergency Services</h1>
          <p className="text-teal-100 max-w-lg mx-auto">Ethiopian emergency contacts and nearby hospitals. Save lives with quick access to emergency services.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* 3 top cards */}
        <div ref={ref1} className="grid sm:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
            <IconPhone size={28} className="text-red-600 mx-auto mb-3" />
            <h3 className="font-display font-bold text-gray-900 text-sm mb-1">Emergency Hotline</h3>
            <p className="text-xs text-gray-500 mb-4">Call 907 for immediate ambulance response</p>
            <a href="tel:907" className="block w-full py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-colors">Call 907</a>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
            <IconMapPin size={28} className="text-[#119197] mx-auto mb-3" />
            <h3 className="font-display font-bold text-gray-900 text-sm mb-1">Find Hospitals</h3>
            <p className="text-xs text-gray-500 mb-4">Locate nearby hospitals and medical centers</p>
            <button
              onClick={handleSearchNearMe}
              disabled={geoState === 'loading'}
              className="w-full py-2.5 rounded-lg border border-[#119197] text-[#119197] text-sm font-bold hover:bg-[#e6f7f7] transition-colors disabled:opacity-60 disabled:cursor-wait cursor-pointer"
            >
              {geoState === 'loading' ? 'Locating…' : 'Search Near Me'}
            </button>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
            <IconClock size={28} className="text-[#119197] mx-auto mb-3" />
            <h3 className="font-display font-bold text-gray-900 text-sm mb-1">24/7 Support</h3>
            <p className="text-xs text-gray-500 mb-4">Get help any time, day or night</p>
            <button className="w-full py-2.5 rounded-lg border border-[#119197] text-[#119197] text-sm font-bold hover:bg-[#e6f7f7] transition-colors cursor-pointer">Contact Support</button>
          </div>
        </div>

        {/* Instant Search Bar */}
        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 mb-10 shadow-xs">
          <IconSearch size={18} className="text-gray-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search emergency hospitals, ambulance dispatch, or sub-cities (e.g., Tikur Anbessa, Lideta, 907)…"
            className="flex-1 text-gray-800 text-sm placeholder-gray-400 outline-none bg-transparent"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-xs text-gray-400 hover:text-gray-600 font-semibold px-2 py-0.5 rounded cursor-pointer">
              Clear
            </button>
          )}
        </div>

        {/* Emergency Call Services */}
        <div ref={ref2} className="mb-12">
          <h2 className="font-display font-extrabold text-2xl text-gray-900 mb-1">Emergency Call Services</h2>
          <p className="text-gray-500 text-sm mb-6">Direct access to emergency response teams. Click to call immediately.</p>
          {filteredAmbulances.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-500 text-sm">
              No emergency services matching "{query}". Call national hotline <a href="tel:907" className="text-red-600 font-bold underline">907</a>.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {filteredAmbulances.map(a => (
                <div key={a.name} className="bg-white rounded-xl border border-gray-200 p-5 text-center hover:shadow-md hover:border-[#cceef0] transition-all">
                  <div className="relative inline-block mb-3">
                    <div className="w-12 h-12 rounded-xl bg-[#e6f7f7] flex items-center justify-center mx-auto">
                      <IconPhone size={22} className="text-[#119197]" />
                    </div>
                    <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-[#dc2626] text-white text-[9px] font-bold">24/7</span>
                  </div>
                  <p className="font-display font-bold text-gray-900 text-sm mb-1 leading-tight">{a.name}</p>
                  <p className="text-[10px] text-gray-400 mb-3">{a.specialty}</p>
                  <a href={`tel:${a.phone}`} className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs font-bold transition-colors">
                    <IconPhone size={13} /> Call {a.phone}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Nearby Hospitals */}
        <div ref={ref3}>
          {geoState === 'idle' && !query && !showAllHospitals && (
            <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
              <div className="w-14 h-14 rounded-full bg-[#e6f7f7] flex items-center justify-center mx-auto mb-4">
                <IconMapPin size={26} className="text-[#119197]" />
              </div>
              <h2 className="font-display font-bold text-gray-900 text-lg mb-2">Find Hospitals Near You</h2>
              <p className="text-gray-400 text-sm mb-6 max-w-xs mx-auto">Click "Search Near Me" to find nearby hospitals, or browse the complete referral hospital directory below.</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleSearchNearMe}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#119197] hover:bg-[#0c6e73] text-white font-bold text-sm transition-colors cursor-pointer"
                >
                  <IconNavigation size={15} /> Search Near Me
                </button>
                <button
                  onClick={() => setShowAllHospitals(true)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold text-sm transition-colors cursor-pointer"
                >
                  Browse All Hospitals ({HOSPITALS.length})
                </button>
              </div>
            </div>
          )}

          {geoState === 'loading' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
              <div className="w-10 h-10 rounded-full border-4 border-[#cceef0] border-t-[#119197] animate-spin mx-auto mb-4" />
              <p className="text-gray-500 text-sm">Requesting location access…</p>
            </div>
          )}

          {geoState === 'denied' && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
              <IconAlertTriangle size={28} className="text-red-500 mx-auto mb-3" />
              <h2 className="font-display font-bold text-red-700 mb-2">Location Access Denied</h2>
              <p className="text-red-600 text-sm mb-4">Please enable location permissions in your browser settings and try again.</p>
              <button onClick={() => setGeoState('idle')} className="px-5 py-2 rounded-lg border border-red-300 text-red-600 text-sm font-semibold hover:bg-red-100 transition-colors">
                Try Again
              </button>
            </div>
          )}

          {(geoState === 'granted' || Boolean(query) || showAllHospitals) && (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <h2 className="font-display font-extrabold text-xl text-gray-900">
                  {geoState === 'granted' ? 'Nearby Hospitals' : 'Referral Hospitals & Medical Centers'}{' '}
                  <span className="text-gray-400 font-normal text-base">({filteredHospitals.length})</span>
                </h2>
                {geoState !== 'granted' && (
                  <button
                    onClick={handleSearchNearMe}
                    disabled={geoState === 'loading'}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#119197] text-[#119197] text-xs font-semibold hover:bg-[#e6f7f7] transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <IconNavigation size={12} /> {geoState === 'loading' ? 'Locating…' : 'Calculate GPS Distances'}
                  </button>
                )}
              </div>
              {filteredHospitals.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-500 text-sm mb-10">
                  No hospitals matching "{query}". In a critical emergency, call <a href="tel:907" className="text-red-600 font-bold underline">907</a> immediately.
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-5 mb-10">
                  {filteredHospitals.map(h => (
                    <div key={h.name} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-gray-300 transition-all">
                      <div className="flex justify-between items-start gap-3 mb-2">
                        <h3 className="font-display font-bold text-gray-900 text-sm leading-tight">{h.name}</h3>
                        <div className="text-right shrink-0">
                          <p className="font-display font-bold text-[#119197] text-sm">{h.distance}</p>
                          <p className="text-[10px] text-gray-400">away</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mb-2">
                        <span className="badge badge-teal">24/7 Emergency</span>
                        <span className="badge badge-low">Open Now</span>
                      </div>
                      <div className="mb-1">
                        <Stars rating={h.rating} />
                        <span className="text-[10px] text-gray-400">({h.reviews.toLocaleString()} reviews)</span>
                      </div>
                      <div className="space-y-0.5 mb-4">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <IconMapPin size={12} className="text-gray-400 shrink-0" />{h.address}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <IconPhone size={12} className="text-gray-400 shrink-0" />{h.phone}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <a href={`tel:${h.phone}`} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors">
                          <IconPhone size={13} /> Call
                        </a>
                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent(h.name + ' ' + h.address)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold transition-colors"
                        >
                          <IconNavigation size={13} /> Directions
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Preparedness Tips — always visible */}
          <div className="grid sm:grid-cols-2 gap-5 mt-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-display font-bold text-gray-900 mb-3">Emergency Preparedness Tips</h3>
              <p className="text-xs font-semibold text-gray-700 mb-2">Before You Go:</p>
              <ul className="space-y-1.5">
                {['Bring identification and insurance cards', 'List current medications and allergies', 'Call ahead if not a life-threatening emergency', 'Have someone drive you if possible'].map(t => (
                  <li key={t} className="text-sm text-gray-500 flex gap-2"><span className="text-red-400 shrink-0">•</span>{t}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-display font-bold text-gray-900 mb-3">When to Call Emergency Services:</h3>
              <ul className="space-y-1.5">
                {['Difficulty breathing or chest pain', 'Severe bleeding or trauma', 'Loss of consciousness', 'Signs of stroke or heart attack', 'Severe allergic reaction'].map(t => (
                  <li key={t} className="text-sm text-gray-500 flex gap-2"><span className="text-red-400 shrink-0">•</span>{t}</li>
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
