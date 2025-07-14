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

export const chechAvialabilityOfCars = async (req, res)=>{
  try {
    const {location, pickupDte, returnDate}= req.body;
    //fetch all available cars for the given location 

    const cars= await Car.find({location, isAvailable: true})
    //check availablity for the given date range using promise

    const availableCarsPromises = cars.map(async(car)=>{
      const isAvailable = await checkAvailability(car._id, pickupDte, returnDate)
      return {...car._id, isAvailable: isAvailable}
    })
    
    let availableCars = await Promise.all(availableCarsPromises);
    availableCars = availableCars.filter((car=>car.isAvailable === true))
    res.json({success: true, availableCars})
  } catch (error) {
    console.log(error)
    res.json({success: false, message: error.message})
  }
}