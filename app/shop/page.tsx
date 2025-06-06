"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Filter, Grid, List } from "lucide-react";
import ProductCard from "@/components/product-card";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  mainCategory: {
    name: string;
  };
  subCategory: {
    name: string;
  };
  variants: {
    price: string;
    images: string[];
  }[];
}

interface ApiResponse {
  success: boolean;
  data: Product[];
}

const categories = [
  "All",
  "Eau de Parfum",
  "Eau de Toilette",
  "Cologne",
  "Attar",
];
const fragranceNotes = [
  "All",
  "Floral",
  "Woody",
  "Citrus",
  "Oriental",
  "Fresh",
];

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedFragrance, setSelectedFragrance] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const categoryFromQuery = searchParams.get("category");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        let response;
        if (categoryFromQuery) {
          // Fetch by category param
          response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/web/get-products-by-sub-category/${categoryFromQuery}`
          );
        } else {
          // Fetch all products
          response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/web/get-all-products`
          );
        }

        const data: ApiResponse = await response.json();

        if (data.success) {
          setAllProducts(data.data);
          setProducts(data.data);

          // Update price range
          if (data.data.length > 0) {
            const maxPrice = Math.max(
              ...data.data.map((p) => parseFloat(p.variants[0].price))
            );
            setPriceRange([0, Math.ceil(maxPrice / 1000) * 1000]);
          }
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryFromQuery]);

  const filterProducts = () => {
    let filtered = [...allProducts];

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.mainCategory.name === selectedCategory
      );
    }

    if (selectedFragrance !== "All") {
      filtered = filtered.filter(
        (product) => product.subCategory.name === selectedFragrance
      );
    }

    filtered = filtered.filter((product) => {
      const price = parseFloat(product.variants[0].price);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort(
          (a, b) =>
            parseFloat(a.variants[0].price) - parseFloat(b.variants[0].price)
        );
        break;
      case "price-high":
        filtered.sort(
          (a, b) =>
            parseFloat(b.variants[0].price) - parseFloat(a.variants[0].price)
        );
        break;
      case "newest":
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // featured - no sorting or custom sorting
        break;
    }

    setProducts(filtered);
  };

  useEffect(() => {
    if (allProducts.length > 0) {
      filterProducts();
    }
  }, [selectedCategory, selectedFragrance, priceRange, sortBy, allProducts]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <p>Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 h-[400px] w-full bg-yellow-50 text-black border">
        {/* Image Column */}
        <div className="relative h-full w-full">
          <Image
            src="/group1.jpg"
            alt="Luxury Fragrances"
            fill
            className="ml-4"
            priority
          />
        </div>

        {/* Text Column */}
        <div className="flex items-center justify-center bg-brand-cream px-8">
          <div className="max-w-lg text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight tracking-wide">
              Luxury Fragrances
            </h1>
            <p className="text-lg md:text-xl font-light text-gray-800 mb-6">
              Discover our exquisite collection of perfumes crafted with the
              finest ingredients.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-6">
          <Button
            variant="outline"
            className="w-full flex justify-between items-center border-black"
            onClick={() => setShowFilters(!showFilters)}
          >
            <span>Filters</span>
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Always visible on desktop, toggleable on mobile */}
          <div
            className={`${showFilters ? "block" : "hidden lg:block"} lg:w-72`}
          >
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-serif font-medium text-lg mb-4">
                  Perfume Type
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <Checkbox
                        id={category}
                        checked={selectedCategory === category}
                        onCheckedChange={() => setSelectedCategory(category)}
                        className="mr-2"
                      />
                      <Label htmlFor={category} className="text-sm">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-serif font-medium text-lg mb-4">
                  Fragrance Notes
                </h3>
                <div className="space-y-2">
                  {fragranceNotes.map((note) => (
                    <div key={note} className="flex items-center">
                      <Checkbox
                        id={`note-${note}`}
                        checked={selectedFragrance === note}
                        onCheckedChange={() => setSelectedFragrance(note)}
                        className="mr-2"
                      />
                      <Label htmlFor={`note-${note}`} className="text-sm">
                        {note}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-serif font-medium text-lg mb-4">
                  Price Range
                </h3>
                <div className="space-y-4">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={priceRange[1] > 10000 ? priceRange[1] : 10000}
                    min={0}
                    step={500}
                  />
                  <div className="flex justify-between text-sm">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                className="text-black hover:bg-gray-100 w-full"
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedFragrance("All");
                  // Reset to default or calculated max price
                  const maxPrice =
                    allProducts.length > 0
                      ? Math.max(
                          ...allProducts.map((p) =>
                            parseFloat(p.variants[0].price)
                          )
                        )
                      : 50000;
                  setPriceRange([0, Math.ceil(maxPrice / 1000) * 1000]);
                }}
              >
                Reset All Filters
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <p className="text-gray-600 font-light">
                Showing {products.length}{" "}
                {products.length === 1 ? "product" : "products"}
              </p>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 border-black rounded-none">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="hidden sm:flex border border-gray-300 rounded-none overflow-hidden">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-none border-r border-gray-300"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products */}
            {products.length > 0 ? (
              <div
                className={`grid gap-8 ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative group"
                  >
                    <ProductCard
                      product={{
                        id: product.id,
                        name: product.name,
                        price: parseFloat(product.variants[0].price),
                        image:
                          `${process.env.NEXT_PUBLIC_API_URL_IMG}${product.variants[0].images[0]}` ||
                          "/placeholder.svg",
                        description: product.description,
                        category: product.mainCategory.name,
                        subCategory: product.subCategory.name,
                        variants: product.variants,
                      }}
                      onAddToCart={() => {}}
                      variant={viewMode === "list" ? "list" : "grid"}
                      showAddToCartOnHover={true}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg mb-4">
                  No fragrances found matching your criteria
                </p>
                <Button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedFragrance("All");
                    const maxPrice =
                      allProducts.length > 0
                        ? Math.max(
                            ...allProducts.map((p) =>
                              parseFloat(p.variants[0].price)
                            )
                          )
                        : 50000;
                    setPriceRange([0, Math.ceil(maxPrice / 1000) * 1000]);
                  }}
                  className="bg-black hover:bg-gray-800 text-white rounded-none"
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
