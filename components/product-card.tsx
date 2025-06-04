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
  variants?: {
    id: number;
    attributes?: {
      key: string;
      value: string;
    }[];
  }[];
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
      const variantId = product.variants?.[0]?.id || product.id;
      const quantity = 1;

      // ✅ Safe attributes extraction
      const attributes = Array.isArray(product.variants?.[0]?.attributes)
        ? product.variants[0].attributes.reduce(
            (acc: Record<string, string>, attr) => {
              acc[attr.key] = attr.value;
              return acc;
            },
            {}
          )
        : {};

      console.log("Sending attributes:", attributes);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/web/add-to-cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            variantId,
            quantity,
            attributes,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        router.push("/cart");
      } else {
        console.error("Add to cart failed:", data);
        alert("Failed to add to cart");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
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
        className="border border-brand-beige/50 rounded-lg overflow-hidden shadow-subtle hover:shadow-hover transition-all duration-300 bg-white cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="relative">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden bg-brand-cream/50">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="object-cover product-image"
            />

            {/* Overlay on hover */}
            <div
              className={`absolute inset-0 bg-black/10 flex items-center justify-center gap-3 transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Button
                size="sm"
                variant="secondary"
                onClick={handleViewProduct}
                className="bg-white hover:bg-white/90 text-brand-brown rounded-full w-10 h-10 p-0"
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                onClick={handleAddToCart}
                className="bg-brand-brown hover:bg-brand-brown/90 text-white rounded-full w-10 h-10 p-0 btn-hover-effect"
              >
                <ShoppingBag className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <Badge className="bg-brand-olive text-white text-xs font-medium px-2 py-1 rounded">
                NEW
              </Badge>
            )}
            {product.originalPrice && (
              <Badge className="bg-brand-terracotta text-white text-xs font-medium px-2 py-1 rounded">
                SALE
              </Badge>
            )}
          </div>

          {/* Wishlist */}
          <Button
            size="sm"
            variant="ghost"
            onClick={handleWishlistToggle}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isWishlisted
                  ? "fill-brand-terracotta text-brand-terracotta"
                  : "text-brand-charcoal"
              }`}
            />
          </Button>
        </div>

        <CardContent className="p-5">
          {/* Category */}
          <p className="text-xs text-brand-brown font-medium mb-1 uppercase tracking-wide">
            {product.category}
          </p>

          {/* Product Name */}
          <h3 className="font-playfair text-base font-semibold text-brand-charcoal mb-1 line-clamp-2">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
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
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-base font-bold text-brand-charcoal">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            disabled={loading}
            className="w-full bg-brand-brown hover:bg-brand-brown/90 text-white rounded-md transition-all duration-300 btn-hover-effect text-sm h-9"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            {loading ? "Adding..." : "Add to Cart"}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
