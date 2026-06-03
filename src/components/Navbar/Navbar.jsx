"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  Phone,
  Mail,
  Clock,
  MapPin,
  ChevronRight,
  Package,
  Search,
} from "lucide-react";

// Custom hook for media query
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
      const listener = () => setMatches(media.matches);
      window.addEventListener("resize", listener);
      return () => window.removeEventListener("resize", listener);
    }
  }, [matches, query]);

  return matches;
};

function Navbar() {
  const isMobile = useMediaQuery("(max-width:1024px)");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const router = useRouter();
  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");

  const controlNavbar = useCallback(() => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        setIsVisible(true);
        setIsScrolled(false);
        return;
      }

      if (currentScrollY > lastScrollY) {
        if (currentScrollY > 200) setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    }
  }, [lastScrollY]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let timeoutId;
      const handleScroll = () => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(controlNavbar, 10);
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
        if (timeoutId) clearTimeout(timeoutId);
      };
    }
  }, [controlNavbar]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleTrackShipment = (e) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      // Navigate to homepage and scroll to tracking section
      if (path === "/") {
        // Already on homepage, just scroll
        const element = document.getElementById("track-shipment");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          // Set the tracking number in the input after scrolling
          setTimeout(() => {
            const input = document.getElementById("tracking-input");
            if (input) {
              input.value = trackingNumber.trim();
              input.focus();
            }
          }, 500);
        }
      } else {
        // Navigate to homepage with hash
        router.push(`/#track-shipment`);
        // Store tracking number to set it after navigation
        sessionStorage.setItem("pendingTrackingNumber", trackingNumber.trim());
      }
      setTrackingNumber("");
      setIsMenuOpen(false);
    } else {
      // No tracking number, just navigate to tracking section
      if (path === "/") {
        const element = document.getElementById("track-shipment");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        router.push("/#track-shipment");
      }
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { href: "/warehouse", label: "Warehouse" },
    { href: "/logistics", label: "Logistics" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const spacerHeight = isScrolled ? "h-16" : "h-20";
  const topBarHeight = isScrolled ? "h-0" : "h-10";

  return (
    <>
      {/* Backdrop for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[998] transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Main Navigation Container */}
      <nav className="fixed top-0 left-0 right-0 z-[999] bg-white">
        {/* Top Bar */}
        <div
          className={`
            bg-gradient-to-r from-[#f97316] via-[#ea580c] to-[#c2410c] text-white hidden lg:block
            transition-all duration-300 ease-in-out overflow-hidden
            ${topBarHeight}
          `}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-10 text-sm">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 group cursor-default">
                  <Clock className="h-4 w-4 text-white/90 group-hover:text-white transition-colors" />
                  <span className="font-medium">24/7 Support</span>
                </div>
                <div className="flex items-center space-x-2 group cursor-default">
                  <MapPin className="h-4 w-4 text-white/90 group-hover:text-white transition-colors" />
                  <span className="font-medium">220+ Destinations</span>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                {/* <a
                  href="tel:+16303926723"
                  className="flex items-center space-x-2 hover:text-white/90 transition-colors font-medium"
                >
                  <Phone className="h-4 w-4" />
                  <span>(630) 392-6723</span>
                </a> */}
                <a
                  href="mailto:contact@swiftpairlogistics.com"
                  className="flex items-center space-x-2 hover:text-white/90 transition-colors font-medium"
                >
                  <Mail className="h-4 w-4" />
                  <span className="hidden xl:inline">
                    contact@swiftpairlogistics.com
                  </span>
                  <span className="xl:hidden">Email Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div
          className={`
            w-full transition-all duration-300 bg-white
            ${isScrolled ? "shadow-md" : "shadow-sm"}
            ${isVisible ? "translate-y-0" : "-translate-y-full"}
          `}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`
                flex justify-between items-center transition-all duration-300
                ${isScrolled ? "h-16" : "h-20"}
              `}
            >
              {/* Logo */}
              <Link
                href="/"
                className="flex-shrink-0 transition-transform duration-300 hover:scale-105 active:scale-95"
              >
                <Image
                  src="/images/track_logo.png"
                  alt="SwiftPair Logistics - International Transport and Logistics"
                 width={90}
                 height={90}
                  className="object-cover"
                  priority
                />
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`
                      relative px-4 py-2 text-base font-medium rounded-lg
                      transition-all duration-200 group
                      ${
                        path === link.href
                          ? "text-[#f97316] font-semibold bg-orange-50"
                          : "text-gray-700 hover:text-[#f97316] hover:bg-gray-50"
                      }
                    `}
                  >
                    {link.label}
                    <span
                      className={`
                        absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[#f97316]
                        transition-all duration-200 group-hover:w-3/4
                        ${path === link.href ? "w-3/4" : ""}
                      `}
                    />
                  </Link>
                ))}
              </div>

              {/* Track Shipment - Desktop */}
              <div className="hidden lg:flex items-center space-x-3 ml-4">
                <form
                  onSubmit={handleTrackShipment}
                  className="flex items-center space-x-2 bg-gray-50 px-3 py-2 border border-gray-200 focus-within:border-[#f97316] focus-within:ring-2 focus-within:ring-orange-100 transition-all"
                >
                  <Package className="h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Track Shipment"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="bg-transparent border-none outline-none text-sm w-32 placeholder:text-gray-400 text-gray-700"
                  />
                  <button
                    type="submit"
                    className="p-1.5 bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white hover:from-[#ea580c] hover:to-[#c2410c] transition-all shadow-sm hover:shadow-md"
                    aria-label="Track shipment"
                  >
                    <Search className="h-4 w-4" />
                  </button>
                </form>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`
            lg:hidden fixed inset-y-0 right-0 w-full max-w-sm bg-white
            shadow-2xl transform transition-transform duration-300 ease-out
            z-[999] ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <div className="h-full flex flex-col">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            {/* Track Shipment - Mobile */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <form
                onSubmit={handleTrackShipment}
                className="flex items-center space-x-2 bg-white px-3 py-2.5 border border-gray-200 shadow-sm focus-within:border-[#f97316] focus-within:ring-2 focus-within:ring-orange-100 transition-all"
              >
                <Package className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Tracking number"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-gray-400 text-gray-700"
                />
                <button
                  type="submit"
                  className="p-2 bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white hover:from-[#ea580c] hover:to-[#c2410c] transition-all shadow-sm hover:shadow-md flex-shrink-0"
                  aria-label="Track shipment"
                >
                  <Search className="h-4 w-4" />
                </button>
              </form>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto py-4">
              <div className="space-y-1 px-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`
                      flex items-center justify-between px-4 py-3.5 rounded-lg
                      transition-all duration-200 group
                      ${
                        path === link.href
                          ? "bg-orange-50 text-[#f97316] font-semibold"
                          : "text-gray-700 hover:bg-gray-50 hover:text-[#f97316]"
                      }
                    `}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="font-medium">{link.label}</span>
                    <ChevronRight
                      className={`h-5 w-5 transition-transform group-hover:translate-x-1 ${
                        path === link.href ? "text-[#f97316]" : "text-gray-400"
                      }`}
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Contact Info */}
            <div className="border-t border-gray-200 bg-gray-50 p-4 space-y-3">
              {/* <a
                href="tel:+16303926723"
                className="flex items-center space-x-3 text-gray-700 hover:text-[#f97316] transition-colors p-2 rounded-lg hover:bg-white"
              >
                <Phone className="h-5 w-5" />
                <span className="font-medium">(630) 392-6723</span>
              </a> */}
              <a
                href="mailto:contact@swiftpairlogistics.com"
                className="flex items-center space-x-3 text-gray-700 hover:text-[#f97316] transition-colors p-2 rounded-lg hover:bg-white"
              >
                <Mail className="h-5 w-5" />
                <span className="font-medium text-sm">
                  contact@swiftpairlogistics.com
                </span>
              </a>
              <div className="flex items-center space-x-3 text-gray-600 p-2">
                <Clock className="h-5 w-5" />
                <span className="font-medium text-sm">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from going under navbar */}
      <div className={spacerHeight} />
    </>
  );
}

export default Navbar;
