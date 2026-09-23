import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Assistant } from './components/Assistant';
import { Home } from './pages/Home';
import { Emergency } from './pages/Emergency';
import { Diseases } from './pages/Diseases';
import { DiseaseDetail } from './pages/DiseaseDetail';
import { FirstAid } from './pages/FirstAid';
import { HealthTips } from './pages/HealthTips';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function NavigationListener() {
  const navigate = useNavigate();
  useEffect(() => {
    (window as any).__tenayeNavigate = (target: string) => {
      navigate(target);
    };
    const handler = (e: Event) => {
      const ce = e as CustomEvent<{ path: string; search?: string }>;
      if (ce.detail?.path) {
        const query = ce.detail.search ? `?search=${encodeURIComponent(ce.detail.search)}` : '';
        navigate(ce.detail.path + query);
      }
    };
    window.addEventListener('tenaye-navigate', handler);
    return () => {
      window.removeEventListener('tenaye-navigate', handler);
    };
  }, [navigate]);
  return null;
}

export default function App() {
  useEffect(() => {
    document.title = 'Tenaye (ጤናዬ) — Health Companion';
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <ScrollToTop />
        <NavigationListener />
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/diseases" element={<Diseases />} />
            <Route path="/diseases/:id" element={<DiseaseDetail />} />
            <Route path="/first-aid" element={<FirstAid />} />
            <Route path="/health-tips" element={<HealthTips />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <Footer />
        {/* Voxide Assistant Widget: Mounted once in the true root */}
        <Assistant />
      </div>
    </BrowserRouter>
  );
}
