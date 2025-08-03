// VerificationStatus.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const VerificationStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status") || "failed"; // Success or failed status
  const medicineName = queryParams.get("medicine") || "";

  const handleProceedToCheckout = () => {
    navigate(`/Checkout?product=${medicineName}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Prescription Verification</CardTitle>
        </CardHeader>
        <CardContent>
          {status === "success" ? (
            <div>
              <h3 className="text-green-600 font-semibold">Verification Successful</h3>
              <p className="text-sm mt-2">The prescription has been successfully verified for {medicineName}.</p>
              <Button onClick={handleProceedToCheckout} className="w-full mt-4">
                Proceed to Checkout
              </Button>
            </div>
          ) : (
            <div>
              <h3 className="text-red-600 font-semibold">Verification Failed</h3>
              <p className="text-sm mt-2">The prescription does not match the required medicine {medicineName}.</p>
              <Button onClick={() => navigate(-1)} className="w-full mt-4">
                Try Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationStatus;
