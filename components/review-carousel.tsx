"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const reviews = [
  {
    id: 1,
    name: "Priya Sharma",
    rating: 5,
    review:
      "The Mystic Rose Attar is absolutely divine! It's become part of my daily meditation ritual. The scent is pure and long-lasting. 🌹",
    product: "Mystic Rose Attar",
    location: "Mumbai",
  },
  {
    id: 2,
    name: "Arjun Patel",
    rating: 5,
    review:
      "As a Leo, the Royal Rose perfume speaks to my soul. The fragrance is bold yet elegant, perfect for special occasions. ✨",
    product: "Leo Royal Rose",
    location: "Delhi",
  },
  {
    id: 3,
    name: "Meera Krishnan",
    rating: 4,
    review:
      "The Sacred Sandalwood Oil has transformed my yoga practice. The aroma creates such a peaceful atmosphere. Highly recommended! 🧘‍♀️",
    product: "Sacred Sandalwood Oil",
    location: "Bangalore",
  },
  {
    id: 4,
    name: "Rahul Gupta",
    rating: 5,
    review:
      "Gifted the Lotus Incense Sticks to my mother, and she absolutely loves them. The fragrance fills the entire house with positivity. 🪷",
    product: "Lotus Incense Sticks",
    location: "Pune",
  },
  {
    id: 5,
    name: "Ananya Singh",
    rating: 5,
    review:
      "The Virgo Earth Essence is exactly what I needed - grounding and calming. It helps me stay centered throughout the day. 🌿",
    product: "Virgo Earth Essence",
    location: "Chennai",
  },
]

export default function ReviewCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="relative h-64 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Card className="h-full border-0 bg-white shadow-soft">
              <CardContent className="p-8 h-full flex flex-col justify-center text-center">
                {/* Rating Stars */}
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < reviews[currentIndex].rating ? "fill-brand-gold text-brand-gold" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <blockquote className="text-lg text-brand-charcoal mb-6 italic leading-relaxed">
                  "{reviews[currentIndex].review}"
                </blockquote>

                {/* Customer Info */}
                <div className="space-y-1">
                  <p className="font-semibold text-brand-brown text-lg">{reviews[currentIndex].name}</p>
                  <p className="text-sm text-brand-terracotta font-medium">{reviews[currentIndex].product}</p>
                  <p className="text-sm text-gray-500">{reviews[currentIndex].location}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-brand-brown" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
