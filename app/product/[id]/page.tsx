"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  Heart,
  ShoppingBag,
  Minus,
  Plus,
  ArrowLeft,
  Share2,
  Award,
  Truck,
  RotateCcw,
} from "lucide-react";
import ProductCard from "@/components/product-card";
import Cookies from "js-cookie";
import { toast } from "sonner";

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  mainCategoryId: number;
  subCategoryId: number;
  vendorId: number;
  createdAt: string;
  updatedAt: string;
  mainCategory: {
    id: number;
    name: string;
    slug: string;
    description: string;
    imgUrl: string;
    createdAt: string;
    updatedAt: string;
  };
  subCategory: {
    id: number;
    mainCategoryId: number;
    name: string;
    slug: string;
    description: string;
    imgUrl: string;
    createdAt: string;
    updatedAt: string;
  };
  vendor: {
    id: number;
    name: string;
    email: string;
    password: string;
    status: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
  variants: {
    id: number;
    productId: number;
    sku: string;
    price: string;
    stock: number;
    images: string[];
    height: null | number;
    weight: null | number;
    createdAt: string;
    updatedAt: string;
    attributes: any[];
  }[];
  ProductReview: any[];
}

interface RelatedProduct {
  id: number;
  name: string;
  image: string;
  price: number;
}

interface Review {
  id: number;
  productId: number;
  name: string;
  rating: number;
  date: string;
  title: string;
  review: string;
  verified: boolean;
}

interface ApiResponse {
  success: boolean;
  data: {
    product: Product;
    relatedProducts: RelatedProduct[];
    reviews: Review[];
  };
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const token = Cookies.get("token");

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/web/get-products/${productId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (data.success) {
          setProduct(data.data.product);
          setRelatedProducts(data.data.relatedProducts);
          setReviews(data.data.reviews);
        } else {
          console.error(
            "Product fetch failed:",
            data.message || "Unknown error"
          );
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (productId && token) {
      fetchProduct();
    }
  }, [productId, token]);

