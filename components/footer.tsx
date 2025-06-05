import Link from "next/link";
import Image from "next/image";
import {
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-brand-charcoal text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Newsletter */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h3 className="font-playfair text-2xl font-bold mb-4">
            Join Our Sacred Community
          </h3>
          <p className="text-white/80 mb-6">
            Subscribe to receive sacred wisdom, exclusive offers, and updates on
            new arrivals
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              placeholder="Your email address"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-md"
            />
            <Button className="bg-brand-terracotta hover:bg-brand-terracotta/90 text-white rounded-md btn-hover-effect">
              Subscribe
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block mb-4">
              <div className="relative h-12 w-36">
                <Image
                  src="/logonamo.webp"
                  alt="Namoh Sundari"
                  fill
                  className="object-contain brightness-200"
                />
              </div>
            </Link>
            <p className="text-white/70 leading-relaxed text-sm">
              Sacred scents crafted with pure intentions, natural ingredients,
              and spiritual reverence. Honoring ancient aromatherapy traditions.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white/70 hover:text-brand-terracotta rounded-full"
              >
                <Instagram className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/70 hover:text-brand-terracotta rounded-full"
              >
                <Facebook className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/70 hover:text-brand-terracotta rounded-full"
              >
                <Twitter className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-playfair text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { name: "Shop All Products", href: "/shop" },
                { name: "Zodiac Scents", href: "/zodiac" },
                { name: "Essential Oils", href: "/essential-oils" },
                { name: "Attars", href: "/attars" },
                { name: "Incense Sticks", href: "/incense" },
                { name: "Gift Sets", href: "/gifts" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-brand-terracotta transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-4">
            <h4 className="font-playfair text-lg font-semibold text-white mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2">
              {[
                { name: "About Us", href: "/about" },
                { name: "Contact Us", href: "/contact" },
                { name: "Shipping Info", href: "/shipping" },
                { name: "Returns & Exchanges", href: "/returns" },
                { name: "Size Guide", href: "/size-guide" },
                { name: "FAQ", href: "/faq" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-brand-terracotta transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-playfair text-lg font-semibold text-white mb-4">
              Contact Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-white/70">
                <Mail className="w-4 h-4 text-brand-terracotta" />
                <span className="text-sm">hello@namohsundari.com</span>
              </div>
              <div className="flex items-center space-x-3 text-white/70">
                <Phone className="w-4 h-4 text-brand-terracotta" />
                <span className="text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3 text-white/70">
                <MapPin className="w-4 h-4 text-brand-terracotta" />
                <span className="text-sm">Mumbai, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm mb-4 md:mb-0">
            © 2024 Namoh Sundari. All rights reserved. Crafted with love and
            devotion.
          </p>
          <div className="flex space-x-6">
            <Link
              href="/privacy"
              className="text-white/50 hover:text-brand-terracotta text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-white/50 hover:text-brand-terracotta text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
