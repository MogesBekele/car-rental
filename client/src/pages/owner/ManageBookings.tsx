import { useEffect, useState } from 'react'
import { dummyMyBookingsData } from '../../assets/assets'
import type { Booking } from '../../types/DataType'

const ManageBookings = () => {
  const [bookings, setBookings]= useState<Booking[]>([])

  const fetchOwnerBookings = async()=>{
    setBookings(dummyMyBookingsData)
  }
  useEffect(()=>{
    fetchOwnerBookings()
  },[])
  return (
    <div>
      
    </div>
  )
}

export default ManageBookings
