import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        // For signup, attempt to create the account
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          // If the error indicates the user already exists
          if (error.message.includes("User already registered")) {
            toast({
              title: "Account already exists",
              description: "Please sign in instead of creating a new account.",
              variant: "destructive",
            });
          } else {
            throw error;
          }
          return;
        }

        if (data.user) {
          toast({
            title: "Check your email",
            description: "We've sent you a confirmation link.",
          });
        }
      } else {
        // For sign in, let Supabase handle the authentication
        const { data: { user }, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast({
              title: "Invalid credentials",
              description: "Please check your email and password.",
              variant: "destructive",
            });
          } else {
            throw error;
          }
          return;
        }

        if (!user) {
          toast({
            title: "Account not found",
            description: "This email is not registered. Please sign up first.",
            variant: "destructive",
          });
          return;
        }

        toast({
          title: "Welcome back!",
          description: "Successfully signed in.",
        });
        navigate("/");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gaming-dark flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gaming-dark border-gaming-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl text-center bg-gradient-to-r from-gaming-primary to-gaming-secondary bg-clip-text text-transparent">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            {isSignUp
              ? "Welcome to MediExpress"
              : "Sign in to your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
               className="w-full bg-blue-600 hover:bg-blue-700 text-black font-semibold"
              disabled={isLoading}
            >
              {isLoading
                ? "Loading..."
                : isSignUp
                ? "Create Account"
                : "Sign In"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full text-gray-400 hover:text-white"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign up"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;