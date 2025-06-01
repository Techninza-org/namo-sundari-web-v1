"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Cookies from "js-cookie";

import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  Gift,
  Truck,
  Shield,
} from "lucide-react";

interface CartItem {
  id: number;
  variantId: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  quantity: number;
  attributes?: {
    color?: string;
    size?: string;
    [key: string]: any;
  };
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState("");
  const [discount, setDiscount] = useState(0);

  const token = Cookies.get("token");

  // Fetch cart items from API
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/web/get-cart`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }

        const data = await response.json();
        const transformedItems = data.items.map((item: any) => ({
          id: item.id,
          variantId: item.variantId,
          name: item.name,
          price: item.price,
          originalPrice: item.originalPrice,
          image: item.image || "/placeholder.svg?height=300&width=300",
          category: item.category || "Perfume",
          quantity: item.quantity,
          attributes: item.attributes || {},
        }));

        setCartItems(transformedItems);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // Update item quantity in cart
  const updateQuantity = async (id: number, newQuantity: number) => {
    if (newQuantity < 0) return;

    try {
      const itemToUpdate = cartItems.find((item) => item.id === id);
      if (!itemToUpdate) return;

      // Optimistically update UI
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );

      // If quantity is 0, remove the item
      if (newQuantity === 0) {
        await removeItem(id);
        return;
      }

      const action =
        newQuantity > itemToUpdate.quantity ? "increment" : "decrement";
      const response = await fetch(
        `http://localhost:3000/api/web/quantity-update/${itemToUpdate.variantId}`,
        {
          method: "PATCH",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzQ2ODU4MjQxLCJleHAiOjE3NDc0NjMwNDF9.PUzeOrEbEQq_f1bCNswucAJt612mRcMmSqmp7H4NBCc",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }

      // Refresh cart items after successful update
      const updatedResponse = await fetch("http://:3000/api/web/get-cart", {
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzQ2ODU4MjQxLCJleHAiOjE3NDc0NjMwNDF9.PUzeOrEbEQq_f1bCNswucAJt612mRcMmSqmp7H4NBCc",
          "Content-Type": "application/json",
        },
      });

      if (updatedResponse.ok) {
        const updatedData = await updatedResponse.json();
        const updatedItems = updatedData.items.map((item: any) => ({
          id: item.id,
          variantId: item.variantId,
          name: item.name,
          price: item.price,
          originalPrice: item.originalPrice,
          image: item.image || "/placeholder.svg?height=300&width=300",
          category: item.category || "Perfume",
          quantity: item.quantity,
          attributes: item.attributes || {},
        }));
        setCartItems(updatedItems);
      }
    } catch (err) {
      console.error("Error updating quantity:", err);
      // Revert optimistic update if API call fails
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity } : item
        )
      );
      setError("Failed to update quantity. Please try again.");
    }
  };

  // Remove item from cart
  const removeItem = async (id: number) => {
    try {
      const itemToRemove = cartItems.find((item) => item.id === id);
      if (!itemToRemove) return;

      // Optimistically remove from UI
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));

      const response = await fetch(
        "http://localhost:3000/api/web/remove-from-cart",
        {
          method: "POST",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzQ2ODU4MjQxLCJleHAiOjE3NDc0NjMwNDF9.PUzeOrEbEQq_f1bCNswucAJt612mRcMmSqmp7H4NBCc",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            variantId: itemToRemove.variantId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove item");
      }
    } catch (err) {
      console.error("Error removing item:", err);
      // Revert optimistic removal if API call fails
      setCartItems((prevItems) => [...prevItems]);
      setError("Failed to remove item. Please try again.");
    }
  };

  const applyPromoCode = () => {
    const validCodes = {
      WELCOME10: 10,
      SACRED15: 15,
      ZODIAC20: 20,
    };

    if (validCodes[promoCode as keyof typeof validCodes]) {
      setAppliedPromo(promoCode);
      setDiscount(validCodes[promoCode as keyof typeof validCodes]);
      setPromoCode("");
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountAmount = (subtotal * discount) / 100;
  const shipping = subtotal > 2000 ? 0 : 150;
  const total = subtotal - discountAmount + shipping;

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-whisper pt-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-playfair text-2xl text-brand-maroon mb-4">
            Loading your sacred collection...
          </h1>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-gold mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-brand-whisper pt-8 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="font-playfair text-2xl text-brand-maroon mb-4">
            Error loading your cart
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-brand-maroon hover:bg-brand-maroon/90 text-white"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-brand-whisper pt-8">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ShoppingBag className="w-24 h-24 text-gray-400 mx-auto mb-6" />
            <h1 className="font-playfair text-4xl font-bold text-brand-maroon mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Discover our sacred collection and find the perfect scent for your
              spiritual journey.
            </p>
            <Link href="/shop">
              <Button
                size="lg"
                className="bg-brand-maroon hover:bg-brand-maroon/90 text-white px-8 py-4 text-lg font-medium rounded-full"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-whisper pt-8">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-playfair text-4xl font-bold text-brand-maroon mb-2">
              Shopping Cart
            </h1>
            <p className="text-gray-600">
              {cartItems.length} items in your sacred collection
            </p>
          </div>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-6">
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-playfair text-lg font-semibold text-brand-maroon mb-1">
                              {item.name}
                            </h3>
                            <Badge
                              variant="outline"
                              className="border-brand-gold text-brand-maroon text-xs"
                            >
                              {item.category}
                            </Badge>

                            {item.attributes && (
                              <div className="mt-1 flex gap-2">
                                {item.attributes.color && (
                                  <Badge variant="outline" className="text-xs">
                                    Color: {item.attributes.color}
                                  </Badge>
                                )}
                                {item.attributes.size && (
                                  <Badge variant="outline" className="text-xs">
                                    Size: {item.attributes.size}
                                  </Badge>
                                )}
                              </div>
                            )}

                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xl font-bold text-brand-maroon">
                                ₹{item.price.toLocaleString()}
                              </span>
                              {item.originalPrice && (
                                <span className="text-sm text-gray-500 line-through">
                                  ₹{item.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-8 h-8"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-8 h-8"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <p className="text-lg font-bold text-brand-maroon">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Promo Code */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-playfair text-lg font-semibold text-brand-maroon mb-4">
                  Promo Code
                </h3>
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-green-700 font-medium">
                      {appliedPromo} Applied!
                    </span>
                    <span className="text-green-700 font-bold">
                      -{discount}%
                    </span>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) =>
                        setPromoCode(e.target.value.toUpperCase())
                      }
                    />
                    <Button
                      onClick={applyPromoCode}
                      variant="outline"
                      className="border-brand-gold text-brand-maroon"
                    >
                      Apply
                    </Button>
                  </div>
                )}
                <div className="mt-3 text-sm text-gray-600">
                  <p>Try: WELCOME10, SACRED15, ZODIAC20</p>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-playfair text-lg font-semibold text-brand-maroon mb-4">
                  Order Summary
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({discount}%)</span>
                      <span>-₹{discountAmount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold text-brand-maroon">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-brand-maroon hover:bg-brand-maroon/90 text-white py-3 text-lg font-medium rounded-full">
                  Proceed to Checkout
                </Button>

                {/* Benefits */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Truck className="w-4 h-4 text-brand-gold" />
                    <span>Free shipping on orders over ₹2,000</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-brand-gold" />
                    <span>30-day satisfaction guarantee</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Gift className="w-4 h-4 text-brand-gold" />
                    <span>Blessed with sacred intentions</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
