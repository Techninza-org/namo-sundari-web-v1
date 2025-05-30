"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ProductCard from "@/components/product-card"

const zodiacSigns = [
  {
    name: "Aries",
    symbol: "♈",
    element: "Fire",
    dates: "Mar 21 - Apr 19",
    scent: "Energizing Citrus",
    color: "#FF6B6B",
    description: "Bold and energetic, Aries needs invigorating scents that match their fiery spirit.",
    traits: ["Leadership", "Courage", "Enthusiasm", "Independence"],
    products: [
      {
        id: 101,
        name: "Aries Fire Perfume",
        price: 1899,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 89,
        isNew: false,
        category: "Zodiac Perfume",
        description: "Bold and energetic scent for Aries souls",
      },
      {
        id: 102,
        name: "Warrior's Courage Attar",
        price: 2299,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 67,
        isNew: true,
        category: "Attar",
        description: "Empowering blend for natural leaders",
      },
    ],
  },
  {
    name: "Taurus",
    symbol: "♉",
    element: "Earth",
    dates: "Apr 20 - May 20",
    scent: "Grounding Sandalwood",
    color: "#4ECDC4",
    description: "Stable and sensual, Taurus appreciates rich, earthy fragrances that provide comfort.",
    traits: ["Stability", "Sensuality", "Patience", "Luxury"],
    products: [
      {
        id: 201,
        name: "Taurus Earth Essence",
        price: 2099,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 134,
        isNew: false,
        category: "Zodiac Perfume",
        description: "Grounding sandalwood for stable souls",
      },
    ],
  },
  {
    name: "Gemini",
    symbol: "♊",
    element: "Air",
    dates: "May 21 - Jun 20",
    scent: "Fresh Mint",
    color: "#45B7D1",
    description: "Curious and adaptable, Gemini loves fresh, airy scents that stimulate the mind.",
    traits: ["Curiosity", "Adaptability", "Communication", "Wit"],
    products: [
      {
        id: 301,
        name: "Gemini Air Breeze",
        price: 1799,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.6,
        reviews: 98,
        isNew: true,
        category: "Zodiac Perfume",
        description: "Fresh mint essence for curious minds",
      },
    ],
  },
  {
    name: "Cancer",
    symbol: "♋",
    element: "Water",
    dates: "Jun 21 - Jul 22",
    scent: "Soothing Jasmine",
    color: "#96CEB4",
    description: "Emotional and nurturing, Cancer connects with gentle, comforting floral scents.",
    traits: ["Nurturing", "Intuition", "Emotion", "Protection"],
    products: [
      {
        id: 401,
        name: "Cancer Moon Jasmine",
        price: 2199,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 156,
        isNew: false,
        category: "Zodiac Perfume",
        description: "Soothing jasmine for nurturing souls",
      },
    ],
  },
  {
    name: "Leo",
    symbol: "♌",
    element: "Fire",
    dates: "Jul 23 - Aug 22",
    scent: "Royal Rose",
    color: "#FFEAA7",
    description: "Regal and confident, Leo deserves luxurious, attention-commanding fragrances.",
    traits: ["Confidence", "Generosity", "Leadership", "Drama"],
    products: [
      {
        id: 501,
        name: "Leo Royal Rose",
        price: 2499,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 203,
        isNew: true,
        category: "Zodiac Perfume",
        description: "Majestic rose blend for Leo royalty",
      },
    ],
  },
  {
    name: "Virgo",
    symbol: "♍",
    element: "Earth",
    dates: "Aug 23 - Sep 22",
    scent: "Pure Lavender",
    color: "#DDA0DD",
    description: "Practical and pure, Virgo appreciates clean, healing scents that promote clarity.",
    traits: ["Perfectionism", "Healing", "Service", "Analysis"],
    products: [
      {
        id: 601,
        name: "Virgo Earth Essence",
        price: 1799,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 145,
        isNew: true,
        category: "Zodiac Perfume",
        description: "Pure lavender for perfectionist souls",
      },
    ],
  },
  {
    name: "Libra",
    symbol: "♎",
    element: "Air",
    dates: "Sep 23 - Oct 22",
    scent: "Balanced Bergamot",
    color: "#FFB6C1",
    description: "Harmonious and aesthetic, Libra seeks balanced, beautiful fragrances.",
    traits: ["Balance", "Beauty", "Harmony", "Justice"],
    products: [
      {
        id: 701,
        name: "Libra Balance Blend",
        price: 2099,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 112,
        isNew: false,
        category: "Zodiac Perfume",
        description: "Balanced bergamot for harmonious souls",
      },
    ],
  },
  {
    name: "Scorpio",
    symbol: "♏",
    element: "Water",
    dates: "Oct 23 - Nov 21",
    scent: "Mysterious Patchouli",
    color: "#FF7675",
    description: "Intense and mysterious, Scorpio is drawn to deep, transformative scents.",
    traits: ["Intensity", "Mystery", "Transformation", "Passion"],
    products: [
      {
        id: 801,
        name: "Scorpio Mystery Patchouli",
        price: 2399,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 187,
        isNew: false,
        category: "Zodiac Perfume",
        description: "Deep patchouli for mysterious souls",
      },
    ],
  },
  {
    name: "Sagittarius",
    symbol: "♐",
    element: "Fire",
    dates: "Nov 22 - Dec 21",
    scent: "Adventurous Sage",
    color: "#6C5CE7",
    description: "Free-spirited and adventurous, Sagittarius loves exotic, wanderlust-inspiring scents.",
    traits: ["Adventure", "Freedom", "Wisdom", "Optimism"],
    products: [
      {
        id: 901,
        name: "Sagittarius Adventure Sage",
        price: 1999,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.6,
        reviews: 134,
        isNew: true,
        category: "Zodiac Perfume",
        description: "Adventurous sage for free spirits",
      },
    ],
  },
  {
    name: "Capricorn",
    symbol: "♑",
    element: "Earth",
    dates: "Dec 22 - Jan 19",
    scent: "Ambitious Cedar",
    color: "#A29BFE",
    description: "Ambitious and grounded, Capricorn appreciates sophisticated, enduring fragrances.",
    traits: ["Ambition", "Discipline", "Tradition", "Success"],
    products: [
      {
        id: 1001,
        name: "Capricorn Cedar Success",
        price: 2299,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 156,
        isNew: false,
        category: "Zodiac Perfume",
        description: "Ambitious cedar for goal-oriented souls",
      },
    ],
  },
  {
    name: "Aquarius",
    symbol: "♒",
    element: "Air",
    dates: "Jan 20 - Feb 18",
    scent: "Innovative Eucalyptus",
    color: "#74B9FF",
    description: "Innovative and unique, Aquarius seeks unconventional, futuristic scents.",
    traits: ["Innovation", "Independence", "Humanity", "Originality"],
    products: [
      {
        id: 1101,
        name: "Aquarius Innovation Eucalyptus",
        price: 1899,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 123,
        isNew: true,
        category: "Zodiac Perfume",
        description: "Innovative eucalyptus for unique souls",
      },
    ],
  },
  {
    name: "Pisces",
    symbol: "♓",
    element: "Water",
    dates: "Feb 19 - Mar 20",
    scent: "Dreamy Ylang-Ylang",
    color: "#81ECEC",
    description: "Dreamy and intuitive, Pisces connects with ethereal, spiritual fragrances.",
    traits: ["Intuition", "Compassion", "Creativity", "Spirituality"],
    products: [
      {
        id: 1201,
        name: "Pisces Dream Ylang-Ylang",
        price: 2199,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 178,
        isNew: false,
        category: "Zodiac Perfume",
        description: "Dreamy ylang-ylang for intuitive souls",
      },
    ],
  },
]

