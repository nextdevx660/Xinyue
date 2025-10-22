import { Libre_Baskerville } from "next/font/google";
import Image from "next/image";
import React from "react";
import WhatIOffer from "../_components/offer";
import GetInTouch from "../_components/GetInTouch";
import Footer from "../_components/Footer";
import Header from "../_components/Header";
import Link from "next/link";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Page() {
  return (
    <div>
      <Header />
      <div className="relative h-screen w-screen overflow-hidden">
        {/* Background Image */}
        <Image
          src="/xinyue.jpg"
          alt="Li Xinyue background"
          fill
          priority
          className="object-cover opacity-40 blur-sm"
        />

        {/* Subtle overlay tint */}
        <div className="absolute inset-0 bg-[#fbe3dc]/40" />

        {/* Main content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center space-y-6 z-20">
          {/* Welcome badge */}
          <div className="bg-[#f5c4b7] text-[#5b3b3d] px-6 py-2 rounded-full text-sm font-medium shadow-sm flex items-center gap-2">
            <span>✨</span> Welcome to My World
          </div>

          {/* Name */}
          <h1
            className={`text-6xl font-bold text-[#4e3b3b] tracking-wide ${libreBaskerville.className}`}
          >
            Li Xinyue
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-[#7a5957] font-medium">
            Beauty, Lifestyle & Inspiration from Shanghai
          </p>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <Link href={'/content'}>
              <button className="px-6 py-3 bg-[#f5c4b7] text-[#4e3b3b] font-medium rounded-xl hover:bg-[#f4b9ac] transition shadow-sm">
                Explore Free Content →
              </button>
            </Link>
            <Link href={'/about'}>
              <button className="px-6 py-3 bg-white/80 text-[#4e3b3b] font-medium rounded-xl hover:bg-white transition shadow-sm">
                Learn My Story
              </button>
            </Link>
          </div>
        </div>
      </div>
      <WhatIOffer />
      <GetInTouch />
      <Footer />
    </div>
  );
}
