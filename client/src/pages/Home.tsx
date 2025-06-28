import CarCard from "../components/CarCard"
import Hero from "../components/Hero"
import { assets } from "../assets/assets"

const demoCar = {
  image: assets.main_car, // or a valid image path
  isAvailable: true,
  pricePerDay: 120,
  brand: "Toyota",
  model: "Camry",
  category: "Sedan",
  year: 2022,
  seating_capacity: 5,
  fuel_type: "Petrol",
  transmission: "Automatic",
  location: "New York",
}

const Home = () => {
  return (
    <>
      <Hero />
      <CarCard car={demoCar} />
    </>
  )
}

export default Home
