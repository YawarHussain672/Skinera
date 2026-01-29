import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Lazy load all page components for better code splitting
const HomePage = lazy(() => import("./components/HomePage.jsx"));
const AboutUsPage = lazy(() => import("./components/AboutUsPage.jsx"));
const ServiceDetail = lazy(() => import("./components/ServiceDetail.jsx"));
const ContactPage = lazy(() => import("./components/contact.jsx"));
const NewsTemplate = lazy(() => import("./components/NewsTemplate.jsx"));
const NewsArchive = lazy(() => import("./components/NewsArchive.jsx"));
const GalleryPage = lazy(() => import("./components/GalleryPage.jsx"));
const ReviewsDemo = lazy(() => import("./components/ReviewsDemo.jsx"));
const Wellness = lazy(() => import("./components/Wellness.jsx"));

// Admin routes - lazy loaded
const AdminLogin = lazy(() => import("./adminroutes/pages/AdminLogin.jsx"));
const Dashboard = lazy(() => import("./adminroutes/pages/Dashboard.jsx"));

// Loading spinner component
function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-[#f7e6d9] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#BE7F58] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[#BE7F58] font-medium">Loading...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route
            path="/service"
            element={<ServiceDetail serviceId="anti-aging" />}
          />
          <Route path="/service/:id" element={<ServiceDetail />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/news" element={<NewsArchive />} />
          <Route path="/newstemplate" element={<NewsTemplate />} />
          <Route path="/news/:slug" element={<NewsTemplate />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/reviews-demo" element={<ReviewsDemo />} />
          <Route path="/wellness" element={<Wellness />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
