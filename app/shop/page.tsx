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
interface ProductCardProps {
  product: Product & { subCategory: { name: string } };
  onAddToCart: () => void;
}

const categories = ["All", "Men", "Women", "Electronics", "Accessories"];
const subCategories = ["All", "Shoes", "Clothing", "Laptops", "Phones"];

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/web/get-all-products`
        );
        const data: ApiResponse = await response.json();
        if (data.success) {
          setAllProducts(data.data);
          setProducts(data.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filterProducts = () => {
    let filtered = [...allProducts];

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.mainCategory.name === selectedCategory
      );
    }

    if (selectedSubCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.subCategory.name === selectedSubCategory
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
        // Assuming newer products have higher IDs (adjust based on your actual data)
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // Featured - keep original order
        break;
    }

    setProducts(filtered);
  };

  useEffect(() => {
    if (allProducts.length > 0) {
      filterProducts();
    }
  }, [selectedCategory, selectedSubCategory, priceRange, sortBy, allProducts]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F9F7] pt-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <p>Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9F7] pt-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[#572C2C] mb-4">
            Our Products
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Explore our complete range of high-quality products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div
            className={`lg:w-80 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <Card className="sticky top-24 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-playfair text-xl font-semibold text-[#572C2C]">
                    Filters
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedCategory("All");
                      setSelectedSubCategory("All");
                      setPriceRange([0, 50000]);
                    }}
                    className="text-[#D6B57B] hover:text-[#572C2C]"
                  >
                    Clear All
                  </Button>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="font-semibold text-[#572C2C] mb-3">
                    Category
                  </h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div
                        key={category}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={category}
                          checked={selectedCategory === category}
                          onCheckedChange={() => setSelectedCategory(category)}
                        />
                        <Label
                          htmlFor={category}
                          className="text-sm text-gray-700"
                        >
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sub-Category Filter */}
                <div className="mb-6">
                  <h4 className="font-semibold text-[#572C2C] mb-3">
                    Sub-Category
                  </h4>
                  <div className="space-y-2">
                    {subCategories.map((subCategory) => (
                      <div
                        key={subCategory}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`sub-${subCategory}`}
                          checked={selectedSubCategory === subCategory}
                          onCheckedChange={() =>
                            setSelectedSubCategory(subCategory)
                          }
                        />
                        <Label
                          htmlFor={`sub-${subCategory}`}
                          className="text-sm text-gray-700"
                        >
                          {subCategory}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-semibold text-[#572C2C] mb-3">
                    Price Range
                  </h4>
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={50000}
                      min={0}
                      step={1000}
                      className="mb-4"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden border-[#D6B57B] text-[#572C2C]"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <p className="text-gray-600">
                  Showing {products.length} of {allProducts.length} products
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
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
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-none"
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
                className={`grid gap-6 ${
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
                  >
                    <ProductCard
                      product={{
                        id: product.id,
                        name: product.name,
                        price: parseFloat(product.variants[0].price),
                        image:
                          `${process.env.NEXT_PUBLIC_API_URL_IMG}${product.variants[0].images[0]}` ||
                          "/placeholder.svg?height=300&width=300",
                        description: product.description,
                        category: product.mainCategory.name,
                        subCategory: product.subCategory.name,
                      }}
                      onAddToCart={() => {}}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg mb-4">
                  No products found matching your criteria
                </p>
                <Button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedSubCategory("All");
                    setPriceRange([0, 50000]);
                  }}
                  className="bg-[#572C2C] hover:bg-[#572C2C]/90 text-white"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
