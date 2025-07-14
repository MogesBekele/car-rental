import express from 'express'
import { changeBookingStatus, chechAvialabilityOfCars, createBookings, getOwnerBookings, getUserBookings } from '../controllers/bookingController';
import { protect } from '../middleware/auth.js';
const bookingRouter = express.Router();

bookingRouter.post('/check-availability', chechAvialabilityOfCars)
bookingRouter.post('/create', protect, createBookings)
bookingRouter.get('/user', protect, getUserBookings)
bookingRouter.get('/owner', protect, getOwnerBookings)
bookingRouter.post('/change-status', protect, changeBookingStatus)

export default bookingRouter;
