import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { useEffect, useState } from "react";
import type { Car } from "../types/DataType";
import Loading from "../components/Loading";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import {motion} from "motion/react";

const CarDetails = () => {
  const { id } = useParams<{ id: string }>();
  const {
    cars,
    axios,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
    navigate,
    currency,
  } = useAppContext();
  const [car, setCar] = useState<Car | null>(null);

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    // You can add your subscribe logic here
    try {
      const {data} = await axios.post('/api/bookings/create',{
        car: id,
        pickupDate,
        returnDate
      })
      if(data.success){
        toast.success(data.message)
        navigate('/my-bookings')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      const err = error as any;
      toast.error(err.response?.data?.message || "Something went wrong");
      
    }

  };

  useEffect(() => {
    const foundCar = cars.find((car) => car._id === id);
    setCar(foundCar ?? null); // if undefined, set null
  }, [id, cars]);

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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
         
        
        className="lg:col-span-2">
          <motion.img
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            src={car.image}
            alt=""
            className="w-full h-auto md:h-100 object-cover rounded-xl mb-6 shadow-md"
          />
          <motion.div
            initial={{ opacity: 0}}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.5 }}
          
          
          className="space-y-6">
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
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  key={text}
                  className="flex items-center bg-light p-4 rounded-lg"
                >
                  <img src={icon} alt="" className="h-5 mb-2" />
                  {text}
                </motion.div>
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
              ].map((item) => (
                <li key={item} className="flex items-center  text-gray-500">
                  <img src={assets.check_icon} alt="" className="h-4 mr-2" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* booking form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay:0.6 }}
          onSubmit={handleSubmit}
          className="shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500"
        >
          <p className="flex items-center justify-between text-2xl text-gray-800 font-semibold">
            {currency}
            {car.pricePerDay}{" "}
            <span className=" text-base text-gray-400 font-normal">
              per day
            </span>
          </p>
          <hr className="border-borderColor my-6" />
          <div className="flex flex-col gap-2">
            <label htmlFor="pickup-date">Pickup date</label>
            <input
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              type="date"
              id="pickup-date"
              className="border border-borderColor px-3 py-2 rounded-lg"
              required
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="return-date">Return date</label>
            <input
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              type="date"
              id="return-date"
              className="border border-borderColor px-3 py-2 rounded-lg"
              required
            />
          </div>
          <button className="w-full bg-primary text-white py-3 rounded-xl hover:bg-primary-dull font-medium transition-all cursor-pointer">
            Book Now
          </button>
          <p className="text-sm text-center">
            No credit card required to reserve
          </p>
        </motion.form>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default CarDetails;
