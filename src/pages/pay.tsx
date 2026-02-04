import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const PaymentPage = () => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const product = searchParams.get("product") || "Unknown Product";
  const price = parseFloat(searchParams.get("price") || "0");

  const placeOrder = async () => {
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Please login",
          description: "You need to be logged in to place an order.",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      const generatedOrderId = `ORD-${Date.now()}`;
      
      const { error } = await supabase.from("orders").insert({
        order_id: generatedOrderId,
        user_id: user.id,
        amount: price,
        items: product,
        payment_method: "COD",
        status: "pending",
      });

      if (error) throw error;

      setOrderId(generatedOrderId);
      setOrderPlaced(true);
      
      toast({
        title: "Order Placed Successfully!",
        description: `Your order ID is ${generatedOrderId}`,
      });
    } catch (error) {
      console.error("Error placing order", error);
      toast({
        title: "Order Failed",
        description: "Failed to place the order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto p-8 bg-card rounded-lg shadow-lg text-center">
            <div className="mb-6">
              <CheckCircle className="w-20 h-20 text-primary mx-auto animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Order Placed Successfully!
            </h2>
            <p className="text-muted-foreground mb-6">
              Thank you for your order. Your order has been confirmed.
            </p>
            
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Package className="w-5 h-5 text-primary" />
                <span className="font-semibold text-foreground">Order Details</span>
              </div>
              <p className="text-sm text-muted-foreground">Order ID: <span className="font-mono font-semibold text-foreground">{orderId}</span></p>
              <p className="text-sm text-muted-foreground">Product: <span className="font-semibold text-foreground">{product}</span></p>
              <p className="text-sm text-muted-foreground">Amount: <span className="font-semibold text-foreground">₹{price.toFixed(2)}</span></p>
              <p className="text-sm text-muted-foreground">Payment: <span className="font-semibold text-foreground">Cash on Delivery</span></p>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              You will receive a confirmation email shortly with your order details.
            </p>

            <div className="space-y-3">
              <Button 
                className="w-full" 
                onClick={() => navigate("/Dashboard")}
              >
                View My Orders
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/products")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto p-8 bg-card rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Payment Page</h2>
          
          <div className="bg-muted/50 rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground">Product: <span className="font-semibold text-foreground">{product}</span></p>
            <p className="text-sm text-muted-foreground">Amount: <span className="font-semibold text-foreground">₹{price.toFixed(2)}</span></p>
          </div>

          <p className="text-muted-foreground mb-4">Select your preferred payment method:</p>

          <div className="space-y-4">
            <Button
              className={`w-full ${paymentMethod === "COD" ? "ring-2 ring-primary" : ""}`}
              variant={paymentMethod === "COD" ? "default" : "outline"}
              onClick={() => setPaymentMethod("COD")}
              disabled={loading}
            >
              Cash on Delivery
            </Button>

            {paymentMethod && (
              <Button
                className="w-full"
                onClick={placeOrder}
                disabled={loading}
              >
                {loading ? "Processing..." : "Place Order"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
