"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface Address {
  id: number;
  houseNo: string;
  street: string;
  city: string;
  pincode: string;
  district: string;
}

interface CartItem {
  cartItemId: number;
  cartId: number;
  productName: string;
  quantity: number;
  price: number;
  images: string[];
}

interface Cart {
  cartId: number;
  items: CartItem[];
  summary: {
    subtotal: number;
    totalItems: number;
  };
  otherCharges: {
    plateformfee: number;
    gst: number;
    deliveryFee: number;
  };
  totalAmountafterCharges: number;
}

const CheckoutPage = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    houseNo: "",
    street: "",
    city: "",
    district: "",
    pincode: "",
  });
  const [isSavingAddress, setIsSavingAddress] = useState(false);
  const router = useRouter();

  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    fetchData();
  }, [token, router]);

  const fetchData = async () => {
    try {
      const [addressRes, cartRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/web/get-address`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/web/get-cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      setAddresses(addressRes.data.addresses || []);
      setCart(cartRes.data || null);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSelect = (id: number) => {
    setSelectedAddressId(id);
  };

  const handleAddAddress = () => {
    setShowAddressModal(true);
  };

  const handleCloseModal = () => {
    setShowAddressModal(false);
    setNewAddress({
      houseNo: "",
      street: "",
      city: "",
      district: "",
      pincode: "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveAddress = async () => {
    if (
      !newAddress.houseNo ||
      !newAddress.street ||
      !newAddress.city ||
      !newAddress.district ||
      !newAddress.pincode
    ) {
      alert("Please fill all address fields");
      return;
    }

    setIsSavingAddress(true);

    try {
      const formData = new URLSearchParams();
      formData.append("houseNo", newAddress.houseNo);
      formData.append("street", newAddress.street);
      formData.append("city", newAddress.city);
      formData.append("district", newAddress.district);
      formData.append("pincode", newAddress.pincode);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/web/add-address`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.status === 200) {
        // Refresh addresses
        await fetchData();
        handleCloseModal();
      } else {
        throw new Error("Failed to add address");
      }
    } catch (error) {
      console.error("Error adding address:", error);
      alert("Failed to add address. Please try again.");
    } finally {
      setIsSavingAddress(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        console.log("Razorpay script loaded successfully");
        resolve(true);
      };
      script.onerror = () => {
        console.error("Failed to load Razorpay script");
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      alert("Please select a delivery address");
      return;
    }

    if (!cart || !cart.items || cart.items.length === 0) {
      alert("Your cart is empty");
      return;
    }

    setIsProcessing(true);

    try {
      // Load Razorpay script
      const razorpayLoaded = await loadRazorpayScript();
      if (!razorpayLoaded) {
        throw new Error("Failed to load payment gateway");
      }

      // Create order on your backend
      const orderResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/web/create-razorpay-order`,
        {
          amount: Math.round(cart.totalAmountafterCharges * 100), // Convert to paise
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const orderData = orderResponse.data;
      if (!orderData?.order?.id) {
        throw new Error("Failed to create payment order");
      }

      // Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: Math.round(cart.totalAmountafterCharges * 100),
        currency: "INR",
        name: "Your Store Name",
        description: "Order Payment",
        order_id: orderData.order.id,
        handler: async (response: any) => {
          try {
            // Verify payment on your backend
            const verificationResponse = await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}/web/verify-payment`,
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                amount: cart.totalAmountafterCharges,
                addressId: selectedAddressId,
                product_id: cart.cartId,
                currency: "INR",
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            if (verificationResponse.status == 200) {
              // Create order after successful payment verification
              const orderCreationResponse = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/web/create-order`,
                {
                  paymentId: response.razorpay_payment_id,
                  addressId: selectedAddressId,
                  totalAmount: cart.totalAmountafterCharges,
                  orderStatus: "SUCCESS",
                  paymentMode: "razorpay",
                  gst: 49.0,
                  discount: 50.0,
                  couponCode: "NEWUSER50",
                  notes: "Ring the bell on arrival",
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                }
              );

              if (orderCreationResponse.data.message === "Order created") {
                router.push("/profile");
              } else {
                throw new Error("Order creation failed");
              }
            } else {
              throw new Error("Payment verification failed");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            alert("Payment was cancelled");
          },
        },
      };

      // Open Razorpay payment modal
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Order placement error:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <p>Loading checkout data...</p>
      </div>
    );
  }

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Address Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Select Delivery Address</h2>
        <button
          onClick={handleAddAddress}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mb-4"
        >
          Add Address
        </button>
        {addresses.length === 0 ? (
          <p>No address found. Please add a delivery address.</p>
        ) : (
          <div className="grid gap-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                className={`border p-4 rounded-lg shadow-sm cursor-pointer ${
                  selectedAddressId === address.id
                    ? "border-blue-500 bg-blue-50"
                    : ""
                }`}
                onClick={() => handleAddressSelect(address.id)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p>
                      <strong>House:</strong> {address.houseNo}
                    </p>
                    <p>
                      <strong>Street:</strong> {address.street}
                    </p>
                    <p>
                      <strong>City:</strong> {address.city}
                    </p>
                    <p>
                      <strong>District:</strong> {address.district}
                    </p>
                    <p>
                      <strong>Pincode:</strong> {address.pincode}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedAddressId === address.id}
                    onChange={() => handleAddressSelect(address.id)}
                    className="mt-2 ml-4"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Summary Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        {cart?.items?.length ? (
          <div className="bg-white border rounded-lg p-4 shadow">
            <div className="divide-y">
              {cart.items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="py-2 flex items-center gap-4"
                >
                  {item.images?.length > 0 && (
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL_IMG}${item.images[0]}`}
                      alt={item.productName}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div>
                    <p className="font-semibold">{item.productName}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>Price: ₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-1 text-sm">
              <p>Subtotal: ₹{cart.summary?.subtotal}</p>
              <p>Total Items: {cart.summary?.totalItems}</p>
              <p>Platform Fee: ₹{cart.otherCharges?.plateformfee}</p>
              <p>GST: ₹{cart.otherCharges?.gst}</p>
              <p>Delivery Fee: ₹{cart.otherCharges?.deliveryFee}</p>
              <hr className="my-2" />
              <p className="font-bold text-lg">
                Total: ₹{cart.totalAmountafterCharges}
              </p>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing || !selectedAddressId}
              className={`mt-6 w-full py-2 rounded ${
                isProcessing || !selectedAddressId
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {isProcessing ? "Processing..." : "Place Order"}
            </button>
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      {/* Add Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Add New Address</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  House No.
                </label>
                <input
                  type="text"
                  name="houseNo"
                  value={newAddress.houseNo}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Street</label>
                <input
                  type="text"
                  name="street"
                  value={newAddress.street}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={newAddress.city}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  District
                </label>
                <input
                  type="text"
                  name="district"
                  value={newAddress.district}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={newAddress.pincode}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 border rounded hover:bg-gray-100"
                disabled={isSavingAddress}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAddress}
                disabled={isSavingAddress}
                className={`px-4 py-2 rounded text-white ${
                  isSavingAddress
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isSavingAddress ? "Saving..." : "Save Address"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
