"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import Cookies from "js-cookie";

// Define the CartContext type
interface CartContextType {
  cartCount: number;
  fetchCartCount: () => Promise<void>;
}

// Create the context with default values
const CartContext = createContext<CartContextType>({
  cartCount: 0,
  fetchCartCount: async () => {},
});

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartCount, setCartCount] = useState<number>(0);

  const fetchCartCount = async () => {
    const token = Cookies.get("token");
    if (!token) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/web/get-cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch cart items");

      const data = await res.json();
      const count = data?.summary?.totalItems ?? 0;
      console.log("Cart count fetched:", count);
      setCartCount(count);
    } catch (error) {
      console.error("Fetch cart error:", error);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  // console.log("CartProvider initialized with count:", cartCount);

  return (
    <CartContext.Provider value={{ cartCount, fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
export const useCart = (): CartContextType => useContext(CartContext);
