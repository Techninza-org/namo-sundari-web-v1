"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingBag,
  ArrowRight,
  Star,
  Award,
  Users,
  Leaf,
} from "lucide-react";
import ProductCard from "@/components/product-card";
import ReviewCarousel from "@/components/review-carousel";
import ScrollToTopButton from "@/components/scroll-to-top-button";
import CartierHero from "@/components/CartierHero";
import CartHero from "@/components/CartHero";

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  variants: {
    id: number;
    price: string;
    images: string[];
  }[];
  mainCategory: {
    name: string;
  };
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  imgUrl: string;
}

const mediaLogos = [
  {
    name: "Times of India",
    logo: "/tindia.jpeg",
  },
  {
    name: "Hindustan Times",
    logo: "/hindustantimes.webp",
  },
  {
    name: "Economic Times",
    logo: "/goodhomes2222.webp",
  },
  {
    name: "Vogue India",
    logo: "/elite.png",
  },
  {
    name: "Elle India",
    logo: "/yourstory.webp",
  },
  // { name: "Femina", logo: "/placeholder.svg?height=40&width=120&text=Femina" },
];

export default function HomePage() {
  const [cartCount, setCartCount] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/web/get-all-products`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        const data = await response.json();

        if (data.success && data.data) {
          const formattedProducts = data.data.map((product: any) => ({
            id: product.id,
            name: product.name,
            price: parseFloat(product.variants[0]?.price || "0"),
            image:
              `${process.env.NEXT_PUBLIC_API_URL_IMG}${product.variants[0]?.images[0]}` ||
              "/placeholder.svg",
            rating: 4.5,
            reviews: 0,
            isNew: true,
            category: product.mainCategory?.name || "Uncategorized",
            description: product.description,
            variants: product.variants, // Make sure to include variants
          }));

          setFeaturedProducts(formattedProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoadingProducts(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/web/get-all-category`
        );
        const data = await response.json();

        if (data.success && data.categories) {
          const formattedCategories = data.categories.map(
            (category: Category) => ({
              id: category.id,
              name: category.name,
              image: category.imgUrl || "/placeholder.svg?height=400&width=300",
              description: category.description || "Explore our collection",
              link: `/shop?category=${category.slug}`,
            })
          );

          setCategories(formattedCategories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Hero Banner Section */}
      <section className="relative bg-white">
        <CartierHero />
      </section>

      {/* Media Mentions Bar */}
      <section className="bg-brand-terracotta py-4">
        <div className="container mx-auto px-4">
          <div className="overflow-hidden">
            <div className="flex items-center justify-center space-x-8 animate-marquee">
              {mediaLogos.map((media, index) => (
                <div key={index} className="flex-shrink-0">
                  <Image
                    src={media.logo}
                    alt={media.name}
                    width={120}
                    height={40}
                    className=" "
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 15s linear infinite;
        }
      `}</style>

      {/* Craft Your Sanctuary Section */}
      {/* <section className="py-20 bg-brand-cream">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-playfair text-2xl md:text-3xl font-light text-brand-charcoal mb-2 tracking-wider">
              CRAFT YOUR SANCTUARY
            </h2>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-brand-brown mb-12">
              SHOP BY COLLECTIONS
            </h1>
          </motion.div>

          {loadingCategories ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-terracotta"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={category.link}>
                    <div className="group relative overflow-hidden rounded-2xl cursor-pointer bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200">
                      <div className="relative aspect-[3/3.5] overflow-hidden">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_URL_IMG}${category.image}`}
                          alt={category.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105 p-8"
                        />
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="font-playfair text-lg font-semibold text-brand-brown mb-1 tracking-wide">
                          {category.name}
                        </h3>
                        <p className="text-xs text-brand-charcoal/70 mb-2 leading-snug">
                          {category.description}
                        </p>
                        <span className="inline-flex items-center text-xs font-medium text-brand-terracotta hover:text-brand-brown transition-colors duration-200">
                          Explore Collection
                          <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section> */}

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-brand-brown mb-4">
              Bestsellers
            </h2>
            <div className="w-24 h-1 bg-brand-terracotta mx-auto mb-6"></div>
            <p className="text-brand-charcoal/80 max-w-2xl mx-auto">
              Our most beloved fragrances, crafted with pure intentions and
              ancient wisdom
            </p>
          </div>

          {loadingProducts ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-terracotta"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => setCartCount((prev) => prev + 1)}
                />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/shop">
              <Button
                variant="outline"
                className="border-brand-brown text-brand-brown hover:bg-brand-brown/5 px-8 py-6 text-base font-medium rounded-md"
              >
                View All Products
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Promotional Banners Section */}
      <section className="py-12 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* First Banner */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-xl overflow-hidden border border-gray-300"
            >
              <div className="relative w-full h-[400px] md:h-[500px]">
                <Image
                  src="/desktop-2.png"
                  alt="Sacred Rituals Collection"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-4 px-2 text-center justify-center">
                <Badge className="bg-brand-terracotta text-white mb-3">
                  Limited Edition
                </Badge>
                <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-2">
                  SOLID PERFUMES
                </h3>
                <p className="text-gray-700 mb-4">
                  Enhance your spiritual practice
                </p>
                <Button
                  onClick={() => (window.location.href = "/shop")}
                  className="border border-black bg-brand-terracotta text-white hover:bg-brown"
                >
                  Shop Now
                </Button>
              </div>
            </motion.div>

            {/* Second Banner */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-xl overflow-hidden border border-gray-300"
            >
              <div className="relative w-full h-[400px] md:h-[500px] ">
                <Image
                  src="/desktop-5-scaled.jpg"
                  alt="Limited Edition"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-4 px-2 text-center justify-center ">
                <Badge className="bg-brand-terracotta text-white mb-3">
                  Limited Edition
                </Badge>
                <h3 className="text-gray-900 text-xl font-bold mb-2">
                  PURFUME WITH PURPOSE
                </h3>
                <p className="text-gray-700 mb-4">
                  Handcrafted with sacred temple flowers
                </p>
                <Button
                  onClick={() => (window.location.href = "/shop")}
                  className="border border-black bg-brand-terracotta text-white hover:bg-brown mb-4"
                >
                  Explore
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-brand-brown mb-4">
              Recommended Products
            </h2>
            <div className="w-24 h-1 bg-brand-terracotta mx-auto mb-6"></div>
            <p className="text-brand-charcoal/80 max-w-2xl mx-auto">
              Our most beloved fragrances, crafted with pure intentions and
              ancient wisdom
            </p>
          </div>

          {loadingProducts ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-terracotta"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(5, 9).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => setCartCount((prev) => prev + 1)}
                />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/shop">
              <Button
                variant="outline"
                className="border-brand-brown text-brand-brown hover:bg-brand-brown/5 px-8 py-6 text-base font-medium rounded-md"
              >
                View All Products
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section>
        <CartHero />
      </section>

      {/* Customer Stories */}
      <section className="py-20 bg-brand-beige/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-brand-brown mb-4">
              Customer Stories
            </h2>
            <div className="w-24 h-1 bg-brand-terracotta mx-auto mb-6"></div>
            <p className="text-brand-charcoal/80 max-w-2xl mx-auto">
              Hear from souls who've found their perfect scent
            </p>
          </div>

          <ReviewCarousel />
        </div>
      </section>

      {/* Newsletter Section */}
      {/* <section className="py-20 bg-brand-brown text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
              Join Our Sacred Community
            </h2>
            <p className="text-white/90 mb-8 text-lg">
              Subscribe to receive sacred wisdom, exclusive offers, and updates
              on new arrivals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-md text-brand-charcoal"
              />
              <Button className="bg-brand-terracotta hover:bg-brand-terracotta/90 text-white px-6 py-3 rounded-md">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section> */}

      {/* Floating Cart */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Link href="/cart">
          <Button
            size="lg"
            className="bg-brand-brown hover:bg-brand-brown/90 text-white rounded-full w-16 h-16 shadow-lg hover:scale-110 transition-all duration-300"
          >
            <ShoppingBag className="w-6 h-6" />
            {cartCount > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-brand-terracotta text-white text-xs">
                {cartCount}
              </Badge>
            )}
          </Button>
        </Link>
      </motion.div>

      <ScrollToTopButton />
    </div>
  );
}
