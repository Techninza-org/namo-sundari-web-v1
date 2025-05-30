"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Heart, User, Search, Menu, X } from "lucide-react"
import AnnouncementBar from "./announcement-bar"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount] = useState(3)
  const [wishlistCount] = useState(5)
  const [isScrolled, setIsScrolled] = useState(false)

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Shop All", href: "/shop" },
    { name: "Zodiac Scents", href: "/zodiac" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
            {/* Left Navigation - Mobile Menu & Desktop Nav */}
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
            <Link href="/" className="flex items-center justify-center">
              <div className="relative h-16 w-48">
                <Image
                  src="/placeholder.svg?height=64&width=192&text=Namoh+Sundari"
                  alt="Namoh Sundari"
                  fill
                  className="object-contain"
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

              {/* Search */}
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Search className="w-5 h-5 text-brand-charcoal" />
              </Button>

              {/* Wishlist */}
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

              {/* Cart */}
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

              {/* User Account */}
              <Link href="/profile">
                <Button variant="ghost" size="icon">
                  <User className="w-5 h-5 text-brand-charcoal" />
                </Button>
              </Link>
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
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
