import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const Properties = lazy(() => import('./pages/Properties'));
const PropertyDetails = lazy(() => import('./pages/PropertyDetails'));
const NextStop = lazy(() => import('./pages/NextStop'));
const Technology = lazy(() => import('./pages/Technology'));
const Admin = lazy(() => import('./pages/Admin'));

const About = lazy(() => import('./pages/About'));
const ServicesPage = lazy(() => import('./pages/Services')); // Renamed to avoid collision if component name is same
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

function App() {

  return (
    <div className="app">
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - var(--header-height))' }}>
        <ScrollToTop />
        <Suspense fallback={<div className="container section text-center">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:id" element={<PropertyDetails />} />
            <Route path="/nextstop" element={<NextStop />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/admin" element={<Admin />} />

            {/* New Pages */}
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
    </div>
  )
}

const ScrollToTop = () => {
  // Basic scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

export default App;
