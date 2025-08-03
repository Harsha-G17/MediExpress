import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const ConsultationsList = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConsultations = async () => {
      const { data, error } = await supabase
        .from("consultations")
        .select("id, user_id, contact, preferred_time, status, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching consultations:", error.message);
      } else {
        setConsultations(data);
      }
      setLoading(false);
    };

    fetchConsultations();
  }, []);

  if (loading) {
    return <div className="text-center">Loading consultations...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Booked Consultations</h2>

      {consultations.length === 0 ? (
        <p className="text-gray-500">No consultations found.</p>
      ) : (
        <ul className="space-y-4">
          {consultations.map((consultation) => (
            <li key={consultation.id} className="p-4 bg-white shadow rounded-lg">
              <p>
                <strong>User ID:</strong> {consultation.user_id}
              </p>
              <p>
                <strong>Contact:</strong> {consultation.contact}
              </p>
              <p>
                <strong>Preferred Time:</strong> {consultation.preferred_time}
              </p>
              <p>
                <strong>Status:</strong> {consultation.status || "Pending"}
              </p>
              <p className="text-sm text-gray-500">
                Created at: {new Date(consultation.created_at).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ConsultationsList;
