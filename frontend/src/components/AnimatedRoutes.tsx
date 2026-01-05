import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./PageTransition";
import { LoadingSpinner } from "./PageLoader";
import RequireAdmin from "./admin/RequireAdmin";

// Lazy load pages for better performance
const Index = lazy(() => import("@/pages/Index.tsx"));
const Services = lazy(() => import("@/pages/Services.tsx"));
const About = lazy(() => import("@/pages/About.tsx"));
const Pricing = lazy(() => import("@/pages/Pricing.tsx"));
const Portfolio = lazy(() => import("@/pages/Portfolio.tsx"));
const Contact = lazy(() => import("@/pages/Contact.tsx"));
const Inquiry = lazy(() => import("@/pages/Inquiry.tsx"));
const Blog = lazy(() => import("@/pages/Blog.tsx"));
const BlogDetail = lazy(() => import("@/pages/BlogDetail.tsx"));
const Careers = lazy(() => import("@/pages/Careers.tsx"));
const NotFound = lazy(() => import("@/pages/NotFound.tsx"));
const AdminLogin = lazy(() => import("@/pages/AdminLogin.tsx"));
const AdminSettings = lazy(() => import("@/pages/AdminSettings"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("@/pages/TermsOfService"));
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard.tsx"));
const AdminServices = lazy(() => import("@/pages/admin/AdminServices.tsx"));
const AdminPortfolio = lazy(() => import("@/pages/admin/AdminPortfolio.tsx"));
const AdminBlog = lazy(() => import("@/pages/admin/AdminBlog.tsx"));
const AdminCareers = lazy(() => import("@/pages/admin/AdminCareers.tsx"));
const AdminContact = lazy(() => import("@/pages/admin/AdminContact.tsx"));
const AdminTeam = lazy(() => import("@/pages/admin/AdminTeam.tsx"));
const NotificationsPage = lazy(() => import("@/pages/admin/Notifications"));
const AdminInquiry = lazy(() => import("@/pages/admin/AdminInquiry.tsx"));
const AnimatedRoutes = () => {
  const location = useLocation();
  // Scroll to top on route change (only if not restoring from cache)
  useEffect(() => {
    // Use requestAnimationFrame to avoid blocking bfcache
    requestAnimationFrame(() => {
      if (document.documentElement.scrollTop > 0) {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    });
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
        <Route
          path="/admin/settings"
          element={
            <RequireAdmin>
              <PageTransition>
                <Suspense fallback={<LoadingSpinner />}>
                  <AdminSettings />
                </Suspense>
              </PageTransition>
            </RequireAdmin>
          }
        />
        <Route
          path="/"
          element={
            <PageTransition>
              <Suspense fallback={<LoadingSpinner />}>
                <Index />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/services"
          element={
            <PageTransition>
              <Suspense fallback={<LoadingSpinner />}>
                <Services />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <Suspense fallback={<LoadingSpinner />}>
                <About />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/pricing"
          element={
            <PageTransition>
              <Suspense fallback={<LoadingSpinner />}>
                <Pricing />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/portfolio"
          element={
            <PageTransition>
              <Suspense fallback={<LoadingSpinner />}>
                <Portfolio />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <Suspense fallback={<LoadingSpinner />}>
                <Contact />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/inquiry"
          element={
            <PageTransition>
              <Suspense fallback={<LoadingSpinner />}>
                <Inquiry />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/blog"
          element={
            <PageTransition>
              <Suspense fallback={<LoadingSpinner />}>
                <Blog />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <PageTransition>
              <Suspense fallback={<LoadingSpinner />}>
                <BlogDetail />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/careers"
          element={
            <PageTransition>
              <Suspense fallback={<LoadingSpinner />}>
                <Careers />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/admin/login"
          element={
            <PageTransition>
              <Suspense fallback={<LoadingSpinner />}>
                <AdminLogin />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <PageTransition>
                <Suspense fallback={<LoadingSpinner />}>
                  <AdminDashboard />
                </Suspense>
              </PageTransition>
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <RequireAdmin>
              <PageTransition>
                <Suspense fallback={<LoadingSpinner />}>
                  <AdminDashboard />
                </Suspense>
              </PageTransition>
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/services"
          element={
            <RequireAdmin>
              <PageTransition>
                <Suspense fallback={<LoadingSpinner />}>
                  <AdminServices />
                </Suspense>
              </PageTransition>
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/portfolio"
          element={
            <RequireAdmin>
              <PageTransition>
                <Suspense fallback={<LoadingSpinner />}>
                  <AdminPortfolio />
                </Suspense>
              </PageTransition>
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/blog"
          element={
            <RequireAdmin>
              <PageTransition>
                <Suspense fallback={<LoadingSpinner />}>
                  <AdminBlog />
                </Suspense>
              </PageTransition>
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/careers"
          element={
            <RequireAdmin>
              <PageTransition>
                <Suspense fallback={<LoadingSpinner />}>
                  <AdminCareers />
                </Suspense>
              </PageTransition>
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/contact"
          element={
            <RequireAdmin>
              <PageTransition>
                <Suspense fallback={<LoadingSpinner />}>
                  <AdminContact />
                </Suspense>
              </PageTransition>
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/team"
          element={
            <RequireAdmin>
              <PageTransition>
                <Suspense fallback={<LoadingSpinner />}>
                  <AdminTeam />
                </Suspense>
              </PageTransition>
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/notifications"
          element={
            <RequireAdmin>
              <PageTransition>
                <Suspense fallback={<LoadingSpinner />}>
                  <NotificationsPage />
                </Suspense>
              </PageTransition>
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/inquiry"
          element={
            <RequireAdmin>
              <PageTransition>
                <Suspense fallback={<LoadingSpinner />}>
                  <AdminInquiry />
                </Suspense>
              </PageTransition>
            </RequireAdmin>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <PageTransition>
              <Suspense fallback={<LoadingSpinner />}>
                <PrivacyPolicy />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/terms-of-service"
          element={
            <PageTransition>
              <Suspense fallback={<LoadingSpinner />}>
                <TermsOfService />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="*"
          element={
            <PageTransition>
              <Suspense fallback={<LoadingSpinner />}>
                <NotFound />
              </Suspense>
            </PageTransition>
          }
        />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default AnimatedRoutes;
