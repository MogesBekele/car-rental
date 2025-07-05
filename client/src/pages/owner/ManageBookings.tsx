import { useEffect, useState } from "react";
import { dummyMyBookingsData } from "../../assets/assets";
import type { Booking } from "../../types/DataType";
import Title from "../../components/owner/Title";

const ManageBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    setBookings(dummyMyBookingsData);
  }, []);

  return (
    <div className="px-4 py-10 md:px-10 flex-1">
      <Title
        title="Manage Bookings"
        subTitle="View, confirm, or cancel customer bookings."
      />
      <div className="mt-8">
        {bookings.length === 0 ? (
          <p className="text-gray-500">No bookings found.</p>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-borderColor rounded-lg"
              >
                {/* Car Info */}
                <div>
                  <img
                    src={booking.car.image}
                    alt={`${booking.car.brand} ${booking.car.model}`}
                    className="w-full h-28 object-cover rounded mb-2"
                  />
                  <div className="font-semibold">
                    {booking.car.brand} {booking.car.model}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {booking.car.year} &middot; {booking.car.category}
                  </div>
                </div>
                {/* Booking Info */}
                <div className="md:col-span-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 text-xs rounded-full ${
                          booking.status === "confirmed"
                            ? "bg-green-400/15 text-green-700"
                            : "bg-yellow-400/15 text-yellow-700"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <div className="mt-2 text-sm">
                      <div>
                        <span className="font-medium">Renter:</span> {booking.user}
                      </div>
                      <div>
                        <span className="font-medium">Rental Period:</span>{" "}
                        {booking.pickupDate.split("T")[0]} to {booking.returnDate.split("T")[0]}
                      </div>
                      <div>
                        <span className="font-medium">Booked on:</span>{" "}
                        {booking.createdAt.split("T")[0]}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Actions & Price */}
                <div className="flex flex-col justify-between items-end">
                  <div className="text-lg font-bold text-primary">
                    ${booking.price}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="px-3 py-1 rounded bg-green-500 text-white text-xs hover:bg-green-600">
                      Confirm
                    </button>
                    <button className="px-3 py-1 rounded bg-red-500 text-white text-xs hover:bg-red-600">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBookings;