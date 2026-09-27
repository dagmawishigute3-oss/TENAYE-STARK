import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { IconSearch, IconBook, IconFilter, IconPhone, IconAlertTriangle, IconChevronRight } from '../components/Icons';
import { ALL_DISEASES, CATEGORIES, SEVERITY_LABEL } from '../data/diseasesIndex';

export function Diseases() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || searchParams.get('q') || '';
  const initialCat = searchParams.get('category') || 'All Categories';
  const [query, setQuery] = useState(initialSearch);
  const [category, setCategory] = useState(initialCat);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 24;
  const ref = useScrollReveal();

  useEffect(() => {
    const s = searchParams.get('search') || searchParams.get('q');
    if (s !== null) setQuery(s);
    const c = searchParams.get('category');
    if (c !== null) setCategory(c);
  }, [searchParams]);

  // Reset page when category or search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [category, query]);

  const filtered = ALL_DISEASES.filter(d => {
    const q = query.toLowerCase();
    const mq = !query || d.name.toLowerCase().includes(q) || d.symptoms.some(s => s.toLowerCase().includes(q));
    const mc = category === 'All Categories' || d.category === category;
    return mq && mc;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (safeCurrentPage - 1) * PAGE_SIZE;
  const paginatedDiseases = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 220, behavior: 'smooth' });
  };

  return (
    <main className="pt-16 min-h-screen bg-gray-50">
      {/* Red hero banner */}
      <div className="bg-gradient-to-br from-[#0c6e73] to-[#119197] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 text-center">
          <div className="inline-flex w-12 h-12 rounded-xl bg-white/20 items-center justify-center mx-auto mb-4">
            <IconBook size={24} className="text-white" />
          </div>
          <h1 className="font-display font-extrabold text-4xl text-white mb-2">Disease Library</h1>
          <p className="text-teal-100 text-sm mb-1">Comprehensive information about {ALL_DISEASES.length} diseases — expert verified</p>
          <div className="flex items-center justify-center gap-4 mb-0">
            <span className="flex items-center gap-1.5 text-xs text-teal-200">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />{ALL_DISEASES.length} Diseases
            </span>
            <span className="flex items-center gap-1.5 text-xs text-teal-200">
              <span className="w-1.5 h-1.5 rounded-full bg-green-300" />Expert Verified
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Local Disease Library Search bar */}
        <div className="mb-8">
          <label htmlFor="disease-library-search" className="block text-xs font-semibold text-gray-700 mb-1.5">
            Search Available Disease Library ({filtered.length} of {ALL_DISEASES.length} conditions)
          </label>
          <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm focus-within:border-[#119197] focus-within:ring-2 focus-within:ring-[#119197]/20">
            <IconSearch size={18} className="text-gray-400 shrink-0" />
            <input
              id="disease-library-search"
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search diseases, symptoms, or conditions in library…"
              className="flex-1 text-gray-800 text-sm placeholder-gray-400 outline-none bg-transparent"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-xs text-gray-400 hover:text-gray-600 px-1.5 py-0.5 rounded transition-colors"
                title="Clear filter"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div ref={ref} className="flex gap-6">
          {/* Sidebar */}
          <aside className="hidden lg:flex flex-col gap-4 w-52 shrink-0">
            {/* Emergency widget */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="w-8 h-8 rounded-lg bg-[#dc2626] flex items-center justify-center text-white mb-3">
                <IconAlertTriangle size={16} />
              </div>
              <p className="font-display font-bold text-[#dc2626] text-xs mb-1">Medical Emergency?</p>
              <p className="text-red-500 text-[10px] mb-3">For immediate medical assistance</p>
              <a href="tel:907" className="block w-full py-2 rounded-lg bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs font-bold text-center transition-colors">Emergency Help</a>
              <div className="mt-3 space-y-1.5 text-[10px] text-[#dc2626]">
                <p className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Available 24/7</p>
                <p className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Fast Response</p>
              </div>
            </div>

            {/* Library stats */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="font-display font-semibold text-gray-900 text-xs mb-3">Library Stats</p>
              {[
                ['Total Diseases', String(ALL_DISEASES.length)],
                ['Common Conditions', '50+'],
                ['Categories', String(CATEGORIES.length - 1)]
              ].map(([l, v]) => (
                <div key={l} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                  <span className="text-xs text-gray-500">{l}</span>
                  <span className="font-display font-bold text-[#119197] text-xs">{v}</span>
                </div>
              ))}
            </div>

            {/* Category filter */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-1.5 mb-3">
                <IconFilter size={13} className="text-gray-400" />
                <p className="font-display font-semibold text-gray-900 text-xs">Category</p>
              </div>
              <div className="flex flex-col gap-0.5">
                {CATEGORIES.map(c => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`text-left text-xs px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      category === c
                        ? 'bg-[#e6f7f7] text-[#119197] font-semibold'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main grid */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">
                <span className="font-display font-bold text-gray-900">{filtered.length}</span> Diseases Found
              </p>
              {filtered.length > 0 && (
                <p className="text-xs text-gray-400">
                  Showing {startIndex + 1}–{Math.min(startIndex + PAGE_SIZE, filtered.length)} of {filtered.length}
                </p>
              )}
            </div>

            {/* Mobile category */}
            <select value={category} onChange={e => setCategory(e.target.value)} className="lg:hidden w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 mb-4 outline-none focus:border-[#119197]">
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>

            {filtered.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
                <p className="text-gray-500 text-sm">No diseases match your search criteria.</p>
                <button
                  onClick={() => { setQuery(''); setCategory('All Categories'); }}
                  className="mt-3 text-xs font-semibold text-[#119197] hover:underline cursor-pointer"
                >
                  Clear search & filters
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {paginatedDiseases.map(d => (
                  <div key={d.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-gray-300 transition-all duration-200 group flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-display font-bold text-gray-900 text-sm leading-tight">{d.name}</h3>
                        <span className={`badge shrink-0 ${d.severity === 'High' ? 'badge-high' : d.severity === 'Medium' ? 'badge-medium' : 'badge-low'}`}>
                          {SEVERITY_LABEL[d.severity] || d.severity}
                        </span>
                      </div>
                      <span className="badge badge-gray mb-3">{d.category}</span>
                      <p className="text-xs text-gray-500 leading-relaxed mb-3">{d.desc.slice(0, 120)}…</p>
                      <div className="mb-4">
                        <p className="text-[10px] text-gray-400 font-medium mb-1.5">Common Symptoms:</p>
                        <div className="flex flex-wrap gap-1">
                          {d.symptoms.slice(0, 4).map(s => (
                            <span key={s} className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[10px] border border-gray-200">{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Link to={`/diseases/${d.id}`} className="flex items-center gap-1 text-xs font-semibold text-[#119197] hover:text-[#0c6e73] group-hover:gap-2 transition-all mt-2 pt-2 border-t border-gray-50">
                      View Details <IconChevronRight size={13} />
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Controls (10 per page) */}
            {totalPages > 1 && (
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <span className="text-xs text-gray-500">
                  Page <strong className="text-gray-800">{safeCurrentPage}</strong> of <strong className="text-gray-800">{totalPages}</strong>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(safeCurrentPage - 1)}
                    disabled={safeCurrentPage === 1}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors flex items-center gap-1 ${
                      safeCurrentPage === 1
                        ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 cursor-pointer'
                    }`}
                  >
                    ← Previous
                  </button>

                  {/* Page number buttons */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(page => page === 1 || page === totalPages || Math.abs(page - safeCurrentPage) <= 1)
                      .reduce<(number | string)[]>((acc, page, idx, arr) => {
                        if (idx > 0 && (page as number) - (arr[idx - 1] as number) > 1) {
                          acc.push('...');
                        }
                        acc.push(page);
                        return acc;
                      }, [])
                      .map((p, idx) => (
                        typeof p === 'number' ? (
                          <button
                            key={p}
                            onClick={() => handlePageChange(p)}
                            className={`min-w-8 h-8 px-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                              safeCurrentPage === p
                                ? 'bg-[#119197] text-white'
                                : 'border border-gray-200 text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            {p}
                          </button>
                        ) : (
                          <span key={`ellipsis-${idx}`} className="px-1 text-xs text-gray-400">…</span>
                        )
                      ))}
                  </div>

                  <button
                    onClick={() => handlePageChange(safeCurrentPage + 1)}
                    disabled={safeCurrentPage === totalPages}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors flex items-center gap-1 ${
                      safeCurrentPage === totalPages
                        ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 cursor-pointer'
                    }`}
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-10 rounded-2xl bg-gradient-to-r from-[#0c6e73] to-[#119197] text-white p-8 text-center">
              <h3 className="font-display font-extrabold text-xl mb-2">Need More Help?</h3>
              <p className="text-teal-100 text-sm mb-5">Can't find what you're looking for? Get instant support from our health resources.</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('open-ai-assistant'))}
                  className="px-5 py-2.5 rounded-xl bg-white text-[#119197] font-bold text-sm hover:bg-[#e6f7f7] transition-colors cursor-pointer"
                >
                  Ask AI
                </button>
                <a href="tel:907" className="px-5 py-2.5 rounded-xl border-2 border-white text-white font-bold text-sm hover:bg-white/10 transition-colors flex items-center gap-2">
                  <IconPhone size={15} /> Emergency Help
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-8" />
    </main>
  );
}
