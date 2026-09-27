import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  IconSearch,
  IconX,
  IconLoader,
  IconExternalLink,
  IconFileText,
  IconUsers,
  IconAlertCircle,
  IconDownload,
  IconStethoscope,
  IconAlertTriangle,
  IconChevronRight,
  IconBook
} from './Icons';
import {
  searchScholarXiv,
  ScholarPaper,
  getClinicalInsight,
  ClinicalInsight,
  isMedicalQuery
} from '../services/scholarXivService';
import { ALL_DISEASES } from '../data/diseasesIndex';

export interface ScholarXivSearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  onSubmit?: (val: string) => void;
  className?: string;
  inputClassName?: string;
  variant?: 'standard' | 'hero';
}

export function ScholarXivSearchBar({
  value,
  onChange,
  placeholder = 'Search medical research & academic papers (e.g. COVID-19, common cold, malaria)…',
  onSubmit,
  className = '',
  inputClassName = '',
  variant = 'hero'
}: ScholarXivSearchBarProps) {
  const [debouncedQuery, setDebouncedQuery] = useState(value);
  const [papers, setPapers] = useState<ScholarPaper[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [expandedPaperId, setExpandedPaperId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // 300ms debounce on input query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(value.trim());
    }, 300);

    return () => clearTimeout(handler);
  }, [value]);

  // Fetch academic papers when debounced query changes
  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) {
      setPapers([]);
      setLoading(false);
      setError(null);
      setHasSearched(false);
      return;
    }

    // Guard: If the query is outside medical/health domain, do not query ScholarXIV
    if (!isMedicalQuery(debouncedQuery)) {
      setPapers([]);
      setLoading(false);
      setError(null);
      setIsOpen(true);
      setHasSearched(true);
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);
    setIsOpen(true);
    setHasSearched(true);

    searchScholarXiv(debouncedQuery, controller.signal)
      .then((results) => {
        setPapers(results);
        setLoading(false);
      })
      .catch((err) => {
        if (err?.name === 'AbortError') return;
        setError(err?.message || 'Failed to fetch medical papers from ScholarXIV.');
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [debouncedQuery]);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleClear = () => {
    onChange('');
    setDebouncedQuery('');
    setPapers([]);
    setIsOpen(false);
    setHasSearched(false);
    inputRef.current?.focus();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) {
      setDebouncedQuery(trimmed);
      setIsOpen(true);
      if (onSubmit) {
        onSubmit(trimmed);
      }
    }
  };

  const retryFetch = () => {
    if (!debouncedQuery) return;
    setLoading(true);
    setError(null);
    searchScholarXiv(debouncedQuery)
      .then((results) => {
        setPapers(results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err?.message || 'Failed to fetch academic papers.');
        setLoading(false);
      });
  };

  // Check if current search query is medical
  const isMedical = isMedicalQuery(debouncedQuery);

  // Clinical Summary match (COVID-19, Common Cold, Malaria, etc.)
  const clinicalInsight: ClinicalInsight | null =
    debouncedQuery && isMedical ? getClinicalInsight(debouncedQuery) : null;

  // Disease Library match in Tenaye
  const matchedDisease =
    debouncedQuery && isMedical
      ? ALL_DISEASES.find(
          (d) =>
            d.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
            debouncedQuery.toLowerCase().includes(d.name.toLowerCase())
        )
      : null;

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Search Input Bar */}
      <form
        onSubmit={handleFormSubmit}
        className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-md border border-white/20 transition-all duration-200 focus-within:ring-2 focus-within:ring-[#119197]/30"
      >
        <IconSearch size={18} className="text-gray-400 shrink-0" />

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => {
            if (hasSearched && (papers.length > 0 || clinicalInsight || matchedDisease || loading || error || !isMedical)) {
              setIsOpen(true);
            }
          }}
          placeholder={placeholder}
          className={`flex-1 text-gray-800 text-sm placeholder-gray-400 outline-none bg-transparent ${inputClassName}`}
        />

        {/* Loading Spinner */}
        {loading && <IconLoader size={16} className="text-[#119197] shrink-0" />}

        {/* Clear Button */}
        {value.length > 0 && !loading && (
          <button
            type="button"
            onClick={handleClear}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            title="Clear search"
          >
            <IconX size={15} />
          </button>
        )}

        {/* Search Submit Button */}
        <button
          type="submit"
          className="text-xs font-bold text-[#119197] hover:text-[#0c6e73] px-2.5 py-1 rounded-lg hover:bg-teal-50 transition-colors"
        >
          Search
        </button>
      </form>

      {/* Dynamic Results Dropdown Container */}
      {isOpen && (hasSearched || loading || error || clinicalInsight || matchedDisease || (!isMedical && debouncedQuery.length >= 2)) && (
        <div className="absolute left-0 right-0 top-full mt-2.5 z-50 bg-white rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] border border-gray-200 overflow-hidden text-left ring-1 ring-black/5">
          {/* Top Gradient Accent Bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#0c6e73] via-[#119197] to-cyan-500" />

          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-teal-50/90 via-white to-gray-50/50 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0c6e73] to-[#119197] text-white flex items-center justify-center shadow-xs">
                <IconBook size={16} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-extrabold text-gray-900 tracking-tight">
                    ScholarXiv Research Hub
                  </h4>
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live API
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Verified medical literature & peer-reviewed research papers
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {papers.length > 0 && !loading && (
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-teal-100/80 text-[#0c6e73]">
                  {papers.length} {papers.length === 1 ? 'Paper' : 'Papers'}
                </span>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                title="Close"
              >
                <IconX size={15} />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="max-h-[480px] overflow-y-auto p-4 space-y-3.5 bg-white">
            {/* 0. Non-Medical Query Scope Guard (e.g. user typed "html", "css", etc.) */}
            {!isMedical && debouncedQuery.length >= 2 && (
              <div className="p-6 text-center bg-gray-50/70 rounded-xl border border-gray-200">
                <div className="w-10 h-10 rounded-full bg-teal-50 text-[#119197] flex items-center justify-center mx-auto mb-2.5">
                  <IconStethoscope size={20} />
                </div>
                <h4 className="text-xs font-bold text-gray-900">Health & Medical Inquiries Only</h4>
                <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto leading-relaxed">
                  Tenaye is a specialized health companion. Queries like <strong className="text-gray-700">"{debouncedQuery}"</strong> are outside our medical scope. Please search a clinical condition, disease, or symptom.
                </p>
                <div className="mt-3.5 flex flex-wrap justify-center gap-1.5">
                  {['COVID-19', 'Common Cold', 'Malaria', 'Diabetes', 'Hypertension', 'Asthma'].map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => {
                        onChange(topic);
                        setDebouncedQuery(topic);
                      }}
                      className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white hover:bg-[#119197] hover:text-white text-gray-700 border border-gray-200 shadow-xs transition-colors"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 1. Verified Clinical Insight Card */}
            {isMedical && clinicalInsight && (
              <div className="rounded-xl p-4 bg-gradient-to-br from-teal-50/80 via-white to-emerald-50/50 border border-teal-200/80 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-md bg-[#119197] text-white">
                      <IconStethoscope size={13} />
                    </span>
                    <span className="text-xs font-extrabold text-[#0c6e73] uppercase tracking-wider">
                      Clinical Overview: {clinicalInsight.topic}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-teal-800 bg-white border border-teal-200 px-2.5 py-0.5 rounded-full">
                    Medical Guidance
                  </span>
                </div>

                <p className="text-xs text-gray-700 leading-relaxed font-normal mb-3">
                  {clinicalInsight.overview}
                </p>

                {/* Symptoms Grid */}
                <div className="mb-3">
                  <span className="text-[11px] font-bold text-gray-800 block mb-1.5">
                    Recognized Clinical Symptoms:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                    {clinicalInsight.symptoms.map((symp) => (
                      <div
                        key={symp}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-teal-100 text-[11px] font-medium text-teal-950 shadow-xs"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#119197] shrink-0" />
                        <span className="truncate">{symp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Home Care & Management */}
                <div className="border-l-4 border-[#119197] bg-white p-3 rounded-r-lg text-xs text-gray-700 shadow-xs mb-2">
                  <strong className="text-gray-900 block mb-0.5">Home Care & Clinical Recommendations:</strong>
                  {clinicalInsight.treatment}
                </div>

                {/* Emergency Signs */}
                {clinicalInsight.emergencySigns && (
                  <div className="flex items-start gap-2 text-[11px] text-amber-900 bg-amber-50/90 p-2.5 rounded-lg border border-amber-200">
                    <IconAlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="font-bold">Emergency Warning: </strong>
                      {clinicalInsight.emergencySigns}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* 2. Matched Library Disease Link */}
            {isMedical && matchedDisease && (
              <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 flex items-center justify-between">
                <div className="text-xs text-gray-700">
                  <span className="text-gray-500 font-medium">Disease Library Match: </span>
                  <strong className="text-gray-900 font-bold">{matchedDisease.name}</strong>
                  <span className="text-gray-500 ml-1.5">({matchedDisease.category})</span>
                </div>
                <Link
                  to={`/diseases/${matchedDisease.id}`}
                  className="shrink-0 inline-flex items-center gap-1 text-xs font-bold text-[#119197] hover:text-[#0c6e73] transition-colors"
                >
                  <span>Explore Guide</span>
                  <IconChevronRight size={13} />
                </Link>
              </div>
            )}

            {/* 3. Loading State */}
            {loading && isMedical && (
              <div className="p-8 text-center bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-teal-50 text-[#119197] mb-3">
                  <IconLoader size={22} />
                </div>
                <p className="text-xs font-bold text-gray-800">
                  Fetching papers from ScholarXIV API…
                </p>
                <p className="text-[11px] text-gray-400 mt-1">
                  Querying live research literature for "{debouncedQuery}"
                </p>
              </div>
            )}

            {/* 4. Error State */}
            {!loading && error && isMedical && (
              <div className="p-6 text-center bg-amber-50/60 rounded-xl border border-amber-200">
                <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-amber-100 text-amber-700 mb-2">
                  <IconAlertCircle size={20} />
                </div>
                <p className="text-xs font-bold text-gray-800">{error}</p>
                <p className="text-[11px] text-gray-500 mt-1 mb-3">
                  Unable to connect to ScholarXIV API.
                </p>
                <button
                  type="button"
                  onClick={retryFetch}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-[#119197] text-white hover:bg-[#0c6e73] transition-colors"
                >
                  Retry Search
                </button>
              </div>
            )}

            {/* 5. Empty State for Medical Queries */}
            {!loading && !error && isMedical && papers.length === 0 && !clinicalInsight && (
              <div className="p-8 text-center bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                <p className="text-xs font-bold text-gray-700">
                  No medical papers found for "{debouncedQuery}"
                </p>
                <p className="text-[11px] text-gray-500 mt-1 max-w-sm mx-auto">
                  Try searching clinical topics such as "COVID-19", "Common cold", "Malaria", or "Diabetes".
                </p>
              </div>
            )}

            {/* 6. Curated ScholarXIV Papers */}
            {!loading && isMedical && papers.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                    <IconFileText size={13} className="text-[#119197]" />
                    ScholarXIV Peer-Reviewed Literature
                  </span>
                </div>

                {papers.map((paper) => (
                  <div
                    key={paper.id}
                    className="p-4 rounded-xl border border-gray-100 hover:border-teal-200 hover:bg-gradient-to-r hover:from-white hover:to-teal-50/20 transition-all duration-200 bg-white shadow-xs group"
                  >
                    {/* Header tags */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-semibold text-gray-500 mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-teal-50 text-[#0c6e73] font-bold border border-teal-100">
                          ScholarXiv Verified
                        </span>
                        {paper.year && (
                          <span className="text-gray-400">• {paper.year}</span>
                        )}
                        {paper.extractedID && (
                          <span className="text-gray-400 font-mono">
                            • ID: {paper.extractedID}
                          </span>
                        )}
                      </div>

                      {paper.categories && paper.categories.length > 0 && (
                        <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 font-medium">
                          {paper.categories.join(', ')}
                        </span>
                      )}
                    </div>

                    {/* Paper Title (Links directly to publication page) */}
                    <a
                      href={paper.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-sm text-gray-900 group-hover:text-[#0c6e73] flex items-start justify-between gap-3 leading-snug transition-colors mb-1.5"
                    >
                      <span>{paper.title}</span>
                      <IconExternalLink size={14} className="text-gray-400 group-hover:text-[#119197] shrink-0 mt-0.5 transition-colors" />
                    </a>

                    {/* Authors */}
                    <div className="text-[11px] text-gray-500 flex items-center gap-1.5 mb-2 font-medium">
                      <IconUsers size={12} className="text-gray-400 shrink-0" />
                      <span className="truncate">{paper.authors.join(', ')}</span>
                    </div>

                    {/* Abstract preview or expanded text */}
                    <p className={`text-xs text-gray-600 leading-relaxed mb-3 ${expandedPaperId === paper.id ? 'bg-gray-50/80 p-2.5 rounded-lg border border-gray-100' : 'line-clamp-2'}`}>
                      {paper.abstract}
                    </p>

                    {/* Action Buttons: Opens full research paper and PDF directly */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                      <div className="flex items-center gap-2">
                        {/* Primary: Read Complete Paper */}
                        <a
                          href={paper.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#119197] hover:bg-[#0c6e73] text-white font-bold text-xs transition-all shadow-xs"
                          title="Open full publication abstract, citations, and complete research"
                        >
                          <span>Read Full Paper</span>
                          <IconExternalLink size={12} />
                        </a>

                        {/* Direct PDF Download */}
                        {paper.pdfLink && (
                          <a
                            href={paper.pdfLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs transition-colors border border-rose-100"
                            title="Open original preprint PDF"
                          >
                            <IconDownload size={11} />
                            <span>PDF</span>
                          </a>
                        )}

                        {/* Inline Full Abstract Toggle */}
                        <button
                          type="button"
                          onClick={() => setExpandedPaperId(expandedPaperId === paper.id ? null : paper.id)}
                          className="text-xs font-semibold text-teal-800 hover:text-teal-950 px-2 py-1 rounded bg-teal-50 hover:bg-teal-100 transition-colors"
                        >
                          {expandedPaperId === paper.id ? 'Hide Details' : 'Full Abstract'}
                        </button>
                      </div>

                      {paper.extractedID && (
                        <span className="text-[10px] text-gray-400 font-mono">
                          arXiv:{paper.extractedID}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex flex-wrap items-center justify-between text-[11px] text-gray-500 gap-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#119197]" />
              ScholarXiv Papers API • Stark Hackathon Integration
            </span>
            <a
              href="https://www.scholarxiv.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#119197] hover:text-[#0c6e73] font-bold inline-flex items-center gap-1 transition-colors"
            >
              <span>ScholarXiv Platform</span>
              <IconExternalLink size={12} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
