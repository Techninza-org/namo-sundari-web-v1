"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingBag,
  Heart,
  User,
  Search,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import AnnouncementBar from "./announcement-bar";

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  const isLogin = Cookies.get("role");

  // console.log(isLogin, "bcihdbfv");

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Shop All", href: "/shop" },
    { name: "Zodiac Scents", href: "/zodiac" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Check auth status and login message
    const token = Cookies.get("authToken");
    const message = Cookies.get("loginMessage");

    if (token) {
      setIsLoggedIn(true);
    }

    if (message) {
      setLoginMessage(message);
      alert(message); // Show the login success message
      Cookies.remove("loginMessage"); // Clear the message after showing
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    setIsLoggedIn(false);
    setShowDropdown(false);
    setIsMenuOpen(false);
    router.push("/");
  };

  return (
    <>
      <AnnouncementBar />
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-soft py-2" : "bg-brand-cream py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Left Navigation */}
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5 text-brand-charcoal" />
                ) : (
                  <Menu className="w-5 h-5 text-brand-charcoal" />
                )}
              </Button>

              <nav className="hidden md:flex items-center space-x-8">
                {navigation.slice(0, 2).map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-brand-charcoal hover:text-brand-brown transition-colors font-medium text-sm"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center justify-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="relative h-16 w-48">
                <Image
                  src="/logonamo.webp"
                  alt="Namoh Sundari"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Right Navigation */}
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex items-center space-x-8">
                {navigation.slice(2).map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-brand-charcoal hover:text-brand-brown transition-colors font-medium text-sm"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Search className="w-5 h-5 text-brand-charcoal" />
              </Button>

              <Link href="/profile?tab=wishlist">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="w-5 h-5 text-brand-charcoal" />
                  {wishlistCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-brand-terracotta text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {wishlistCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingBag className="w-5 h-5 text-brand-charcoal" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-brand-terracotta text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              <div className="relative">
                {isLogin ? (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowDropdown(!showDropdown)}
                      onBlur={() =>
                        setTimeout(() => setShowDropdown(false), 200)
                      }
                    >
                      <User className="w-5 h-5 text-brand-charcoal" />
                    </Button>
                    <AnimatePresence>
                      {showDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md z-50 overflow-hidden"
                        >
                          <Link
                            href="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setShowDropdown(false)}
                          >
                            Profile
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          >
                            <LogOut className="w-4 h-4 mr-2" /> Logout
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <div className="hidden md:flex space-x-2">
                    <Link href="/login">
                      <Button variant="outline" className="text-sm">
                        Login
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button className="text-sm bg-brand-brown text-white">
                        Register
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-brand-beige py-4 bg-white"
            >
              <nav className="flex flex-col space-y-4 px-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-brand-charcoal hover:text-brand-brown transition-colors font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="pt-4 border-t border-brand-beige">
                  <Button variant="ghost" className="w-full justify-start">
                    <Search className="w-5 h-5 mr-2" />
                    Search Products
                  </Button>
                </div>

                {!isLoggedIn ? (
                  <div className="flex flex-col pt-4 space-y-2 border-t border-brand-beige">
                    <Link href="/login">
                      <Button
                        variant="outline"
                        className="w-full justify-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Login
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button
                        className="w-full justify-center bg-brand-brown text-white"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Register
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-brand-beige">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 mr-2" /> Logout
                    </button>
                  </div>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
