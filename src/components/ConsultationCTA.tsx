import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export const ConsultationCTA = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleConsultationClick = () => {
    navigate("/Bookconsultation"); // Redirect to /book-consultation when the button is clicked
  };

  return (
    <div className="bg-primary py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center text-white fade-in">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
            Need Medical Advice?
          </h2>
          <p className="text-lg mb-8 text-primary-foreground/90">
            Connect with certified doctors through secure video consultations. Get expert guidance and prescriptions from the comfort of your home.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="gap-2"
            onClick={handleConsultationClick} // Add click handler to navigate
          >
            <Video className="h-5 w-5" />
            Book Online Consultation
          </Button>
        </div>
      </div>
    </div>
  );
};
