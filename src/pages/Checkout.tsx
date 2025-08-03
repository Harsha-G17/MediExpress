import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Extract product and price from URL params
  const queryParams = new URLSearchParams(location.search);
  const product = queryParams.get("product") || "Unknown Medicine";
  const productPrice = parseFloat(queryParams.get("price") || "0");

  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    contact: "",
    paymentMethod: "UPI", // Default payment method
    upiId: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const sendConfirmationEmail = async () => {
    try {
      await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userDetails.name,
          email: userDetails.contact, // Assuming contact is the email
          product,
        }),
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send confirmation email.",
        variant: "destructive",
      });
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!userDetails.name || !userDetails.address || !userDetails.contact) {
      toast({
        title: "Error",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    if (userDetails.paymentMethod === "Cash on Delivery") {
      await sendConfirmationEmail();
      toast({
        title: "Order Placed",
        description: `Your order for ${product} has been placed successfully with Cash on Delivery! A confirmation email has been sent.`,
      });
      setLoading(false);
      navigate("/order-confirmation");
    } else {
      if (!userDetails.upiId) {
        toast({
          title: "Error",
          description: "Please enter your UPI ID.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      navigate(`/upi-payment?product=${product}&price=${productPrice}&upiId=${userDetails.upiId}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Checkout</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 font-semibold">Product: {product}</p>
          <p className="mb-4 font-semibold">Price: ₹{productPrice.toFixed(2)}</p>
          <form onSubmit={handleCheckout} className="space-y-4">
            <div>
              <Label htmlFor="name">Name:</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={userDetails.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="address">Address:</Label>
              <Input
                type="text"
                id="address"
                name="address"
                value={userDetails.address}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="contact">Email:</Label>
              <Input
                type="email"
                id="contact"
                name="contact"
                value={userDetails.contact}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="paymentMethod">Payment Method:</Label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={userDetails.paymentMethod}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="UPI">Pay with UPI</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
              </select>
            </div>
            {userDetails.paymentMethod === "UPI" && (
              <div>
                <Label htmlFor="upiId">Enter UPI ID:</Label>
                <Input
                  type="text"
                  id="upiId"
                  name="upiId"
                  value={userDetails.upiId}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Processing..." : "Place Order"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Checkout;
