"use client";

import type React from "react";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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
}

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const router = useRouter();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}web/get-all-products`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        setProducts(response.data || []); // Adjust based on actual response structure
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
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
                onClick={onAddToCart}
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
            onClick={onAddToCart}
            className="w-full bg-brand-brown hover:bg-brand-brown/90 text-white rounded-md transition-all duration-300 btn-hover-effect text-sm h-9"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Add to Bag
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
