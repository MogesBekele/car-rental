import { useNavigate, useParams } from "react-router-dom";
import { assets, dummyCarData } from "../assets/assets";
import { useEffect, useState } from "react";
import type { Car } from "../components/CarCard";
import Loading from "../components/Loading";

const CarDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setCar(dummyCarData.find((c) => c._id === id) || null);
  }, [id]);

  return car ? (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16">
      {/* Car details go here */}
      <button
        className="flex items-center gap-2 mb-6 text-gray-500 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <img src={assets.arrow_icon} alt="" className="rotate-180 opacity-65" />
        Back to all cars
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Car Image Section */}
        <div className="lg:col-span-2">
          <img
            src={car.image}
            alt=""
            className="w-full h-auto md:h-100 object-cover rounded-xl mb-6 shadow-md"
          />
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">
                {car.brand} {car.model}
              </h1>
              <p className="text-gray-500 text-lg">{car.category}</p>
            </div>
            <hr className="border-borderColor my-6" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  icon: assets.users_icon,
                  text: `${car.seating_capacity} seats`,
                },
                { icon: assets.fuel_icon, text: car.fuel_type },
                { icon: assets.car_icon, text: car.transmission },
                { icon: assets.location_icon, text: car.location },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex items-center bg-light p-4 rounded-lg"
                >
                  <img src={icon} alt="" className="h-5 mb-2" />
                  {text}
                </div>
              ))}
            </div>
            {/* Car Description Section */}
            <div>
              <h1 className="text-xl font-medium mb-3">Description</h1>
              <p className="text-gray-500">{car.description}</p>
            </div>
            {/*  features*/}
            <h1 className="text-xl font-medium mb-3">Features</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                "Air Conditioning",
                "Navigation System",
                "Bluetooth Connectivity",
                "Rear Camera",
                "Sunroof",
                "Leather Seats",
              ].map((item)=>(
                <li
                  key={item}
                  className="flex items-center  text-gray-500"
                >
                  <img src={assets.check_icon} alt="" className="h-4 mr-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* booking form */}
        <form></form>
      </div>
    </div>
  ) : (
   <Loading/>
  );
};

export default CarDetails;
