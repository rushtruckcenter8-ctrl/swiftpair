"use client";

import Banner from "@/components/Banner/Banner";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Page() {
  const router = useRouter();

  useEffect(() => {
    Aos.init({
      duration: 800,
      once: true,
      easing: "ease-out",
    });
  }, []);

  const phoneNumber = ""; // Replace with your phone number
  const preFilledMessage =
    "Hello! I need assistance with tracking my shipment. Thank you!";
  const encodedMessage = encodeURIComponent(preFilledMessage);
  const smsLink = `sms:${phoneNumber}?&body=${encodedMessage}`;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <Banner
        location={"/contact"}
        img={
          "/images_now/african-american-worker-writing-inventory-list-while-checking-stock-storage-room_637285-4716.jpg"
        }
        h2Text={"Warehouse & Distribution Solutions"}
        spanText={"Professional Storage & Logistics"}
        button={"GET STARTED"}
      />

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto" data-aos="fade-up">
          <div
            className="bg-white shadow-2xl overflow-hidden border-2 border-gray-100"
            style={{ borderRadius: 0 }}
          >
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 bg-gradient-to-br from-[#f97316] to-[#ea580c] flex items-center justify-center"
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
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <span
                  className="px-4 py-1 bg-[#f97316]/10 text-[#f97316] font-medium text-sm"
                  style={{ borderRadius: 0 }}
                >
                  Warehouse Solutions
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] to-[#c2410c] mb-8">
                State-of-the-Art Warehouse & Distribution Facilities
              </h1>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed text-lg">
                    SwiftPair Logistics operates modern, fully-equipped warehouse
                    facilities designed to meet the most demanding storage and
                    distribution requirements. Our strategically located
                    warehouses provide secure, climate-controlled environments
                    for your inventory.
                  </p>
                  <p className="leading-relaxed">
                    With over{" "}
                    <span className="font-semibold text-[#f97316]">
                      25 years of experience
                    </span>{" "}
                    in logistics and warehousing, we offer comprehensive
                    solutions including inventory management, order fulfillment,
                    cross-docking, and just-in-time delivery services.
                  </p>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed">
                    Our facilities support both{" "}
                    <span className="font-semibold text-[#f97316]">
                      Full Container Load (FCL)
                    </span>{" "}
                    and{" "}
                    <span className="font-semibold text-[#f97316]">
                      Less than Container Load (LCL)
                    </span>{" "}
                    operations, ensuring flexible solutions for businesses of
                    all sizes.
                  </p>
                  <p className="leading-relaxed">
                    Advanced warehouse management systems provide real-time
                    inventory tracking, automated order processing, and seamless
                    integration with your supply chain operations.
                  </p>
                </div>
              </div>

              {/* Key Features Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t-2 border-gray-100">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#f97316] mb-2">
                    24/7
                  </div>
                  <div className="text-sm text-gray-600">
                    Access & Monitoring
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#f97316] mb-2">
                    100%
                  </div>
                  <div className="text-sm text-gray-600">Secure Storage</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#f97316] mb-2">
                    WMS
                  </div>
                  <div className="text-sm text-gray-600">Advanced Systems</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#f97316] mb-2">
                    220+
                  </div>
                  <div className="text-sm text-gray-600">Global Reach</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <span
              className="inline-block px-4 py-1 bg-[#f97316]/10 text-[#f97316] font-medium mb-4"
              style={{ borderRadius: 0 }}
            >
              Our Services
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#f97316] mb-6">
              Comprehensive Warehouse & Distribution Services
            </h2>
            <div className="w-20 h-1 bg-[#f97316] mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-gray-700 text-lg leading-relaxed">
              From secure storage to efficient distribution, our warehouse
              solutions are designed to streamline your supply chain operations.
              We offer flexible storage options, advanced inventory management,
              and seamless integration with global shipping networks.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div
              className="bg-white border-2 border-gray-100 shadow-xl overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-2 group"
              data-aos="fade-up"
              data-aos-delay="100"
              style={{ borderRadius: 0 }}
            >
              <div className="h-48 bg-gradient-to-br from-[#f97316] to-[#ea580c] flex items-center justify-center p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#f97316]/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-24 h-24 flex items-center justify-center relative z-10">
                  <svg
                    className="w-16 h-16 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#f97316] mb-4">
                  Secure Storage Solutions
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Climate-controlled warehouses with 24/7 security monitoring
                  and advanced inventory management systems. Perfect for
                  long-term storage, seasonal inventory, and distribution center
                  operations.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#f97316] mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Climate-controlled environments
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#f97316] mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Real-time inventory tracking
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#f97316] mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Flexible storage terms
                  </li>
                </ul>
              </div>
            </div>

            {/* Card 2 */}
            <div
              className="bg-white border-2 border-gray-100 shadow-xl overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-2 group"
              data-aos="fade-up"
              data-aos-delay="200"
              style={{ borderRadius: 0 }}
            >
              <div className="h-48 bg-gradient-to-br from-[#fb923c] to-[#f97316] flex items-center justify-center p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#f97316]/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-24 h-24 flex items-center justify-center relative z-10">
                  <svg
                    className="w-16 h-16 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#f97316] mb-4">
                  Order Fulfillment Services
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Complete pick, pack, and ship services with same-day
                  processing capabilities. Integrated with major e-commerce
                  platforms and shipping carriers for seamless order management.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#f97316] mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Same-day order processing
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#f97316] mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Custom packaging options
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#f97316] mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Multi-channel integration
                  </li>
                </ul>
              </div>
            </div>

            {/* Card 3 */}
            <div
              className="bg-white border-2 border-gray-100 shadow-xl overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-2 group"
              data-aos="fade-up"
              data-aos-delay="300"
              style={{ borderRadius: 0 }}
            >
              <div className="h-48 bg-gradient-to-br from-[#ea580c] to-[#c2410c] flex items-center justify-center p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#f97316]/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-24 h-24 flex items-center justify-center relative z-10">
                  <svg
                    className="w-16 h-16 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#f97316] mb-4">
                  Cross-Docking & Distribution
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Efficient cross-docking facilities for rapid product transfer
                  and distribution. Minimize storage time and reduce handling
                  costs while maintaining supply chain velocity.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#f97316] mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Fast turnaround times
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#f97316] mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Reduced handling costs
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#f97316] mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Optimized logistics flow
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-[#ea580c] via-[#f97316] to-[#fb923c]">
        <div className="max-w-7xl mx-auto" data-aos="fade-up">
          <div
            className="overflow-hidden shadow-2xl border-2 border-white/20"
            style={{ borderRadius: 0 }}
          >
            <div className="p-10 md:p-16 text-white relative">
              <div
                className="absolute top-0 right-0 w-64 h-64 bg-white/5 -translate-y-1/2 translate-x-1/2"
                style={{ borderRadius: 0 }}
              ></div>
              <div
                className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 translate-y-1/2 -translate-x-1/2"
                style={{ borderRadius: 0 }}
              ></div>

              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Streamline Your Supply Chain with Professional Warehouse
                  Solutions
                </h2>

                <p className="mb-6 text-white/95 leading-relaxed text-lg max-w-4xl">
                  Partner with SwiftPair Logistics for comprehensive warehouse
                  and distribution services that integrate seamlessly with your
                  global shipping operations. Our state-of-the-art facilities,
                  advanced WMS technology, and expert logistics team ensure your
                  inventory is managed efficiently from storage to final
                  delivery.
                </p>

                <div className="mb-10 grid md:grid-cols-2 gap-6">
                  <div
                    className="bg-white/10 backdrop-blur-sm p-6 border-l-4 border-white"
                    style={{ borderRadius: 0 }}
                  >
                    <h3 className="font-bold text-xl mb-3">
                      Complete Integration
                    </h3>
                    <p className="text-white/90">
                      Seamlessly connect your warehouse operations with our
                      international shipping network for end-to-end supply chain
                      management.
                    </p>
                  </div>
                  <div
                    className="bg-white/10 backdrop-blur-sm p-6 border-l-4 border-white"
                    style={{ borderRadius: 0 }}
                  >
                    <h3 className="font-bold text-xl mb-3">
                      Scalable Solutions
                    </h3>
                    <p className="text-white/90">
                      Whether you're a small business or enterprise, our
                      flexible warehouse solutions grow with your needs.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => router.push("/contact")}
                    className="bg-white text-[#f97316] hover:bg-gray-100 font-bold py-4 px-10 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                    style={{ borderRadius: 0 }}
                  >
                    GET QUOTE
                  </button>
                  <Link
                    href="/shipment"
                    className="bg-transparent hover:bg-white/20 border-2 border-white text-white font-bold py-4 px-10 transition-all"
                    style={{ borderRadius: 0 }}
                  >
                    TRACK SHIPMENT
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12" data-aos="fade-up">
            <span
              className="inline-block px-4 py-1 bg-[#f97316]/10 text-[#f97316] font-medium mb-4"
              style={{ borderRadius: 0 }}
            >
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#f97316] mb-4">
              Advanced Warehouse Capabilities
            </h2>
            <div className="w-20 h-1 bg-[#f97316] mx-auto mb-6"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div
              className="bg-white border-2 border-gray-100 shadow-lg p-8 transition-all hover:shadow-xl hover:-translate-y-2 group"
              data-aos="fade-up"
              data-aos-delay="100"
              style={{ borderRadius: 0 }}
            >
              <div
                className="w-16 h-16 bg-gradient-to-br from-[#f97316] to-[#ea580c] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                style={{ borderRadius: 0 }}
              >
                <svg
                  className="w-8 h-8 text-white"
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
              <h3 className="text-xl font-bold text-[#f97316] mb-4">
                Secure & Monitored Facilities
              </h3>
              <p className="text-gray-700 leading-relaxed">
                State-of-the-art security systems with 24/7 monitoring, access
                control, and comprehensive insurance coverage. Your inventory is
                protected with advanced surveillance and fire suppression
                systems.
              </p>
            </div>

            {/* Feature 2 */}
            <div
              className="bg-white border-2 border-gray-100 shadow-lg p-8 transition-all hover:shadow-xl hover:-translate-y-2 group"
              data-aos="fade-up"
              data-aos-delay="200"
              style={{ borderRadius: 0 }}
            >
              <div
                className="w-16 h-16 bg-gradient-to-br from-[#fb923c] to-[#f97316] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                style={{ borderRadius: 0 }}
              >
                <svg
                  className="w-8 h-8 text-white"
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
              <h3 className="text-xl font-bold text-[#f97316] mb-4">
                Real-Time Inventory Management
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Advanced Warehouse Management System (WMS) provides real-time
                visibility into your inventory levels, order status, and
                warehouse operations. Integrated reporting and analytics for
                data-driven decisions.
              </p>
            </div>

            {/* Feature 3 */}
            <div
              className="bg-white border-2 border-gray-100 shadow-lg p-8 transition-all hover:shadow-xl hover:-translate-y-2 group"
              data-aos="fade-up"
              data-aos-delay="300"
              style={{ borderRadius: 0 }}
            >
              <div
                className="w-16 h-16 bg-gradient-to-br from-[#ea580c] to-[#c2410c] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                style={{ borderRadius: 0 }}
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#f97316] mb-4">
                Fast & Efficient Operations
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Optimized warehouse layouts and streamlined processes ensure
                quick order processing and fast turnaround times. Same-day
                fulfillment available for urgent orders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto" data-aos="fade-up">
          <div
            className="bg-gradient-to-br from-gray-50 to-white border-2 border-[#f97316]/20 p-10 md:p-16 shadow-xl"
            style={{ borderRadius: 0 }}
          >
            <div className="max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] to-[#c2410c] mb-6">
                Ready to Optimize Your Warehouse Operations?
              </h2>

              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Get a customized warehouse solution tailored to your business
                needs. Our team will assess your requirements and provide a
                comprehensive proposal with competitive pricing.
              </p>

              <p className="text-gray-700 mb-10 leading-relaxed">
                Join hundreds of businesses that trust SwiftPair Logistics for
                their warehouse and distribution needs. From secure storage to
                efficient fulfillment, we provide end-to-end solutions that
                integrate seamlessly with your supply chain.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => router.push("/contact")}
                  className="bg-gradient-to-r from-[#f97316] to-[#ea580c] hover:from-[#ea580c] hover:to-[#c2410c] text-white font-bold py-4 px-10 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center"
                  style={{ borderRadius: 0 }}
                >
                  <span>REQUEST QUOTE</span>
                  <svg
                    className="w-5 h-5 ml-2"
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
                <Link
                  href="/#track-shipment"
                  className="bg-white hover:bg-gray-50 border-2 border-[#f97316] text-[#f97316] font-bold py-4 px-10 transition-all flex items-center"
                  style={{ borderRadius: 0 }}
                >
                  <span>TRACK SHIPMENT</span>
                  <svg
                    className="w-5 h-5 ml-2"
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
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#f97316] mb-4">
              Warehouse Excellence by the Numbers
            </h2>
            <div className="w-20 h-1 bg-[#f97316] mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="text-center"
            >
              <div
                className="bg-white border-2 border-[#f97316]/20 shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-2"
                style={{ borderRadius: 0 }}
              >
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] to-[#fb923c] mb-3">
                  220+
                </div>
                <div className="text-gray-700 font-medium">
                  Countries Served
                </div>
                <div className="text-sm text-gray-500 mt-2">Global Network</div>
              </div>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="text-center"
            >
              <div
                className="bg-white border-2 border-[#f97316]/20 shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-2"
                style={{ borderRadius: 0 }}
              >
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] to-[#fb923c] mb-3">
                  25+
                </div>
                <div className="text-gray-700 font-medium">
                  Years Experience
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  Industry Leaders
                </div>
              </div>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="text-center"
            >
              <div
                className="bg-white border-2 border-[#f97316]/20 shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-2"
                style={{ borderRadius: 0 }}
              >
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] to-[#fb923c] mb-3">
                  24/7
                </div>
                <div className="text-gray-700 font-medium">
                  Access & Support
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  Always Available
                </div>
              </div>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="400"
              className="text-center"
            >
              <div
                className="bg-white border-2 border-[#f97316]/20 shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-2"
                style={{ borderRadius: 0 }}
              >
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] to-[#fb923c] mb-3">
                  99.8%
                </div>
                <div className="text-gray-700 font-medium">Accuracy Rate</div>
                <div className="text-sm text-gray-500 mt-2">
                  Precision Guaranteed
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Page;
