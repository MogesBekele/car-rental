import { useNavigate } from "react-router-dom"
import { assets} from "../assets/assets"
import CarCard from "./CarCard"
import Title from "./Title"
import { useAppContext } from "../context/AppContext"


const FeatureSection = () => {
  const {cars}=  useAppContext()
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32">
      <div>
        <Title title="Features Vehicles" subTitle="Explore our selection of premium vehicles available for your next adventure " />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">

        {cars.slice(0,6).map((car)=>(
          <div key={car._id}>
            <CarCard car={car}/>
          </div>
        ))}
      </div>
      <button onClick={() => {navigate("/cars"); scrollTo(0,0)}}  className="flex items-center justify-center gap-2 mt-18 py-2 px-6 border-borderColor hover:bg-gray-50 rounded-md cursor-pointer">Explore all cars <img src={assets.arrow_icon} alt="arrow" /></button>
      
    </div>
  )
}

export default FeatureSection
