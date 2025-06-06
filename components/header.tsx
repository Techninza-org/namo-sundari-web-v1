"use client";
import { useState, useEffect, useRef } from "react";
import {
  Heart,
  User,
  MapPin,
  Search,
  ShoppingBag,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/hooks/CartContext";

const DynamicNavigationHeader = () => {
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileCategory, setActiveMobileCategory] = useState(null);
  const token = Cookies.get("token");
  const megaMenuRef = useRef(null);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const { cartCount } = useCart();

  console.log("Cart Count:", cartCount);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname(); // 🔄 Detect route change

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
  }, [pathname]); // 🔄 Runs on every route change

  const handleLogout = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
    window.location.href = "/login"; // Or use router.push("/login")
  };

  useEffect(() => {
    fetchCategories();

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (
      megaMenuRef.current &&
      !megaMenuRef.current.contains(event.target) &&
      navRef.current &&
      !navRef.current.contains(event.target)
    ) {
      setHoveredItemId(null);
      setIsMegaMenuOpen(false);
    }

    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target) &&
      !event.target.closest(".mobile-menu-button")
    ) {
      setIsMobileMenuOpen(false);
      setActiveMobileCategory(null);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/web/get-all-category`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        }
      );
      const data = response.data;
      if (data.success) {
        setCategories(data.categories || []);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  };

  const fetchSubCategories = async (categoryId) => {
    if (subCategories[categoryId]) return;

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/web/get-all-sub-category-by-main-category/${categoryId}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        }
      );
      const data = response.data;
      if (data.success) {
        setSubCategories((prev) => ({
          ...prev,
          [categoryId]: data.subCategories || [],
        }));
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  let hideTimeout;

  const handleMouseEnter = (categoryId) => {
    clearTimeout(hideTimeout);
    setHoveredItemId(categoryId);
    setIsMegaMenuOpen(true);
    fetchSubCategories(categoryId);
  };

  const handleMouseLeave = () => {
    hideTimeout = setTimeout(() => {
      setHoveredItemId(null);
      setIsMegaMenuOpen(false);
    }, 200);
  };

  const handleCategoryClick = (categoryId) => {
    setHoveredItemId(categoryId);
    setIsMegaMenuOpen(true);
    fetchSubCategories(categoryId);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) {
      setActiveMobileCategory(null);
    }
  };

  const toggleMobileCategory = (categoryId) => {
    if (activeMobileCategory === categoryId) {
      setActiveMobileCategory(null);
    } else {
      setActiveMobileCategory(categoryId);
      fetchSubCategories(categoryId);
    }
  };

  if (loading) {
    return (
      <header className="bg-white shadow-lg relative z-50">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white relative z-50">
      {/* Mobile Top Bar */}
      <div className="lg:hidden">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <button className="mobile-menu-button p-2" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          <div className="flex justify-center">
            <Link href="/">
              <img
                src="/namo-logo.png"
                alt="Logo"
                className="h-12 object-contain"
              />
            </Link>
          </div>

          <div className="flex space-x-4 items-center">
            <ShoppingBag className="w-5 h-5 cursor-pointer hover:text-gray-800" />
          </div>
        </div>
      </div>

      {/* Desktop Top Bar */}
      <div className="hidden lg:block">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center text-xs">
          <div className="flex space-x-4">
            <Link
              href="/wellness"
              className="hover:text-gray-800 transition-colors uppercase"
            >
              Holistic WELLNESS
            </Link>
            <Link
              href="/gifting"
              className="hover:text-gray-800 transition-colors uppercase"
            >
              gifting
            </Link>
            <Link
              href="/certificates"
              className="hover:text-gray-800 transition-colors uppercase"
            >
              certificates
            </Link>
          </div>

          <div className="w-1/3 flex justify-center">
            <Link href="/">
              <img
                src="/namo-logo2.png"
                alt="Logo"
                className="h-16 object-contain"
              />
            </Link>
            <Link href="/">
              <img
                src="/namo-logo.png"
                alt="Logo"
                className="h-16 object-contain"
              />
            </Link>
          </div>

          <div className="flex space-x-4 items-center">
            <Link href="#" className="hover:text-gray-800 transition-colors">
              STORE LOCATOR
            </Link>
            <div className="flex space-x-4 items-center">
              <Heart className="w-4 h-4 cursor-pointer hover:text-gray-800" />
              {isLoggedIn ? (
                <div className="relative group">
                  <User className="w-4 h-4 cursor-pointer hover:text-gray-800" />
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      My Account
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-3 py-1 rounded border border-gray-300 text-sm hover:bg-gray-100 transition"
                >
                  Login
                </Link>
              )}

              <Link href="/cart" className="relative">
                <ShoppingBag className="w-4 h-4 cursor-pointer hover:text-gray-800" />
                {/* Cart count badge */}
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden fixed inset-0 bg-white z-50 pt-16 overflow-y-auto"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id} className="border-b border-gray-100">
                  <div
                    className="flex justify-between items-center py-3 px-2"
                    onClick={() => toggleMobileCategory(category.id)}
                  >
                    <span className="font-medium">{category.name}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        activeMobileCategory === category.id ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {activeMobileCategory === category.id &&
                    subCategories[category.id] && (
                      <div className="pl-4 pb-2">
                        <div className="grid grid-cols-2 gap-4">
                          {subCategories[category.id].map((sub) => (
                            <Link
                              href={`/shop?category=${sub.slug}`}
                              key={sub.id}
                              className="block py-2"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setActiveMobileCategory(null);
                              }}
                            >
                              <div className="mb-2">
                                {sub.imgUrl ? (
                                  <img
                                    src={`${process.env.NEXT_PUBLIC_API_URL_IMG}${sub.imgUrl}`}
                                    alt={sub.name}
                                    className="w-full h-32 object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-32 bg-gray-100 flex items-center justify-center">
                                    <span className="text-gray-400">
                                      No Image
                                    </span>
                                  </div>
                                )}
                              </div>
                              <span className="text-sm">{sub.name}</span>
                            </Link>
                          ))}
                        </div>
                        <Link
                          href={`/shop?category=${
                            categories.find((c) => c.id === category.id)?.slug
                          }`}
                          className="block mt-4 text-sm font-medium text-center border-t border-gray-200 pt-3"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setActiveMobileCategory(null);
                          }}
                        >
                          View All {category.name}
                        </Link>
                      </div>
                    )}
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex flex-col space-y-3">
                <Link href="#" className="py-2 px-2">
                  My Account
                </Link>
                <Link href="#" className="py-2 px-2">
                  Wishlist
                </Link>
                <Link href="#" className="py-2 px-2">
                  Store Locator
                </Link>
                <Link href="#" className="py-2 px-2">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Navigation */}
      <nav className="hidden lg:block border-b border-gray-200" ref={navRef}>
        <div className="container mx-auto px-4">
          <ul className="flex justify-center space-x-8">
            <li className="py-4">
              <Link
                href="/"
                className="text-sm font-medium tracking-wider hover:text-black transition-colors"
              >
                HOME
              </Link>
            </li>
            <li className="py-4">
              <Link
                href="/shop"
                className="text-sm font-medium tracking-wider hover:text-black transition-colors"
              >
                SHOP
              </Link>
            </li>
            {categories.map((category) => (
              <li
                key={category.id}
                className="relative py-4"
                onMouseEnter={() => handleMouseEnter(category.id)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="flex items-center">
                  <Link
                    href="#"
                    className={`text-sm font-medium tracking-wider hover:text-black transition-colors ${
                      hoveredItemId === category.id
                        ? "text-black"
                        : "text-gray-700"
                    }`}
                  >
                    {category.name.toUpperCase()}
                  </Link>
                  <ChevronDown
                    className={`w-4 h-4 ml-1 transition-transform ${
                      hoveredItemId === category.id ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <div
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-black transition-all ${
                    hoveredItemId === category.id ? "opacity-100" : "opacity-0"
                  }`}
                />
              </li>
            ))}
            <li className="py-4">
              <Link
                href="/about"
                className="text-sm font-medium tracking-wider hover:text-black transition-colors"
              >
                ABOUT US
              </Link>
            </li>
            <li className="py-4">
              <Link
                href="/contact"
                className="text-sm font-medium tracking-wider hover:text-black transition-colors"
              >
                CONTACT US
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Desktop Mega Menu */}
      {isMegaMenuOpen && hoveredItemId && subCategories[hoveredItemId] && (
        <div
          ref={megaMenuRef}
          className="hidden lg:block absolute left-0 w-full bg-white shadow-lg border-t border-gray-200 z-50"
          onMouseEnter={() => clearTimeout(hideTimeout)}
          onMouseLeave={handleMouseLeave}
          style={{
            animation: "fadeIn 0.2s ease-out",
          }}
        >
          <div className="container w-[80%] mx-auto px-8 py-8">
            <div className="grid grid-cols-4 gap-8">
              {subCategories[hoveredItemId].map((sub) => (
                <Link
                  href={`/shop?category=${sub.id}`}
                  key={sub.id}
                  className="group"
                >
                  <div className="mb-4 overflow-hidden">
                    {sub.imgUrl ? (
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_URL_IMG}${sub.imgUrl}`}
                        alt={sub.name}
                        className="w-32 h-32 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-32 h-32 bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-black transition-colors">
                    {sub.name}
                  </h3>
                </Link>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 text-center">
              <Link
                href={`/shop?category=${
                  categories.find((c) => c.id === hoveredItemId)?.slug
                }`}
                className="inline-block text-sm font-medium text-gray-700 hover:text-black border-b border-transparent hover:border-black transition-all pb-1"
              >
                VIEW ALL{" "}
                {categories
                  .find((c) => c.id === hoveredItemId)
                  ?.name.toUpperCase()}
              </Link>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Prevent scrolling when mobile menu is open */
        body.mobile-menu-open {
          overflow: hidden;
        }
      `}</style>

      {/* Add/remove body class when mobile menu opens/closes */}
      <style jsx global>{`
        body {
          overflow: ${isMobileMenuOpen ? "hidden" : "auto"};
        }
      `}</style>
    </header>
  );
};

export default DynamicNavigationHeader;
