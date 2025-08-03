import { Shield, Clock, UserCheck, HeartPulse } from "lucide-react";

export const Benefits = () => {
  const benefits = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Safety First",
      description: "Strict verification process for all prescription medicines",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "24/7 Support",
      description: "Round-the-clock customer service for your needs",
    },
    {
      icon: <UserCheck className="h-6 w-6" />,
      title: "Expert Care",
      description: "Access to licensed healthcare professionals",
    },
    {
      icon: <HeartPulse className="h-6 w-6" />,
      title: "Quality Assured",
      description: "All products are genuine and quality-tested",
    },
  ];

  return (
    <div className="py-24 bg-red">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-grey-900 sm:text-4xl">
            Why Choose Mediexpress
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            We prioritize your health and convenience
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50 fade-in"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};