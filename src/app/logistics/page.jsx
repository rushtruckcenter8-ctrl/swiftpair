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
        "We have been moving your goods since 1990 and are committed to providing you with a great service every time",
    },
    {
      title: "Parcels throughout Europe",
      content:
        "Send parcels throughout Europe with our DPD Classic service—from Spain to Denmark, Germany to Estonia, the Netherlands to Austria, and more. We also offer domestic services within each of these countries; for example, from one address in France to another.",
    },
    {
      title: "Freight",
      content:
        "We combine longstanding freight expertise with a suite of freight services tailored to your shipping needs. Our relationship with international carriers and shipping companies, following over 20 years in the freight forwarding business, allows us to negotiate the best possible rates.",
    },
    {
      title: "Fulfillment services",
      content:
        "With fulfilment services from Europa Lieferung Express, we'll store your inventory at our depot and ship out to your customers. It saves time and effort on your part, and allows your business to stay flexible and responsive as your consumer base grows.",
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
        h2Text={"Global Logistics Solutions"}
        spanText={"End-to-End Supply Chain Management"}
        pText={
          "Streamline your operations with our comprehensive logistics services"
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
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                </div>
                <span
                  className="px-4 py-1 bg-[#0891b2]/10 text-[#0891b2] font-medium text-sm"
                  style={{ borderRadius: 0 }}
                >
                  Logistics Excellence
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0891b2] to-[#155e75] mb-8">
                Comprehensive Global Logistics & Supply Chain Solutions
              </h1>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed text-lg">
                    Track-Global Logistics delivers end-to-end logistics solutions
                    that optimize your supply chain operations. Our
                    comprehensive services span air, ocean, and ground freight
                    forwarding, ensuring reliable and efficient transportation
                    for all your shipments.
                  </p>
                  <p className="leading-relaxed">
                    With over{" "}
                    <span className="font-semibold text-[#0891b2]">
                      25 years of experience
                    </span>{" "}
                    and a network covering{" "}
                    <span className="font-semibold text-[#0891b2]">
                      220+ countries
                    </span>
                    , we provide tailored logistics solutions that adapt to your
                    business needs.
                  </p>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed">
                    Whether you need{" "}
                    <span className="font-semibold text-[#0891b2]">
                      Full Container Load (FCL)
                    </span>{" "}
                    or{" "}
                    <span className="font-semibold text-[#0891b2]">
                      Less than Container Load (LCL)
                    </span>{" "}
                    services, our flexible approach ensures secure, reliable,
                    and cost-effective freight forwarding.
                  </p>
                  <p className="leading-relaxed">
                    Our advanced logistics technology provides real-time
                    tracking, automated documentation, and seamless customs
                    clearance, streamlining your entire supply chain process.
                  </p>
                </div>
              </div>

              {/* Key Benefits Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t-2 border-gray-100">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#0891b2] mb-2">
                    220+
                  </div>
                  <div className="text-sm text-gray-600">Destinations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#0891b2] mb-2">
                    24/7
                  </div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#0891b2] mb-2">
                    98%
                  </div>
                  <div className="text-sm text-gray-600">On-Time Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#0891b2] mb-2">
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
              className="inline-block px-4 py-1 bg-[#0891b2]/10 text-[#0891b2] font-medium mb-4"
              style={{ borderRadius: 0 }}
            >
              Our Services
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0891b2] mb-6">
              Multi-Modal Freight Solutions
            </h2>
            <div className="w-20 h-1 bg-[#0891b2] mx-auto mb-6"></div>
            <div className="max-w-4xl mx-auto space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                From cross-border shipments to streamlined pallet services,
                parcel delivery, and full or partial container loads, SwiftTrack
                Express provides comprehensive logistics solutions tailored to
                your business needs.
              </p>
              <p>
                Our expert logistics team designs custom freight forwarding
                strategies, selecting optimal transport modes and ensuring
                timely delivery. We combine industry expertise with cutting-edge
                technology to deliver efficient, reliable solutions for all your
                shipping requirements.
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
              <div className="bg-gradient-to-br from-[#0891b2] to-[#0e7490] p-8 flex items-center justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-[#0891b2]/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
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
                <h4 className="font-bold text-[#0891b2] mb-4 text-lg">
                  International Air Freight Options
                </h4>
                <ul className="mb-8 space-y-3">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#0891b2] mr-3 mt-0.5 flex-shrink-0"
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
                      className="w-5 h-5 text-[#0891b2] mr-3 mt-0.5 flex-shrink-0"
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

                <h4 className="font-bold text-[#0891b2] mb-4 text-lg">
                  Included Services
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#0891b2] mr-3 mt-0.5 flex-shrink-0"
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
                      className="w-5 h-5 text-[#0891b2] mr-3 mt-0.5 flex-shrink-0"
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
                      className="w-5 h-5 text-[#0891b2] mr-3 mt-0.5 flex-shrink-0"
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
              <div className="bg-gradient-to-br from-[#06b6d4] to-[#0891b2] p-8 flex items-center justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-[#0891b2]/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
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
                <h4 className="font-bold text-[#0891b2] mb-4 text-lg">
                  International Ocean Freight Options
                </h4>
                <ul className="mb-8 space-y-3">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#0891b2] mr-3 mt-0.5 flex-shrink-0"
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
                      className="w-5 h-5 text-[#0891b2] mr-3 mt-0.5 flex-shrink-0"
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

                <h4 className="font-bold text-[#0891b2] mb-4 text-lg">
                  Included Services
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#0891b2] mr-3 mt-0.5 flex-shrink-0"
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
                      className="w-5 h-5 text-[#0891b2] mr-3 mt-0.5 flex-shrink-0"
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
                      className="w-5 h-5 text-[#0891b2] mr-3 mt-0.5 flex-shrink-0"
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
                      className="w-5 h-5 text-[#0891b2] mr-3 mt-0.5 flex-shrink-0"
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
              <div className="bg-gradient-to-br from-[#0e7490] to-[#155e75] p-8 flex items-center justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-[#0891b2]/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
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
                <h4 className="font-bold text-[#0891b2] mb-4 text-lg">
                  Ground Transportation Options
                </h4>
                <ul className="mb-8 space-y-3">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#0891b2] mr-3 mt-0.5 flex-shrink-0"
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
                      className="w-5 h-5 text-[#0891b2] mr-3 mt-0.5 flex-shrink-0"
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
                      className="w-5 h-5 text-[#0891b2] mr-3 mt-0.5 flex-shrink-0"
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
                      className="w-5 h-5 text-[#0891b2] mr-3 mt-0.5 flex-shrink-0"
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

                <h4 className="font-bold text-[#0891b2] mb-4 text-lg">
                  Included Services
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#0891b2] mr-3 mt-0.5 flex-shrink-0"
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
                      className="w-5 h-5 text-[#0891b2] mr-3 mt-0.5 flex-shrink-0"
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
      <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-[#0e7490] via-[#0891b2] to-[#06b6d4]">
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
                  Expert Logistics Consultants Ready to Help
                </h2>

                <p className="mb-6 text-white/95 leading-relaxed text-lg max-w-4xl">
                  Need more information about our logistics and shipping
                  services? Contact our expert team today. Our logistics
                  consultants will discuss your specific requirements, provide
                  strategic insights, and answer all your questions. With our
                  commitment to excellence and customer satisfaction, trust
                  Track-Global Logistics to deliver reliable, efficient solutions
                  tailored to your business needs.
                </p>

                <div className="mb-10 grid md:grid-cols-2 gap-6">
                  <div
                    className="bg-white/10 backdrop-blur-sm p-6 border-l-4 border-white"
                    style={{ borderRadius: 0 }}
                  >
                    <h3 className="font-bold text-xl mb-3">Custom Solutions</h3>
                    <p className="text-white/90">
                      Every business is unique. Our team designs logistics
                      strategies specifically tailored to your operational
                      requirements and growth objectives.
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
                      From initial consultation to final delivery, we provide
                      comprehensive support throughout your entire logistics
                      journey.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => router.push("/contact")}
                    className="bg-white text-[#0891b2] hover:bg-gray-100 font-bold py-4 px-10 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                    style={{ borderRadius: 0 }}
                  >
                    GET EXPERT ADVICE
                  </button>
                  <Link
                    href="/#track-shipment"
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
              <div className="absolute inset-0 bg-gradient-to-r from-[#0891b2]/90 to-[#0e7490]/70 z-10">
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
                  className="inline-block px-4 py-1 bg-[#0891b2]/10 text-[#0891b2] font-medium mb-4"
                  style={{ borderRadius: 0 }}
                >
                  Service Details
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-[#0891b2] mb-2">
                  Comprehensive Logistics Services
                </h3>
                <div className="w-20 h-1 bg-[#0891b2] mb-6"></div>
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
                      <span className="font-semibold text-lg capitalize text-gray-800 group-hover:text-[#0891b2] transition-colors">
                        {tab.title}
                      </span>
                      <span
                        className={`text-[#0891b2] transition-transform ${
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
            className="bg-gradient-to-br from-gray-50 to-white border-2 border-[#0891b2]/20 shadow-xl overflow-hidden"
            data-aos="fade-up"
            style={{ borderRadius: 0 }}
          >
            <div className="p-10 md:p-16">
              <div className="max-w-4xl mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-[#0891b2] mb-6">
                  Advanced Supply Chain Management Solutions
                </h2>
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  In today's complex global marketplace, effective supply chain
                  control and visibility are critical for maintaining
                  competitive advantage. Companies must have real-time insights
                  into processes, data flows, and shipment status to optimize
                  operations and reduce costs.
                </p>

                <p className="text-gray-700 mb-10 text-lg leading-relaxed">
                  Track-Global Logistics offers a comprehensive Lead Logistics
                  Provider (LLP/4PL) solution designed to address these
                  challenges and deliver measurable results:
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div
                  className="bg-white border-2 border-[#0891b2]/20 p-8 shadow-lg"
                  style={{ borderRadius: 0 }}
                >
                  <div className="flex items-center mb-6">
                    <div
                      className="w-12 h-12 bg-gradient-to-br from-[#0891b2] to-[#0e7490] flex items-center justify-center mr-4"
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
                    <h3 className="text-2xl font-bold text-[#0891b2] uppercase">
                      Strategic Approach
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <svg
                        className="w-6 h-6 text-[#0891b2] mr-3 mt-0.5 flex-shrink-0"
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
                        Global, regional, and local logistics strategies
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-6 h-6 text-[#0891b2] mr-3 mt-0.5 flex-shrink-0"
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
                        End-to-end supply chain visibility and control
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-6 h-6 text-[#0891b2] mr-3 mt-0.5 flex-shrink-0"
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
                        Data quality assurance and validation
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-6 h-6 text-[#0891b2] mr-3 mt-0.5 flex-shrink-0"
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
                        Proactive management of regulatory changes
                      </span>
                    </li>
                  </ul>
                </div>

                <div
                  className="bg-white border-2 border-[#0891b2]/20 p-8 shadow-lg"
                  style={{ borderRadius: 0 }}
                >
                  <div className="flex items-center mb-6">
                    <div
                      className="w-12 h-12 bg-gradient-to-br from-[#06b6d4] to-[#0891b2] flex items-center justify-center mr-4"
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
                    <h3 className="text-2xl font-bold text-[#0891b2] uppercase">
                      Operational Planning
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <svg
                        className="w-6 h-6 text-[#0891b2] mr-3 mt-0.5 flex-shrink-0"
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
                        Streamlined process management and optimization
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-6 h-6 text-[#0891b2] mr-3 mt-0.5 flex-shrink-0"
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
                        Identification of consolidation opportunities
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-6 h-6 text-[#0891b2] mr-3 mt-0.5 flex-shrink-0"
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
                        className="w-6 h-6 text-[#0891b2] mr-3 mt-0.5 flex-shrink-0"
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
                        Strategic transport mode optimization (air to sea
                        migration)
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
