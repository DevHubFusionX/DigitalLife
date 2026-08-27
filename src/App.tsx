import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import WhatsappSticky from './components/WhatsappSticky';
import Footer from './components/Footer';
import SessionLoader from './components/SessionLoader';
import { ToastProvider } from './context/ToastProvider';
import ProtectedAdminRoute from './pages/admin/ProtectedAdminRoute';

// Public Pages (Code-Split)
const Home = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'));
const ResourceDetailPage = lazy(() => import('./pages/ResourceDetailPage'));
const CommunityPage = lazy(() => import('./pages/CommunityPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));

// Admin Pages (Code-Split)
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'));
const AdminResourcesPage = lazy(() => import('./pages/admin/AdminResourcesPage'));
const AdminVideoResourcesPage = lazy(() => import('./pages/admin/AdminVideoResourcesPage'));
const AdminPlaybooksPage = lazy(() => import('./pages/admin/AdminPlaybooksPage'));
const AdminBlogPage = lazy(() => import('./pages/admin/AdminBlogPage'));
const AdminLeadsPage = lazy(() => import('./pages/admin/AdminLeadsPage'));
const AdminSettingsPage = lazy(() => import('./pages/admin/AdminSettingsPage'));

// Page loading fallback
function PageFallback() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full">
      <div className="w-8 h-8 border-3 border-[#3e4095] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

// Helper component to handle scrolling on route/hash changes
function ScrollToTopOrHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <Router>
      <ToastProvider>
        <SessionLoader>
          <ScrollToTopOrHash />
          <Suspense fallback={<PageFallback />}>
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLoginPage />} />
              <Route element={<ProtectedAdminRoute />}>
                <Route element={<AdminLayout />}>
                  <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                  <Route path="/admin/resources" element={<AdminResourcesPage />} />
                  <Route path="/admin/videos" element={<AdminVideoResourcesPage />} />
                  <Route path="/admin/playbooks" element={<AdminPlaybooksPage />} />
                  <Route path="/admin/blog" element={<AdminBlogPage />} />
                  <Route path="/admin/leads" element={<AdminLeadsPage />} />
                  <Route path="/admin/settings" element={<AdminSettingsPage />} />
                </Route>
              </Route>

              {/* Public Routes */}
              <Route
                path="/*"
                element={
                  <div className="min-h-screen bg-[#fffdf5] text-slate-900 antialiased flex flex-col justify-between">
                    <Navbar />
                    <main className="grow">
                      <Suspense fallback={<PageFallback />}>
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/about" element={<AboutPage />} />
                          <Route path="/services" element={<ServicesPage />} />
                          <Route path="/blog" element={<BlogPage />} />
                          <Route path="/blog/:id" element={<BlogPostPage />} />
                          <Route path="/resources" element={<ResourcesPage />} />
                          <Route path="/resources/:id" element={<ResourceDetailPage />} />
                          <Route path="/community" element={<CommunityPage />} />
                          <Route path="/privacy" element={<PrivacyPage />} />
                          <Route path="/terms" element={<TermsPage />} />
                        </Routes>
                      </Suspense>
                    </main>
                    <Footer />
                    <WhatsappSticky />
                  </div>
                }
              />
            </Routes>
          </Suspense>
        </SessionLoader>
      </ToastProvider>
    </Router>
  );
}

export default App;
