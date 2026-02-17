"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Banner from "@/components/Banner/Banner";
import Footer from "@/components/Footer/Footer";

function Page() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const { firstName, lastName, phoneNumber, email, address, message } =
        formData;
      const mailtoLink = `mailto:contact@track-globallogistics.com?subject=Contact%20Form%20Submission&body=Name:%20${firstName}%20${lastName}%0APhone%20Number:%20${phoneNumber}%0AEmail:%20${email}%0AAddress/State:%20${address}%0AMessage/Comment:%20${message}`;
      window.location.href = mailtoLink;

      setFormStatus({
        submitted: true,
        error: false,
        message: "Thank you for your message! We'll get back to you soon.",
      });

      // Reset form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        address: "",
        message: "",
      });
    } catch (error) {
      setFormStatus({
        submitted: false,
        error: true,
        message: "There was an error sending your message. Please try again.",
      });
    }
  };

  return (
    <section className="min-h-screen flex flex-col">
      <Navbar />
      <Banner
        img={
          "/images_now/black-female-deliverer-communicating-with-coworker-while-talking-mobile-phone-organizing-package-delivery_637285-2239.jpg"
        }
        content={"CONTACT US"}
        height={"40vh"}
        location={""}
        spanText={"Get in Touch - We're Here to Help"}
      />

      <div className="flex-grow py-8 sm:py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <span
              className="inline-block px-4 py-1 bg-[#0891b2]/10 text-[#0891b2] font-medium mb-4 text-sm"
              style={{ borderRadius: 0 }}
            >
              Contact Us
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0891b2] to-[#155e75] mb-4 sm:mb-6">
              Get in Touch
            </h1>
            <div className="w-20 h-1 bg-[#0891b2] mx-auto mb-4 sm:mb-6"></div>
            <p className="text-gray-700 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
              Have questions about our services or need a shipping quote? Our
              expert team is ready to assist you with all your logistics needs.
              Reach out today and experience the Track-Global Logistics difference.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Contact Information */}
            <div className="md:col-span-1">
              <div
                className="bg-gradient-to-br from-[#0e7490] via-[#0891b2] to-[#06b6d4] text-white shadow-2xl overflow-hidden h-full border-2 border-white/20"
                style={{ borderRadius: 0 }}
              >
                <div className="p-6 sm:p-8 relative">
                  <div
                    className="absolute top-0 right-0 w-32 h-32 bg-white/5 -translate-y-1/2 translate-x-1/2"
                    style={{ borderRadius: 0 }}
                  ></div>
                  <div className="relative z-10">
                    <h2 className="text-xl sm:text-2xl font-bold mb-8">
                      Contact Information
                    </h2>
                    <div className="space-y-6 sm:space-y-8">
                      <div className="flex items-start">
                        <div
                          className="bg-white/20 p-3 sm:p-4 mr-4 flex-shrink-0"
                          style={{ borderRadius: 0 }}
                        >
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white/80 text-xs sm:text-sm mb-1">
                            Email
                          </p>
                          <a
                            href="mailto:contact@track-globallogistics.com"
                            className="font-semibold text-base sm:text-lg break-all hover:text-cyan-200 transition-colors"
                          >
                            contact@track-globallogistics.com{" "}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div
                          className="bg-white/20 p-3 sm:p-4 mr-4 flex-shrink-0"
                          style={{ borderRadius: 0 }}
                        >
                          <svg
                            className="w-5 h-5 sm:w-6 sm:h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                        </div>
                        {/* <div>
                          <p className="text-white/80 text-xs sm:text-sm mb-1">
                            Phone
                          </p>
                          <a
                            href="tel:+16303926723"
                            className="font-semibold text-base sm:text-lg hover:text-cyan-200 transition-colors"
                          >
                            (630) 392-6723
                          </a>
                        </div> */}
                      </div>

                      <div className="flex items-start">
                        <div
                          className="bg-white/20 p-3 sm:p-4 mr-4 flex-shrink-0"
                          style={{ borderRadius: 0 }}
                        >
                          <svg
                            className="w-5 h-5 sm:w-6 sm:h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white/80 text-xs sm:text-sm mb-1">
                            Working Hours
                          </p>
                          <p className="font-semibold text-base sm:text-lg">
                            Mon - Fri: 8:00 AM - 6:00 PM
                            <br />
                            <span className="text-sm text-white/70">
                              Sat: 9:00 AM - 2:00 PM
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div
                          className="bg-white/20 p-3 sm:p-4 mr-4 flex-shrink-0"
                          style={{ borderRadius: 0 }}
                        >
                          <svg
                            className="w-5 h-5 sm:w-6 sm:h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white/80 text-xs sm:text-sm mb-2">
                            Office Locations
                          </p>
                          <div className="space-y-2">
                            <p className="font-semibold text-sm sm:text-base">
                              United States Office
                            </p>
                            <p className="text-sm text-white/90 leading-relaxed">
                              50 Heller Rd B, Bellmawr, NJ 08031, United States
                            </p>
                            <p className="font-semibold text-sm sm:text-base mt-3">
                              United Kingdom Office
                            </p>
                            <p className="text-sm text-white/90 leading-relaxed">
                              No. 1, London Gateway, Corringham, Stanford-le-Hope SS17 9DY, United Kingdom
                            </p>
                            <p className="font-semibold text-sm sm:text-base mt-3">
                              Australian Office
                            </p>
                            <p className="text-sm text-white/90 leading-relaxed">
                             27/49 Nelson Rd, Yennora NSW 2161, Australia
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-10 sm:mt-12 pt-8 border-t-2 border-white/20">
                      <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
                        Connect With Us
                      </h3>
                      <div className="flex space-x-3 sm:space-x-4">
                        <a
                          href="#"
                          className="bg-white/10 hover:bg-white/20 p-3 sm:p-4 transition-all hover:scale-110"
                          style={{ borderRadius: 0 }}
                        >
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                          </svg>
                        </a>
                        <a
                          href="#"
                          className="bg-white/10 hover:bg-white/20 p-3 sm:p-4 transition-all hover:scale-110"
                          style={{ borderRadius: 0 }}
                        >
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                        </a>
                        <a
                          href="#"
                          className="bg-white/10 hover:bg-white/20 p-3 sm:p-4 transition-all hover:scale-110"
                          style={{ borderRadius: 0 }}
                        >
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </a>
                        <a
                          href="#"
                          className="bg-white/10 hover:bg-white/20 p-3 sm:p-4 transition-all hover:scale-110"
                          style={{ borderRadius: 0 }}
                        >
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2">
              <div
                className="bg-white border-2 border-gray-100 shadow-2xl p-6 sm:p-8 md:p-10"
                style={{ borderRadius: 0 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-12 h-12 bg-gradient-to-br from-[#0891b2] to-[#0e7490] flex items-center justify-center"
                    style={{ borderRadius: 0 }}
                  >
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0891b2]">
                    Send Us a Message
                  </h2>
                </div>

                {formStatus.submitted && !formStatus.error ? (
                  <div
                    className="bg-green-50 border-2 border-green-300 text-green-800 px-4 py-3 mb-6 text-base"
                    style={{ borderRadius: 0 }}
                  >
                    <div className="flex">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p>{formStatus.message}</p>
                    </div>
                  </div>
                ) : formStatus.error ? (
                  <div
                    className="bg-red-50 border-2 border-red-300 text-red-800 px-4 py-3 mb-6 text-base"
                    style={{ borderRadius: 0 }}
                  >
                    <div className="flex">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p>{formStatus.message}</p>
                    </div>
                  </div>
                ) : null}

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        First Name <span className="text-[#0891b2]">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        required
                        className="w-full px-4 py-3 text-base border-2 border-gray-300 focus:ring-2 focus:ring-cyan-100 focus:border-[#0891b2] outline-none transition-all"
                        style={{ borderRadius: 0 }}
                        onChange={handleChange}
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Last Name <span className="text-[#0891b2]">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        required
                        className="w-full px-4 py-3 text-base border-2 border-gray-300 focus:ring-2 focus:ring-cyan-100 focus:border-[#0891b2] outline-none transition-all"
                        style={{ borderRadius: 0 }}
                        onChange={handleChange}
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Phone Number <span className="text-[#0891b2]">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      required
                      className="w-full px-4 py-3 text-base border-2 border-gray-300 focus:ring-2 focus:ring-cyan-100 focus:border-[#0891b2] outline-none transition-all"
                      style={{ borderRadius: 0 }}
                      onChange={handleChange}
                      placeholder="+1 (234) 567 890"
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Email <span className="text-[#0891b2]">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      required
                      className="w-full px-4 py-3 text-base border-2 border-gray-300 focus:ring-2 focus:ring-cyan-100 focus:border-[#0891b2] outline-none transition-all"
                      style={{ borderRadius: 0 }}
                      onChange={handleChange}
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="address"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Address/State
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      className="w-full px-4 py-3 text-base border-2 border-gray-300 focus:ring-2 focus:ring-cyan-100 focus:border-[#0891b2] outline-none transition-all"
                      style={{ borderRadius: 0 }}
                      onChange={handleChange}
                      placeholder="123 Main St, City, State"
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Message/Comment <span className="text-[#0891b2]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      required
                      rows={6}
                      className="w-full px-4 py-3 text-base border-2 border-gray-300 focus:ring-2 focus:ring-cyan-100 focus:border-[#0891b2] outline-none transition-all resize-none"
                      style={{ borderRadius: 0 }}
                      onChange={handleChange}
                      placeholder="Tell us about your shipping needs or ask any questions..."
                    />
                  </div>

                  <div className="flex items-start mb-6">
                    <input
                      id="privacy"
                      type="checkbox"
                      required
                      className="w-5 h-5 mt-0.5 text-[#0891b2] border-gray-300 focus:ring-[#0891b2]"
                      style={{ borderRadius: 0 }}
                    />
                    <label
                      htmlFor="privacy"
                      className="ml-3 text-sm text-gray-600"
                    >
                      I agree to the{" "}
                      <a
                        href="#"
                        className="text-[#0891b2] hover:underline font-medium"
                      >
                        privacy policy
                      </a>{" "}
                      and consent to being contacted regarding my inquiry.
                    </label>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#0891b2] to-[#0e7490] hover:from-[#0e7490] hover:to-[#155e75] text-white font-bold py-4 px-8 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center text-base"
                      style={{ borderRadius: 0 }}
                    >
                      <span>Send Message</span>
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <span
              className="inline-block px-4 py-1 bg-[#0891b2]/10 text-[#0891b2] font-medium mb-4 text-sm"
              style={{ borderRadius: 0 }}
            >
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0891b2] to-[#155e75] mb-4 sm:mb-6">
              Frequently Asked Questions
            </h2>
            <div className="w-20 h-1 bg-[#0891b2] mx-auto mb-6"></div>
            <p className="text-gray-700 text-base sm:text-lg max-w-3xl mx-auto">
              Find answers to common questions about our shipping and logistics
              services. Can't find what you're looking for? Contact our support
              team.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            <div
              className="bg-white border-2 border-gray-100 p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2"
              style={{ borderRadius: 0 }}
            >
              <div className="flex items-start mb-4">
                <div
                  className="w-10 h-10 bg-gradient-to-br from-[#0891b2] to-[#0e7490] flex items-center justify-center mr-4 flex-shrink-0"
                  style={{ borderRadius: 0 }}
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg sm:text-xl text-[#0891b2] mb-3">
                    What areas do you service?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    We deliver to over 220 destinations worldwide, including all
                    major cities and remote locations. Our extensive network
                    ensures reliable service wherever you need to ship.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="bg-white border-2 border-gray-100 p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2"
              style={{ borderRadius: 0 }}
            >
              <div className="flex items-start mb-4">
                <div
                  className="w-10 h-10 bg-gradient-to-br from-[#06b6d4] to-[#0891b2] flex items-center justify-center mr-4 flex-shrink-0"
                  style={{ borderRadius: 0 }}
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg sm:text-xl text-[#0891b2] mb-3">
                    How can I track my shipment?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    You can track your shipment using the tracking number
                    provided at the time of booking. Use our website's tracking
                    tool or mobile app for real-time updates on your package
                    location.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="bg-white border-2 border-gray-100 p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2"
              style={{ borderRadius: 0 }}
            >
              <div className="flex items-start mb-4">
                <div
                  className="w-10 h-10 bg-gradient-to-br from-[#0e7490] to-[#155e75] flex items-center justify-center mr-4 flex-shrink-0"
                  style={{ borderRadius: 0 }}
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg sm:text-xl text-[#0891b2] mb-3">
                    What are your delivery times?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Delivery times vary by destination and service level.
                    Express deliveries typically take 1-3 business days, while
                    standard deliveries take 3-7 business days. International
                    shipments may take 5-14 business days.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="bg-white border-2 border-gray-100 p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2"
              style={{ borderRadius: 0 }}
            >
              <div className="flex items-start mb-4">
                <div
                  className="w-10 h-10 bg-gradient-to-br from-[#0891b2] to-[#06b6d4] flex items-center justify-center mr-4 flex-shrink-0"
                  style={{ borderRadius: 0 }}
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg sm:text-xl text-[#0891b2] mb-3">
                    Do you offer insurance for shipments?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Yes, we offer comprehensive insurance options for all
                    shipments to ensure your items are protected throughout the
                    delivery process. Coverage can be customized based on the
                    value of your shipment.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12 sm:mt-16">
            <div
              className="bg-gradient-to-br from-[#0891b2]/10 to-[#06b6d4]/10 p-8 border-2 border-[#0891b2]/20"
              style={{ borderRadius: 0 }}
            >
              <p className="text-gray-700 mb-6 text-lg font-medium">
                Still have questions? Our team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a
                  href="mailto:contact@track-globallogistics.com"
                  className="inline-flex items-center text-[#0891b2] font-semibold hover:text-[#0e7490] transition-colors text-base"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Email our support team
                </a>
                <span className="text-gray-400 hidden sm:inline text-2xl">
                  |
                </span>
                {/* <a
                  href="tel:+16303926723"
                  className="inline-flex items-center text-[#0891b2] font-semibold hover:text-[#0e7490] transition-colors text-base"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Call (630) 392-6723
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </section>
  );
}

export default Page;
