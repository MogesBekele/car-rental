import { useEffect, useState } from "react";
import { dummyMyBookingsData } from "../assets/assets";
import Title from "../components/Title";
import type { Booking } from "../types/Booking"; // Import the Booking type

// Define types

const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const fetchBookings = async () => {
    setBookings(dummyMyBookingsData);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32  2xl:px-48 mt-16 text-sm max-w-7xl">
      <Title
        title="My Bookings"
        subTitle="View and manage your bookings here"
        align="left"
      />

      <div>
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-borderColor rounded-lg mt-5 first:mt-12"
          >
            {/* image info */}
            <div className="md:col-span-1">
              <div className="rounded-md overflow-hidden mb-3">
                <img
                  src={booking.car.image}
                  alt=""
                  className="w-full h-auto aspect-video object-cover"
                />
              </div>
              <p className="text-lg font-medium mt-2">
                {booking.car.brand} {booking.car.model}
              </p>
              <p className="text-gray-500">
                {booking.car.year} . {booking.car.category}.
                {booking.car.location}
              </p>
            </div>
            {/* Add more booking details here if needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