  const handleQuantityChange = (newQuantity: number) => {
    if (!product) return;

    const stock = product.variants[0]?.stock || 10;
    if (newQuantity >= 1 && newQuantity <= stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    if (!product || !product.variants[0]) return;

    setIsAddingToCart(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/web/add-to-cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            variantId: product.variants[0].id,
            quantity: quantity,
            attributes: product.variants[0].attributes.reduce((acc, attr) => {
              acc[attr.key] = attr.value;
              return acc;
            }, {} as Record<string, string>),
          }),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        toast.success("Product added to cart successfully!");
        router.push("/cart");
      } else {
        toast.error(data.message || "Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("An error occurred while adding to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-whisper flex items-center justify-center">
        <div className="animate-pulse text-brand-maroon text-xl">
          Loading product details...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-brand-whisper pt-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-playfair text-3xl font-bold text-brand-maroon mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            We couldn't find the product you're looking for.
          </p>
          <Link href="/shop">
            <Button className="bg-brand-maroon hover:bg-brand-maroon/90 text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Shop
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Get the first variant for price and images
  const mainVariant = product.variants[0] || {
    price: "0",
    stock: 0,
    images: ["/placeholder.svg"],
    sku: "N/A",
    attributes: [],
  };

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
            <Link
              href={`/shop?category=${product.mainCategory.slug}`}
              className="hover:text-brand-maroon"
            >
              {product.mainCategory.name}
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={`/shop?category=${product.mainCategory.slug}&subcategory=${product.subCategory.slug}`}
              className="hover:text-brand-maroon"
            >
              {product.subCategory.name}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-brand-maroon font-medium">
              {product.name}
            </span>
          </nav>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="sticky top-24">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-white mb-4">
                <img
                  src={
                    mainVariant.images[selectedImage]
                      ? `${process.env.NEXT_PUBLIC_API_URL_IMG}${mainVariant.images[selectedImage]}`
                      : "/placeholder.svg"
                  }
                  alt={product.name}
                  // fill
                  className="object-contain"
                />

                {mainVariant.stock > 0 && (
                  <Badge className="absolute top-4 right-4 bg-brand-maroon text-white">
                    In Stock
                  </Badge>
                )}
              </div>

              {/* Thumbnail Images */}
              {mainVariant.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {mainVariant.images.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 ${
                        selectedImage === idx
                          ? "border-brand-gold"
                          : "border-transparent"
                      }`}
                    >
                      <Image
                        src={
                          `${process.env.NEXT_PUBLIC_API_URL_IMG}${img}` ||
                          "/placeholder.svg"
                        }
                        alt={`${product.name} view ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Category & Name */}
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <Badge
                  variant="outline"
                  className="border-brand-gold text-brand-maroon"
                >
                  {product.mainCategory.name}
                </Badge>
                <Badge
                  variant="outline"
                  className="border-brand-gold text-brand-maroon"
                >
                  {product.subCategory.name}
                </Badge>
              </div>
              <h1 className="font-playfair text-4xl font-bold text-brand-maroon">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < 4
                        ? "fill-brand-gold text-brand-gold"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {4.5} ({reviews.length} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-brand-maroon">
                ₹{parseInt(mainVariant.price).toLocaleString()}
              </span>
            </div>

            {/* Short Description */}
            <p className="text-gray-700 mb-8 leading-relaxed">
              {product.description}
            </p>

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
                  <span className="w-12 text-center font-medium">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= mainVariant.stock}
                    className="rounded-none h-10"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="text-sm text-gray-600">
                  {mainVariant.stock > 0 ? (
                    <span className="text-green-600">
                      In Stock ({mainVariant.stock} available)
                    </span>
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
                disabled={mainVariant.stock <= 0 || isAddingToCart}
                className="flex-1 bg-brand-maroon border border-amber-400 hover:bg-brand-gold/10 text-black py-6 rounded-full"
              >
                {isAddingToCart ? (
                  "Adding..."
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>
              <Button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="border border-amber-400 bg-white text-brand-maroon hover:bg-brand-gold/10  py-6 rounded-full"
              >
                <Heart
                  className={`w-5 h-5 mr-2 ${
                    isWishlisted ? "fill-red-500 text-red-500" : ""
                  }`}
                />
                {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
              </Button>
            </div>

            {/* Product Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-3 bg-white/80 rounded-lg">
                <Award className="w-5 h-5 text-brand-gold" />
                <span className="text-sm">Premium Quality</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/80 rounded-lg">
                <Truck className="w-5 h-5 text-brand-gold" />
                <span className="text-sm">Fast Shipping</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/80 rounded-lg">
                <RotateCcw className="w-5 h-5 text-brand-gold" />
                <span className="text-sm">Easy Returns</span>
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
                <span className="text-gray-600">{mainVariant.sku}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Category:</span>
                <Link
                  href={`/shop?category=${product.mainCategory.slug}`}
                  className="text-brand-maroon hover:underline"
                >
                  {product.mainCategory.name}
                </Link>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="font-medium">Subcategory:</span>
                <Link
                  href={`/shop?category=${product.mainCategory.slug}&subcategory=${product.subCategory.slug}`}
                  className="text-brand-maroon hover:underline"
                >
                  {product.subCategory.name}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Tabs */}
        <div className="mb-16">
          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">
                Reviews ({reviews.length})
              </TabsTrigger>
            </TabsList>
            <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-lg p-8">
              <TabsContent value="description" className="space-y-4">
                <h3 className="font-playfair text-2xl font-semibold text-brand-maroon mb-4">
                  About {product.name}
                </h3>
                <div className="text-gray-700 space-y-4 leading-relaxed">
                  <p>{product.description}</p>
                </div>
              </TabsContent>

              <TabsContent value="details">
                <h3 className="font-playfair text-2xl font-semibold text-brand-maroon mb-4">
                  Product Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-brand-maroon mb-2">
                      Main Category
                    </h4>
                    <p>{product.mainCategory.name}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-brand-maroon mb-2">
                      Subcategory
                    </h4>
                    <p>{product.subCategory.name}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-brand-maroon mb-2">
                      Vendor
                    </h4>
                    <p>{product.vendor.name}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-brand-maroon mb-2">
                      Added On
                    </h4>
                    <p>{new Date(product.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-playfair text-2xl font-semibold text-brand-maroon">
                    Customer Reviews ({reviews.length})
                  </h3>
                  <Button className="bg-brand-maroon hover:bg-brand-maroon/90 text-white">
                    Write a Review
                  </Button>
                </div>

                {reviews.length > 0 ? (
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <Card key={review.id} className="border border-gray-200">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="font-semibold text-brand-maroon text-lg">
                                {review.title}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < review.rating
                                          ? "fill-brand-gold text-brand-gold"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500">
                                  {review.date}
                                </span>
                              </div>
                            </div>
                            {review.verified && (
                              <Badge
                                variant="outline"
                                className="border-green-500 text-green-600"
                              >
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
                    <p className="text-gray-500 mb-4">
                      No reviews yet. Be the first to review this product!
                    </p>
                    <Button className="bg-brand-maroon hover:bg-brand-maroon/90 text-white">
                      Write a Review
                    </Button>
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <h2 className="font-playfair text-3xl font-bold text-brand-maroon mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={{
                    id: relatedProduct.id,
                    name: relatedProduct.name,
                    price: relatedProduct.price,
                    image: `${process.env.NEXT_PUBLIC_API_URL_IMG}${relatedProduct.image}`,
                    category: product.mainCategory.name,
                    rating: 4.5,
                    reviews: 0,
                    isNew: false,
                    description: "",
                  }}
                  onAddToCart={() =>
                    console.log(`Added ${relatedProduct.name} to cart`)
                  }
                />
              ))}
            </div>
          </div>
        )}

        {/* Back to Shop */}
        <div className="text-center">
          <Link href="/shop">
            <Button
              variant="outline"
              className="border-brand-gold text-brand-maroon hover:bg-brand-gold/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
