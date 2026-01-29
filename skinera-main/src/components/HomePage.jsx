import React, { useState, lazy, Suspense } from "react";
import Header from "./Header.jsx";
import NewHeroSlider from "./NewHeroSlider.jsx";
import AppointmentModal from "./AppointmentModal.jsx";

// Lazy load below-the-fold components for faster initial load
const SecondSection = lazy(() => import("./SecondSection.jsx"));
const OurService = lazy(() => import("./OurService.jsx"));
const AboutUs = lazy(() => import("./AboutUs.jsx"));
const FounderMessage = lazy(() => import("./FounderMessage.jsx"));
const WhyChooseUs2 = lazy(() => import("./WhyChooseUs2.jsx"));
const GoogleReviewsAutoSlider = lazy(() => import("./GoogleReviewsAutoSlider.jsx"));
const JustdialReviewsAutoSlider = lazy(() => import("./JustdialReviewsAutoSlider.jsx"));
const ExpertSkincare = lazy(() => import("./ExpertSkincare.jsx"));
const GalleryCollection = lazy(() => import("./GalleryCollection.jsx"));
const ConsultationBanner = lazy(() => import("./ConsultationBanner.jsx"));
const LatestNews = lazy(() => import("./LatestNews.jsx"));
const FAQ = lazy(() => import("./FAQ.jsx"));
const ExclusiveUpdate = lazy(() => import("./ExclusiveUpdate.jsx"));
const Footer = lazy(() => import("./Footer.jsx"));
const InstaReels = lazy(() => import("./InstaReels.jsx"));
const YouTubeReels = lazy(() => import("./YouTubeReels.jsx"));

// Skeleton loading component for sections
function SectionSkeleton() {
  return (
    <div className="py-16 px-4 animate-pulse">
      <div className="max-w-7xl mx-auto">
        <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const openAppointment = () => setAppointmentOpen(true);
  const closeAppointment = () => setAppointmentOpen(false);
  const handleAppointmentSubmit = (payload) => {
    console.log("Appointment request:", payload);
  };

  return (
    <div className="min-h-screen bg-[#e0a075]">
      {/* Critical above-the-fold content - loaded immediately */}
      <Header onBookAppointment={openAppointment} />
      <NewHeroSlider onBookAppointment={openAppointment} />

      {/* Lazy loaded below-the-fold content */}
      <Suspense fallback={<SectionSkeleton />}>
        <SecondSection onBookAppointment={openAppointment} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <OurService onBookAppointment={openAppointment} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <WhyChooseUs2 />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <AboutUs />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <FounderMessage />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <ExpertSkincare />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <GalleryCollection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <ConsultationBanner onBookAppointment={openAppointment} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <InstaReels />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <YouTubeReels
          title="Our YouTube Shorts"
          channelUrl="https://www.youtube.com/@DSKINOVA"
          shorts={[
            "https://www.youtube.com/shorts/DvfaYu7sab0",
            "https://www.youtube.com/shorts/tzi_7DWIrDk",
            "https://www.youtube.com/shorts/rHpx5qm-RkU",
            "https://www.youtube.com/shorts/uboMImQrmDM",
            "https://www.youtube.com/shorts/tBhBfmo2XQg",
          ]}
        />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <GoogleReviewsAutoSlider autoSlideInterval={4000} showControls={true} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <JustdialReviewsAutoSlider
          autoSlideInterval={4000}
          showControls={true}
          justdialUrl="#"
        />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <FAQ />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <LatestNews />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <ExclusiveUpdate />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Footer />
      </Suspense>

      <AppointmentModal
        open={appointmentOpen}
        onClose={closeAppointment}
        onSubmit={handleAppointmentSubmit}
      />
    </div>
  );
}
