import type { Car } from "../components/CarCard";

export type Booking = {
  _id: string;
  car: Car;
  user: string;
  owner: string;
  pickupDate: string;
  returnDate: string;
  status: string;
  price: number;
  createdAt: string;
};