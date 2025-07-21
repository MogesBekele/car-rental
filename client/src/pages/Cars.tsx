import { useSearchParams } from "react-router-dom";
import { assets } from "../assets/assets";
import CarCard from "../components/CarCard";
import Title from "../components/Title";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import type { Car } from "../types/DataType";
import { motion } from "motion/react";

const Cars = () => {
  // geting search parms

  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get("pickupLocation");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");

  const { cars, axios } = useAppContext();
  const [input, setInput] = useState<string>("");
  const isSearchData = pickupLocation && pickupDate && returnDate;
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);

  const applyFilter = async () => {
    if (input === "") {
      setFilteredCars(cars);
      return null;
    }

    const filtered = cars.slice().filter((car) => {
      return (
        car.brand.toLowerCase().includes(input.toLowerCase()) ||
        car.model.toLowerCase().includes(input.toLowerCase()) ||
        car.category.toLowerCase().includes(input.toLowerCase()) ||
        car.transmission.toLowerCase().includes(input.toLowerCase())
      );
    });
    setFilteredCars(filtered);
  };

  const searchCarAvailablity = async () => {
    try {
      const { data } = await axios.post("/api/bookings/check-availability", {
        location: pickupLocation,
        pickupDate,
        returnDate,
      });

      // Correct the key here: AvailableCars (uppercase "A")
      if (data?.success && Array.isArray(data?.AvailableCars)) {
        setFilteredCars(data.AvailableCars);

        if (data.AvailableCars.length === 0) {
          toast("No Cars Available");
        }
      } else {
        toast.error("Something went wrong while checking availability");
      }
    } catch (err: any) {
      console.error("Availability check failed:", err);
      toast.error("Failed to check car availability");
    }
  };

  useEffect(() => {
    isSearchData && searchCarAvailablity();
  }, []);
  useEffect(() => {
    cars.length > 0 && !isSearchData && applyFilter();
  }, [cars, input]);
  return (
    <div>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center py-20 bg-light max-md:px-4"
      >
        <Title
          title="Available Cars"
          subTitle=" Check out our selection of premium vehicles available for your next adventure"
        />
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow "
        >
          <img src={assets.search_icon} alt="" className="w-4.5 h-4.5 mr-2 " />
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Search by brand, model, make, or Features"
            className="outline-none w-full h-full text-gray-500"
          />
          <img src={assets.filter_icon} alt="" className="w-4.5 h-4.5 mr-2 " />
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10"
      >
        <p className="text-gray-500 xl:px-20 max-w-7xl mx-auto">
          Showing {filteredCars.length} Cars
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
          {filteredCars.map((car, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              key={index}
            >
              <CarCard car={car} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Cars;
