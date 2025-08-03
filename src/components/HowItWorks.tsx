import { Search, Upload, CheckCircle, Truck } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="h-8 w-8" />,
      title: "Browse Products",
      description: "Explore our wide range of high-quality medicines and medical products",
    },
    {
      icon: <Upload className="h-8 w-8" />,
      title: "Upload Prescription",
      description: "Securely upload your prescription for verification",
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Get Verified",
      description: "Our system cross-checks your prescription with selected products",
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Home Delivery",
      description: "Receive your medicines safely at your doorstep",
    },
  ];

  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Simple steps to get your medicines delivered
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center fade-in">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};