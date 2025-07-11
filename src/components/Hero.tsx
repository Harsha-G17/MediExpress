
import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, Clock, Shield, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  const handleBrowseClick = () => {
    navigate("/products");
  };

  const handleConsultationClick = () => {
    navigate("/Bookconsultation");
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-white py-20 sm:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield className="h-4 w-4" />
              Trusted by 10,000+ patients
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              Your Trusted Partner for{" "}
              <span className="text-primary">Online Medical</span> Products
            </h1>
            
            <p className="text-lg lg:text-xl leading-8 text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Access quality healthcare from the comfort of your home. Browse medicines, upload prescriptions, and consult with certified doctors online.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="bg-green-100 p-2 rounded-full">
                  <Truck className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-sm font-medium">Express Delivery</span>
              </div>
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium">24/7 Support</span>
              </div>
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <Star className="h-5 w-5 text-yellow-600" />
                </div>
                <span className="text-sm font-medium">Expert Doctors</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-primary text-white hover:bg-primary/90 px-8 py-4 text-lg"
                onClick={handleBrowseClick}
              >
                Browse Products
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 px-8 py-4 text-lg"
                onClick={handleConsultationClick}
              >
                Book Consultation <ArrowRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">Trusted by leading healthcare providers</p>
              <div className="flex items-center justify-center lg:justify-start gap-6">
                <div className="flex -space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=40&h=40&fit=crop&crop=face"
                    alt="Dr. Smith"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=40&h=40&fit=crop&crop=face"
                    alt="Dr. Johnson"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=40&h=40&fit=crop&crop=face"
                    alt="Dr. Williams"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">50+ Certified Doctors</p>
                  <p className="text-xs text-gray-500">Available 24/7</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Main doctor image */}
              <div className="col-span-2">
                <img
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=400&fit=crop"
                  alt="Professional Doctor"
                  className="w-full h-64 object-cover rounded-2xl shadow-2xl"
                />
              </div>
              
              {/* Express delivery image */}
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1566576721346-d4a3b4eb7c27?w=300&h=200&fit=crop"
                  alt="Express Delivery"
                  className="w-full h-32 object-cover rounded-xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl flex items-end p-3">
                  <span className="text-white text-sm font-medium">Express Delivery</span>
                </div>
              </div>
              
              {/* Medical consultation image */}
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=200&fit=crop"
                  alt="Online Consultation"
                  className="w-full h-32 object-cover rounded-xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl flex items-end p-3">
                  <span className="text-white text-sm font-medium">Online Consult</span>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-lg border">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">24/7 Available</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg border">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
