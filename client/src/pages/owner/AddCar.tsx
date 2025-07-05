import { useState } from "react";
import Title from "../../components/owner/Title";
import { assets } from "../../assets/assets";


type CarDetails = {
  brand: string;
  model: string;
  year: number;
  pricePerDay: number;
  category: string;
  transmission: string;
  fuel_type: string;
  seating_capacity: number;
  location: string;
  description: string;
  
}
const AddCar = () => {
  const [image, setImage] = useState<File | null>(null);
  const currency = import.meta.env.VITE_CURRENCY;
  const [car, setCar] = useState<CarDetails>({
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
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="px-4 py-10 md:px-10 flex-1">
      <Title
        title="Add New Car"
        subTitle="Fill in details to list a new car booking, including pricing, availability and specifications."
      />
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl"
      >
        {/* {/* image input */}
        <div className="flex items-center gap-2 w-full">
          <label htmlFor="car-image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt=""
              className="h-14 rounded cursor-pointer"
            />
            <input
              type="file"
              id="car-image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
          </label>
          <p className="text-sm text-gray-500">Upload car image</p>
        </div>
        {/* car details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col w-full">
            <label>Brand</label>
            <input
              type="text"
              value={car.brand}
              onChange={(e) => setCar({ ...car, brand: e.target.value })}
              className="border border-borderColor rounded-md px-3 py-2 mt-1 outline-none"
              placeholder="Enter car brand"
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Model</label>
            <input
              type="text"
              value={car.model}
              onChange={(e) => setCar({ ...car, model: e.target.value })}
              className="border border-borderColor rounded-md px-3 py-2 mt-1 outline-none"
              placeholder="Enter car model"
              required
            />
          </div>
        </div>
        {/* {/* car year price category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label>Year</label>
            <input
              type="number"
              value={car.year}
              onChange={(e) => setCar({ ...car, year: Number(e.target.value) })}
              className="border border-borderColor rounded-md px-3 py-2 mt-1 outline-none"
              placeholder="2025"
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Daily Price {currency}</label>
            <input
              type="number"
              value={car.pricePerDay}
              onChange={(e) =>
                setCar({ ...car, pricePerDay: Number(e.target.value) })
              }
              className="border border-borderColor rounded-md px-3 py-2 mt-1 outline-none"
              placeholder="200"
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Category</label>
            <select
              value={car.category}
              onChange={(e) => setCar({ ...car, category: e.target.value })}
              className="px-3 mt-1 border border-borderColor rounded-md outline-none "
            >
              <option value="">Select Category</option>
              <option value="luxury">Luxury</option>
              <option value="sedan">sedan</option>
              <option value="SUV">SUV</option>
            </select>
          </div>
        </div>
        {/* transmission, fuel type, seating capacity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label>Transmission</label>
            <select
              value={car.transmission}
              onChange={(e) => setCar({ ...car, transmission: e.target.value })}
              className="px-3 mt-1 border border-borderColor rounded-md outline-none "
            >
              <option value="">Select Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label>Fuel Type</label>
            <select
              value={car.fuel_type}
              onChange={(e) => setCar({ ...car, fuel_type: e.target.value })}
              className="px-3 mt-1 border border-borderColor rounded-md outline-none "
            >
              <option value="">Select Fuel Type</option>
              <option value="Gas">Gas</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label>Seating Capacity</label>
            <input
              type="number"
              value={car.seating_capacity}
              onChange={(e) =>
                setCar({ ...car, seating_capacity: Number(e.target.value) })
              }
              className="border border-borderColor rounded-md px-3 py-2 mt-1 outline-none"
              placeholder="4"
              required
            />
          </div>
        </div>
        {/* {car location} */}
        <div className="flex flex-col w-full">
          <label>Location</label>
          <select
            value={car.location}
            onChange={(e) => setCar({ ...car, location: e.target.value })}
            className="px-3 mt-1 border border-borderColor rounded-md outline-none "
          >
            <option value="">Select a Location</option>
            <option value="Addis Ababa">Addis Ababa</option>
            <option value="Hawassa">Hawassa</option>
            <option value="Adama">Adama</option>
            <option value="Bahrdar">Bahrdar</option>
          </select>
        </div>
        {/* {car description} */}
        <div className="flex flex-col w-full">
          <label>Description</label>
          <textarea rows={5}
            value={car.description}
            onChange={(e) => setCar({ ...car, description: e.target.value })}
            className="border border-borderColor rounded-md px-3 py-2 mt-1 outline-none"
            placeholder="e.g luxurious car for rent"
            required
          ></textarea>
        </div>
        <button type="submit" className="flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white w-max rounded-md font-medium cursor-pointer">
          <img src={assets.tick_icon} alt="" />
          List Your Car
        </button>
      </form>
    </div>
  );
};

export default AddCar;
