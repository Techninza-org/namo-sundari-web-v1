"use client";

import Image from "next/image";

export default function CartierHero() {
  return (
    <section className="relative w-full h-[90vh] bg-gradient-to-b from-white to-gray-900">
      {/* Background image */}
      <Image
        src="/wildstone.webp"
        alt="Father's Day by Cartier"
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />

      {/* Overlay for content */}
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-end items-center text-center pb-16 px-4 z-10">
        <h1 className="text-white text-2xl md:text-4xl font-semibold mb-3">
          FATHER’S DAY BY CARTIER
        </h1>
        <p className="text-white text-sm md:text-base max-w-xl mb-6">
          For a meaningful moment, the Maison presents the sweetest of gifts.
        </p>
        <button
          onClick={() => (window.location.href = "/shop")}
          className="px-6 py-2 border border-white text-white text-sm tracking-wide hover:bg-white hover:text-black transition"
        >
          SHOP THE SELECTION
        </button>
      </div>
    </section>
  );
}
