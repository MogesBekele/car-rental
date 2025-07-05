import { useState } from "react";
import Title from "../../components/owner/Title";

const AddCar = () => {
  const [image, setImage] = useState<File | null>(null);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: 0,
    pricePerDay: 0,
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: 0,
    location: "",
    description: "",
  });
  return (
    <div className="px-4 py-10 md:px-10 flex-1">
      <Title title="Add a Car" subTitle="Add a new car to your inventory"/>
    </div>
  );
};

export default AddCar;
