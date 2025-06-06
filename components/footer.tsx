import React from "react";
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  PinIcon as Pinterest,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-8 md:pt-12 pb-4 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-base md:text-lg font-medium tracking-wider mb-4 md:mb-6 uppercase">
            Subscribe to Our Newsletter
          </h2>
          <div className="flex flex-col sm:flex-row justify-center max-w-md mx-auto gap-2 sm:gap-0">
            <input
              type="email"
              placeholder="Email"
              className="flex-1 px-4 py-2 md:py-3 border border-gray-300 focus:outline-none focus:border-red-600 text-sm rounded-sm sm:rounded-r-none"
            />
            <button className="bg-black text-white px-4 md:px-6 py-2 md:py-3 text-xs md:text-sm font-medium tracking-wider hover:bg-gray-800 transition-colors rounded-sm sm:rounded-l-none whitespace-nowrap">
              SUBSCRIBE
            </button>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pb-8 md:pb-12">
          {/* Customer Care */}
          <div className="space-y-3">
            <h3 className="uppercase text-sm font-medium tracking-wider mb-3 md:mb-4 text-gray-900">
              Customer Care
            </h3>
            <ul className="space-y-2 text-xs md:text-sm">
              <li>
                <a
                  href="/contact-us"
                  className="text-gray-600 hover:text-red-600 transition-colors block"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/call"
                  className="text-gray-600 hover:text-red-600 transition-colors block"
                >
                  Call: +91 1800-103-0069
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-gray-600 hover:text-red-600 transition-colors block"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/track-order"
                  className="text-gray-600 hover:text-red-600 transition-colors block"
                >
                  Track Your Order
                </a>
              </li>
              <li>
                <a
                  href="/book-appointment"
                  className="text-gray-600 hover:text-red-600 transition-colors block"
                >
                  Book an Appointment
                </a>
              </li>
              <li>
                <a
                  href="/accessibility"
                  className="text-gray-600 hover:text-red-600 transition-colors block"
                >
                  Accessibility
                </a>
              </li>
              <li>
                <a
                  href="/sitemap"
                  className="text-gray-600 hover:text-red-600 transition-colors block"
                >
                  Sitemap
                </a>
              </li>
            </ul>
          </div>

          {/* Our Company */}
          <div className="space-y-3">
            <h3 className="uppercase text-sm font-medium tracking-wider mb-3 md:mb-4 text-gray-900">
              Our Company
            </h3>
            <ul className="space-y-2 text-xs md:text-sm">
              <li>
                <a
                  href="/find-boutique"
                  className="text-gray-600 hover:text-red-600 transition-colors block"
                >
                  Find a Boutique
                  <span className="ml-1 text-xs">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="/careers"
                  className="text-gray-600 hover:text-red-600 transition-colors block"
                >
                  Careers
                  <span className="ml-1 text-xs">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="/corporate-responsibility"
                  className="text-gray-600 hover:text-red-600 transition-colors block"
                >
                  Corporate Social Responsibility
                </a>
              </li>
              <li>
                <a
                  href="/credits"
                  className="text-gray-600 hover:text-red-600 transition-colors block"
                >
                  Credits
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Area */}
          <div className="space-y-3">
            <h3 className="uppercase text-sm font-medium tracking-wider mb-3 md:mb-4 text-gray-900">
              Legal Area
            </h3>
            <ul className="space-y-2 text-xs md:text-sm">
              <li>
                <a
                  href="/terms"
                  className="text-gray-600 hover:text-red-600 transition-colors block"
                >
                  Terms of Use
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-gray-600 hover:text-red-600 transition-colors block"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/conditions-of-sale"
                  className="text-gray-600 hover:text-red-600 transition-colors block"
                >
                  Conditions of Sale
                </a>
              </li>
              <li>
                <a
                  href="/accessibility-statement"
                  className="text-gray-600 hover:text-red-600 transition-colors block"
                >
                  Accessibility Statement
                </a>
              </li>
              <li>
                <a
                  href="/california-privacy"
                  className="text-gray-600 hover:text-red-600 transition-colors block"
                >
                  California Privacy Rights
                </a>
              </li>
              <li>
                <a
                  href="/human-rights"
                  className="text-gray-600 hover:text-red-600 transition-colors block"
                >
                  Human Rights Statement
                  <span className="ml-1 text-xs">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="/do-not-sell"
                  className="text-gray-600 hover:text-red-600 transition-colors block"
                >
                  Do Not Sell My Personal Information
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="space-y-3">
            <h3 className="uppercase text-sm font-medium tracking-wider mb-3 md:mb-4 text-gray-900">
              Follow Us
            </h3>
            <div className="flex space-x-4 mb-4 md:mb-6">
              <a
                href="https://instagram.com/namosundari"
                className="text-gray-600 hover:text-red-600 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com/namosundari"
                className="text-gray-600 hover:text-red-600 transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://twitter.com/namosundari"
                className="text-gray-600 hover:text-red-600 transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://youtube.com/namosundari"
                className="text-gray-600 hover:text-red-600 transition-colors"
                aria-label="Follow us on YouTube"
              >
                <Youtube size={18} />
              </a>
              <a
                href="https://pinterest.com/namosundari"
                className="text-gray-600 hover:text-red-600 transition-colors"
                aria-label="Follow us on Pinterest"
              >
                <Pinterest size={18} />
              </a>
            </div>

            {/* Accessibility Icons */}
            <div className="flex space-x-2">
              <div
                className="bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm"
                aria-label="Accessibility features"
              >
                ♿
              </div>
              <div
                className="bg-gray-800 text-white rounded w-8 h-8 flex items-center justify-center text-sm"
                aria-label="Mobile friendly"
              >
                📱
              </div>
            </div>
          </div>
        </div>

        {/* Logo Section */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 py-6 md:py-8 border-t border-gray-200">
          <Link href="/" className="flex items-center">
            <img
              src="/namo-logo2.png"
              alt="Namo Sundari Logo"
              className="h-12 md:h-16 object-contain hover:opacity-80 transition-opacity"
            />
          </Link>
          <Link href="/" className="flex items-center">
            <img
              src="/namo-logo.png"
              alt="Namo Sundari Secondary Logo"
              className="h-12 md:h-16 object-contain hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-red-600 text-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <div className="text-xs text-center sm:text-left">
            <span>Copyright © 2025 Namo Sundari. All rights reserved.</span>
          </div>
          <div className="text-xs text-center sm:text-right">
            <span>Shop in: India | </span>
            <button className="underline hover:no-underline transition-all">
              Change Country
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
