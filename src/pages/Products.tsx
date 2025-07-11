import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  prescription_required: boolean;
}

const Products: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };
    checkAuth();
  }, [navigate]);

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) throw error;
      return data;
    },
  });

  const handleBuyNow = (productName: string, productPrice: number, requiresPrescription: boolean) => {
    if (requiresPrescription) {
      navigate(`/prescriptions?medicine=${encodeURIComponent(productName)}&price=${productPrice}`);
    } else {
      toast({
        title: "Success",
        description: "Proceeding to checkout.",
      });
      navigate(`/checkout?product=${encodeURIComponent(productName)}&price=${productPrice}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading products...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Our Products</h1>
        {/* Example input field with writingsuggestions attribute */}
        <input
          type="text"
          writingsuggestions="true" // Updated attribute
          placeholder="Search products..."
          className="border rounded p-2"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <Card key={product.id} className="fade-in">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-semibold">
                  {product.name}
                </CardTitle>
                {product.prescription_required && (
                  <Badge variant="secondary">Prescription Required</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-primary">
                  ₹{product.price}
                </span>
                <Button
                  onClick={() =>
                    handleBuyNow(product.name, product.price, product.prescription_required)
                  }
                >
                  Buy Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Products;