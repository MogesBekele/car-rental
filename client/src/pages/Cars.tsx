import { useSearchParams } from "react-router-dom";
import { assets, dummyCarData } from "../assets/assets";
import CarCard from "../components/CarCard";
import Title from "../components/Title";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Cars = () => {
  // geting search parms

  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get("pickupLocation");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");

  const { cars, axios } = useAppContext();
  const [input, setInput] = useState<string>("");
  const isSearchData = pickupLocation && pickupDate && returnDate;
  const [filteredCars, setFilteredCars] = useState([]);
const searchCarAvailablity = async () => {
  try {
    const { data } = await axios.post('/api/bookings/check-availability', {
      location: pickupLocation,
      pickupDate,
      returnDate
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
  return (
    <div>
      <div className="flex flex-col items-center py-20 bg-light max-md:px-4">
        <Title
          title="Available Cars"
          subTitle=" Check out our selection of premium vehicles available for your next adventure"
        />
        <div className="flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow ">
          <img src={assets.search_icon} alt="" className="w-4.5 h-4.5 mr-2 " />
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Search by model, make, or Features"
            className="outline-none w-full h-full text-gray-500"
          />
          <img src={assets.filter_icon} alt="" className="w-4.5 h-4.5 mr-2 " />
        </div>
      </div>
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
        <p className="text-gray-500 xl:px-20 max-w-7xl mx-auto">
          Showing {filteredCars.length} Cars
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
          {filteredCars.map((car, index) => (
            <div key={index}>
              <CarCard car={car} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cars;
