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
  const navigate = useRouter();

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
    <>
      <Navbar />
      <Banner
        img={
          "/images_now/african-american-worker-writing-inventory-list-while-checking-stock-storage-room_637285-4716.jpg"
        }
        h2Text={"About Track-Global Logistics"}
        location={""}
        spanText={"Your Trusted Logistics Partner Since 1995"}
      />

      {/* Introduction Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div
            className="bg-white shadow-2xl overflow-hidden border-2 border-gray-100"
            data-aos="fade-up"
            style={{ borderRadius: 0 }}
          >
            <div className="p-10 md:p-16 bg-gradient-to-br from-[#0e7490] via-[#0891b2] to-[#06b6d4] text-white relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-96 h-96 bg-white/5 -translate-y-1/2 translate-x-1/2"
                style={{ borderRadius: 0 }}
              ></div>
              <div
                className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 translate-y-1/2 -translate-x-1/2"
                style={{ borderRadius: 0 }}
              ></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-12 h-12 bg-white/20 flex items-center justify-center"
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
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <span
                    className="px-4 py-1 bg-white/20 text-white font-medium text-sm"
                    style={{ borderRadius: 0 }}
                  >
                    Our Mission
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Your Trusted Partner for Global Deliveries
                </h2>
                <div className="w-20 h-1 bg-cyan-300 mb-8"></div>
                <div className="md:max-w-4xl">
                  <p className="text-xl mb-6 leading-relaxed text-white/95">
                    At Track-Global Logistics Courier, every package receives
                    meticulous attention and care, ensuring complete
                    satisfaction for deliveries both locally and globally. Our
                    commitment extends beyond shipping—we create seamless,
                    customized delivery experiences tailored to your unique
                    requirements.
                  </p>
                  <p className="text-xl mb-10 leading-relaxed text-white/95">
                    What sets us apart? A passionate team of logistics experts
                    dedicated to ensuring your shipments arrive safely and on
                    time. We honor our commitments and help you fulfill yours,
                    building lasting partnerships through reliability and
                    excellence.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => navigate.push("/contact")}
                      className="bg-white text-[#0891b2] hover:bg-gray-100 font-bold py-4 px-10 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
                      style={{ borderRadius: 0 }}
                    >
                      CONTACT US TODAY
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
                      className="border-2 border-white hover:bg-white hover:text-[#0891b2] text-white font-bold py-4 px-10 transition-all flex items-center justify-center"
                      style={{ borderRadius: 0 }}
                    >
                      TRACK SHIPMENT
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
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative" data-aos="fade-right">
              <div
                className="absolute -top-6 -left-6 w-64 h-64 bg-[#0891b2]/10 z-0"
                style={{ borderRadius: 0 }}
              ></div>
              <div
                className="absolute -bottom-6 -right-6 w-48 h-48 bg-cyan-400/20 z-0"
                style={{ borderRadius: 0 }}
              ></div>
              <div className="relative z-10">
                <Image
                  width={600}
                  height={600}
                  src="/images_now/african-american-deliverer-using-digital-tablet-while-unloading-packages-from-van_637285-2186.jpg"
                  alt="Track-Global Logistics Courier Team"
                  className="shadow-2xl"
                  style={{ borderRadius: 0 }}
                />
                <div
                  className="absolute bottom-0 right-0 bg-gradient-to-r from-[#0891b2] to-[#0e7490] text-white font-bold py-4 px-8 shadow-xl"
                  style={{ borderRadius: 0 }}
                >
                  <div className="text-2xl mb-1">Since 1995</div>
                  <div className="text-sm opacity-90">
                    29 Years of Excellence
                  </div>
                </div>
              </div>
            </div>

            <div data-aos="fade-left">
              <div className="mb-6">
                <span
                  className="inline-block px-4 py-1 bg-[#0891b2]/10 text-[#0891b2] font-medium mb-4"
                  style={{ borderRadius: 0 }}
                >
                  Our Story
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#0891b2] to-[#155e75]">
                  A Success Story Spanning Three Decades
                </h2>
                <div className="w-20 h-1 bg-[#0891b2] mb-8"></div>
              </div>

              <div className="space-y-6 text-gray-700 mb-8">
                <p className="leading-relaxed text-lg">
                  Founded in the vibrant city of Montreal in 1995, SwiftTrack
                  Express Courier quickly established itself as a leader in
                  express delivery services. What began as a local courier
                  company has grown into an international logistics powerhouse.
                </p>
                <p className="leading-relaxed">
                  With over{" "}
                  <span className="font-semibold text-[#0891b2]">
                    25 years of experience
                  </span>
                  , we now serve more than{" "}
                  <span className="font-semibold text-[#0891b2]">
                    220 destinations worldwide
                  </span>
                  . Our reputation is built on reliability, efficiency, and an
                  unwavering commitment to honoring our promises while
                  prioritizing the well-being of our team.
                </p>
                <p className="leading-relaxed">
                  At Track-Global Logistics, we adapt to your unique shipping
                  requirements, providing premium courier services across
                  diverse industries including manufacturing, textiles,
                  automotive, furniture, engineering, and architecture.
                </p>
                <p className="leading-relaxed">
                  We're proud to be the trusted carrier for prestigious
                  institutions including Quebec universities, the Quebec
                  government, the Quebec Health Network, and many more. Our
                  specialized expertise in transporting valuable items,
                  including works of art, ensures the safety and security of
                  your most precious shipments.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div
                  className="bg-gradient-to-br from-[#0891b2]/10 to-[#06b6d4]/10 p-6 border-2 border-[#0891b2]/20"
                  style={{ borderRadius: 0 }}
                >
                  <div
                    className="bg-gradient-to-br from-[#0891b2] to-[#0e7490] text-white p-4 mb-4 flex items-center justify-center w-16 h-16"
                    style={{ borderRadius: 0 }}
                  >
                    <svg
                      className="w-8 h-8"
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
                  <h3 className="font-bold text-[#0891b2] mb-2 text-lg">
                    Trusted Worldwide
                  </h3>
                  <p className="text-sm text-gray-600">
                    220+ global destinations
                  </p>
                </div>
                <div
                  className="bg-gradient-to-br from-[#0891b2]/10 to-[#06b6d4]/10 p-6 border-2 border-[#0891b2]/20"
                  style={{ borderRadius: 0 }}
                >
                  <div
                    className="bg-gradient-to-br from-[#06b6d4] to-[#0891b2] text-white p-4 mb-4 flex items-center justify-center w-16 h-16"
                    style={{ borderRadius: 0 }}
                  >
                    <svg
                      className="w-8 h-8"
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
                  <h3 className="font-bold text-[#0891b2] mb-2 text-lg">
                    On-Time Delivery
                  </h3>
                  <p className="text-sm text-gray-600">98%+ success rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-[#0e7490] via-[#0891b2] to-[#06b6d4] text-white">
        <div className="max-w-7xl mx-auto text-center" data-aos="fade-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Excellence in Numbers
          </h2>
          <div className="w-20 h-1 bg-cyan-300 mx-auto mb-12"></div>
          <p className="max-w-3xl mx-auto text-white/90 text-lg mb-12">
            Our commitment to reliability and customer satisfaction is reflected
            in every statistic. Join thousands of satisfied customers who trust
            Track-Global Logistics for their shipping needs.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div
              className="bg-white/10 p-8 backdrop-blur-sm hover:bg-white/20 transition-all hover:-translate-y-2 border-2 border-white/20"
              style={{ borderRadius: 0 }}
            >
              <h3 className="text-5xl font-bold text-cyan-300 mb-3">12M+</h3>
              <p className="text-sm text-white/90 leading-relaxed">
                Orders processed with unwavering dedication
              </p>
            </div>

            <div
              className="bg-white/10 p-8 backdrop-blur-sm hover:bg-white/20 transition-all hover:-translate-y-2 border-2 border-white/20"
              style={{ borderRadius: 0 }}
            >
              <h3 className="text-5xl font-bold text-cyan-300 mb-3">98%</h3>
              <p className="text-sm text-white/90 leading-relaxed">
                On-time delivery rate – Your time matters
              </p>
            </div>

            <div
              className="bg-white/10 p-8 backdrop-blur-sm hover:bg-white/20 transition-all hover:-translate-y-2 border-2 border-white/20"
              style={{ borderRadius: 0 }}
            >
              <h3 className="text-5xl font-bold text-cyan-300 mb-3">350+</h3>
              <p className="text-sm text-white/90 leading-relaxed">
                Professional delivery drivers across our network
              </p>
            </div>

            <div
              className="bg-white/10 p-8 backdrop-blur-sm hover:bg-white/20 transition-all hover:-translate-y-2 border-2 border-white/20"
              style={{ borderRadius: 0 }}
            >
              <h3 className="text-5xl font-bold text-cyan-300 mb-3">250K+</h3>
              <p className="text-sm text-white/90 leading-relaxed">
                Satisfied customers – Join our growing family
              </p>
            </div>

            <div
              className="bg-white/10 p-8 backdrop-blur-sm hover:bg-white/20 transition-all hover:-translate-y-2 border-2 border-white/20"
              style={{ borderRadius: 0 }}
            >
              <h3 className="text-5xl font-bold text-cyan-300 mb-3">4.8/5</h3>
              <p className="text-sm text-white/90 leading-relaxed">
                Average rating on Google – Trusted by thousands
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <span
              className="inline-block px-4 py-1 bg-[#0891b2]/10 text-[#0891b2] font-medium mb-4"
              style={{ borderRadius: 0 }}
            >
              Our Approach
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#0891b2] to-[#155e75]">
              Adaptable Solutions for Every Challenge
            </h2>
            <div className="w-20 h-1 bg-[#0891b2] mx-auto mb-8"></div>
            <p className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed">
              Your challenge is our mission! At Track-Global Logistics, we
              understand that every delivery is unique. We adapt to your
              specific shipping needs with custom courier solutions. Our expert
              team is ready to meet the transport and delivery requirements of
              both standard and specialized packages.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div
              className="bg-white border-2 border-gray-100 shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-2 group"
              data-aos="fade-up"
              data-aos-delay="100"
              style={{ borderRadius: 0 }}
            >
              <div
                className="bg-gradient-to-br from-[#0891b2] to-[#0e7490] p-5 w-20 h-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                style={{ borderRadius: 0 }}
              >
                <svg
                  className="w-10 h-10 text-white"
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
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#0891b2]">
                Custom Solutions
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                We tailor our services to meet your unique shipping
                requirements, ensuring your packages are delivered exactly how
                you need them, when you need them.
              </p>
              <div className="flex items-center text-[#0891b2] font-semibold group-hover:gap-3 transition-all">
                <span>Learn more</span>
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
              </div>
            </div>

            <div
              className="bg-white border-2 border-gray-100 shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-2 group"
              data-aos="fade-up"
              data-aos-delay="200"
              style={{ borderRadius: 0 }}
            >
              <div
                className="bg-gradient-to-br from-[#06b6d4] to-[#0891b2] p-5 w-20 h-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                style={{ borderRadius: 0 }}
              >
                <svg
                  className="w-10 h-10 text-white"
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
              <h3 className="text-2xl font-bold mb-4 text-[#0891b2]">
                Global Network
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Our extensive international network spans over 220 destinations
                worldwide, enabling efficient and reliable delivery of your
                packages anywhere on the globe.
              </p>
              <div className="flex items-center text-[#0891b2] font-semibold group-hover:gap-3 transition-all">
                <span>Learn more</span>
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
              </div>
            </div>

            <div
              className="bg-white border-2 border-gray-100 shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-2 group"
              data-aos="fade-up"
              data-aos-delay="300"
              style={{ borderRadius: 0 }}
            >
              <div
                className="bg-gradient-to-br from-[#0e7490] to-[#155e75] p-5 w-20 h-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                style={{ borderRadius: 0 }}
              >
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#0891b2]">
                Expert Support
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Our dedicated team of logistics experts is available 24/7 to
                assist you with any shipping challenges, providing personalized
                support and strategic guidance.
              </p>
              <div className="flex items-center text-[#0891b2] font-semibold group-hover:gap-3 transition-all">
                <span>Learn more</span>
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
              </div>
            </div>
          </div>

          <div
            className="bg-gradient-to-br from-[#0e7490] via-[#0891b2] to-[#06b6d4] shadow-2xl overflow-hidden border-2 border-white/20"
            data-aos="fade-up"
            style={{ borderRadius: 0 }}
          >
            <div className="p-10 md:p-16 flex flex-col md:flex-row items-center relative">
              <div
                className="absolute top-0 right-0 w-64 h-64 bg-white/5 -translate-y-1/2 translate-x-1/2"
                style={{ borderRadius: 0 }}
              ></div>
              <div
                className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 translate-y-1/2 -translate-x-1/2"
                style={{ borderRadius: 0 }}
              ></div>

              <div className="md:w-2/3 text-white mb-8 md:mb-0 md:pr-12 relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold mb-6">
                  More Than a Courier Company – Your Strategic Logistics Partner
                </h3>
                <p className="mb-8 text-lg text-white/95 leading-relaxed">
                  Contact us today and discover the Track-Global Logistics
                  difference. Our expert team is ready to provide you with the
                  best shipping solutions tailored to your specific needs,
                  backed by decades of experience and a commitment to
                  excellence.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => navigate.push("/contact")}
                    className="bg-white text-[#0891b2] hover:bg-gray-100 font-bold py-4 px-10 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
                    style={{ borderRadius: 0 }}
                  >
                    CONTACT US TODAY
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
                    className="border-2 border-white hover:bg-white hover:text-[#0891b2] text-white font-bold py-4 px-10 transition-all flex items-center justify-center"
                    style={{ borderRadius: 0 }}
                  >
                    TRACK SHIPMENT
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
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Page;
