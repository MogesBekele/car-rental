import { useEffect, useState } from "react";
import { assets, dummyDashboardData } from "../../assets/assets";

// 1. Define the type
type DashboardData = {
  totalCars: number;
  totalBookings: number;
  pendingBookings: number;
  completedBookings: number;
  recentBookings: any[]; // Replace 'any' with a proper type if you have one
  monthlyRevenue: number;
};
type Card = {
  title: string;
  value: number;
  icon: string;
}
const Dashboard = () => {
  // 2. Type your state
  const [data, setData] = useState<DashboardData>({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });

  const dashboardCards: Card[] = [
    {
      title: "Total Cars",
      value: data.totalCars,
      icon: assets.carIconColored,
    },
    {
      title: "Total Bookings",
      value: data.totalBookings,
      icon: assets.listIconColored,
    },
    {
      title: "Pending",
      value: data.pendingBookings,
      icon: assets.cautionIconColored,
    },
    {
      title: "Comfirmed",
      value: data.completedBookings,
      icon: assets.listIconColored,
    },
  ]

  useEffect(() => {
    setData(dummyDashboardData);
  }, []);

  return (
    <div>
      {/* Render your dashboard data here */}
    </div>
  );
};

export default Dashboard;