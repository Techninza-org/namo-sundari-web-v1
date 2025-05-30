"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Heart, ShoppingBag, Minus, Plus, ArrowLeft, Share2, Award, Truck, RotateCcw } from "lucide-react"
import ProductCard from "@/components/product-card"

// Sample product database
const productsDatabase = [
  {
    id: 1,
    name: "Mystic Rose Attar",
    price: 2499,
    originalPrice: 3299,
    image: "/placeholder.svg?height=600&width=600",
    additionalImages: [
      "/placeholder.svg?height=600&width=600&text=Rose+Attar+1",
      "/placeholder.svg?height=600&width=600&text=Rose+Attar+2",
      "/placeholder.svg?height=600&width=600&text=Rose+Attar+3",
    ],
    rating: 4.8,
    reviews: 124,
    isNew: true,
    category: "Attar",
    zodiac: "Cancer",
    description:
      "Handcrafted rose attar with sacred sandalwood, this exquisite blend captures the divine essence of fresh roses distilled with pure sandalwood oil. Created using traditional methods passed down through generations, each drop carries the intention of love and spiritual elevation.",
    longDescription:
      "Our Mystic Rose Attar is a sacred blend created in the ancient tradition of Indian perfumery. Each batch is carefully distilled using copper vessels and pure sandalwood oil as the base. The roses are hand-picked at dawn when their aroma is at its peak, and the entire process is accompanied by sacred mantras to infuse positive energy.\n\nThis alcohol-free attar carries the spiritual essence of the rose, known for opening the heart chakra and fostering love and compassion. The sandalwood base adds grounding properties, making this blend perfect for meditation, prayer, or simply as a daily fragrance that connects you to your higher self.\n\nEach bottle contains 10ml of pure attar oil that will last for months, as only a drop is needed for a long-lasting fragrance experience.",
    ingredients: "Pure sandalwood oil, steam-distilled rose essence, sacred intentions",
    benefits: [
      "Opens the heart chakra",
      "Calms the mind and reduces anxiety",
      "Enhances spiritual practices",
      "Alcohol-free and long-lasting",
      "Suitable for sensitive skin",
    ],
    usage:
      "Apply a small drop to pulse points (wrists, neck, behind ears) for personal fragrance. Add to diffuser or oil burner for room fragrance. Can be added to bath water or unscented lotion for full-body application.",
    stock: 15,
    sku: "MS-RA-001",
  },
  {
    id: 2,
    name: "Aries Fire Perfume",
    price: 1899,
    image: "/placeholder.svg?height=600&width=600",
    additionalImages: [
      "/placeholder.svg?height=600&width=600&text=Aries+1",
      "/placeholder.svg?height=600&width=600&text=Aries+2",
    ],
    rating: 4.9,
    reviews: 89,
    isNew: false,
    category: "Zodiac Perfume",
    zodiac: "Aries",
    description: "Bold and energetic scent for Aries souls",
    longDescription:
      "Crafted specifically for the fiery Aries spirit, this energizing blend combines stimulating citrus notes with warm spices to ignite passion and courage. The dominant notes of bergamot and black pepper reflect the pioneering and adventurous nature of Aries, while subtle hints of frankincense provide spiritual grounding for this action-oriented sign.\n\nEach Zodiac perfume is created during its corresponding astrological season, harnessing the powerful cosmic energies of that time. The Aries Fire Perfume is alcohol-free, using a base of jojoba oil to carry these powerful scents in a skin-nourishing formula.",
    ingredients: "Jojoba oil, essential oils of bergamot, black pepper, frankincense, and cedarwood",
    benefits: [
      "Boosts confidence and courage",
      "Stimulates motivation and drive",
      "Enhances leadership qualities",
      "Alcohol-free and skin-nourishing",
      "Aligns with Aries energy",
    ],
    usage:
      "Apply to pulse points as needed throughout the day. Best used during times when you need extra courage, motivation, or leadership energy.",
    stock: 23,
    sku: "ZP-AR-001",
  },
  {
    id: 3,
    name: "Sacred Sandalwood Oil",
    price: 3499,
    image: "/placeholder.svg?height=600&width=600",
    additionalImages: [
      "/placeholder.svg?height=600&width=600&text=Sandalwood+1",
      "/placeholder.svg?height=600&width=600&text=Sandalwood+2",
    ],
    rating: 4.7,
    reviews: 156,
    isNew: true,
    category: "Essential Oil",
    zodiac: "Taurus",
    description: "Pure sandalwood oil for meditation",
    longDescription:
      "Our Sacred Sandalwood Oil is sourced from sustainably grown Mysore sandalwood trees that have matured for at least 30 years. This precious oil is steam-distilled using traditional methods to preserve its full therapeutic properties and divine aroma.\n\nSandalwood has been used in spiritual practices for thousands of years across various traditions. Its grounding yet elevating scent creates the perfect atmosphere for meditation, helping to quiet the mind while opening the third eye and crown chakras. The warm, woody aroma with subtle sweet undertones brings a sense of peace and clarity.\n\nEach bottle contains 5ml of 100% pure sandalwood essential oil with no additives or dilution. The oil comes in a UV-protective glass bottle with a dropper for precise application.",
    ingredients: "100% pure Mysore sandalwood essential oil (Santalum album)",
    benefits: [
      "Enhances meditation and spiritual practices",
      "Grounds energy while elevating consciousness",
      "Calms the nervous system",
      "Moisturizes and rejuvenates skin",
      "Supports restful sleep",
    ],
    usage:
      "For meditation: Add 2-3 drops to a diffuser or oil burner. For skin: Dilute with a carrier oil before applying to skin. For sleep: Place a drop on your pillow or in a bedside diffuser.",
    stock: 8,
    sku: "EO-SW-001",
  },
  {
    id: 4,
    name: "Lotus Incense Sticks",
    price: 599,
    image: "/placeholder.svg?height=600&width=600",
    additionalImages: [
      "/placeholder.svg?height=600&width=600&text=Lotus+1",
      "/placeholder.svg?height=600&width=600&text=Lotus+2",
    ],
    rating: 4.6,
    reviews: 203,
    isNew: false,
    category: "Incense",
    zodiac: "Pisces",
    description: "Divine lotus fragrance for spiritual rituals",
    longDescription:
      "Our Lotus Incense Sticks are handcrafted using the traditional Masala method, where natural ingredients are rolled onto bamboo sticks without using any synthetic binders. The primary note of lotus flower symbolizes purity and spiritual awakening, making these incense sticks perfect for meditation, yoga practice, or creating a sacred atmosphere in your home.\n\nThe lotus flower, rising from muddy waters to bloom in immaculate beauty, has been a powerful spiritual symbol across Eastern traditions. Its fragrance helps open the crown chakra and facilitates higher states of consciousness. Each stick burns for approximately 45 minutes, releasing a steady stream of this divine aroma.\n\nEach package contains 20 incense sticks and a ceramic incense holder, all presented in a handmade paper box adorned with lotus motifs.",
    ingredients: "Bamboo sticks, natural resins, lotus flower extract, sandalwood powder, herbs, and spices",
    benefits: [
      "Creates a sacred atmosphere",
      "Enhances meditation and prayer",
      "Opens the crown chakra",
      "Made with natural ingredients",
      "Long burning time (45 minutes per stick)",
    ],
    usage:
      "Light the tip of the incense stick, let it flame for a few seconds, then gently blow out the flame. Place in an incense holder and allow the fragrance to fill your space. Ideal for use during meditation, yoga, or to purify a room.",
    stock: 42,
    sku: "IN-LT-001",
  },
  {
    id: 5,
    name: "Leo Royal Rose",
    price: 2199,
    image: "/placeholder.svg?height=600&width=600",
    additionalImages: [
      "/placeholder.svg?height=600&width=600&text=Leo+1",
      "/placeholder.svg?height=600&width=600&text=Leo+2",
    ],
    rating: 4.9,
    reviews: 67,
    isNew: true,
    category: "Zodiac Perfume",
    zodiac: "Leo",
    description: "Majestic rose blend for Leo energy",
    longDescription:
      "Created specifically for the regal Leo, this majestic perfume oil combines luxurious rose with warm amber and subtle citrus notes to enhance the natural charisma and leadership qualities of this fire sign. The dominant rose note symbolizes the Leo's big heart and generous spirit, while amber provides the warmth and confidence that Leos naturally exude.\n\nEach bottle is crafted during the Leo season (July 23 - August 22) when the sun's energy aligns perfectly with this zodiac sign. The formula is alcohol-free, using a base of jojoba oil infused with 24k gold flakes to represent Leo's ruling planet, the Sun.\n\nThis 10ml roll-on bottle is perfect for carrying with you to boost your Leo energy whenever needed.",
    ingredients: "Jojoba oil, essential oils of rose, amber, bergamot, and frankincense, 24k gold flakes",
    benefits: [
      "Enhances confidence and personal power",
      "Boosts creativity and self-expression",
      "Attracts recognition and admiration",
      "Strengthens heart energy",
      "Alcohol-free and skin-nourishing",
    ],
    usage:
      "Roll onto pulse points (wrists, neck, behind ears) as needed throughout the day. Especially powerful when used before important presentations, creative endeavors, or social gatherings.",
    stock: 19,
    sku: "ZP-LE-001",
  },
]

