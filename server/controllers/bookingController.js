import Booking from "../models/bookingModel"

 const checkAvailability = async (car, pickupDate, returnDate)=>{
  const bookings = await Booking.find({
    car,
    pickupDate: { $lte: pickupDate },
    returnDate: { $gte: returnDate },
  })
  return bookings.length === 0;

}

//API to check Availability of cars for the given date and loncation

export const chechAvialabilityOfCars = async