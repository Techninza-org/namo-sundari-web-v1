import Link from "next/link"
import { Instagram, Facebook, Twitter, Youtube, PinIcon as Pinterest } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12">
          {/* Customer Care */}
          <div>
            <h3 className="uppercase text-sm font-medium tracking-wider mb-4">Customer Care</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/contact-us" className="hover:text-[var(--cartier-red)] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/call" className="hover:text-[var(--cartier-red)] transition-colors">
                  Call: +91 1800-103-0069
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[var(--cartier-red)] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="hover:text-[var(--cartier-red)] transition-colors">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Company */}
          <div>
            <h3 className="uppercase text-sm font-medium tracking-wider mb-4">Our Company</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/find-a-boutique" className="hover:text-[var(--cartier-red)] transition-colors">
                  Find a Boutique
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-[var(--cartier-red)] transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/corporate-social-responsibility"
                  className="hover:text-[var(--cartier-red)] transition-colors"
                >
                  Cartier and Corporate Social Responsibility
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Area */}
          <div>
            <h3 className="uppercase text-sm font-medium tracking-wider mb-4">Legal Area</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/terms-of-use" className="hover:text-[var(--cartier-red)] transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[var(--cartier-red)] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/conditions-of-sale" className="hover:text-[var(--cartier-red)] transition-colors">
                  Conditions of Sale
                </Link>
              </li>
              <li>
                <Link href="/credits" className="hover:text-[var(--cartier-red)] transition-colors">
                  Credits
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="uppercase text-sm font-medium tracking-wider mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="https://instagram.com/cartier" className="hover:text-[var(--cartier-red)] transition-colors">
                <Instagram size={18} />
              </Link>
              <Link href="https://facebook.com/cartier" className="hover:text-[var(--cartier-red)] transition-colors">
                <Facebook size={18} />
              </Link>
              <Link href="https://twitter.com/cartier" className="hover:text-[var(--cartier-red)] transition-colors">
                <Twitter size={18} />
              </Link>
              <Link href="https://youtube.com/cartier" className="hover:text-[var(--cartier-red)] transition-colors">
                <Youtube size={18} />
              </Link>
              <Link href="https://pinterest.com/cartier" className="hover:text-[var(--cartier-red)] transition-colors">
                <Pinterest size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="flex justify-center space-x-12 py-8 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs">© 2023 CARTIER</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-[var(--cartier-red)] text-white py-2 mt-8 flex justify-between items-center">
          <div className="text-xs uppercase tracking-wider">
            SHOP IN: INDIA | <span className="underline">Change Country</span>
          </div>
          <div>
            <span className="text-xs">COPYRIGHT © 2023 CARTIER</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
