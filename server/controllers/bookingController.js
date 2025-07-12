import Booking from "../models/bookingModel.js";
import Car from "../models/carModel.js";

// Get all bookings for a specific owner
export const getOwnerBookings = async (req, res) => {
  try {
    const { _id: ownerId } = req.user;

    const bookings = await Booking.find({ owner: ownerId })
      .populate("car", "brand model image") // only return these car fields
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId, status } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    booking.status = status;
    await booking.save();

    res.json({ success: true, message: "Booking status updated", booking });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
