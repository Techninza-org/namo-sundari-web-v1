"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import axios from "axios";
import Cookies from "js-cookie";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Heart, ShoppingBag, Eye } from "lucide-react";

interface ProductAttribute {
  id: number;
  key: string;
  value: string;
}

interface ProductVariant {
  id: number;
  attributes?: ProductAttribute[];
  price: string;
  images: string[];
}

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  isNew: boolean;
  category: string;
  description: string;
  variants?: ProductVariant[];
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleViewProduct = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/product/${product.id}`);
  };

  const handleCardClick = () => {
    router.push(`/product/${product.id}`);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setLoading(true);
    const token = Cookies.get("token");

    try {
      // Check if token exists
      if (!token) {
        router.push("/login");
        return;
      }

      // Get the first variant or fallback to product ID
      const variant = product.variants?.[0];
      const variantId = variant?.id || product.id;
      const quantity = 1;

      // Extract attributes safely
      const attributes =
        variant?.attributes?.reduce((acc: Record<string, string>, attr) => {
          if (attr.key && attr.value) {
            acc[attr.key] = attr.value;
          }
          return acc;
        }, {}) || {};

      console.log("Adding to cart with:", {
        variantId,
        quantity,
        attributes,
      });

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/web/add-to-cart`,
        {
          variantId,
          quantity,
          attributes,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        router.push("/cart");
      } else {
        console.error("Add to cart failed:", response.data);
        alert(response.data.message || "Failed to add to cart");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      alert("An error occurred while adding to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="product-card"
    >
      <Card
        className="group border border-gray-200 shadow-none rounded-none bg-white cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="relative">
          {/* Wishlist Button */}
          <Button
            size="sm"
            variant="ghost"
            onClick={handleWishlistToggle}
            className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white rounded-full p-1.5"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isWishlisted
                  ? "fill-brand-terracotta text-brand-terracotta"
                  : "text-gray-400"
              }`}
            />
          </Button>

          {/* NEW & SALE Badges */}
          <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
            {product.isNew && (
              <Badge className="bg-brand-olive text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
                NEW
              </Badge>
            )}
            {product.originalPrice && (
              <Badge className="bg-brand-terracotta text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
                SALE
              </Badge>
            )}
          </div>

          {/* Product Image - reduced height */}
          <div className="w-full h-[250px] bg-white p-4 overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={400}
              height={400}
              className="object-contain w-full h-full"
            />
          </div>
        </div>

        <CardContent className="px-4 pt-3 pb-4 text-left">
          <h3 className="font-semibold text-xs md:text-sm text-black uppercase tracking-wide line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-gray-700 mb-1 line-clamp-1">
            {product.description}
          </p>

          <div className="flex items-center gap-1 mb-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? "fill-brand-gold text-brand-gold"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] text-gray-500">
              ({product.reviews})
            </span>
          </div>

          <p className="text-sm font-semibold text-black mb-3">
            ₹{product.price.toLocaleString()}
          </p>

          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              onClick={handleAddToCart}
              disabled={loading}
              className="w-full bg-black hover:bg-gray-800 text-white rounded-none text-xs h-9 uppercase tracking-wide"
            >
              {loading ? "Adding..." : "Add to Bag"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
