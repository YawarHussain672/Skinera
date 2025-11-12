import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
// import footerLogo from "../../Images/Footer/footer-logo.png";
import footerLogo from "../../public/logo.png"
import rightFlower from "../../Images/Footer/right-flower.png";
import {
  faLocationDot,
  faEnvelope,
  faPhone,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

// Simple social icons (lightweight inline SVGs)
const FacebookIcon = ({ className = "w-4 h-4" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M22 12.06C22 6.48 17.52 2 11.94 2S2 6.48 2 12.06c0 5.02 3.66 9.19 8.45 9.94v-7.03H8.4v-2.9h2.05V9.86c0-2.03 1.21-3.15 3.06-3.15.89 0 1.83.16 1.83.16v2.02h-1.03c-1.02 0-1.34.64-1.34 1.29v1.55h2.28l-.36 2.9h-1.92V22c4.79-.75 8.45-4.92 8.45-9.94Z" />
  </svg>
);

const LinkedInIcon = ({ className = "w-4 h-4" }) => (
  <FontAwesomeIcon icon={faLinkedin} className={className} />
);

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5Zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5Zm5.75-2.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
  </svg>
);

const YouTubeIcon = ({ className = "w-4 h-4" }) => (
  <FontAwesomeIcon icon={faYoutube} className={className} />
);

const SocialLink = ({ href, Icon, label }) => (
  <a
    href={href}
    className="flex items-center gap-3 text-white/95 hover:text-white transition-colors text-sm"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </a>
);

// Use Font Awesome for contact icons
const PinIcon = ({ className = "w-4 h-4" }) => (
  <FontAwesomeIcon icon={faLocationDot} className={className} />
);
const MailIcon = ({ className = "w-4 h-4" }) => (
  <FontAwesomeIcon icon={faEnvelope} className={className} />
);
const PhoneIcon = ({ className = "w-4 h-4" }) => (
  <FontAwesomeIcon icon={faPhone} className={className} />
);
const ClockIcon = ({ className = "w-4 h-4" }) => (
  <FontAwesomeIcon icon={faClock} className={className} />
);

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#e0a075] text-white pt-6 pb-12">
      {/* Decorative flowers */}
      <img
        src={rightFlower}
        alt=""
        className="hidden md:block pointer-events-none select-none absolute bottom-0 left-0 w-[340px] md:w-[420px] opacity-90 transform -scale-x-100"
      />
      <img
        src={rightFlower}
        alt=""
        className="hidden md:block pointer-events-none select-none absolute bottom-0 right-0 w-[340px] md:w-[420px] opacity-90"
      />

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Top social row */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:gap-x-12">
          <SocialLink
            href="https://www.facebook.com/p/Dskinova-61577979712519/"
            Icon={FacebookIcon}
            label="Facebook"
          />
          <SocialLink
            href="https://in.linkedin.com/in/dr-kirti-kothari-12b282377"
            Icon={LinkedInIcon}
            label="LinkedIn"
          />
          <SocialLink
            href="https://www.instagram.com/_dskinova/"
            Icon={InstagramIcon}
            label="Instagram"
          />
          <SocialLink
            href="https://www.youtube.com/channel/UCgGwM0SYnqIO8_9JVYrF7vg"
            Icon={YouTubeIcon}
            label="YouTube"
          />
        </div>

        {/* Center logo */}
          <div className="mt-6 md:mt-10 flex flex-col items-center">
            <div className="bg-white rounded-lg p-1">
              <img
                src={footerLogo}
                alt="DSkinova"
                className="w-[160px] sm:w-[200px] md:w-[260px] lg:w-[250px] object-contain"
              />
            </div>
          </div>

          {/* Nav links */}
        <nav className="mt-8 md:mt-10 flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-white/95">
          <Link to="/" className="hover:text-white text-sm md:text-base">
            Home
          </Link>
          <Link to="/about" className="hover:text-white text-sm md:text-base">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-white text-sm md:text-base">
            Contact Us
          </Link>
          <Link
            to="/admin-login"
            className="hover:text-white text-sm md:text-base"
          >
           
          </Link>
        </nav>

        {/* Divider */}
        <div className="mt-8 md:mt-10 border-t border-white/20" />

        {/* Extra menus like screenshot: Get In Touch + Quicklinks */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
          {/* Get In Touch */}
          <div className="sm:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
            <ul className="space-y-3 text-white/95 text-sm">
              <li className="flex items-start gap-3">
                <PinIcon className="w-5 h-5 mt-0.5 text-white" />
                <span>
                  2nd Floor, A-2, Mall Rd, opposite MAHESHWARI GIRLS PUBLIC
                  SCHOOL, Sector-3, Ambabari, Naya Khera, Vidyadhar Nagar,
                  Jaipur, Rajasthan 302029
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MailIcon className="w-5 h-5 mt-0.5 text-white" />
                <a
                  href="mailto:dskinova@gmail.com"
                  className="hover:text-white"
                >
                  dskinova@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <PhoneIcon className="w-5 h-5 mt-0.5 text-white" />
                <a href="tel:+917878867379" className="hover:text-white">
                  +91 78788 67379
                </a>
              </li>
              <li className="flex items-start gap-3">
                <ClockIcon className="w-5 h-5 mt-0.5 text-white" />
                <span>09.00 AM - 17.00 PM</span>
              </li>
            </ul>
          </div>

          {/* Quicklinks - Services */}
          <div className="sm:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-6 text-white/95 text-sm max-w-xs">
              <li>
                <Link
                  to="/service/laser-hair-removal"
                  className="hover:text-white"
                >
                  Laser hair removal
                </Link>
              </li>
              <li>
                <Link to="/service/facials" className="hover:text-white">
                  Facials
                </Link>
              </li>
             
              <li>
                <Link to="/service/deep-peelings" className="hover:text-white">
                  Deep peelings
                </Link>
              </li>
              <li>
                <Link
                  to="/service/microdermabrasion"
                  className="hover:text-white"
                >
                  Microdermabrasion
                </Link>
              </li>
              <li>
                <Link
                  to="/service/skin-tightening"
                  className="hover:text-white"
                >
                  Skin tightening
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <p className="mt-6 text-center text-white/95 text-xs sm:text-sm">
          Designed and developed by{" "}
          <span className="text-white font-medium animate-pulse">
            Digital Nishi
          </span>
        </p>
      </div>
    </footer>
  );
}
