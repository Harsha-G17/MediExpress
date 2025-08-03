"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const BookConsultation = () => {
  const [userDetails, setUserDetails] = useState({
    contact: "",
    preferredTime: "",
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    // Get authenticated user
    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError || !user?.user) {
      toast({
        title: "Error",
        description: "You must be logged in to book a consultation.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    const userId = user.user.id;
  
    // Validate input
    if (!userDetails.contact || !userDetails.preferredTime) {
      toast({
        title: "Error",
        description: "Please fill in all the required fields.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
  
    try {
      // Insert into Supabase
      const { error } = await supabase.from("consultations").insert([
        {
          user_id: userId, 
          contact: userDetails.contact,
          preferred_time: userDetails.preferredTime,
          status: "Pending",
          notes: null,
        },
      ]);
  
      if (error) {
        throw new Error(error.message); // Capture Supabase error
      }
  
      toast({
        title: "Success",
        description: `Your consultation is booked for ${userDetails.preferredTime}.`,
      });
  
      // Reset form
      setUserDetails({ contact: "", preferredTime: "" });
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to book consultation: ${error.message}`, // Show detailed error
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white shadow-lg p-6 rounded-xl">
        <h1 className="text-xl font-bold mb-6">Book an Online Consultation</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="contact">Contact Number/Email</Label>
            <Input
              type="text"
              id="contact"
              name="contact"
              value={userDetails.contact}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="preferredTime">Preferred Consultation Time</Label>
            <Input
              type="text"
              id="preferredTime"
              name="preferredTime"
              value={userDetails.preferredTime}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Booking..." : "Book Consultation"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BookConsultation;
