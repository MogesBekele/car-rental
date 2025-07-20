import User from "../models/userModel.js";
import Car from "../models/carModel.js";
import fs from "fs";
import imagekit from "../config/imageKit.js";
import Booking from "../models/bookingModel.js";

export const changeRoleToOwner = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { role: "owner" });
    res.json({ success: true, message: "now you can control the dashboard" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: true, message: error.message });
  }
};

// api to list cars
export const addCar = async (req, res) => {
  try {
    const { _id } = req.user;
    let car = JSON.parse(req.body.carData);
    const imageFile = req.file;
    console.log("req.file:", req.file);
    console.log("req.body:", req.body);

    if (!imageFile) {
      return res
        .status(400)
        .json({ success: false, message: "Image file is missing" });
    }
    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/cars",
    });

    // optimization through imagekit URL trasformation
    var optimizedImageUrl = imagekit.url({
      path: response.filePath,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
      transformation: [
        { width: "1280" },
        { quality: "auto" },
        { format: "webp" },
      ],
    });

    const image = optimizedImageUrl;

    await Car.create({
      ...car,
      owner: _id,
      image,
    });
    res.json({ success: true, message: "Car added successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const getOwnerCars = async (req, res) => {
  try {
    const { _id } = req.user;
    const cars = await Car.find({ owner: _id });
    res.json({ success: true, cars });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to toggle car availablity

export const toggleCarAvailability = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId);
    if (car.owner.toString() !== _id.toString()) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    car.isAvailable = !car.isAvailable;

    await car.save();
    res.json({
      success: true,
      message: "Car availability toggled successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// api to delete the car

export const deleteCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId);

    if (car.owner.toString() !== _id.toString()) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    car.owner = null;
    car.available = false;
    await car.save();
    res.json({ success: true, message: "Car removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// api to get dashboard data
export const getDashboardData = async (req, res) => {
  try {
    const { _id, role } = req.user;

    if (role !== "owner") {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const cars = await Car.find({ owner: _id });

    const bookings = await Booking.find({ owner: _id })
      .populate("car")
      .sort({ createdAt: -1 });

    const pendingBookings = await Booking.find({
      owner: _id,
      status: "pending",
    });

    const confirmedBookings = await Booking.find({
      owner: _id,
      status: "confirmed", // ✅ fixed here
    });

    const monthlyRevenue = confirmedBookings.reduce(
      (acc, booking) => acc + booking.price,
      0
    );

    const dashboardData = {
      totalCars: cars.length,
      totalBookings: bookings.length,
      pendingBookings: pendingBookings.length,
      completedBookings: confirmedBookings.length, // ✅ renamed here
      recentBookings: bookings.slice(0, 5),
      monthlyRevenue,
    };

    res.json({ success: true, dashboardData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const updateUserImage = async (req, res) => {
  try {
    const { _id } = req.user;
    const imageFile = req.file;

    if (!imageFile) {
      return res
        .status(400)
        .json({ success: false, message: "Image file is missing" });
    }
    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/users",
    });

    // optimization through imagekit URL trasformation
    var optimizedImageUrl = imagekit.url({
      path: response.filePath,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
      transformation: [
        { width: "400" },
        { quality: "auto" },
        { format: "webp" },
      ],
    });

    const image = optimizedImageUrl;

    await User.findByIdAndUpdate(_id, { image });
    res.json({ success: true, message: "Image updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
