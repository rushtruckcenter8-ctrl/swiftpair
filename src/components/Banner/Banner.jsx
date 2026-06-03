import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ArrowRight, Package, Globe, Clock, Shield } from "lucide-react";

function Banner({ spanText, h2Text, pText, img, button, location, height }) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: height || "calc(100vh - 90px)" }}
    >
      {/* Background Image with Enhanced Gradient */}
      <div className="absolute inset-0">
        <Image
          src={img}
          alt="Banner Image"
          fill
          className="object-cover scale-105 transition-transform duration-700 hover:scale-100"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(194, 65, 12, 0.95) 0%, rgba(234, 88, 12, 0.85) 25%, rgba(249, 115, 22, 0.6) 50%, rgba(0, 0, 0, 0.3) 100%)",
          }}
        />
        {/* Overlay pattern for texture */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "40px 40px"
        }} />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center h-full max-w-2xl">
          <span
            className="
              text-orange-300 font-semibold text-base md:text-lg mb-4 uppercase tracking-wider
              opacity-0 translate-y-8
              animate-[slideUp_0.8s_ease-out_0.2s_forwards]
            "
          >
            {spanText}
          </span>

          <h2
            className="
              text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6
              opacity-0 translate-y-8
              animate-[slideUp_0.8s_ease-out_0.4s_forwards]
              drop-shadow-lg
            "
          >
            {h2Text}
          </h2>

          <p
            className="
              text-gray-100 text-lg md:text-xl lg:text-2xl mb-10 leading-relaxed
              opacity-0 translate-y-8
              animate-[slideUp_0.8s_ease-out_0.6s_forwards]
              max-w-xl
            "
          >
            {pText}
          </p>

          <div
            className="
              opacity-0 translate-y-8
              animate-[slideUp_0.8s_ease-out_0.8s_forwards]
              flex flex-col sm:flex-row gap-4
            "
          >
            <Link
              href={location || "/contact"}
              className="
                inline-flex items-center justify-center px-8 py-4 bg-white text-[#f97316]
                font-semibold text-lg transition-all duration-300
                hover:bg-orange-50 hover:scale-105 hover:shadow-xl group
                border-2 border-transparent hover:border-orange-200
              "
            >
              {button || "Get a Quote"}
              <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/#track-shipment"
              className="
                inline-flex items-center justify-center px-8 py-4 bg-transparent text-white
                border-2 border-white font-semibold text-lg transition-all duration-300
                hover:bg-white hover:text-[#f97316] hover:scale-105 hover:shadow-xl group
              "
            >
              <Package className="mr-2 w-5 h-5" />
              Track Shipment
            </Link>
          </div>

          {/* Feature Icons */}
          <div
            className="
              mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6
              opacity-0 translate-y-8
              animate-[slideUp_0.8s_ease-out_1s_forwards]
            "
          >
            <div className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors">
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <Globe className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">Global Reach</span>
            </div>
            <div className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors">
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <Clock className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors">
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <Shield className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">Secure Delivery</span>
            </div>
            <div className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors">
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <Package className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">Real-Time Tracking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent opacity-20" />
    </div>
  );
}

export default Banner;