// Sample reviews
const productReviews = [
  {
    id: 101,
    productId: 1,
    name: "Priya Sharma",
    rating: 5,
    date: "2024-01-15",
    title: "Absolutely Divine!",
    review:
      "The Mystic Rose Attar is pure magic in a bottle! The fragrance is so authentic and long-lasting. I use it during my morning meditation, and it instantly creates a sacred atmosphere. Will definitely purchase again!",
    verified: true,
  },
  {
    id: 102,
    productId: 1,
    name: "Rahul Gupta",
    rating: 5,
    date: "2023-12-20",
    title: "Best Attar I've Ever Used",
    review:
      "I've tried many attars over the years, but this Mystic Rose is truly special. The sandalwood base gives it such depth, and the rose note is perfectly balanced - not too sweet or overwhelming. It lasts all day with just a tiny drop.",
    verified: true,
  },
  {
    id: 103,
    productId: 1,
    name: "Ananya Singh",
    rating: 4,
    date: "2023-11-05",
    title: "Beautiful Fragrance, Small Bottle",
    review:
      "The fragrance is absolutely beautiful and authentic. My only small complaint is that the bottle is quite tiny for the price, but I understand that real rose and sandalwood are expensive ingredients. A little does go a long way!",
    verified: true,
  },
  {
    id: 104,
    productId: 1,
    name: "Vikram Patel",
    rating: 5,
    date: "2023-10-12",
    title: "Perfect Gift",
    review:
      "I purchased this as a gift for my mother who loves traditional fragrances. She was overjoyed and says it reminds her of the attars her grandmother used to wear. The packaging is also very elegant and gift-worthy.",
    verified: true,
  },
]

