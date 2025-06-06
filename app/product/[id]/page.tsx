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
  ChevronDown,
  ChevronUp,
  Check,
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
  const [expandedSection, setExpandedSection] = useState<string | null>(
    "share"
  );

  const token = Cookies.get("token");

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/web/get-products/${productId}`,
          {
            method: "GET",
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

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

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
    if (!token) {
      toast.error("Please log in to add items to your cart.");
      router.push("/login");
      return;
    }

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

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-gray-900 text-xl">
          Loading product details...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white pt-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-3xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            We couldn't find the product you're looking for.
          </p>
          <Link href="/shop">
            <Button className="bg-gray-900 hover:bg-gray-800 text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Shop
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const mainVariant = product.variants[0] || {
    price: "0",
    stock: 0,
    images: ["/placeholder.svg"],
    sku: "N/A",
    attributes: [],
  };

  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length ||
    0;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center text-xs text-gray-500">
            <Link href="/" className="hover:text-gray-900">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/shop" className="hover:text-gray-900">
              Shop
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={`/shop?category=${product.mainCategory.slug}`}
              className="hover:text-gray-900"
            >
              {product.mainCategory.name}
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={`/shop?category=${product.mainCategory.slug}&subcategory=${product.subCategory.slug}`}
              className="hover:text-gray-900"
            >
              {product.subCategory.name}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Images */}
          <div className="sticky top-24">
            <div className="relative aspect-square mb-4">
              <img
                src={
                  mainVariant.images[selectedImage]
                    ? `${process.env.NEXT_PUBLIC_API_URL_IMG}${mainVariant.images[selectedImage]}`
                    : "/placeholder.svg"
                }
                alt={product.name}
                className="object-contain w-full h-full"
              />
            </div>

            {/* Thumbnail Images */}
            {mainVariant.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {mainVariant.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative aspect-square ${
                      selectedImage === idx ? "ring-2 ring-gray-900" : ""
                    }`}
                  >
                    <img
                      src={
                        `${process.env.NEXT_PUBLIC_API_URL_IMG}${img}` ||
                        "/placeholder.svg"
                      }
                      alt={`${product.name} view ${idx + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {/* Category & Name */}
            <div className="mb-6">
              <div className="text-sm text-gray-500 mb-2">
                {product.mainCategory.name} / {product.subCategory.name}
              </div>
              <h1 className="font-serif text-3xl font-normal text-gray-900">
                {product.name}
              </h1>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-xl text-gray-900">
                ₹{parseInt(mainVariant.price).toLocaleString()}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(averageRating)
                        ? "fill-gray-900 text-gray-900"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">
                {reviews.length} reviews
              </span>
            </div>

            {/* Description */}
            <div className="mb-8">
              <p className="text-sm text-gray-700">{product.description}</p>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <div className="flex items-center border border-gray-300 w-fit">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="h-10 w-10 rounded-none"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= mainVariant.stock}
                  className="h-10 w-10 rounded-none"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="mb-12">
              <Button
                onClick={handleAddToCart}
                disabled={mainVariant.stock <= 0 || isAddingToCart}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-6 rounded-none"
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
            </div>

            {/* Wishlist */}
            <div className="mb-12">
              <Button
                variant="outline"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="w-full border-gray-900 text-gray-900 hover:bg-gray-50 py-6 rounded-none"
              >
                <Heart
                  className={`w-5 h-5 mr-2 ${
                    isWishlisted ? "fill-red-500 text-red-500" : ""
                  }`}
                />
                {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              </Button>
            </div>

            {/* Product Details Accordion */}
            <div className="border-t border-gray-200 pt-6">
              {/* Delivery & Returns - Always expanded */}
              <div className="border-b border-gray-200 py-4">
                <div className="font-serif text-lg mb-4">
                  Delivery & Returns
                </div>
                <div className="text-sm text-gray-700 space-y-2">
                  <p>Free standard delivery on all orders</p>
                  <p>Express delivery available</p>
                  <p>30-day return policy</p>
                </div>
              </div>

              {/* Product Details - Always expanded */}
              <div className="border-b border-gray-200 py-4">
                <div className="font-serif text-lg mb-4">Product Details</div>
                <div className="text-sm text-gray-700">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">SKU</p>
                      <p>{mainVariant.sku}</p>
                    </div>
                    <div>
                      <p className="font-medium">Category</p>
                      <p>{product.mainCategory.name}</p>
                    </div>
                    <div>
                      <p className="font-medium">Subcategory</p>
                      <p>{product.subCategory.name}</p>
                    </div>
                    <div>
                      <p className="font-medium">Vendor</p>
                      <p>{product.vendor.name}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Share - Still collapsible */}
              <div className="border-b border-gray-200 py-4">
                <button
                  onClick={() => toggleSection("share")}
                  className="flex justify-between items-center w-full"
                >
                  <span className="font-serif text-lg">Share</span>
                  {expandedSection === "share" ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
                {expandedSection === "share" && (
                  <div className="mt-4 flex gap-4">
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="my-16 border-t border-gray-200 pt-12">
          <h2 className="font-serif text-2xl font-normal text-gray-900 mb-8">
            Description
          </h2>
          <div className="prose max-w-none text-gray-700">
            <p>{product.description}</p>
          </div>
        </div>

        {/* Reviews */}
        <div className="my-16 border-t border-gray-200 pt-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-serif text-2xl font-normal text-gray-900">
              Customer Reviews
            </h2>
            <Button variant="outline" className="border-gray-900 text-gray-900">
              Write a Review
            </Button>
          </div>

          {reviews.length > 0 ? (
            <div className="space-y-8">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "fill-gray-900 text-gray-900"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    {review.title}
                  </h3>
                  <p className="text-gray-700 mb-4">{review.review}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium">{review.name}</span>
                    {review.verified && (
                      <span className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">
                No reviews yet. Be the first to review this product!
              </p>
              <Button
                variant="outline"
                className="border-gray-900 text-gray-900"
              >
                Write a Review
              </Button>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="my-16 border-t border-gray-200 pt-12">
            <h2 className="font-serif text-2xl font-normal text-gray-900 mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
      </div>
    </div>
  );
}
