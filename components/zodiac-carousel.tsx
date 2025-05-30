"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

const zodiacSigns = [
  { name: "Aries", symbol: "♈", element: "Fire", scent: "Energizing Citrus", color: "#C17A63" },
  { name: "Taurus", symbol: "♉", element: "Earth", scent: "Grounding Sandalwood", color: "#5F6F52" },
  { name: "Gemini", symbol: "♊", element: "Air", scent: "Fresh Mint", color: "#8B5E4C" },
  { name: "Cancer", symbol: "♋", element: "Water", scent: "Soothing Jasmine", color: "#D2C4B5" },
  { name: "Leo", symbol: "♌", element: "Fire", scent: "Royal Rose", color: "#C17A63" },
  { name: "Virgo", symbol: "♍", element: "Earth", scent: "Pure Lavender", color: "#5F6F52" },
  { name: "Libra", symbol: "♎", element: "Air", scent: "Balanced Bergamot", color: "#8B5E4C" },
  { name: "Scorpio", symbol: "♏", element: "Water", scent: "Mysterious Patchouli", color: "#D2C4B5" },
  { name: "Sagittarius", symbol: "♐", element: "Fire", scent: "Adventurous Sage", color: "#C17A63" },
  { name: "Capricorn", symbol: "♑", element: "Earth", scent: "Ambitious Cedar", color: "#5F6F52" },
  { name: "Aquarius", symbol: "♒", element: "Air", scent: "Innovative Eucalyptus", color: "#8B5E4C" },
  { name: "Pisces", symbol: "♓", element: "Water", scent: "Dreamy Ylang-Ylang", color: "#D2C4B5" },
]

export default function ZodiacCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 4

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsPerView >= zodiacSigns.length ? 0 : prev + itemsPerView))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - itemsPerView < 0 ? Math.max(0, zodiacSigns.length - itemsPerView) : prev - itemsPerView,
    )
  }

  const visibleSigns = zodiacSigns.slice(currentIndex, currentIndex + itemsPerView)

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          className="rounded-full border-brand-brown text-brand-brown hover:bg-brand-brown/5"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <div className="flex-1 mx-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleSigns.map((sign, index) => (
              <motion.div
                key={sign.name}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/zodiac?sign=${sign.name}`}>
                  <Card className="group cursor-pointer hover:shadow-hover transition-all duration-300 border border-brand-beige/50 bg-white">
                    <CardContent className="p-6 text-center">
                      <div
                        className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold"
                        style={{ backgroundColor: sign.color }}
                      >
                        {sign.symbol}
                      </div>
                      <h3 className="font-playfair text-xl font-semibold text-brand-brown mb-2">{sign.name}</h3>
                      <p className="text-xs text-brand-terracotta font-medium mb-2 uppercase tracking-wide">
                        {sign.element} Element
                      </p>
                      <p className="text-sm text-brand-charcoal/70 mb-4">{sign.scent}</p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-brand-brown text-brand-brown hover:bg-brand-brown/5 rounded-md group-hover:scale-105 transition-transform text-xs"
                      >
                        \
