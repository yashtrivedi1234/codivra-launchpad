import AdminSettings from "@/pages/AdminSettings";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./PageTransition";
import Index from "@/pages/Index.tsx";
import Services from "@/pages/Services.tsx";
import About from "@/pages/About.tsx";
import Pricing from "@/pages/Pricing.tsx";
import Portfolio from "@/pages/Portfolio.tsx";
import Contact from "@/pages/Contact.tsx";
import Blog from "@/pages/Blog.tsx";
import BlogDetail from "@/pages/BlogDetail.tsx"; // Add this import
import Careers from "@/pages/Careers.tsx";
import NotFound from "@/pages/NotFound.tsx";
import AdminLogin from "@/pages/AdminLogin.tsx";
import AdminDashboard from "@/pages/admin/AdminDashboard.tsx";
import AdminServices from "@/pages/admin/AdminServices.tsx";
import AdminPortfolio from "@/pages/admin/AdminPortfolio.tsx";
import AdminBlog from "@/pages/admin/AdminBlog.tsx";
import AdminCareers from "@/pages/admin/AdminCareers.tsx";
import AdminContact from "@/pages/admin/AdminContact.tsx";
import AdminTeam from "@/pages/admin/AdminTeam.tsx";
import RequireAdmin from "./admin/RequireAdmin";
import NotificationsPage from "@/pages/admin/Notifications";

const AnimatedRoutes = () => {
  const location = useLocation();
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
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
                <AdminSettings />
              </PageTransition>
            </RequireAdmin>
          }
        />
        <Route
          path="/"
          element={
            <PageTransition>
              <Index />
            </PageTransition>
          }
        />
        <Route
          path="/services"
          element={
            <PageTransition>
              <Services />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <About />
            </PageTransition>
          }
        />
        <Route
          path="/pricing"
          element={
            <PageTransition>
              <Pricing />
            </PageTransition>
          }
        />
        <Route
          path="/portfolio"
          element={
            <PageTransition>
              <Portfolio />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <Contact />
            </PageTransition>
          }
        />
        <Route
          path="/blog"
          element={
            <PageTransition>
              <Blog />
            </PageTransition>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <PageTransition>
              <BlogDetail />
            </PageTransition>
          }
        />
        <Route
          path="/careers"
          element={
            <PageTransition>
              <Careers />
            </PageTransition>
          }
        />
        <Route
          path="/admin/login"
          element={
            <PageTransition>
              <AdminLogin />
            </PageTransition>
          }
        />
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <PageTransition>
                <AdminDashboard />
              </PageTransition>
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <RequireAdmin>
              <PageTransition>
                <AdminDashboard />
              </PageTransition>
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/services"
          element={
            <RequireAdmin>
              <PageTransition>
                <AdminServices />
              </PageTransition>
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/portfolio"
          element={
            <RequireAdmin>
              <PageTransition>
                <AdminPortfolio />
              </PageTransition>
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/blog"
          element={
            <RequireAdmin>
              <PageTransition>
                <AdminBlog />
              </PageTransition>
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/careers"
          element={
            <RequireAdmin>
              <PageTransition>
                <AdminCareers />
              </PageTransition>
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/contact"
          element={
            <RequireAdmin>
              <PageTransition>
                <AdminContact />
              </PageTransition>
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/team"
          element={
            <RequireAdmin>
              <PageTransition>
                <AdminTeam />
              </PageTransition>
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/notifications"
          element={
            <RequireAdmin>
              <PageTransition>
                <NotificationsPage />
              </PageTransition>
            </RequireAdmin>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <PageTransition>
              <PrivacyPolicy />
            </PageTransition>
          }
        />
        <Route
          path="/terms-of-service"
          element={
            <PageTransition>
              <TermsOfService />
            </PageTransition>
          }
        />
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default AnimatedRoutes;
