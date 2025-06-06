"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { useCart } from "@/hooks/CartContext";

interface CartItem {
  cartItemId: number;
  productName: string;
  productSlug: string;
  productId: number;
  variantId: number;
  sku: string;
  price: number;
  quantity: number;
  itemTotal: number;
  images: string[];
  attributes: {
    name: string;
    value: string;
  }[];
}

interface CartSummary {
  subtotal: number;
  totalItems: number;
}

interface OtherCharges {
  plateformfee: number;
  gst: number;
  deliveryFee: number;
}

interface CartResponse {
  items: CartItem[];
  summary: CartSummary;
  otherCharges: OtherCharges;
  totalAmountafterCharges: number;
}

export default function CartPage() {
  const router = useRouter();
  const [cartData, setCartData] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const { fetchCartCount } = useCart();

  const token = Cookies.get("token");

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      setError(null);
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

      const data: CartResponse = await response.json();
      setCartData(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [token]);

  const updateQuantity = async (cartItemId: number, newQuantity: number) => {
    if (!cartData || newQuantity <= -1 || isUpdating) return;

    setIsUpdating(true);
    try {
      const currentItem = cartData.items.find(
        (item) => item.cartItemId === cartItemId
      );
      if (!currentItem) return;

      if (newQuantity === -1) {
        await removeItem(cartItemId);
        return;
      }

      setCartData((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          items: prev.items.map((item) =>
            item.cartItemId === cartItemId
              ? { ...item, quantity: newQuantity }
              : item
          ),
          summary: {
            ...prev.summary,
            subtotal:
              prev.summary.subtotal -
              currentItem.price * currentItem.quantity +
              currentItem.price * newQuantity,
          },
        };
      });

      const action =
        newQuantity > currentItem.quantity ? "increment" : "decrement";
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/web/quantity-update/${cartItemId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }

      await fetchCartItems();
      await fetchCartCount(); // Update cart count after quantity change
    } catch (err) {
      console.error("Error updating quantity:", err);
      setError("Failed to update quantity. Please try again.");
      await fetchCartItems();
      // Re-fetch cart items to ensure data consistency
    } finally {
      setIsUpdating(false);
    }
  };

  const removeItem = async (variantId: number) => {
    if (isUpdating) return;

    setIsUpdating(true);
    try {
      setCartData((prev) => {
        if (!prev) return null;
        const itemToRemove = prev.items.find(
          (item) => item.variantId === variantId
        );
        if (!itemToRemove) return prev;

        return {
          ...prev,
          items: prev.items.filter((item) => item.variantId !== variantId),
          summary: {
            ...prev.summary,
            subtotal:
              prev.summary.subtotal -
              itemToRemove.price * itemToRemove.quantity,
            totalItems: prev.summary.totalItems - 1,
          },
        };
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/web/remove-from-cart`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ variantId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove item");
      }

      await fetchCartItems();
    } catch (err) {
      console.error("Error removing item:", err);
      setError("Failed to remove item. Please try again.");
      await fetchCartItems();
    } finally {
      setIsUpdating(false);
    }
  };

  const applyPromoCode = () => {
    const validCodes: Record<string, number> = {
      WELCOME10: 10,
      SACRED15: 15,
      ZODIAC20: 20,
    };

    if (promoCode in validCodes) {
      setAppliedPromo(promoCode);
      setDiscount(validCodes[promoCode]);
      setPromoCode("");
    }
  };

  const removePromoCode = () => {
    setAppliedPromo("");
    setDiscount(0);
  };

  const handleCheckout = () => {
    router.push("/order");
  };

  if (loading && !cartData) {
    return (
      <div className="min-h-screen pt-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Loading your collection...</h1>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-8 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl mb-4">Error loading your cart</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button
            onClick={fetchCartItems}
            className="bg-black hover:bg-gray-800 text-white"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!cartData || cartData.items.length === 0) {
    return (
      <div className="min-h-screen pt-8">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ShoppingBag className="w-24 h-24 text-gray-400 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-lg text-gray-600 mb-8">
              Discover our collection and find the perfect items for you.
            </p>
            <Link href="/shop">
              <Button
                size="lg"
                className="bg-black text-white px-8 py-4 text-lg font-medium rounded-none"
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

  const discountAmount = (cartData.summary.subtotal * discount) / 100;
  const subtotalAfterDiscount = cartData.summary.subtotal - discountAmount;
  const finalTotal =
    subtotalAfterDiscount +
    cartData.otherCharges.plateformfee +
    cartData.otherCharges.gst +
    cartData.otherCharges.deliveryFee;

  return (
    <div className="min-h-screen pt-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Shopping Bag</h1>
            <p className="text-gray-600">
              {cartData.summary.totalItems}{" "}
              {cartData.summary.totalItems === 1 ? "item" : "items"}
            </p>
          </div>
          <Link href="/shop">
            <Button
              variant="outline"
              className="border-black text-black hover:bg-black hover:text-white rounded-none"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {cartData.items.map((item, index) => (
              <motion.div
                key={item.cartItemId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex flex-col md:flex-row gap-6 pb-6 border-b">
                  <div className="w-full md:w-48 flex-shrink-0">
                    <div className="relative w-full aspect-square">
                      <Image
                        src={
                          `${process.env.NEXT_PUBLIC_API_URL_IMG}${item.images[0]}` ||
                          "/placeholder.svg"
                        }
                        alt={item.productName}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col h-full">
                      <div className="flex justify-between">
                        <div>
                          <Link href={`/product/${item.productSlug}`}>
                            <h3 className="text-lg font-medium mb-1 hover:underline">
                              {item.productName}
                            </h3>
                          </Link>
                          <p className="text-sm text-gray-600 mb-2">
                            {item.sku}
                          </p>

                          {item.attributes.length > 0 && (
                            <div className="mb-3">
                              {item.attributes.map((attr, idx) => (
                                <p key={idx} className="text-sm text-gray-600">
                                  {attr.name}: {attr.value}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.variantId)}
                          className="text-gray-400 hover:text-black self-start"
                          disabled={isUpdating}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="mt-auto">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <span className="text-sm">Quantity:</span>
                            <div className="flex items-center border border-gray-300">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  updateQuantity(
                                    item.cartItemId,
                                    item.quantity - 1
                                  )
                                }
                                className="w-8 h-8 rounded-none border-r border-gray-300"
                                disabled={item.quantity <= 0 || isUpdating}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center text-sm">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  updateQuantity(
                                    item.cartItemId,
                                    item.quantity + 1
                                  )
                                }
                                className="w-8 h-8 rounded-none border-l border-gray-300"
                                disabled={isUpdating}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-lg font-medium">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </p>
                            {item.quantity > 1 && (
                              <p className="text-sm text-gray-600">
                                ₹{item.price.toLocaleString()} each
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="border p-6">
              <h3 className="text-lg font-medium mb-4">Order Summary</h3>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{cartData.summary.subtotal.toLocaleString()}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({discount}%)</span>
                    <span>-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Platform Fee</span>
                  <span>
                    ₹{cartData.otherCharges.plateformfee.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>GST</span>
                  <span>₹{cartData.otherCharges.gst.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery Fee</span>
                  <span>
                    ₹{cartData.otherCharges.deliveryFee.toLocaleString()}
                  </span>
                </div>

                <Separator className="my-2" />

                <div className="flex justify-between text-lg font-medium">
                  <span>Total</span>
                  <span>₹{finalTotal.toLocaleString()}</span>
                </div>

                <div className="pt-4">
                  <Button
                    className="w-full bg-white text-black py-3 text-lg font-medium rounded-none hover:bg-black hover:text-white border border-black"
                    disabled={isUpdating}
                    onClick={handleCheckout}
                  >
                    {isUpdating ? "Processing..." : "Proceed to Checkout"}
                  </Button>
                </div>
              </div>
            </div>

            <div className="border p-6">
              <h3 className="text-lg font-medium mb-4">Promo Code</h3>
              {appliedPromo ? (
                <div className="flex items-center justify-between p-3 bg-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{appliedPromo} Applied!</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={removePromoCode}
                      className="text-gray-600 hover:text-black p-1 h-auto"
                    >
                      (Remove)
                    </Button>
                  </div>
                  <span className="font-medium">-{discount}%</span>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    disabled={isUpdating}
                    className="rounded-none"
                  />
                  <Button
                    onClick={applyPromoCode}
                    variant="outline"
                    className="border-black text-black rounded-none hover:bg-gray-100"
                    disabled={!promoCode || isUpdating}
                  >
                    Apply
                  </Button>
                </div>
              )}
              <div className="mt-3 text-sm text-gray-600">
                <p>Try: WELCOME10, SACRED15, ZODIAC20</p>
              </div>
            </div>

            <div className="border p-6">
              <h3 className="text-lg font-medium mb-4">Services</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck className="w-4 h-4" />
                  <span>Free shipping on orders over ₹2,000</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="w-4 h-4" />
                  <span>30-day satisfaction guarantee</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Gift className="w-4 h-4" />
                  <span>Gift wrapping available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
