
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Upload, FileText, AlertCircle } from "lucide-react";

const PrescriptionUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [medicineName, setMedicineName] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const uploadToStorage = async (file: File): Promise<string> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const fileName = `${user.id}_${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from("prescriptions")
      .upload(fileName, file);

    if (error) throw error;
    
    const { data: { publicUrl } } = supabase.storage
      .from("prescriptions")
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const savePrescription = async (fileUrl: string, medicine: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const { error } = await supabase
      .from("prescriptions")
      .insert({
        user_id: user.id,
        file_url: fileUrl,
        medicine_name: medicine,
        status: "pending"
      });

    if (error) throw error;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || !medicineName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please upload a prescription file and enter the medicine name.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please login to upload prescriptions.",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      toast({
        title: "Uploading...",
        description: "Please wait while we process your prescription.",
      });

      // Upload file to storage
      const fileUrl = await uploadToStorage(file);
      
      // Save prescription to database
      await savePrescription(fileUrl, medicineName.trim());

      toast({
        title: "Success",
        description: "Prescription uploaded successfully. You can now purchase the medicine.",
      });

      // Navigate to products page
      navigate("/products");

    } catch (error: any) {
      console.error("Upload error:", error);
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload prescription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Upload Prescription
          </CardTitle>
          <p className="text-sm text-gray-600">
            Upload your prescription to purchase prescription medicines
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Medicine Name Input */}
            <div>
              <Label htmlFor="medicine">Medicine Name</Label>
              <Input
                id="medicine"
                type="text"
                placeholder="Enter the medicine name"
                value={medicineName}
                onChange={(e) => setMedicineName(e.target.value)}
                required
              />
            </div>

            {/* File Upload Area */}
            <div>
              <Label>Prescription File</Label>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? "border-primary bg-primary/10"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <div className="space-y-2">
                  <p className="text-sm font-medium">
                    {file ? file.name : "Drop your prescription here"}
                  </p>
                  <p className="text-xs text-gray-500">
                    or click to browse files
                  </p>
                  <Input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="file-upload"
                  />
                  <Label
                    htmlFor="file-upload"
                    className="inline-block cursor-pointer text-primary hover:underline"
                  >
                    Browse Files
                  </Label>
                </div>
              </div>
              {file && (
                <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                  <FileText className="w-4 h-4" />
                  Selected: {file.name}
                </div>
              )}
            </div>

            {/* Info Alert */}
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-blue-900">Important:</p>
                <p className="text-blue-700">
                  Ensure your prescription is clear and legible. Accepted formats: JPG, PNG, PDF.
                  Your prescription will be verified before you can purchase the medicine.
                </p>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Uploading..." : "Upload Prescription"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrescriptionUpload;
