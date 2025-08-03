import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";

const Prescriptions = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [ocrText, setOcrText] = useState<string | null>(null);
  const { toast } = useToast();

  // Utility function to process OCR using OCR.space API
  const processOCR = async (file: File): Promise<string> => {
    const OCR_API_KEY = "K86150390988957"; // Your OCR.space API key (should be stored securely)
    try {
      const formData = new FormData();
      formData.append("apikey", OCR_API_KEY);
      formData.append("language", "eng"); // Set language to English
      formData.append("file", file);

      // Send request to OCR.space API
      const response = await axios.post("https://api.ocr.space/parse/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Extract the text from the OCR response
      const extractedText = response.data.ParsedResults[0]?.ParsedText;

      if (!extractedText) {
        throw new Error("Failed to extract text from the image.");
      }

      return extractedText;
    } catch (error) {
      throw new Error("Failed to process OCR using OCR.space.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast({
        title: "Error",
        description: "Please select a prescription file.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setOcrText(null); // Reset OCR text before processing
    try {
      // Perform OCR
      toast({
        title: "Processing...",
        description: "Analyzing the prescription using OCR. Please wait.",
      });
      const extractedText = await processOCR(file);
      setOcrText(extractedText); // Set the extracted text

      toast({
        title: "Success",
        description: "Prescription text extracted successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Upload Prescription</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="prescription">Prescription File</Label>
                <Input
                  id="prescription"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  required
                />
              </div>

              {ocrText && (
                <div className="bg-gray-100 p-4 rounded-md">
                  <Label>Extracted Text</Label>
                  <p className="text-sm text-gray-700 whitespace-pre-line">{ocrText}</p>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Processing..." : "Extract Text from Prescription"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Prescriptions;
