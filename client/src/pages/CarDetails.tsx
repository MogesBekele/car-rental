import { useParams } from "react-router-dom";
import { dummyCarData } from "../assets/assets";


const CarDetails = () => {
  const { id } = useParams<{ id: string }>();
  const car = dummyCarData.find((c) => c._id === id);

  if (!car) {
    return <div className="p-8 text-center text-red-500">Car not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-8">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="w-full md:w-1/2 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">
            {car.brand} {car.model}
          </h1>
          <p className="text-gray-600 mb-4">
            {car.category} • {car.year}
          </p>
          <p className="mb-4">{car.description}</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <span className="font-semibold">Seats:</span>{" "}
              {car.seating_capacity}
            </div>
            <div>
              <span className="font-semibold">Fuel:</span> {car.fuel_type}
            </div>
            <div>
              <span className="font-semibold">Transmission:</span>{" "}
              {car.transmission}
            </div>
            <div>
              <span className="font-semibold">Location:</span> {car.location}
            </div>
            <div>
              <span className="font-semibold">Price/Day:</span> $
              {car.pricePerDay}
            </div>
            <div>
              <span className="font-semibold">Available:</span>{" "}
              {car.isAvailable ? "Yes" : "No"}
            </div>
          </div>
          <button className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dull transition">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
