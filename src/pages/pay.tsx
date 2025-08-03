import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const PaymentPage = () => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState<any>(null); // To store dynamic order details
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    // Fetch dynamic order details (e.g., from backend)
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get("/api/getOrderDetails");
        setOrderDetails(response.data); // Store fetched order details
      } catch (error) {
        console.error("Error fetching order details", error);
      }
    };

    fetchOrderDetails();
  }, []);

  const placeOrder = async () => {
    if (!orderDetails) {
      alert("No order details found.");
      return;
    }

    setLoading(true);

    try {
      if (paymentMethod === "COD") {
        // Sending dynamic order details to the backend for order processing and email sending
        const orderPayload = {
          orderId: orderDetails.id,
          paymentMethod: "COD",
          amount: orderDetails.amount,
          items: orderDetails.items,
          customerEmail: orderDetails.customerEmail, // Dynamic email address
        };

        const response = await axios.post("/api/placeOrder", orderPayload);
        console.log(response.data); // For debugging

        // Show order confirmation message
        setOrderPlaced(true);
        alert(`Order placed successfully! Your order ID is ${orderPayload.orderId}.`);
      } else {
        alert("Please select a payment method.");
      }
    } catch (error) {
      console.error("Error placing order", error);
      alert("Failed to place the order. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto p-8 bg-white rounded shadow">
          <h2 className="text-2xl font-semibold mb-4">Payment Page</h2>

          {orderPlaced ? (
            <div>
              <h3 className="text-xl font-semibold text-green-600">Order Placed</h3>
              <p>Your order has been placed successfully. Please check your email for confirmation and details.</p>
            </div>
          ) : (
            <>
              <p className="mb-4">Select your preferred payment method and complete the checkout process.</p>

              <div className="space-y-4">
                <Button
                  className="w-full"
                  onClick={() => setPaymentMethod("COD")}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Cash on Delivery"}
                </Button>

                {paymentMethod && (
                  <Button
                    className="w-full mt-4"
                    onClick={placeOrder}
                    disabled={loading || !paymentMethod}
                  >
                    {loading ? "Processing..." : "Place Order with COD"}
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
