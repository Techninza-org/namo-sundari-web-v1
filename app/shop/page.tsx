"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Filter, Grid, List } from "lucide-react"
import ProductCard from "@/components/product-card"

const allProducts = [
  {
    id: 1,
    name: "Mystic Rose Attar",
    price: 2499,
    originalPrice: 3299,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 124,
    isNew: true,
    category: "Attar",
    zodiac: "Cancer",
    description: "Handcrafted rose attar with sacred sandalwood",
  },
  {
    id: 2,
    name: "Aries Fire Perfume",
    price: 1899,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 89,
    isNew: false,
    category: "Zodiac Perfume",
    zodiac: "Aries",
    description: "Bold and energetic scent for Aries souls",
  },
  {
    id: 3,
    name: "Sacred Sandalwood Oil",
    price: 3499,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 156,
    isNew: true,
    category: "Essential Oil",
    zodiac: "Taurus",
    description: "Pure sandalwood oil for meditation",
  },
  {
    id: 4,
    name: "Lotus Incense Sticks",
    price: 599,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 203,
    isNew: false,
    category: "Incense",
    zodiac: "Pisces",
    description: "Divine lotus fragrance for spiritual rituals",
  },
  {
    id: 5,
    name: "Leo Royal Rose",
    price: 2199,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 67,
    isNew: true,
    category: "Zodiac Perfume",
    zodiac: "Leo",
    description: "Majestic rose blend for Leo energy",
  },
  {
    id: 6,
    name: "Virgo Earth Essence",
    price: 1799,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 45,
    isNew: true,
    category: "Zodiac Perfume",
    zodiac: "Virgo",
    description: "Grounding earth scents for Virgo energy",
  },
  {
    id: 7,
    name: "Temple Frankincense",
    price: 899,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 89,
    isNew: true,
    category: "Incense",
    zodiac: "Capricorn",
    description: "Sacred frankincense for deep meditation",
  },
  {
    id: 8,
    name: "Divine Lavender Oil",
    price: 1299,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 112,
    isNew: true,
    category: "Essential Oil",
    zodiac: "Libra",
    description: "Pure lavender oil for peaceful sleep",
  },
]

const categories = ["All", "Attar", "Zodiac Perfume", "Essential Oil", "Incense", "Wellness Blend"]
const zodiacSigns = [
  "All",
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
]

export default function ShopPage() {
  const [products, setProducts] = useState(allProducts)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedZodiac, setSelectedZodiac] = useState("All")
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState("grid")
  const [showFilters, setShowFilters] = useState(false)

  const filterProducts = () => {
    let filtered = allProducts

    if (selectedCategory !== "All") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    if (selectedZodiac !== "All") {
      filtered = filtered.filter((product) => product.zodiac === selectedZodiac)
    }

    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      default:
        // Featured - keep original order
        break
    }

    setProducts(filtered)
  }

  useEffect(() => {
    filterProducts()
  }, [selectedCategory, selectedZodiac, priceRange, sortBy])

  return (
    <div className="min-h-screen bg-[#F9F9F7] pt-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[#572C2C] mb-4">Sacred Collection</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Explore our complete range of handcrafted aromatherapy products, each blessed with pure intentions
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? "block" : "hidden lg:block"}`}>
            <Card className="sticky top-24 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-playfair text-xl font-semibold text-[#572C2C]">Filters</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedCategory("All")
                      setSelectedZodiac("All")
                      setPriceRange([0, 5000])
                    }}
                    className="text-[#D6B57B] hover:text-[#572C2C]"
                  >
                    Clear All
                  </Button>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="font-semibold text-[#572C2C] mb-3">Category</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={category}
                          checked={selectedCategory === category}
                          onCheckedChange={() => setSelectedCategory(category)}
                        />
                        <Label htmlFor={category} className="text-sm text-gray-700">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Zodiac Filter */}
                <div className="mb-6">
                  <h4 className="font-semibold text-[#572C2C] mb-3">Zodiac Sign</h4>
                  <Select value={selectedZodiac} onValueChange={setSelectedZodiac}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select zodiac sign" />
                    </SelectTrigger>
                    <SelectContent>
                      {zodiacSigns.map((sign) => (
                        <SelectItem key={sign} value={sign}>
                          {sign}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-semibold text-[#572C2C] mb-3">Price Range</h4>
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={5000}
                      min={0}
                      step={100}
                      className="mb-4"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-6">
                  <h4 className="font-semibold text-[#572C2C] mb-3">Minimum Rating</h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox id={`rating-${rating}`} />
                        <Label htmlFor={`rating-${rating}`} className="text-sm text-gray-700">
                          {rating}+ Stars
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden border-[#D6B57B] text-[#572C2C]"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <p className="text-gray-600">
                  Showing {products.length} of {allProducts.length} products
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-none"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products */}
            <div
              className={`grid gap-6 ${
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
              }`}
            >
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProductCard product={product} onAddToCart={() => {}} />
                </motion.div>
              ))}
            </div>

            {products.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg mb-4">No products found matching your criteria</p>
                <Button
                  onClick={() => {
                    setSelectedCategory("All")
                    setSelectedZodiac("All")
                    setPriceRange([0, 5000])
                  }}
                  className="bg-[#572C2C] hover:bg-[#572C2C]/90 text-white"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
