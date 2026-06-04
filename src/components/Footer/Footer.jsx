"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Footer() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:contact@swiftpairlogistics.com?subject=Contact%20Form`;
    window.location.href = mailtoLink;
  };

  const year = new Date().getFullYear();
  const navigate = useRouter();
  const phoneNumber = ""; // Replace with your phone number
  const preFilledMessage =
    "Hello! I need assistance with tracking my shipment. Thank you!";
  const encodedMessage = encodeURIComponent(preFilledMessage);
  const smsLink = `sms:${phoneNumber}?&body=${encodedMessage}`;

  return (
    <>
      {/* Main Footer */}
      <footer className="bg-gradient-to-b from-[#ea580c] to-[#c2410c] text-white pt-16 pb-6">
        <div className="max-w-7xl mx-auto px-4">
          {/* Footer Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div>
              <div
                className="mb-6 cursor-pointer"
                onClick={() => navigate.push("/")}
              >
                <Image
                  src="/images/track_logo2.png"
                  width={140}
                  height={140}
                  alt="SwiftPair Logistics - International Transport and Logistics"
                  className="h-24 w-auto object-contain filter brightness-0 invert"
                  priority
                />
              </div>
              <p className="text-gray-200 mb-6 text-sm leading-relaxed">
                Moving goods across 220+ destinations for 30 years. Speed, security, and precision — every time.
              </p>

              {/* Social Media Icons */}
              <div className="flex space-x-4 mb-6">
                <a
                  href="#"
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <form
                  onSubmit={handleSubmit}
                  className="bg-white/10 p-3 style={{ borderRadius: 0 }}"
                >
                  <p className="text-sm font-medium mb-2">Email Us:</p>
                  <button
                    className="bg-white text-[#f97316] overflow-hidden py-2 px-4 font-medium hover:bg-gray-100 transition-colors w-full text-left"
                    style={{ borderRadius: 0 }}
                  >
                    contact@swiftpairlogistics.com{" "}
                  </button>
                </form>
                {/* <div className="bg-white/10 p-3" style={{ borderRadius: 0 }}>
                  <p className="text-sm font-medium mb-2">Call Us:</p>
                  <a
                    href="tel:+16303926723"
                    className="block bg-white text-[#f97316] overflow-hidden py-2 px-4 font-medium hover:bg-gray-100 transition-colors w-full text-left"
                    style={{ borderRadius: 0 }}
                  >
                    (630) 392-6723
                  </a>
                </div> */}
                <div className="bg-white/10 p-3" style={{ borderRadius: 0 }}>
                  <p className="text-sm font-medium mb-2">Office Locations:</p>
                  <div className="space-y-2 text-xs text-gray-200">
                    <p className="font-semibold text-white">US Office:</p>
                    <p>50 Heller Rd B, Bellmawr, NJ 08031, United States</p>
                    <p className="font-semibold text-white mt-2">UK Office:</p>
                    <p>No. 1, London Gateway, Corringham, Stanford-le-Hope SS17 9DY, United Kingdom</p>
                    <p className="font-semibold text-white mt-2">Australian Office:</p>
                    <p>27/49 Nelson Rd, Yennora NSW 2161, Australia</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-6 border-b border-white/20 pb-2">
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#/logistics"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-bold mb-6 border-b border-white/20 pb-2">
                Services
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/warehouse"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    Warehouse
                  </Link>
                </li>
                <li>
                  <Link
                    href="/logistics"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    Air Freight
                  </Link>
                </li>
                <li>
                  <Link
                    href="/logistics"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    Ocean Freight
                  </Link>
                </li>
                <li>
                  <Link
                    href="/logistics"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    Road Freight
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    Packaging
                  </Link>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h3 className="text-lg font-bold mb-6 border-b border-white/20 pb-2">
                Community
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    Track Your Shipment
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    Terms & Condition
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="border-t border-white/20 pt-8 pb-8">
            <div className="max-w-xl mx-auto text-center">
              <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
              <p className="text-gray-200 mb-6">
                Get logistics insights, shipping tips, and exclusive offers delivered to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-3 focus:outline-none text-gray-800"
                  style={{ borderRadius: 0 }}
                  required
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#f97316] to-[#ea580c] hover:from-[#ea580c] hover:to-[#c2410c] text-white font-bold px-6 py-3 transition-colors"
                  style={{ borderRadius: 0 }}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm mb-4 md:mb-0">
              &copy; {year} SwiftPair Logistics. All Rights Reserved
            </p>

            <div className="flex space-x-6">
              <Link
                href="#"
                className="text-gray-300 hover:text-white text-sm transition-colors"
              >
                Sitemap
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-white text-sm transition-colors"
              >
                Careers
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-white text-sm transition-colors"
              >
                Press Kit
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