export default function ZodiacPage() {
  const [selectedSign, setSelectedSign] = useState(zodiacSigns[0])
  const [cartCount, setCartCount] = useState(0)

  return (
    <div className="min-h-screen bg-brand-whisper pt-8">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-brand-maroon mb-6">
              Zodiac Scent Collection
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Discover fragrances aligned with your celestial energy. Each scent is carefully crafted to resonate with
              your zodiac sign's unique characteristics and spiritual essence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Zodiac Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
            {zodiacSigns.map((sign) => (
              <motion.button
                key={sign.name}
                onClick={() => setSelectedSign(sign)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                  selectedSign.name === sign.name
                    ? "border-brand-gold bg-brand-gold/10"
                    : "border-gray-200 bg-white/80 hover:border-brand-gold/50"
                }`}
              >
                <div
                  className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-xl font-bold"
                  style={{ backgroundColor: sign.color }}
                >
                  {sign.symbol}
                </div>
                <p className="font-playfair font-semibold text-brand-maroon text-sm">{sign.name}</p>
                <p className="text-xs text-gray-600">{sign.dates}</p>
              </motion.button>
            ))}
          </div>

          {/* Selected Sign Details */}
          <motion.div
            key={selectedSign.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
          >
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold"
                    style={{ backgroundColor: selectedSign.color }}
                  >
                    {selectedSign.symbol}
                  </div>
                  <div>
                    <h2 className="font-playfair text-3xl font-bold text-brand-maroon">{selectedSign.name}</h2>
                    <p className="text-brand-gold font-medium">{selectedSign.dates}</p>
                    <Badge className="mt-2" style={{ backgroundColor: selectedSign.color, color: "white" }}>
                      {selectedSign.element} Element
                    </Badge>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-playfair text-xl font-semibold text-brand-maroon mb-3">Signature Scent</h3>
                    <p className="text-lg text-brand-gold font-medium">{selectedSign.scent}</p>
                  </div>

                  <div>
                    <h3 className="font-playfair text-xl font-semibold text-brand-maroon mb-3">Description</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedSign.description}</p>
                  </div>

                  <div>
                    <h3 className="font-playfair text-xl font-semibold text-brand-maroon mb-3">Key Traits</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSign.traits.map((trait) => (
                        <Badge key={trait} variant="outline" className="border-brand-gold text-brand-maroon">
                          {trait}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-8">
              <h3 className="font-playfair text-2xl font-bold text-brand-maroon">{selectedSign.name} Collection</h3>
              <div className="grid gap-6">
                {selectedSign.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={() => setCartCount((prev) => prev + 1)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Zodiac Guide */}
      <section className="py-20 bg-gradient-to-b from-brand-sandstone/20 to-brand-whisper">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-brand-maroon mb-6">
              How to Choose Your Scent
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-brand-maroon font-bold text-xl">1</span>
                  </div>
                  <h3 className="font-playfair text-lg font-semibold text-brand-maroon mb-2">Know Your Sign</h3>
                  <p className="text-gray-600">
                    Start with your sun sign, but also consider your moon and rising signs for a complete picture.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-brand-maroon font-bold text-xl">2</span>
                  </div>
                  <h3 className="font-playfair text-lg font-semibold text-brand-maroon mb-2">Feel the Energy</h3>
                  <p className="text-gray-600">
                    Trust your intuition. The right scent will resonate with your current spiritual journey.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-brand-maroon font-bold text-xl">3</span>
                  </div>
                  <h3 className="font-playfair text-lg font-semibold text-brand-maroon mb-2">Embrace the Magic</h3>
                  <p className="text-gray-600">
                    Use your chosen scent during meditation, rituals, or whenever you need to connect with your cosmic
                    energy.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
