"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Cookies from "js-cookie";
import {
  User,
  Package,
  Heart,
  Settings,
  Edit,
  Download,
  Eye,
  Loader2,
  Home,
  Plus,
  Trash2,
  Check,
  Star,
  ChevronRight,
  Gift,
  CreditCard,
  MapPin,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface UserData {
  name: string;
  email: string;
  phone: string;
  zodiacSign?: string;
  joinDate?: string;
  totalOrders?: number;
  totalSpent?: number;
  loyaltyPoints?: number;
}

interface OrderItem {
  id: number;
  productId: number;
  variantId: number;
  quantity: number;
  price: string;
  orderItemStatus: string;
  variant: {
    id: number;
    productId: number;
    sku: string;
    price: string;
    images: string[];
    product: {
      id: number;
      name: string;
      slug: string;
    };
  };
}

interface Order {
  id: number;
  userId: number;
  addressId: number;
  totalAmount: string;
  status: string;
  orderStatus: string;
  paymentMode: string;
  createdAt: string;
  orderItems: OrderItem[];
}

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface Address {
  id: number;
  houseNo: string;
  street: string;
  city: string;
  district: string;
  pincode: string;
  isDefault: boolean;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserData>({
    name: "",
    email: "",
    phone: "",
    zodiacSign: "",
    joinDate: "",
    totalOrders: 0,
    totalSpent: 0,
    loyaltyPoints: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState({
    profile: true,
    orders: false,
    wishlist: false,
    saving: false,
    addresses: false,
    addingAddress: false,
  });
  const { toast } = useToast();
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    houseNo: "",
    street: "",
    city: "",
    district: "",
    pincode: "",
    isDefault: false,
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const token = Cookies.get("token");

  const fetchUserData = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, profile: true }));

      const userResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/web/userdetails`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!userResponse.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await userResponse.json();

      const profileResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/web/profile`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const profileData = profileResponse.ok
        ? await profileResponse.json()
        : {};

      setUser({
        name: userData.user?.name || "",
        email: userData.user?.email || "",
        phone: userData.user?.phone || "",
        zodiacSign: profileData.zodiacSign || "Not specified",
        joinDate: userData.user?.createdAt
          ? new Date(userData.user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
            })
          : "Not available",
        totalOrders: profileData.totalOrders || 0,
        totalSpent: profileData.totalSpent || 0,
        loyaltyPoints: profileData.loyaltyPoints || 0,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch user data",
        variant: "destructive",
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, profile: false }));
    }
  };

  const fetchOrders = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, orders: true }));
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/web/get-orders`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast({
        title: "Error",
        description: "Failed to fetch orders",
        variant: "destructive",
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, orders: false }));
    }
  };

  const fetchWishlist = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, wishlist: true }));
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/web/wishlist`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch wishlist");
      }

      const data = await response.json();
      setWishlist(data.items || []);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toast({
        title: "Error",
        description: "Failed to fetch wishlist",
        variant: "destructive",
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, wishlist: false }));
    }
  };

  const fetchAddresses = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, addresses: true }));
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/web/get-address`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch addresses");
      }

      const data = await response.json();
      setAddresses(data.addresses || []);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      toast({
        title: "Error",
        description: "Failed to fetch addresses",
        variant: "destructive",
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, addresses: false }));
    }
  };

  const handleAddAddress = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, addingAddress: true }));
      const formData = new URLSearchParams();
      formData.append("houseNo", newAddress.houseNo);
      formData.append("street", newAddress.street);
      formData.append("city", newAddress.city);
      formData.append("district", newAddress.district);
      formData.append("pincode", newAddress.pincode);
      if (newAddress.isDefault) formData.append("isDefault", "true");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/web/add-address`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add address");
      }

      toast({
        title: "Success",
        description: "Address added successfully",
      });
      setShowAddAddressForm(false);
      setNewAddress({
        houseNo: "",
        street: "",
        city: "",
        district: "",
        pincode: "",
        isDefault: false,
      });
      fetchAddresses();
    } catch (error) {
      console.error("Error adding address:", error);
      toast({
        title: "Error",
        description: "Failed to add address",
        variant: "destructive",
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, addingAddress: false }));
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, saving: true }));
      const formData = new URLSearchParams();
      formData.append("name", user.name);
      formData.append("phone", user.phone);
      if (user.zodiacSign) formData.append("zodiacSign", user.zodiacSign);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/web/update-details`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      toast({
        title: "Success",
        description: "Profile updated successfully",
        className: "bg-brand-gold text-white border-0",
      });
      setIsEditing(false);
      fetchUserData();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, saving: false }));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
      case "success":
        return "bg-emerald-100 text-emerald-800";
      case "shipped":
      case "out for delivery":
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "processing":
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "cancelled":
      case "returned":
        return "bg-rose-100 text-rose-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
        return "Completed";
      case "confirmed":
        return "Confirmed";
      default:
        return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
    }
  };

  const handleTabChange = (value: string) => {
    if (value === "orders" && orders.length === 0) {
      fetchOrders();
    } else if (value === "wishlist" && wishlist.length === 0) {
      fetchWishlist();
    } else if (value === "addresses" && addresses.length === 0) {
      fetchAddresses();
    }
  };

  const handleViewOrderDetails = (orderId: number) => {
    router.push(`/orderdetails/${orderId}`);
  };

  if (isLoading.profile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-brand-whisper to-white pt-8 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-brand-maroon" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-whisper to-white pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-brand-gold mb-2">
            <Home className="w-5 h-5" />
            <ChevronRight className="w-4 h-4" />
            <span className="font-medium">My Account</span>
          </div>
          <h1 className="font-playfair text-4xl font-bold text-brand-maroon mb-2">
            Welcome Back, {user.name.split(" ")[0]}
          </h1>
          <p className="text-gray-600">
            Manage your account and track your spiritual journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="border border-brand-gold/20 bg-white/90 backdrop-blur-sm shadow-lg rounded-xl overflow-hidden">
              <div className="bg-brand-maroon/90 p-4 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-brand-gold to-amber-200 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
                  <User className="w-12 h-12 text-brand-maroon" />
                </div>
                <h2 className="font-playfair text-xl font-semibold text-amber-800 mb-1">
                  {user.name}
                </h2>
                <p className="text-brand-gold font-medium mb-2">
                  {user.zodiacSign} Soul
                </p>
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-amber-50 text-brand-gold">
                      <Gift className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Member since</p>
                      <p className="font-medium">{user.joinDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-amber-50 text-brand-gold">
                      <Star className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Loyalty Points</p>
                      <p className="font-medium">{user.loyaltyPoints} pts</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-4 bg-brand-gold/20" />

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-amber-50 p-3 rounded-lg">
                    <p className="text-2xl font-bold text-brand-maroon">
                      {user.totalOrders}
                    </p>
                    <p className="text-xs text-gray-600">Orders</p>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg">
                    <p className="text-2xl font-bold text-brand-maroon">
                      ₹{user.totalSpent?.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-600">Spent</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs
              defaultValue="profile"
              className="space-y-6"
              onValueChange={handleTabChange}
            >
              <TabsList className="grid w-full grid-cols-4 bg-transparent gap-2">
                <TabsTrigger
                  value="profile"
                  className="flex items-center gap-2 data-[state=active]:bg-brand-maroon data-[state=active]:text-amber-800 data-[state=active]:shadow-lg py-3"
                >
                  <User className="w-4 h-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger
                  value="orders"
                  className="flex items-center gap-2 data-[state=active]:bg-brand-maroon data-[state=active]:text-amber-800 data-[state=active]:shadow-lg py-3"
                >
                  <Package className="w-4 h-4" />
                  Orders
                </TabsTrigger>
                <TabsTrigger
                  value="wishlist"
                  className="flex items-center gap-2 data-[state=active]:bg-brand-maroon data-[state=active]:text-amber-800 data-[state=active]:shadow-lg py-3"
                >
                  <Heart className="w-4 h-4" />
                  Wishlist
                </TabsTrigger>
                <TabsTrigger
                  value="addresses"
                  className="flex items-center gap-2 data-[state=active]:bg-brand-maroon data-[state=active]:text-amber-800 data-[state=active]:shadow-lg py-3"
                >
                  <MapPin className="w-4 h-4" />
                  Addresses
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card className="border border-brand-gold/20 bg-white/90 backdrop-blur-sm shadow-lg rounded-xl">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="font-playfair text-2xl font-semibold text-brand-maroon">
                        Personal Information
                      </h3>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(!isEditing)}
                        className="border-brand-gold text-brand-maroon hover:bg-brand-gold/10 hover:shadow-md"
                        disabled={isLoading.saving}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        {isEditing ? "Cancel" : "Edit"}
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <Label
                          htmlFor="name"
                          className="text-brand-maroon font-medium"
                        >
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          value={user.name}
                          disabled={!isEditing}
                          onChange={(e) =>
                            setUser({ ...user, name: e.target.value })
                          }
                          className="mt-2 border-brand-gold/50 focus:border-brand-gold focus:ring-brand-gold"
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="email"
                          className="text-brand-maroon font-medium"
                        >
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          value={user.email}
                          disabled
                          className="mt-2 border-brand-gold/50 bg-gray-50"
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="phone"
                          className="text-brand-maroon font-medium"
                        >
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          value={user.phone}
                          disabled={!isEditing}
                          onChange={(e) =>
                            setUser({ ...user, phone: e.target.value })
                          }
                          className="mt-2 border-brand-gold/50 focus:border-brand-gold focus:ring-brand-gold"
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="zodiac"
                          className="text-brand-maroon font-medium"
                        >
                          Zodiac Sign
                        </Label>
                        <Input
                          id="zodiac"
                          value={user.zodiacSign}
                          disabled={!isEditing}
                          onChange={(e) =>
                            setUser({ ...user, zodiacSign: e.target.value })
                          }
                          className="mt-2 border-brand-gold/50 focus:border-brand-gold focus:ring-brand-gold"
                        />
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex gap-4 mt-8">
                        <Button
                          className="bg-gradient-to-r from-brand-maroon to-rose-900 hover:from-brand-maroon/90 hover:to-rose-900/90 text-white shadow-lg transition-all duration-300 hover:shadow-xl"
                          onClick={handleUpdateProfile}
                          disabled={isLoading.saving}
                        >
                          {isLoading.saving ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            "Save Changes"
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                          disabled={isLoading.saving}
                          className="border-brand-gold text-brand-maroon hover:bg-brand-gold/10"
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders">
                <Card className="border border-brand-gold/20 bg-white/90 backdrop-blur-sm shadow-lg rounded-xl">
                  <CardContent className="p-8">
                    <h3 className="font-playfair text-2xl font-semibold text-brand-maroon mb-8">
                      Order History
                    </h3>

                    {isLoading.orders ? (
                      <div className="flex justify-center items-center h-40">
                        <Loader2 className="h-12 w-12 animate-spin text-brand-maroon" />
                      </div>
                    ) : orders.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="mx-auto w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mb-4">
                          <Package className="w-10 h-10 text-brand-gold" />
                        </div>
                        <h4 className="font-playfair text-xl font-semibold text-brand-maroon mb-2">
                          No Orders Yet
                        </h4>
                        <p className="text-gray-600 mb-6">
                          You haven't placed any orders yet.
                        </p>
                        <Button className="bg-gradient-to-r from-brand-maroon to-rose-900 hover:from-brand-maroon/90 hover:to-rose-900/90 text-white shadow-lg">
                          Start Your Spiritual Journey
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {orders.map((order, index) => (
                          <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          >
                            <Card className="border border-brand-gold/20 shadow-sm hover:shadow-md transition-shadow duration-300">
                              <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                  <div>
                                    <h4 className="font-semibold text-brand-maroon">
                                      Order #{order.id}
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                      {new Date(
                                        order.createdAt
                                      ).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                      })}
                                    </p>
                                  </div>
                                  <div className="flex flex-col items-end gap-2">
                                    <Badge
                                      className={`${getStatusColor(
                                        order.orderStatus
                                      )} px-3 py-1 rounded-full`}
                                    >
                                      {formatStatus(order.orderStatus)}
                                    </Badge>
                                    <p className="text-lg font-bold text-brand-maroon">
                                      ₹
                                      {parseInt(
                                        order.totalAmount
                                      ).toLocaleString()}
                                    </p>
                                  </div>
                                </div>

                                <div className="mb-6">
                                  <p className="text-sm text-gray-600 mb-3">
                                    Items:
                                  </p>
                                  <div className="flex flex-wrap gap-3">
                                    {order.orderItems.map((item, idx) => (
                                      <Badge
                                        key={idx}
                                        variant="outline"
                                        className="border-brand-gold/50 text-brand-maroon bg-amber-50/50"
                                      >
                                        {item.variant.product.name} (Qty:{" "}
                                        {item.quantity})
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                <div className="flex gap-3">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-brand-gold text-brand-maroon hover:bg-brand-gold/10"
                                    onClick={() =>
                                      handleViewOrderDetails(order.id)
                                    }
                                  >
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-brand-gold text-brand-maroon hover:bg-brand-gold/10"
                                  >
                                    <Download className="w-4 h-4 mr-2" />
                                    Invoice
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Wishlist Tab */}
              <TabsContent value="wishlist">
                <Card className="border border-brand-gold/20 bg-white/90 backdrop-blur-sm shadow-lg rounded-xl">
                  <CardContent className="p-8">
                    <h3 className="font-playfair text-2xl font-semibold text-brand-maroon mb-8">
                      My Wishlist
                    </h3>

                    {isLoading.wishlist ? (
                      <div className="flex justify-center items-center h-40">
                        <Loader2 className="h-12 w-12 animate-spin text-brand-maroon" />
                      </div>
                    ) : wishlist.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="mx-auto w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mb-4">
                          <Heart className="w-10 h-10 text-brand-gold fill-brand-gold/20" />
                        </div>
                        <h4 className="font-playfair text-xl font-semibold text-brand-maroon mb-2">
                          Your Wishlist is Empty
                        </h4>
                        <p className="text-gray-600 mb-6">
                          Save items you love for later.
                        </p>
                        <Button className="bg-gradient-to-r from-brand-maroon to-rose-900 hover:from-brand-maroon/90 hover:to-rose-900/90 text-white shadow-lg">
                          Discover Spiritual Treasures
                        </Button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {wishlist.map((item, index) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          >
                            <Card className="border border-brand-gold/20 hover:shadow-lg transition-all duration-300 group">
                              <CardContent className="p-0">
                                <div className="aspect-square bg-gradient-to-br from-amber-50 to-white rounded-t-lg mb-4 flex items-center justify-center overflow-hidden relative">
                                  {item.image ? (
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                    />
                                  ) : (
                                    <Package className="w-12 h-12 text-gray-400" />
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-3 right-3 bg-white/90 rounded-full p-2 hover:bg-white shadow-sm"
                                  >
                                    <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                                  </Button>
                                </div>
                                <div className="p-4">
                                  <h4 className="font-playfair font-semibold text-brand-maroon mb-2 line-clamp-1">
                                    {item.name}
                                  </h4>
                                  <Badge
                                    variant="outline"
                                    className="border-brand-gold/50 text-brand-maroon bg-amber-50/50 text-xs mb-3"
                                  >
                                    {item.category}
                                  </Badge>
                                  <p className="text-lg font-bold text-brand-maroon mb-4">
                                    ₹{item.price.toLocaleString()}
                                  </p>
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      className="flex-1 bg-gradient-to-r from-brand-maroon to-rose-900 hover:from-brand-maroon/90 hover:to-rose-900/90 text-white shadow"
                                    >
                                      Add to Cart
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Addresses Tab */}
              <TabsContent value="addresses">
                <Card className="border border-brand-gold/20 bg-white/90 backdrop-blur-sm shadow-lg rounded-xl">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                      <h3 className="font-playfair text-2xl font-semibold text-brand-maroon">
                        My Addresses
                      </h3>
                      <Button
                        className="bg-gradient-to-r from-brand-maroon to-rose-900 hover:from-brand-maroon/90 hover:to-rose-900/90 text-white shadow-lg"
                        onClick={() => setShowAddAddressForm(true)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Address
                      </Button>
                    </div>

                    {showAddAddressForm && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mb-8"
                      >
                        <Card className="border border-brand-gold/30 shadow-sm">
                          <CardContent className="p-6">
                            <h4 className="font-playfair font-semibold text-brand-maroon mb-6">
                              Add New Address
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <Label htmlFor="houseNo">House No.</Label>
                                <Input
                                  id="houseNo"
                                  value={newAddress.houseNo}
                                  onChange={(e) =>
                                    setNewAddress({
                                      ...newAddress,
                                      houseNo: e.target.value,
                                    })
                                  }
                                  className="mt-2 border-brand-gold/50 focus:border-brand-gold focus:ring-brand-gold"
                                />
                              </div>
                              <div>
                                <Label htmlFor="street">Street</Label>
                                <Input
                                  id="street"
                                  value={newAddress.street}
                                  onChange={(e) =>
                                    setNewAddress({
                                      ...newAddress,
                                      street: e.target.value,
                                    })
                                  }
                                  className="mt-2 border-brand-gold/50 focus:border-brand-gold focus:ring-brand-gold"
                                />
                              </div>
                              <div>
                                <Label htmlFor="city">City</Label>
                                <Input
                                  id="city"
                                  value={newAddress.city}
                                  onChange={(e) =>
                                    setNewAddress({
                                      ...newAddress,
                                      city: e.target.value,
                                    })
                                  }
                                  className="mt-2 border-brand-gold/50 focus:border-brand-gold focus:ring-brand-gold"
                                />
                              </div>
                              <div>
                                <Label htmlFor="district">District</Label>
                                <Input
                                  id="district"
                                  value={newAddress.district}
                                  onChange={(e) =>
                                    setNewAddress({
                                      ...newAddress,
                                      district: e.target.value,
                                    })
                                  }
                                  className="mt-2 border-brand-gold/50 focus:border-brand-gold focus:ring-brand-gold"
                                />
                              </div>
                              <div>
                                <Label htmlFor="pincode">Pincode</Label>
                                <Input
                                  id="pincode"
                                  value={newAddress.pincode}
                                  onChange={(e) =>
                                    setNewAddress({
                                      ...newAddress,
                                      pincode: e.target.value,
                                    })
                                  }
                                  className="mt-2 border-brand-gold/50 focus:border-brand-gold focus:ring-brand-gold"
                                />
                              </div>
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  id="isDefault"
                                  checked={newAddress.isDefault}
                                  onChange={(e) =>
                                    setNewAddress({
                                      ...newAddress,
                                      isDefault: e.target.checked,
                                    })
                                  }
                                  className="rounded border-brand-gold text-brand-maroon focus:ring-brand-gold mr-2"
                                />
                                <Label htmlFor="isDefault">
                                  Set as default address
                                </Label>
                              </div>
                            </div>
                            <div className="flex gap-3 mt-6">
                              <Button
                                className="bg-gradient-to-r from-brand-maroon to-rose-900 hover:from-brand-maroon/90 hover:to-rose-900/90 text-white shadow-lg"
                                onClick={handleAddAddress}
                                disabled={isLoading.addingAddress}
                              >
                                {isLoading.addingAddress ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                  </>
                                ) : (
                                  "Save Address"
                                )}
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => setShowAddAddressForm(false)}
                                className="border-brand-gold text-brand-maroon hover:bg-brand-gold/10"
                              >
                                Cancel
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}

                    {isLoading.addresses ? (
                      <div className="flex justify-center items-center h-40">
                        <Loader2 className="h-12 w-12 animate-spin text-brand-maroon" />
                      </div>
                    ) : addresses.length === 0 ? (
                      <div className="text-center py-12">
                        <div
                          className="mx-auto 
                        w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mb-4"
                        >
                          <MapPin className="w-10 h-10 text-brand-gold" />
                        </div>
                        <h4 className="font-playfair text-xl font-semibold text-brand-maroon mb-2">
                          No Addresses Found
                        </h4>
                        <p className="text-gray-600 mb-6">
                          Add your address to make your shopping experience
                          seamless.
                        </p>
                        <Button
                          className="bg-gradient-to-r from-brand-maroon to-rose-900 hover:from-brand-maroon/90 hover:to-rose-900/90 text-white shadow-lg"
                          onClick={() => setShowAddAddressForm(true)}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Address
                        </Button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {addresses.map((address, index) => (
                          <motion.div
                            key={address.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          >
                            <Card className="border border-brand-gold/20 hover:shadow-lg transition-all duration-300 group">
                              <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                  <h4 className="font-playfair font-semibold text-brand-maroon">
                                    Address :{index + 1}
                                  </h4>
                                  {address.isDefault && (
                                    <Badge className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                                      Default
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-gray-600 mb-4">
                                  {address.houseNo}, {address.street},{" "}
                                  {address.city}, {address.district} -{" "}
                                  {address.pincode}
                                </p>
                                <div className="flex gap-3">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-brand-gold text-brand-maroon hover:bg-brand-gold/10"
                                  >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-brand-gold text-brand-maroon hover:bg-brand-gold/10"
                                    onClick={async () => {
                                      try {
                                        const response = await fetch(
                                          `${process.env.NEXT_PUBLIC_API_URL}/web/delete-address/${address.id}`,
                                          {
                                            method: "DELETE",
                                            headers: {
                                              Authorization: `Bearer ${token}`,
                                            },
                                          }
                                        );

                                        if (!response.ok) {
                                          throw new Error(
                                            "Failed to delete address"
                                          );
                                        }

                                        toast({
                                          title: "Success",
                                          description:
                                            "Address deleted successfully",
                                        });

                                        // Refresh the addresses list
                                        fetchAddresses();
                                      } catch (error) {
                                        console.error(
                                          "Error deleting address:",
                                          error
                                        );
                                        toast({
                                          title: "Error",
                                          description:
                                            "Failed to delete address",
                                          variant: "destructive",
                                        });
                                      }
                                    }}
                                  >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
