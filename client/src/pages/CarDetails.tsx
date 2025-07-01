import { useNavigate, useParams } from "react-router-dom";
import { dummyCarData } from "../assets/assets";
import { useEffect, useState } from "react";
import type { Car } from "../components/CarCard";

const CarDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setCar(dummyCarData.find((c) => c._id === id) || null);
  }, [id]);

  return car ? (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-8">
      {/* Car details go here */}
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default CarDetails;
