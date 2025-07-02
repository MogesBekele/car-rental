import { useEffect, useState } from "react"
import { dummyMyBookingsData } from "../assets/assets"
import Title from "../components/Title"

const MyBookings = () => {
  const [bookings, setBookings] = useState<any>([])

  const fetchBookings = async ()=>{
    setBookings(dummyMyBookingsData)
  }
  useEffect(()=>{
    fetchBookings()

  },[])
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32  2xl:px-48 mt-16 text-sm max-w-7xl">
      <Title title="My Bookings" subTitle="View and manage your bookings here" align="left"/>
      
    </div>
  )
}

export default MyBookings
