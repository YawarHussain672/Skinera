import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../Images/Header/logo.png";
import { skinMenu, hairMenu, hemopathicMenu, getNested } from "../data/menuData.js";

// Simple down-caret icon
const CaretDown = ({ className = "w-3 h-3" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M5.23 7.21a.75.75 0 011.06.02L10 10.585l3.71-3.356a.75.75 0 111.02 1.1l-4.22 3.82a.75.75 0 01-1.02 0l-4.22-3.82a.75.75 0 01.02-1.1z"
      clipRule="evenodd"
    />
  </svg>
);

export default function Header({ onBookAppointment }) {
  const [open, setOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  // Desktop dropdown state with hover-delay to avoid flicker
  const [svcDesktopOpen, setSvcDesktopOpen] = useState(false);
  const svcTimer = useRef(null);
  // Hair dropdown states
  const [hairOpen, setHairOpen] = useState(false);
  const [hairDesktopOpen, setHairDesktopOpen] = useState(false);
  const hairTimer = useRef(null);
  // Homeopathic dropdown states
  const [hemoOpen, setHemoOpen] = useState(false);
  const [hemoDesktopOpen, setHemoDesktopOpen] = useState(false);
  const hemoTimer = useRef(null);
  // Mobile nested toggles per item
  const [skinSubOpen, setSkinSubOpen] = useState({});
  const [hairSubOpen, setHairSubOpen] = useState({});
  const [hemoSubOpen, setHemoSubOpen] = useState({});

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      // Reset mobile accordions to closed by default when opening menu
      setSvcOpen(false);
      setHairOpen(false);
      setSkinSubOpen({});
      setHairSubOpen({});
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  return (
    <header className="bg-white text-black relative z-50 border-b border-black/10">
      {/* Top contact bar */}
      <div className="bg-[#c67c54] text-white text-xs sm:text-sm border-b border-black/10 font-bold">
        <div className="max-w-7xl  mx-auto px-4 py-1.5 sm:py-2 flex items-center justify-between gap-1.5 sm:gap-3 flex-nowrap overflow-hidden">
          {/* Phones + email */}
          <div className="flex items-center gap-x-2 sm:gap-x-4 flex-nowrap min-w-0">
            <a
              href="tel:+917878867379"
              className="inline-flex items-center gap-1.5 hover:text-black/70 transition-colors whitespace-nowrap"
              aria-label="Call +91 78788 67379"
            >
              {/* phone icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M2.25 3.75A1.5 1.5 0 0 1 3.75 2.25h2.273a1.5 1.5 0 0 1 1.48 1.246l.517 3.102a1.5 1.5 0 0 1-.826 1.626l-1.29.602a.75.75 0 0 0-.36.992 13.51 13.51 0 0 0 7.55 7.55.75.75 0 0 0 .992-.36l.602-1.29a1.5 1.5 0 0 1 1.626-.826l3.102.517a1.5 1.5 0 0 1 1.246 1.48v2.273a1.5 1.5 0 0 1-1.5 1.5H18A15.75 15.75 0 0 1 2.25 6V3.75Z" />
              </svg>
              <span className="whitespace-nowrap">+91 78788 67379</span>
            </a>
            <a
              href="mailto:dskinova@gmail.com"
              className="inline-flex items-center gap-1.5 hover:text-black/70 transition-colors min-w-0"
              aria-label="Email dskinova@gmail.com"
            >
              {/* mail icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M1.5 6.75A2.25 2.25 0 0 1 3.75 4.5h16.5A2.25 2.25 0 0 1 22.5 6.75v10.5A2.25 2.25 0 0 1 20.25 19.5H3.75A2.25 2.25 0 0 1 1.5 17.25V6.75Zm2.4-.75a.75.75 0 0 0-.525 1.287l7.2 6.75a.75.75 0 0 0 1.05 0l7.2-6.75A.75.75 0 0 0 18.6 6H3.9Z" />
              </svg>
              <span className="truncate max-w-[8rem] sm:max-w-none">
                dskinova@gmail.com
              </span>
            </a>
            <div
              className="hidden sm:inline-flex items-center gap-1.5  whitespace-nowrap"
              aria-label="Clinic hours Mon - Sat: 10:00 - 07:00, Sun: 10:00 - 01:00"
            >
              {/* clock icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.75 5.25a.75.75 0 0 0-1.5 0v4.25a.75.75 0 0 0 .33.62l3 2a.75.75 0 1 0 .84-1.24l-2.67-1.78V7.5Z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Mon - Sat: 10:00 - 07:00 | Sun: 10:00 - 01:00</span>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <a
              href="https://www.instagram.com/_dskinova/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-white/40 text-white flex items-center justify-center hover:bg-white/10"
            >
              {/* instagram */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 "
              >
                <path d="M7 2.25h10A4.75 4.75 0 0 1 21.75 7v10A4.75 4.75 0 0 1 17 21.75H7A4.75 4.75 0 0 1 2.25 17V7A4.75 4.75 0 0 1 7 2.25Zm0 1.5A3.25 3.25 0 0 0 3.75 7v10A3.25 3.25 0 0 0 7 20.25h10A3.25 3.25 0 0 0 20.25 17V7A3.25 3.25 0 0 0 17 3.75H7Zm5 3.5A4.75 4.75 0 1 1 7.25 12 4.75 4.75 0 0 1 12 7.25Zm0 1.5A3.25 3.25 0 1 0 15.25 12 3.25 3.25 0 0 0 12 8.75Zm5.125-2.375a.875.875 0 1 1-.875.875.875.875 0 0 1 .875-.875Z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/channel/UCgGwM0SYnqIO8_9JVYrF7vg"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-white/40 text-white flex items-center justify-center hover:bg-white/10"
            >
              {/* youtube */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
              >
                <path d="M21.582 7.184a3 3 0 0 0-2.115-2.122C17.93 4.5 12 4.5 12 4.5s-5.93 0-7.467.562A3 3 0 0 0 2.418 7.184C1.875 8.723 1.875 12 1.875 12s0 3.277.543 4.816a3 3 0 0 0 2.115 2.122C6.07 19.5 12 19.5 12 19.5s5.93 0 7.467-.562a3 3 0 0 0 2.115-2.122C22.125 15.277 22.125 12 22.125 12s0-3.277-.543-4.816ZM9.75 14.568v-5.136L15.045 12 9.75 14.568Z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/p/Dskinova-61577979712519/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-white/40 text-white flex items-center justify-center hover:bg-white/10"
            >
              {/* facebook */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
              >
                <path d="M13.5 9.75V7.875A1.875 1.875 0 0 1 15.375 6h1.125V3.75h-1.5A4.125 4.125 0 0 0 9.75 7.875V9.75H7.5v2.25h2.25V20.25h2.25V12h2.25l.375-2.25h-2.625Z" />
              </svg>
            </a>
            <a
              href="https://in.linkedin.com/in/dr-kirti-kothari-12b282377"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-white/40 text-white flex items-center justify-center hover:bg-white/10"
            >
              {/* linkedin */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                aria-hidden="true"
              >
                <path d="M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003zM7.088 20.452H3.996V9h3.092v11.452zM5.542 7.433a1.79 1.79 0 1 1 0-3.58 1.79 1.79 0 0 1 0 3.58zM20.452 20.452h-3.09v-5.89c0-1.405-.027-3.213-2.014-3.213-2.016 0-2.325 1.575-2.325 3.104v6h-3.09V9h2.966v1.566h.042c.413-.78 1.425-1.604 2.935-1.604 3.14 0 3.716 2.067 3.716 4.754v6.736z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 sm:h-18 md:h-24 flex items-center justify-between md:grid md:grid-cols-[auto_1fr_auto] md:gap-6">
          {/* Left: Logo + Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="DSkinova — Professional Skincare & Cosmetology Clinic logo"
                // Removed darkness filter per request
                className="h-12 sm:h-14 w-auto"
              />
            </Link>
          </div>

          {/* Center: Desktop nav */}
          <nav className="hidden md:flex items-center justify-center gap-8">
            <Link
              to="/"
              className="text-gray-800 hover:text-[#c67c54] transition-colors font-bold"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-[#c67c54] transition-colors font-bold"
            >
              About
            </Link>
            {/* Service dropdown */}
            <div
              className="relative"
              onMouseEnter={() => {
                if (svcTimer.current) clearTimeout(svcTimer.current);
                setSvcDesktopOpen(true);
              }}
              onMouseLeave={() => {
                if (svcTimer.current) clearTimeout(svcTimer.current);
                svcTimer.current = setTimeout(
                  () => setSvcDesktopOpen(false),
                  120
                );
              }}
            >
              <button
                type="button"
                className="inline-flex items-center gap-1 text-gray-700 hover:text-[#c67c54] transition-colors font-bold"
              >
                Skin
                <CaretDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    svcDesktopOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`absolute left-0 top-full mt-2 min-w-[180px] bg-white text-[#c67c54] shadow-xl ring-1 ring-black/5 z-50 transition-opacity duration-150 ${
                  svcDesktopOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                onMouseEnter={() => {
                  if (svcTimer.current) clearTimeout(svcTimer.current);
                  setSvcDesktopOpen(true);
                }}
                onMouseLeave={() => {
                  if (svcTimer.current) clearTimeout(svcTimer.current);
                  svcTimer.current = setTimeout(
                    () => setSvcDesktopOpen(false),
                    120
                  );
                }}
              >
                {skinMenu.map((item) => {
                  const nested = item.children?.length
                    ? item.children
                    : getNested("skin", item.label);
                  const hasNested = nested && nested.length > 0;
                  return (
                    <div key={item.label} className={`relative group`}>
                      <a
                        href={item.href}
                        className="px-4 py-2 hover:bg-[#f6e8e0] flex items-center justify-between"
                      >
                        <span>{item.label}</span>
                        {hasNested && (
                          <CaretDown className="w-3.5 h-3.5 -rotate-90 text-[#c67c54]" />
                        )}
                      </a>
                      {hasNested && (
                        <div className="absolute left-full top-0 mt-0 min-w-[220px] bg-white text-[#c67c54] shadow-xl ring-1 ring-black/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                          {nested.map((sub) => (
                            <a
                              key={sub.label}
                              href={sub.href}
                              className="px-4 py-2 hover:bg-[#f6e8e0] flex items-center justify-between"
                            >
                              <span>{sub.label}</span>
                              {sub.children && sub.children.length > 0 && (
                                <CaretDown className="w-3 h-3 -rotate-90 text-[#c67c54] opacity-80" />
                              )}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Hair dropdown */}
            <div
              className="relative"
              onMouseEnter={() => {
                if (hairTimer.current) clearTimeout(hairTimer.current);
                setHairDesktopOpen(true);
              }}
              onMouseLeave={() => {
                if (hairTimer.current) clearTimeout(hairTimer.current);
                hairTimer.current = setTimeout(
                  () => setHairDesktopOpen(false),
                  120
                );
              }}
            >
              <button
                type="button"
                className="inline-flex items-center gap-1 text-gray-700 hover:text-[#c67c54] transition-colors font-bold"
              >
                Hair
                <CaretDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    hairDesktopOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`absolute left-0 top-full mt-2 min-w-[220px] bg-white text-[#c67c54] shadow-xl ring-1 ring-black/5 z-50 transition-opacity duration-150 ${
                  hairDesktopOpen
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                }`}
                onMouseEnter={() => {
                  if (hairTimer.current) clearTimeout(hairTimer.current);
                  setHairDesktopOpen(true);
                }}
                onMouseLeave={() => {
                  if (hairTimer.current) clearTimeout(hairTimer.current);
                  hairTimer.current = setTimeout(
                    () => setHairDesktopOpen(false),
                    120
                  );
                }}
              >
                {hairMenu.map((item) => {
                  const hasChildren = item.children && item.children.length > 0;
                  return (
                    <div key={item.label} className="relative group">
                      <a
                        href={item.href}
                        className="px-4 py-2 hover:bg-[#f6e8e0] flex items-center justify-between"
                      >
                        <span>{item.label}</span>
                        {hasChildren && (
                          <CaretDown className="w-3.5 h-3.5 -rotate-90 text-[#c67c54]" />
                        )}
                      </a>
                      {hasChildren && (
                        <div className="absolute left-full top-0 mt-0 min-w-[220px] bg-white text-[#c67c54] shadow-xl ring-1 ring-black/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                          {item.children.map((sub) => (
                            <a
                              key={sub.label}
                              href={sub.href}
                              className="px-4 py-2 hover:bg-[#f6e8e0] flex items-center justify-between"
                            >
                              <span>{sub.label}</span>
                              {sub.children && sub.children.length > 0 && (
                                <CaretDown className="w-3 h-3 -rotate-90 text-[#c67c54] opacity-80" />
                              )}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Homeopathic dropdown */}
            <div
              className="relative"
              onMouseEnter={() => {
                if (hemoTimer.current) clearTimeout(hemoTimer.current);
                setHemoDesktopOpen(true);
              }}
              onMouseLeave={() => {
                if (hemoTimer.current) clearTimeout(hemoTimer.current);
                hemoTimer.current = setTimeout(
                  () => setHemoDesktopOpen(false),
                  120
                );
              }}
            >
              <button
                type="button"
                className="inline-flex items-center gap-1 text-gray-700 hover:text-[#c67c54] transition-colors font-bold"
              >
                Homeopathic
                <CaretDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    hemoDesktopOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`absolute left-0 top-full mt-2 min-w-[220px] bg-white text-[#c67c54] shadow-xl ring-1 ring-black/5 z-50 transition-opacity duration-150 ${
                  hemoDesktopOpen
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                }`}
                onMouseEnter={() => {
                  if (hemoTimer.current) clearTimeout(hemoTimer.current);
                  setHemoDesktopOpen(true);
                }}
                onMouseLeave={() => {
                  if (hemoTimer.current) clearTimeout(hemoTimer.current);
                  hemoTimer.current = setTimeout(
                    () => setHemoDesktopOpen(false),
                    120
                  );
                }}
              >
                {hemopathicMenu.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="px-4 py-2 hover:bg-[#f6e8e0] flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Wellness, Gallery, Blogs */}
            {/* <Link
              to="/wellness"
              className="text-gray-700 hover:text-[#c67c54] transition-colors font-bold"
            >
              Wellness
            </Link> */}
            <Link
              to="/gallery"
              className="text-gray-700 hover:text-[#c67c54] transition-colors font-bold"
            >
              Gallery
            </Link>
            <Link
              to="/news"
              className="text-gray-700 hover:text-[#c67c54] transition-colors font-bold"
            >
              Blogs
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-[#c67c54] transition-colors font-bold"
            >
              Contact
            </Link>
          </nav>

          {/* Right: Desktop CTA + Mobile Hamburger */}
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onBookAppointment}
              className="hidden md:inline-block bg-[#c67c54] text-white px-6 lg:px-8 py-2.5 lg:py-3 text-base border border-transparent hover:bg-[#b8734a] transition-colors font-bold"
              aria-label="Book appointment now"
            >
              BOOK APPOINTMENT
            </button>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              className="md:hidden ml-2 p-2 text-black hover:text-black/70"
              onClick={() => setOpen((v) => !v)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-7 h-7"
              >
                {open ? (
                  <path
                    fillRule="evenodd"
                    d="M6.22 5.97a.75.75 0 0 1 1.06 0L12 10.69l4.72-4.72a.75.75 0 1 1 1.06 1.06L13.06 11.75l4.72 4.72a.75.75 0 1 1-1.06 1.06L12 12.81l-4.72 4.72a.75.75 0 0 1-1.06-1.06l4.72-4.72-4.72-4.72a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                ) : (
                  <>
                    <path d="M4 6.75A.75.75 0 0 1 4.75 6h14.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 6.75Z" />
                    <path d="M4 12a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 12Z" />
                    <path d="M4 17.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H4.75a.75.75 0 0 1-.75-.75Z" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - professional slide-over */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${
          open ? "" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ease-in-out ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        {/* Panel */}
        <aside
          className={`absolute right-0 top-0 h-full w-11/12 max-w-sm bg-white text-black shadow-2xl transform transition-transform duration-300 ease-in-out ${
            open ? "translate-x-0" : "translate-x-full"
          } [will-change:transform]`}
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-black/10">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="DSkinova — Professional Skincare & Cosmetology Clinic logo"
                className="h-10 w-auto filter brightness-75"
              />
            </div>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="p-2 hover:text-black/70"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-7 h-7"
              >
                <path
                  fillRule="evenodd"
                  d="M6.225 4.811a1 1 0 0 1 1.414 0L12 9.172l4.361-4.361a1 1 0 1 1 1.414 1.414L13.414 10.586l4.361 4.361a1 1 0 0 1-1.414 1.414L12 12l-4.361 4.361a1 1 0 0 1-1.414-1.414l4.361-4.361-4.361-4.361a1 1 0 0 1 0-1.414Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <nav className="px-4 py-3 overflow-y-auto h-[calc(100%-4rem)]">
            <Link
              to="/"
              className="block py-3 text-base text-gray-800 border-b border-black/10 font-bold"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block py-3 text-base text-gray-800 border-b border-black/10 font-bold"
              onClick={() => setOpen(false)}
            >
              About Us
            </Link>

            {/* Skin accordion */}
            <button
              type="button"
              className="w-full flex items-center justify-between py-3 text-base text-gray-800 border-b border-black/10 font-bold"
              onClick={() => setSvcOpen((v) => !v)}
              aria-expanded={svcOpen}
            >
              <span>Skin</span>
              <CaretDown
                className={`w-4 h-4 transition-transform duration-200 ease-in-out ${
                  svcOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`pl-3 text-gray-700 overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
                svcOpen ? "max-h-[60vh] opacity-100 pb-2" : "max-h-0 opacity-0"
              }`}
              aria-hidden={!svcOpen}
            >
              {skinMenu.map((item) => {
                const nested = item.children?.length
                  ? item.children
                  : getNested("skin", item.label);
                const hasNested = nested && nested.length > 0;
                const expanded = !!skinSubOpen[item.label];
                return (
                  <div key={item.label} className="py-1">
                    {hasNested ? (
                      <button
                        type="button"
                        className="w-full flex items-center justify-between py-2"
                        aria-expanded={expanded}
                        onClick={() =>
                          setSkinSubOpen((prev) => ({
                            ...prev,
                            [item.label]: !prev[item.label],
                          }))
                        }
                      >
                        <span>{item.label}</span>
                        <CaretDown
                          className={`w-4 h-4 text-[#c67c54] transition-transform duration-200 ${
                            expanded ? "rotate-180" : "-rotate-90"
                          }`}
                        />
                      </button>
                    ) : (
                      <a href={item.href} className="block py-2">
                        {item.label}
                      </a>
                    )}
                    {hasNested && (
                      <div
                        className={`pl-3 text-gray-600 overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
                          expanded
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        {nested.map((sub) => (
                          <a
                            key={sub.label}
                            href={sub.href}
                            className="block py-1.5"
                          >
                            {sub.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Hair accordion */}
            <button
              type="button"
              className="w-full flex items-center justify-between py-3 text-base text-gray-800 border-b border-black/10 font-bold"
              onClick={() => setHairOpen((v) => !v)}
              aria-expanded={hairOpen}
            >
              <span>Hair</span>
              <CaretDown
                className={`w-4 h-4 transition-transform duration-200 ease-in-out ${
                  hairOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`pl-3 text-gray-700 overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
                hairOpen ? "max-h-[60vh] opacity-100 pb-2" : "max-h-0 opacity-0"
              }`}
              aria-hidden={!hairOpen}
            >
              {hairMenu.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                const expanded = !!hairSubOpen[item.label];
                return (
                  <div key={item.label} className="py-1">
                    {hasChildren ? (
                      <button
                        type="button"
                        className="w-full flex items-center justify-between py-2"
                        aria-expanded={expanded}
                        onClick={() =>
                          setHairSubOpen((prev) => ({
                            ...prev,
                            [item.label]: !prev[item.label],
                          }))
                        }
                      >
                        <span>{item.label}</span>
                        <CaretDown
                          className={`w-4 h-4 text-[#c67c54] transition-transform duration-200 ${
                            expanded ? "rotate-180" : "-rotate-90"
                          }`}
                        />
                      </button>
                    ) : (
                      <a href={item.href} className="block py-2">
                        {item.label}
                      </a>
                    )}
                    {hasChildren && (
                      <div
                        className={`pl-3 text-gray-600 overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
                          expanded
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        {item.children.map((sub) => (
                          <a
                            key={sub.label}
                            href={sub.href}
                            className="block py-1.5"
                          >
                            {sub.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Homeopathic accordion */}
            <button
              type="button"
              className="w-full flex items-center justify-between py-3 text-base text-gray-800 border-b border-black/10 font-bold"
              onClick={() => setHemoOpen((v) => !v)}
              aria-expanded={hemoOpen}
            >
              <span>Homeopathic</span>
              <CaretDown
                className={`w-4 h-4 transition-transform duration-200 ease-in-out ${
                  hemoOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`pl-3 text-gray-700 overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
                hemoOpen ? "max-h-[60vh] opacity-100 pb-2" : "max-h-0 opacity-0"
              }`}
              aria-hidden={!hemoOpen}
            >
              {hemopathicMenu.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block py-2"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Extra links */}
            <Link
              to="/wellness"
              className="block py-3 text-base text-gray-800 border-b border-black/10 font-bold"
              onClick={() => setOpen(false)}
            >
              Wellness
            </Link>
            <Link
              to="/gallery"
              className="block py-3 text-base text-gray-800 border-b border-black/10 font-bold"
              onClick={() => setOpen(false)}
            >
              Gallery
            </Link>
            <Link
              to="/news"
              className="block py-3 text-base text-gray-800 border-b border-black/10 font-bold"
              onClick={() => setOpen(false)}
            >
              Blogs
            </Link>

            {/* Call now CTA */}
            <Link
              to="/contact"
              className="block py-3 text-base text-gray-800 border-b border-black/10 font-bold"
              onClick={() => setOpen(false)}
            >
              Contact Us
            </Link>
            <div className="pt-4">
              <button
                type="button"
                className="inline-flex items-center justify-center w-full bg-[#c67c54] text-white px-5 py-3 text-base border border-transparent shadow-sm hover:bg-[#b8734a]"
                aria-label="Book appointment now"
                onClick={() => {
                  onBookAppointment?.();
                  setOpen(false);
                }}
              >
                Book appointment now
              </button>
            </div>
          </nav>
        </aside>
      </div>
    </header>
  );
}
