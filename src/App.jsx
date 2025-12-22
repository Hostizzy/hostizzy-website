import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Properties = lazy(() => import('./pages/Properties'));
const PropertyDetails = lazy(() => import('./pages/PropertyDetails'));
const NextStop = lazy(() => import('./pages/NextStop'));
const Technology = lazy(() => import('./pages/Technology'));
const ResIQ = lazy(() => import('./pages/products/ResIQ'));
const HostOS = lazy(() => import('./pages/products/HostOS'));
const JuxTravel = lazy(() => import('./pages/products/JuxTravel'));
const TravelCRM = lazy(() => import('./pages/products/TravelCRM'));
const Admin = lazy(() => import('./pages/Admin'));
const Login = lazy(() => import('./pages/Login'));

const About = lazy(() => import('./pages/About'));
const ServicesPage = lazy(() => import('./pages/Services'));
const Career = lazy(() => import('./pages/Career'));
const Blogs = lazy(() => import('./pages/Blogs'));
const Invest = lazy(() => import('./pages/Invest'));
const Experiences = lazy(() => import('./pages/Experiences'));
const ExperienceDetails = lazy(() => import('./pages/ExperienceDetails'));
const Contact = lazy(() => import('./pages/Contact'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Calculator = lazy(() => import('./pages/Calculator'));

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

import FloatingConcierge from './components/FloatingConcierge';
import BookingTicker from './components/BookingTicker';

function App() {
  return (
    <div className="app">
      <ScrollToTop />
      <Navbar />
      <BookingTicker />
      <main style={{ minHeight: 'calc(100vh - var(--header-height))' }}>
        <Suspense fallback={<div className="container section text-center">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:id" element={<PropertyDetails />} />
            <Route path="/nextstop" element={<NextStop />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/products/resiq" element={<ResIQ />} />
            <Route path="/products/hostos" element={<HostOS />} />
            <Route path="/products/juxtravel" element={<JuxTravel />} />
            <Route path="/products/travelcrm" element={<TravelCRM />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } />

            {/* Content Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/career" element={<Career />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/invest" element={<Invest />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/experiences/:id" element={<ExperienceDetails />} />

            {/* Legal */}
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/calculator" element={<Calculator />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <FloatingConcierge />
    </div>
  )
}

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default App;
