import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ResourcesPage from './pages/ResourcesPage';
import ResourceDetailPage from './pages/ResourceDetailPage';
import CommunityPage from './pages/CommunityPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import WhatsappSticky from './components/WhatsappSticky';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import SessionLoader from './components/SessionLoader';

// Admin imports
import AdminLoginPage from './pages/admin/AdminLoginPage';
import ProtectedAdminRoute from './pages/admin/ProtectedAdminRoute';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminResourcesPage from './pages/admin/AdminResourcesPage';
import AdminVideoResourcesPage from './pages/admin/AdminVideoResourcesPage';
import AdminBlogPage from './pages/admin/AdminBlogPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

// Helper component to handle scrolling to element hashes on navigation
function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        // Delay slightly to allow the DOM to fully render
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  return (
    <Router>
      <SessionLoader>
        <ScrollToHash />
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route element={<ProtectedAdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="/admin/resources" element={<AdminResourcesPage />} />
              <Route path="/admin/videos" element={<AdminVideoResourcesPage />} />
              <Route path="/admin/blog" element={<AdminBlogPage />} />
              <Route path="/admin/settings" element={<AdminSettingsPage />} />
            </Route>
          </Route>

          {/* Public Routes */}
          <Route
            path="/*"
            element={
              <div className="min-h-screen bg-[#fffdf5] text-slate-900 antialiased flex flex-col justify-between">
                <Navbar onOpenBooking={handleOpenBooking} />
                <main className="grow">
                  <Routes>
                    <Route path="/" element={<Home onOpenBooking={handleOpenBooking} />} />
                    <Route path="/about" element={<AboutPage onOpenBooking={handleOpenBooking} />} />
                    <Route path="/services" element={<ServicesPage onOpenBooking={handleOpenBooking} />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/blog/:id" element={<BlogPostPage />} />
                    <Route path="/resources" element={<ResourcesPage />} />
                    <Route path="/resources/:id" element={<ResourceDetailPage />} />
                    <Route path="/community" element={<CommunityPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                  </Routes>
                </main>
                <Footer onOpenBooking={handleOpenBooking} />
                <WhatsappSticky />
                <BookingModal
                  isOpen={isBookingOpen}
                  onClose={() => setIsBookingOpen(false)}
                />
              </div>
            }
          />
        </Routes>
      </SessionLoader>
    </Router>
  );
}

export default App;
