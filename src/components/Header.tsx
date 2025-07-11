
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Stethoscope, ShoppingBag, Calendar, Settings } from "lucide-react";

export const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <Stethoscope className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-primary">MediExpress</span>
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
                Home
              </Link>
              <Link to="/About" className="text-gray-600 hover:text-gray-900">
                About Us
              </Link>
              <Link to="/Contact" className="text-gray-600 hover:text-gray-900">
                Contact
              </Link>
              <Link to="/products" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                Products
              </Link>
             
              {user && (
                <>
                  <Link
                    to="/per"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Prescriptions
                  </Link>
                  <Link 
                    to="/Dashboard"  
                    className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
                  >
                    <Calendar className="h-4 w-4" />
                    Dashboard
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Doctor Images Section */}
            <div className="hidden lg:flex items-center space-x-2">
              <div className="flex -space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=32&h=32&fit=crop&crop=face"
                  alt="Dr. Smith"
                  className="w-8 h-8 rounded-full border-2 border-white"
                  title="Dr. Smith - Available"
                />
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=32&h=32&fit=crop&crop=face"
                  alt="Dr. Johnson"
                  className="w-8 h-8 rounded-full border-2 border-white"
                  title="Dr. Johnson - Available"
                />
                <img
                  src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=32&h=32&fit=crop&crop=face"
                  alt="Dr. Williams"
                  className="w-8 h-8 rounded-full border-2 border-white"
                  title="Dr. Williams - Available"
                />
              </div>
              <span className="text-xs text-gray-600">Doctors Online</span>
            </div>

            {/* Express Delivery Badge */}
            <div className="hidden md:flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
              <img
                src="https://images.unsplash.com/photo-1566576721346-d4a3b4eb7c27?w=20&h=20&fit=crop"
                alt="Express"
                className="w-5 h-5 rounded"
              />
              <span>Express Delivery</span>
            </div>

            {user ? (
              <div className="flex items-center space-x-3">
                {/* Admin Link - Show for all authenticated users for now */}
                <Link to="/admin-dashboard">
                  <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Admin
                  </Button>
                </Link>
                
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden md:block text-sm text-gray-600">
                    {user.email}
                  </span>
                </div>
                
                <Button onClick={handleLogout} variant="default">
                  Logout
                </Button>
              </div>
            ) : (
              <Button onClick={() => navigate("/auth")} className="flex items-center gap-2">
                Login
              </Button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};
