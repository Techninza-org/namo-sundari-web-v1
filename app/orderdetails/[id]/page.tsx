"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import Cookies from "js-cookie";
import { useParams, useRouter } from "next/navigation";

const GOLD = "text-[#D4AF37]";
const GOLD_BG = "bg-[#D4AF37]";

const OrderDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const token = Cookies.get("token");

    if (!token) {
      setError("Authentication token not found. Please login.");
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/web/get-order/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok)
          throw new Error(`Failed to fetch order: ${response.status}`);
        const data = await response.json();
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "N/A";
    }
  };

  const calculateSubtotal = () => {
    try {
      return (
        parseFloat(order.totalAmount || 0) +
        parseFloat(order.discount || 0) -
        parseFloat(order.gst || 0)
      ).toFixed(2);
    } catch {
      return "0.00";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#D4AF37]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push("/orders")}
            className={`px-6 py-2 rounded-lg font-medium ${GOLD_BG} text-white hover:brightness-110 transition`}
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Order Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The order you’re looking for doesn’t exist.
          </p>
          <button
            onClick={() => router.push("/orders")}
            className={`px-6 py-2 rounded-lg font-medium ${GOLD_BG} text-white hover:brightness-110 transition`}
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Order #{order.id} | Luxury Store</title>
        <meta name="description" content={`Details for order #${order.id}`} />
      </Head>

      <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900">Order Details</h1>
            <p className="text-gray-500 mt-2">
              Order #{order.id} • {formatDate(order.createdAt)}
            </p>
            <div className="mt-4">
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  order.status === "CONFIRMED"
                    ? "bg-green-100 text-green-800"
                    : order.status === "CANCELLED"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {order.status || "Unknown"}
              </span>
            </div>
          </div>

          <div className="bg-white border rounded-2xl shadow-lg mb-10 overflow-hidden">
            <div className={`p-6 bg-gray-900 text-white`}>
              <h2 className="text-xl font-semibold">Order Summary</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Payment Info
                </h3>
                <div className="text-sm space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Method:</span>
                    <span className="text-gray-800 font-medium capitalize">
                      {order.paymentMode}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Payment ID:</span>
                    <span className="text-gray-800 font-medium">
                      {order.paymentOrderId}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Order Status:</span>
                    <span className="text-gray-800 font-medium capitalize">
                      {order.orderStatus}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Totals
                </h3>
                <div className="text-sm space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span className="text-gray-800 font-medium">
                      ₹{calculateSubtotal()}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Discount:</span>
                    <span className="text-green-700 font-medium">
                      -₹{order.discount}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>GST:</span>
                    <span className="text-gray-800 font-medium">
                      +₹{order.gst}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-900 font-semibold border-t pt-2">
                    <span>Total Amount:</span>
                    <span>₹{order.totalAmount}</span>
                  </div>
                  {order.couponCode && (
                    <div className="flex justify-between text-gray-600">
                      <span>Coupon Code:</span>
                      <span className="text-gray-800 font-medium">
                        {order.couponCode}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {order.notes && (
              <div className="p-6 border-t bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Special Instructions
                </h3>
                <p className="text-gray-600 italic">"{order.notes}"</p>
              </div>
            )}
          </div>

          <div className="bg-white border rounded-2xl shadow-lg mb-10 overflow-hidden">
            <div className={`p-6 bg-gray-900 text-white`}>
              <h2 className="text-xl font-semibold">
                Order Items ({order.orderItems?.length || 0})
              </h2>
            </div>
            <div className="divide-y">
              {order.orderItems?.map((item) => (
                <div
                  key={item.id}
                  className="p-6 flex gap-6 flex-col md:flex-row"
                >
                  <div className="w-full md:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                    {item.variant?.images?.[0] ? (
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_URL_IMG}${item.variant.images[0]}`}
                        alt={item.variant?.product?.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.variant?.product?.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      SKU: {item.variant?.sku}
                    </p>
                    <div className="text-sm text-gray-700 mt-1 mb-2 space-x-4">
                      <span>Price: ₹{item.price}</span>
                      <span>Qty: {item.quantity}</span>
                      <span>Status: {item.orderItemStatus?.toLowerCase()}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      Total: ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => router.push("/profile")}
              className={`px-6 py-3 rounded-lg font-medium ${GOLD_BG} text-white hover:brightness-110 transition`}
            >
              Back to Orders
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsPage;
