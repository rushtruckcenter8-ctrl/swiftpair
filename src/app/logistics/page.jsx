"use client";

import Banner from "@/components/Banner/Banner";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Page() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    Aos.init({
      duration: 700,
      once: true,
      easing: "ease-out",
    });
  }, []);

  const phoneNumber = ""; // Replace with your phone number
  const preFilledMessage =
    "Hello! I need assistance with tracking my shipment. Thank you!";
  const encodedMessage = encodeURIComponent(preFilledMessage);
  const smsLink = `sms:${phoneNumber}?&body=${encodedMessage}`;

  const tabContent = [
    {
      title: "Parcel delivery",
      content:
        "Door-to-door parcel delivery for businesses and individuals — local and international.",
    },
    {
      title: "Parcels throughout Europe",
      content:
        "Full European coverage with real-time tracking and customs documentation.",
    },
    {
      title: "Freight",
      content:
        "Proven freight partnerships with end-to-end cargo management.",
    },
    {
      title: "Fulfillment services",
      content:
        "We store, pick, pack, and ship directly to your customers.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <Banner
        location={"/contact"}
        img={
          "/images_now/aerial-view-cargo-ship-cargo-container-harbor_335224-1380.avif"
        }
        h2Text={"Every Freight Mode. One Partner."}
        spanText={"Air. Ocean. Road. End to end."}
        pText={
          "Comprehensive freight solutions built for your business."
        }
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
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                </div>
                <span
                  className="px-4 py-1 bg-[#f97316]/10 text-[#f97316] font-medium text-sm"
                  style={{ borderRadius: 0 }}
                >
                  What We Do
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] to-[#c2410c] mb-8">
                Your Cargo, Our Responsibility.
              </h1>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed text-lg">
                    Air, ocean, and road freight — optimized for speed, cost, and reliability across 220+ destinations.
                  </p>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed">
                    From{" "}
                    <span className="font-semibold text-[#f97316]">
                      Full Container Load (FCL)
                    </span>{" "}
                    to{" "}
                    <span className="font-semibold text-[#f97316]">
                      Less than Container Load (LCL)
                    </span>
                    , real-time tracking, and seamless customs clearance — we handle it all.
                  </p>
                </div>
              </div>

              {/* Key Benefits Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t-2 border-gray-100">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#f97316] mb-2">
                    220+
                  </div>
                  <div className="text-sm text-gray-600">Destinations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#f97316] mb-2">
                    24/7
                  </div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#f97316] mb-2">
                    98%
                  </div>
                  <div className="text-sm text-gray-600">On-Time Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#f97316] mb-2">
                    25+
                  </div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
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
              Choose Your Freight Mode
            </h2>
            <div className="w-20 h-1 bg-[#f97316] mx-auto mb-6"></div>
            <div className="max-w-4xl mx-auto space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                Full container loads, LCL, air express, or road freight — we handle the right mode for every shipment.
              </p>
            </div>
          </div>

          {/* Service Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Air Freight Card */}
            <div
              className="bg-white border-2 border-gray-100 shadow-xl overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-2 group"
              data-aos="fade-up"
              data-aos-delay="100"
              style={{ borderRadius: 0 }}
            >
              <div className="bg-gradient-to-br from-[#f97316] to-[#ea580c] p-8 flex items-center justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-[#f97316]/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex items-center relative z-10">
                  <div
                    className="w-16 h-16 flex-shrink-0 mr-4 bg-white/20 flex items-center justify-center"
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
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">Air Freight</h3>
                </div>
              </div>
              <div className="p-8">
                <h4 className="font-bold text-[#f97316] mb-4 text-lg">
                  Priority air shipping, globally.
                </h4>
                <ul className="mb-8 space-y-3">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#f97316] mr-3 mt-0.5 flex-shrink-0"
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
                    <span className="text-gray-700">Door-to-door delivery</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#f97316] mr-3 mt-0.5 flex-shrink-0"
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
                    <span className="text-gray-700">
                      Door-to-airport service
                    </span>
                  </li>
                </ul>

                <h4 className="font-bold text-[#f97316] mb-4 text-lg">
                  Included Services
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#f97316] mr-3 mt-0.5 flex-shrink-0"
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
                    <span className="text-gray-700">Customs clearance</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#f97316] mr-3 mt-0.5 flex-shrink-0"
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
                    <span className="text-gray-700">
                      ATA carnet (temporary admission)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#f97316] mr-3 mt-0.5 flex-shrink-0"
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
                    <span className="text-gray-700">
                      Certificate of Origin legalization
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Ocean Freight Card */}
            <div
              className="bg-white border-2 border-gray-100 shadow-xl overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-2 group"
              data-aos="fade-up"
              data-aos-delay="200"
              style={{ borderRadius: 0 }}
            >
              <div className="bg-gradient-to-br from-[#fb923c] to-[#f97316] p-8 flex items-center justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-[#f97316]/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex items-center relative z-10">
                  <div
                    className="w-16 h-16 flex-shrink-0 mr-4 bg-white/20 flex items-center justify-center"
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
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Ocean Freight
                  </h3>
                </div>
              </div>
              <div className="p-8">
                <h4 className="font-bold text-[#f97316] mb-4 text-lg">
                  Flexible ocean freight, FCL and LCL.
                </h4>
                <ul className="mb-8 space-y-3">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#f97316] mr-3 mt-0.5 flex-shrink-0"
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
                    <span className="text-gray-700">
                      Full Container Load (FCL)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#f97316] mr-3 mt-0.5 flex-shrink-0"
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
                    <span className="text-gray-700">
                      Less than Container Load (LCL)
                    </span>
                  </li>
                </ul>

                <h4 className="font-bold text-[#f97316] mb-4 text-lg">
                  Included Services
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#f97316] mr-3 mt-0.5 flex-shrink-0"
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
                    <span className="text-gray-700">Customs clearance</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#f97316] mr-3 mt-0.5 flex-shrink-0"
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
                    <span className="text-gray-700">Pick-up and delivery</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#f97316] mr-3 mt-0.5 flex-shrink-0"
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
                    <span className="text-gray-700">
                      Cargo handling & moving
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#f97316] mr-3 mt-0.5 flex-shrink-0"
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
                    <span className="text-gray-700">
                      Certificate of Origin legalization
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Land Freight Card */}
            <div
              className="bg-white border-2 border-gray-100 shadow-xl overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-2 group"
              data-aos="fade-up"
              data-aos-delay="300"
              style={{ borderRadius: 0 }}
            >
              <div className="bg-gradient-to-br from-[#ea580c] to-[#c2410c] p-8 flex items-center justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-[#f97316]/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex items-center relative z-10">
                  <div
                    className="w-16 h-16 flex-shrink-0 mr-4 bg-white/20 flex items-center justify-center"
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
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">Land Freight</h3>
                </div>
              </div>
              <div className="p-8">
                <h4 className="font-bold text-[#f97316] mb-4 text-lg">
                  Dependable road freight, door to door.
                </h4>
                <ul className="mb-8 space-y-3">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#f97316] mr-3 mt-0.5 flex-shrink-0"
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
                    <span className="text-gray-700">Truckload (TL)</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#f97316] mr-3 mt-0.5 flex-shrink-0"
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
                    <span className="text-gray-700">
                      Less Than Truckload (LTL)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#f97316] mr-3 mt-0.5 flex-shrink-0"
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
                    <span className="text-gray-700">Pallet shipping</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#f97316] mr-3 mt-0.5 flex-shrink-0"
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
                    <span className="text-gray-700">
                      Oversized shipment solutions
                    </span>
                  </li>
                </ul>

                <h4 className="font-bold text-[#f97316] mb-4 text-lg">
                  Included Services
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#f97316] mr-3 mt-0.5 flex-shrink-0"
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
                    <span className="text-gray-700">Customs clearance</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#f97316] mr-3 mt-0.5 flex-shrink-0"
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
                    <span className="text-gray-700">
                      Certificate of Origin legalization
                    </span>
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
                  Ready to Optimize Your Supply Chain?
                </h2>

                <p className="mb-6 text-white/95 leading-relaxed text-lg max-w-4xl">
                  Tell us what you're moving and we'll build the most efficient route for it.
                </p>

                <div className="mb-10 grid md:grid-cols-2 gap-6">
                  <div
                    className="bg-white/10 backdrop-blur-sm p-6 border-l-4 border-white"
                    style={{ borderRadius: 0 }}
                  >
                    <h3 className="font-bold text-xl mb-3">Custom Solutions</h3>
                    <p className="text-white/90">
                      Built around your cargo and timeline.
                    </p>
                  </div>
                  <div
                    className="bg-white/10 backdrop-blur-sm p-6 border-l-4 border-white"
                    style={{ borderRadius: 0 }}
                  >
                    <h3 className="font-bold text-xl mb-3">
                      End-to-End Support
                    </h3>
                    <p className="text-white/90">
                      Support from first quote to final delivery.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => router.push("/contact")}
                    className="bg-white text-[#f97316] hover:bg-gray-100 font-bold py-4 px-10 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                    style={{ borderRadius: 0 }}
                  >
                    GET A QUOTE
                  </button>
                  <Link
                    href="/#track-shipment"
                    className="bg-transparent hover:bg-white/20 border-2 border-white text-white font-bold py-4 px-10 transition-all"
                    style={{ borderRadius: 0 }}
                  >
                    TRACK A SHIPMENT
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion Section */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Image */}
            <div
              className="relative h-64 md:h-full min-h-[400px] overflow-hidden shadow-2xl"
              data-aos="fade-right"
              style={{ borderRadius: 0 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#f97316]/90 to-[#ea580c]/70 z-10">
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-white text-3xl md:text-4xl font-bold mb-3">
                    Global Logistics Network
                  </h3>
                  <p className="text-white/90 text-lg">
                    Connecting businesses worldwide with seamless supply chain
                    solutions
                  </p>
                </div>
              </div>
              <img
                src="/images_now/aerial-view-cargo-ship-cargo-container-harbor_335224-1380.avif"
                alt="Global Logistics"
                fill
                className="object-cover w-full h-full"
              />
            </div>

            {/* Right Column - Accordion */}
            <div data-aos="fade-left">
              <div className="mb-8">
                <span
                  className="inline-block px-4 py-1 bg-[#f97316]/10 text-[#f97316] font-medium mb-4"
                  style={{ borderRadius: 0 }}
                >
                  Service Details
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-[#f97316] mb-2">
                  Everything We Cover
                </h3>
                <div className="w-20 h-1 bg-[#f97316] mb-6"></div>
              </div>
              <div
                className="bg-white shadow-xl overflow-hidden border-2 border-gray-100"
                style={{ borderRadius: 0 }}
              >
                {tabContent.map((tab, index) => (
                  <div
                    key={index}
                    className="border-b-2 border-gray-100 last:border-b-0"
                  >
                    <button
                      className="w-full text-left p-6 flex items-center justify-between focus:outline-none hover:bg-gray-50 transition-colors group"
                      onClick={() =>
                        setActiveTab(activeTab === index ? null : index)
                      }
                    >
                      <span className="font-semibold text-lg capitalize text-gray-800 group-hover:text-[#f97316] transition-colors">
                        {tab.title}
                      </span>
                      <span
                        className={`text-[#f97316] transition-transform ${
                          activeTab === index ? "rotate-180" : ""
                        }`}
                      >
                        {activeTab === index ? (
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        )}
                      </span>
                    </button>

                    {activeTab === index && (
                      <div className="p-6 pt-0 text-gray-700 bg-gradient-to-b from-gray-50 to-white leading-relaxed">
                        <p className="text-base">{tab.content}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supply Chain Section */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div
            className="bg-gradient-to-br from-gray-50 to-white border-2 border-[#f97316]/20 shadow-xl overflow-hidden"
            data-aos="fade-up"
            style={{ borderRadius: 0 }}
          >
            <div className="p-10 md:p-16">
              <div className="max-w-4xl mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-[#f97316] mb-6">
                  Total Supply Chain Visibility.
                </h2>
                <p className="text-gray-700 mb-10 text-lg leading-relaxed">
                  As your Lead Logistics Provider, we take ownership of your entire supply chain — from strategy to final-mile delivery.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div
                  className="bg-white border-2 border-[#f97316]/20 p-8 shadow-lg"
                  style={{ borderRadius: 0 }}
                >
                  <div className="flex items-center mb-6">
                    <div
                      className="w-12 h-12 bg-gradient-to-br from-[#f97316] to-[#ea580c] flex items-center justify-center mr-4"
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
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-[#f97316] uppercase">
                      Strategic Planning
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <svg
                        className="w-6 h-6 text-[#f97316] mr-3 mt-0.5 flex-shrink-0"
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
                      <span className="text-gray-700">
                        Global and local logistics strategy
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-6 h-6 text-[#f97316] mr-3 mt-0.5 flex-shrink-0"
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
                      <span className="text-gray-700">
                        End-to-end visibility and control
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-6 h-6 text-[#f97316] mr-3 mt-0.5 flex-shrink-0"
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
                      <span className="text-gray-700">
                        Clean, validated logistics data
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-6 h-6 text-[#f97316] mr-3 mt-0.5 flex-shrink-0"
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
                      <span className="text-gray-700">
                        Regulatory compliance
                      </span>
                    </li>
                  </ul>
                </div>

                <div
                  className="bg-white border-2 border-[#f97316]/20 p-8 shadow-lg"
                  style={{ borderRadius: 0 }}
                >
                  <div className="flex items-center mb-6">
                    <div
                      className="w-12 h-12 bg-gradient-to-br from-[#fb923c] to-[#f97316] flex items-center justify-center mr-4"
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
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-[#f97316] uppercase">
                      Operational Execution
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <svg
                        className="w-6 h-6 text-[#f97316] mr-3 mt-0.5 flex-shrink-0"
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
                      <span className="text-gray-700">
                        Streamlined process execution
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-6 h-6 text-[#f97316] mr-3 mt-0.5 flex-shrink-0"
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
                      <span className="text-gray-700">
                        Consolidation opportunities identified
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-6 h-6 text-[#f97316] mr-3 mt-0.5 flex-shrink-0"
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
                      <span className="text-gray-700">
                        Continuous improvement initiatives
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-6 h-6 text-[#f97316] mr-3 mt-0.5 flex-shrink-0"
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
                      <span className="text-gray-700">
                        Air-to-sea and mode shifting
                      </span>
                    </li>
                  </ul>
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
