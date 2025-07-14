
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, CheckCircle, XCircle, Clock } from "lucide-react";

interface PrescriptionCheckerProps {
  medicineName: string;
  onPrescriptionVerified: () => void;
}

const PrescriptionChecker = ({ medicineName, onPrescriptionVerified }: PrescriptionCheckerProps) => {
  const [hasValidPrescription, setHasValidPrescription] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkPrescription();
  }, [medicineName]);

  const checkPrescription = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setHasValidPrescription(false);
        setLoading(false);
        return;
      }

      const { data: prescriptions, error } = await supabase
        .from("prescriptions")
        .select("*")
        .eq("user_id", user.id)
        .eq("medicine_name", medicineName)
        .eq("status", "approved")
        .limit(1);

      if (error) {
        console.error("Error checking prescription:", error);
        setHasValidPrescription(false);
      } else {
        setHasValidPrescription(prescriptions && prescriptions.length > 0);
        if (prescriptions && prescriptions.length > 0) {
          onPrescriptionVerified();
        }
      }
    } catch (error) {
      console.error("Error checking prescription:", error);
      setHasValidPrescription(false);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadPrescription = () => {
    navigate(`/prescription-verification?medicine=${encodeURIComponent(medicineName)}&price=0`);
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
        <Clock className="w-5 h-5 text-gray-500" />
        <span className="text-sm text-gray-600">Checking prescription...</span>
      </div>
    );
  }

  if (hasValidPrescription) {
    return (
      <div className="flex items-center gap-2 p-4 bg-green-50 rounded-lg">
        <CheckCircle className="w-5 h-5 text-green-600" />
        <span className="text-sm text-green-700">Valid prescription found</span>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          Verified
        </Badge>
      </div>
    );
  }

  return (
    <div className="p-4 bg-orange-50 rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <FileText className="w-5 h-5 text-orange-600" />
        <span className="text-sm font-medium text-orange-800">
          prescription Required
        </span>
      </div>
      <p className="text-sm text-orange-700 mb-3">
        This medicine requires a valid prescription. Please upload your prescription to proceed.
      </p>
      <Button
        onClick={handleUploadPrescription}
        size="sm"
        variant="outline"
        className="border-orange-300 text-orange-700 hover:bg-orange-100"
      >
        Upload Prescription
      </Button>
    </div>
  );
};

export default PrescriptionChecker;
