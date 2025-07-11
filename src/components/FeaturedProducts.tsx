
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Truck, Clock, Shield, Star } from "lucide-react";

export const FeaturedProducts = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const products = [
    {
      id: "1",
      name: "Health Essentials",
      description: "Daily vitamins and supplements for overall wellness",
      price: "₹29.99",
      originalPrice: "₹39.99",
      badge: "Popular",
      prescription_required: false,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=200&fit=crop",
      inStock: true,
      deliveryTime: "2-4 hours",
    },
    {
      id: "2",
      name: "First Aid Kit",
      description: "Complete emergency care kit with essential medical supplies",
      price: "₹49.99",
      originalPrice: "₹69.99",
      badge: "Best Seller",
      prescription_required: false,
      image: "https://images.unsplash.com/photo-1603398938736-e9478d0c5119?w=300&h=200&fit=crop",
      inStock: true,
      deliveryTime: "1-2 hours",
    },
    {
      id: "3",
      name: "Wellness Pack",
      description: "Immunity boosting bundle with essential medicines",
      price: "₹39.99",
      originalPrice: "₹59.99",
      badge: "New",
      prescription_required: true,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
      inStock: true,
      deliveryTime: "3-5 hours",
    },
  ];

  const checkPrescription = async (productId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please login to continue",
          variant: "destructive",
        });
        navigate("/auth");
        return false;
      }

      const { data: prescriptions, error } = await supabase
        .from("prescriptions")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("status", "approved")
        .limit(1);

      if (error) {
        throw error;
      }

      if (!prescriptions || prescriptions.length === 0) {
        toast({
          title: "Prescription Required",
          description: "Please upload a valid prescription first",
          variant: "destructive",
        });
        navigate("/prescriptions");
        return false;
      }

      return true;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  const handleAddToCart = async (product: any) => {
    if (product.prescription_required) {
      const hasPrescription = await checkPrescription(product.id);
      if (!hasPrescription) {
        return;
      }
    }

    toast({
      title: "Success",
      description: "Product added to cart",
    });
  };

  return (
    <div className="bg-gray-50 py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="h-4 w-4" />
            Featured Products
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            Discover Our Most Popular Medical Supplies
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Quality healthcare products with express delivery and expert consultation
          </p>
          
          {/* Express Delivery Banner */}
          <div className="mt-8 bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 rounded-xl inline-flex items-center gap-4 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1566576721346-d4a3b4eb7c27?w=60&h=40&fit=crop"
              alt="Express Delivery"
              className="w-12 h-8 rounded object-cover"
            />
            <div className="text-left">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                <span className="font-semibold">Free Express Delivery</span>
              </div>
              <p className="text-sm opacity-90">Orders above ₹500 • Same day delivery available</p>
            </div>
          </div>

          <Link to="/products">
            <Button className="mt-6" size="lg">
              View All Products
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="fade-in group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                    {product.badge}
                  </Badge>
                  {product.prescription_required && (
                    <Badge variant="destructive" className="bg-red-500/90 backdrop-blur-sm">
                      Prescription Required
                    </Badge>
                  )}
                </div>
                
                {/* Express delivery badge */}
                <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {product.deliveryTime}
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                  {product.name}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{product.description}</p>
                
                {/* Features */}
                <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    <span>Quality Assured</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Truck className="h-3 w-3" />
                    <span>Fast Delivery</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                    )}
                  </div>
                  <Button 
                    onClick={() => handleAddToCart(product)}
                    className="bg-primary hover:bg-primary/90 text-white px-6"
                    disabled={!product.inStock}
                  >
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </div>

                {/* Delivery info */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>In Stock</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>Express delivery in {product.deliveryTime}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Doctor consultation CTA */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg border">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Need Medical Advice?
              </h3>
              <p className="text-gray-600 mb-6">
                Consult with our certified doctors online before purchasing prescription medicines.
              </p>
              <Button onClick={() => navigate("/BookConsultation")} size="lg" className="w-full md:w-auto">
                Book Consultation
              </Button>
            </div>
            <div className="flex justify-center">
              <div className="flex -space-x-4">
                <img
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&h=80&fit=crop&crop=face"
                  alt="Dr. Smith"
                  className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&crop=face"
                  alt="Dr. Johnson"
                  className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=80&h=80&fit=crop&crop=face"
                  alt="Dr. Williams"
                  className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
