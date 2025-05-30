"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Package, Heart, Settings, Edit, Download, Eye } from "lucide-react"

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 98765 43210",
    zodiacSign: "Leo",
    joinDate: "March 2023",
    totalOrders: 12,
    totalSpent: 28450,
  })

  const [isEditing, setIsEditing] = useState(false)

  const orders = [
    {
      id: "NS001234",
      date: "2024-01-15",
      status: "Delivered",
      total: 4698,
      items: ["Mystic Rose Attar", "Leo Royal Rose"],
    },
    {
      id: "NS001235",
      date: "2024-01-10",
      status: "Shipped",
      total: 2199,
      items: ["Sacred Sandalwood Oil"],
    },
    {
      id: "NS001236",
      date: "2024-01-05",
      status: "Processing",
      total: 1799,
      items: ["Virgo Earth Essence"],
    },
  ]

  const wishlist = [
    {
      id: 1,
      name: "Temple Frankincense",
      price: 899,
      image: "/placeholder.svg?height=100&width=100",
      category: "Incense",
    },
    {
      id: 2,
      name: "Moonlight Jasmine Blend",
      price: 2199,
      image: "/placeholder.svg?height=100&width=100",
      category: "Wellness Blend",
    },
    {
      id: 3,
      name: "Scorpio Mystery Patchouli",
      price: 2399,
      image: "/placeholder.svg?height=100&width=100",
      category: "Zodiac Perfume",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800"
      case "Shipped":
        return "bg-blue-100 text-blue-800"
      case "Processing":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-brand-whisper pt-8">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-playfair text-4xl font-bold text-brand-maroon mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account and track your spiritual journey</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-brand-maroon" />
                </div>
                <h2 className="font-playfair text-xl font-semibold text-brand-maroon mb-1">{user.name}</h2>
                <p className="text-brand-gold font-medium mb-2">{user.zodiacSign} Soul</p>
                <p className="text-sm text-gray-600 mb-4">Member since {user.joinDate}</p>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-brand-maroon">{user.totalOrders}</p>
                    <p className="text-xs text-gray-600">Orders</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-brand-maroon">₹{user.totalSpent.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">Spent</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="orders" className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Orders
                </TabsTrigger>
                <TabsTrigger value="wishlist" className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Wishlist
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Settings
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-playfair text-2xl font-semibold text-brand-maroon">Personal Information</h3>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(!isEditing)}
                        className="border-brand-gold text-brand-maroon"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        {isEditing ? "Cancel" : "Edit"}
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-brand-maroon font-medium">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          value={user.name}
                          disabled={!isEditing}
                          onChange={(e) => setUser({ ...user, name: e.target.value })}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-brand-maroon font-medium">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          value={user.email}
                          disabled={!isEditing}
                          onChange={(e) => setUser({ ...user, email: e.target.value })}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone" className="text-brand-maroon font-medium">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          value={user.phone}
                          disabled={!isEditing}
                          onChange={(e) => setUser({ ...user, phone: e.target.value })}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="zodiac" className="text-brand-maroon font-medium">
                          Zodiac Sign
                        </Label>
                        <Input
                          id="zodiac"
                          value={user.zodiacSign}
                          disabled={!isEditing}
                          onChange={(e) => setUser({ ...user, zodiacSign: e.target.value })}
                          className="mt-2"
                        />
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex gap-4 mt-6">
                        <Button className="bg-brand-maroon hover:bg-brand-maroon/90 text-white">Save Changes</Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders">
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="font-playfair text-2xl font-semibold text-brand-maroon mb-6">Order History</h3>

                    <div className="space-y-4">
                      {orders.map((order, index) => (
                        <motion.div
                          key={order.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <Card className="border border-gray-200">
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between mb-4">
                                <div>
                                  <h4 className="font-semibold text-brand-maroon">Order #{order.id}</h4>
                                  <p className="text-sm text-gray-600">{order.date}</p>
                                </div>
                                <div className="text-right">
                                  <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                                  <p className="text-lg font-bold text-brand-maroon mt-1">
                                    ₹{order.total.toLocaleString()}
                                  </p>
                                </div>
                              </div>

                              <div className="mb-4">
                                <p className="text-sm text-gray-600 mb-2">Items:</p>
                                <div className="flex flex-wrap gap-2">
                                  {order.items.map((item, idx) => (
                                    <Badge key={idx} variant="outline" className="border-brand-gold text-brand-maroon">
                                      {item}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="border-brand-gold text-brand-maroon">
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </Button>
                                <Button variant="outline" size="sm" className="border-brand-gold text-brand-maroon">
                                  <Download className="w-4 h-4 mr-2" />
                                  Invoice
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Wishlist Tab */}
              <TabsContent value="wishlist">
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="font-playfair text-2xl font-semibold text-brand-maroon mb-6">My Wishlist</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishlist.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300">
                            <CardContent className="p-4">
                              <div className="aspect-square bg-gray-100 rounded-lg mb-4"></div>
                              <h4 className="font-playfair font-semibold text-brand-maroon mb-2">{item.name}</h4>
                              <Badge variant="outline" className="border-brand-gold text-brand-maroon text-xs mb-2">
                                {item.category}
                              </Badge>
                              <p className="text-lg font-bold text-brand-maroon mb-4">₹{item.price.toLocaleString()}</p>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  className="flex-1 bg-brand-maroon hover:bg-brand-maroon/90 text-white"
                                >
                                  Add to Cart
                                </Button>
                                <Button variant="outline" size="sm" className="border-brand-gold text-brand-maroon">
                                  <Heart className="w-4 h-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings">
                <div className="space-y-6">
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <h3 className="font-playfair text-2xl font-semibold text-brand-maroon mb-6">Account Settings</h3>

                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-brand-maroon mb-3">Email Preferences</h4>
                          <div className="space-y-3">
                            <label className="flex items-center space-x-3">
                              <input type="checkbox" defaultChecked className="rounded border-brand-gold" />
                              <span>New product announcements</span>
                            </label>
                            <label className="flex items-center space-x-3">
                              <input type="checkbox" defaultChecked className="rounded border-brand-gold" />
                              <span>Zodiac-based recommendations</span>
                            </label>
                            <label className="flex items-center space-x-3">
                              <input type="checkbox" className="rounded border-brand-gold" />
                              <span>Promotional offers</span>
                            </label>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h4 className="font-semibold text-brand-maroon mb-3">Privacy Settings</h4>
                          <div className="space-y-3">
                            <label className="flex items-center space-x-3">
                              <input type="checkbox" defaultChecked className="rounded border-brand-gold" />
                              <span>Allow personalized recommendations</span>
                            </label>
                            <label className="flex items-center space-x-3">
                              <input type="checkbox" className="rounded border-brand-gold" />
                              <span>Share purchase history for better suggestions</span>
                            </label>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h4 className="font-semibold text-brand-maroon mb-3">Account Actions</h4>
                          <div className="space-y-3">
                            <Button variant="outline" className="border-brand-gold text-brand-maroon">
                              Change Password
                            </Button>
                            <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
                              Delete Account
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
