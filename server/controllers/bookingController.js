import Booking from "../models/bookingModel.js";
import Car from "../models/carModel.js";
import User from "../models/userModel.js";

export const checkAvailability = async (car, pickupDate, returnDate) => {
  const bookings = await Booking.find({
    car,
    $or: [{ pickupDate: { $lt: returnDate }, returnDate: { $gt: pickupDate } }],
  });

  return bookings.length === 0;
};

//API to check Availability of cars for the given date and loncation

export const checkAvailabilityOfCars = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.body;

    // Step 1: Find cars matching the location and marked as available
    const cars = await Car.find({ location, isAvailable: true });

    // Step 2: Check booking conflicts for each car
    const availableCarsPromises = cars.map(async (car) => {
      const isAvailable = await checkAvailability(
        car._id,
        pickupDate,
        returnDate
      );

      return { ...car.toObject(), isAvailable };
    });

    let availableCars = await Promise.all(availableCarsPromises);

    // Step 3: Filter only those truly available in the given date range
    availableCars = availableCars.filter((car) => car.isAvailable);

    // Step 4: Send response with correctly cased key
    res.json({ success: true, AvailableCars: availableCars });
  } catch (error) {
    console.error("Error checking availability:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// api to create bookings

export const createBookings = async (req, res) => {
  try {
    const { _id } = req.user;
    const { car, pickupDate, returnDate } = req.body;
    const isAvailable = await checkAvailability(car, pickupDate, returnDate);

    if (!isAvailable) {
      return res
        .status(400)
        .json({ success: false, message: "Car is not available" });
    }

    const carData = await Car.findById(car);
    //calculate price based on pickup and return dates

    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);
    const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
    const price = noOfDays * carData.pricePerDay;

    await Booking.create({
      car,
      owner: carData.owner,
      user: _id,
      pickupDate,
      returnDate,
      price,
    });
    res.json({ success: true, message: "Booking created successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to get user bookings

export const getUserBookings = async (req, res) => {
  try {
    const { _id } = req.user;
    const bookings = await Booking.find({ user: _id })
      .populate("car")
      .sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to get owner bookings

export const getOwnerBookings = async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const bookings = await Booking.find({ owner: req.user._id })
      .populate("car user")
      .select("-user.password")
      .sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// api to change booking status

export const changeBookingStatus = async (req, res) => {
  try {
    const { _id } = req.user;

    const { bookingId, status } = req.body;
    const booking = await Booking.findById(bookingId);
    if (booking.owner.toString() !== _id.toString()) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    booking.status = status;
    await booking.save();
    res.json({ success: true, message: "Booking status changed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