// Related products based on category or zodiac sign
const getRelatedProducts = (currentProduct: any) => {
  return productsDatabase
    .filter(
      (product) =>
        product.id !== currentProduct.id &&
        (product.category === currentProduct.category || product.zodiac === currentProduct.zodiac),
    )
    .slice(0, 4)
}

export default function ProductDetailPage() {
  const params = useParams()
  const productId = Number(params.id)

  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])
  const [reviews, setReviews] = useState<any[]>([])

  useEffect(() => {
    // Simulate API fetch
    const fetchProduct = () => {
      setLoading(true)
      const foundProduct = productsDatabase.find((p) => p.id === productId)

      if (foundProduct) {
        setProduct(foundProduct)
        setRelatedProducts(getRelatedProducts(foundProduct))

        // Get reviews for this product
        const productReviewsList = productReviews.filter((review) => review.productId === productId)
        setReviews(productReviewsList)
      }

      setLoading(false)
    }

    fetchProduct()
  }, [productId])

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    // Add to cart logic would go here
    console.log(`Added ${quantity} of ${product?.name} to cart`)
    // Show confirmation toast or modal
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-whisper flex items-center justify-center">
        <div className="animate-pulse text-brand-maroon text-xl">Loading product details...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-brand-whisper pt-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-playfair text-3xl font-bold text-brand-maroon mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">We couldn't find the product you're looking for.</p>
          <Link href="/shop">
            <Button className="bg-brand-maroon hover:bg-brand-maroon/90 text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Shop
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-whisper pt-8">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-brand-maroon">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/shop" className="hover:text-brand-maroon">
              Shop
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/shop?category=${product.category}`} className="hover:text-brand-maroon">
              {product.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-brand-maroon font-medium">{product.name}</span>
          </nav>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="sticky top-24">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-white mb-4">
                <Image
                  src={selectedImage === 0 ? product.image : product.additionalImages[selectedImage - 1]}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
                {product.isNew && (
                  <Badge className="absolute top-4 left-4 bg-brand-yellow text-brand-maroon">NEW</Badge>
                )}
                {product.originalPrice && (
                  <Badge className="absolute top-4 right-4 bg-brand-maroon text-white">
                    SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </Badge>
                )}
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-4">
                <button
                  onClick={() => setSelectedImage(0)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === 0 ? "border-brand-gold" : "border-transparent"
                  }`}
                >
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </button>
                {product.additionalImages?.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx + 1)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 ${
                      selectedImage === idx + 1 ? "border-brand-gold" : "border-transparent"
                    }`}
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`${product.name} view ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            {/* Category & Name */}
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline" className="border-brand-gold text-brand-maroon">
                  {product.category}
                </Badge>
                {product.zodiac && (
                  <Badge variant="outline" className="border-brand-gold text-brand-maroon">
                    {product.zodiac}
                  </Badge>
                )}
              </div>
              <h1 className="font-playfair text-4xl font-bold text-brand-maroon">{product.name}</h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) ? "fill-brand-gold text-brand-gold" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-brand-maroon">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
              )}
            </div>

            {/* Short Description */}
            <p className="text-gray-700 mb-8 leading-relaxed">{product.description}</p>

            {/* Quantity & Add to Cart */}
            <div className="mb-8">
              <p className="text-sm text-gray-600 mb-2">Quantity</p>
              <div className="flex items-center gap-6">
                <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="rounded-none h-10"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stock}
                    className="rounded-none h-10"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="text-sm text-gray-600">
                  {product.stock > 0 ? (
                    <span className="text-green-600">In Stock ({product.stock} available)</span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="flex-1 bg-brand-maroon hover:bg-brand-maroon/90 text-white py-6 rounded-full"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                onClick={() => setIsWishlisted(!isWishlisted)}
                variant="outline"
                className="border-brand-gold text-brand-maroon hover:bg-brand-gold/10 py-6 rounded-full"
              >
                <Heart className={`w-5 h-5 mr-2 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
              </Button>
            </div>

            {/* Product Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-3 bg-white/80 rounded-lg">
                <Award className="w-5 h-5 text-brand-gold" />
                <span className="text-sm">100% Natural Ingredients</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/80 rounded-lg">
                <Truck className="w-5 h-5 text-brand-gold" />
                <span className="text-sm">Free Shipping over ₹2,000</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/80 rounded-lg">
                <RotateCcw className="w-5 h-5 text-brand-gold" />
                <span className="text-sm">30-Day Satisfaction Guarantee</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/80 rounded-lg">
                <Share2 className="w-5 h-5 text-brand-gold" />
                <span className="text-sm">Share with Friends</span>
              </div>
            </div>

            {/* Product Details */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">SKU:</span>
                <span className="text-gray-600">{product.sku}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Category:</span>
                <Link href={`/shop?category=${product.category}`} className="text-brand-maroon hover:underline">
                  {product.category}
                </Link>
              </div>
              {product.zodiac && (
                <div className="flex justify-between items-center mt-2">
                  <span className="font-medium">Zodiac Sign:</span>
                  <Link href={`/zodiac?sign=${product.zodiac}`} className="text-brand-maroon hover:underline">
                    {product.zodiac}
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Product Tabs */}
        <div className="mb-16">
          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="usage">How to Use</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
            </TabsList>
            <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-lg p-8">
              <TabsContent value="description" className="space-y-4">
                <h3 className="font-playfair text-2xl font-semibold text-brand-maroon mb-4">About {product.name}</h3>
                <div className="text-gray-700 space-y-4 leading-relaxed">
                  {product.longDescription.split("\n\n").map((paragraph: string, idx: number) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                {product.benefits && (
                  <div className="mt-8">
                    <h4 className="font-playfair text-xl font-semibold text-brand-maroon mb-4">Benefits</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      {product.benefits.map((benefit: string, idx: number) => (
                        <li key={idx} className="text-gray-700">
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="ingredients">
                <h3 className="font-playfair text-2xl font-semibold text-brand-maroon mb-4">Ingredients</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">{product.ingredients}</p>

                <div className="bg-brand-sandstone/30 p-6 rounded-lg">
                  <h4 className="font-playfair text-lg font-semibold text-brand-maroon mb-3">Our Promise</h4>
                  <p className="text-gray-700 leading-relaxed">
                    All Namoh Sundari products are 100% natural, ethically sourced, and free from synthetic fragrances,
                    parabens, and harmful chemicals. We never test on animals and are committed to sustainable practices
                    in all aspects of our production.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="usage">
                <h3 className="font-playfair text-2xl font-semibold text-brand-maroon mb-4">How to Use</h3>
                <p className="text-gray-700 mb-8 leading-relaxed">{product.usage}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-0 shadow-md">
                    <CardContent className="p-6 text-center">
                      <h4 className="font-playfair text-lg font-semibold text-brand-maroon mb-3">For Personal Use</h4>
                      <p className="text-gray-700 text-sm">
                        Apply to pulse points for a personal fragrance that connects you to your spiritual essence.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md">
                    <CardContent className="p-6 text-center">
                      <h4 className="font-playfair text-lg font-semibold text-brand-maroon mb-3">For Meditation</h4>
                      <p className="text-gray-700 text-sm">
                        Use in a diffuser or apply to third eye chakra before meditation to enhance your practice.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md">
                    <CardContent className="p-6 text-center">
                      <h4 className="font-playfair text-lg font-semibold text-brand-maroon mb-3">For Sacred Spaces</h4>
                      <p className="text-gray-700 text-sm">
                        Add a few drops to a diffuser to purify your space and create a sacred atmosphere.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="reviews">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-playfair text-2xl font-semibold text-brand-maroon">
                    Customer Reviews ({reviews.length})
                  </h3>
                  <Button className="bg-brand-maroon hover:bg-brand-maroon/90 text-white">Write a Review</Button>
                </div>

                {reviews.length > 0 ? (
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <Card key={review.id} className="border border-gray-200">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="font-semibold text-brand-maroon text-lg">{review.title}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < review.rating ? "fill-brand-gold text-brand-gold" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500">{review.date}</span>
                              </div>
                            </div>
                            {review.verified && (
                              <Badge variant="outline" className="border-green-500 text-green-600">
                                Verified Purchase
                              </Badge>
                            )}
                          </div>

                          <p className="text-gray-700 mb-4">{review.review}</p>

                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">{review.name}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">No reviews yet. Be the first to review this product!</p>
                    <Button className="bg-brand-maroon hover:bg-brand-maroon/90 text-white">Write a Review</Button>
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <h2 className="font-playfair text-3xl font-bold text-brand-maroon mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  onAddToCart={() => console.log(`Added ${relatedProduct.name} to cart`)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Back to Shop */}
        <div className="text-center">
          <Link href="/shop">
            <Button variant="outline" className="border-brand-gold text-brand-maroon hover:bg-brand-gold/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
