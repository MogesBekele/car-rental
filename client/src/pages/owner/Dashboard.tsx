import { useEffect, useState } from "react";
import { assets, dummyDashboardData } from "../../assets/assets";
import Title from "../../components/owner/Title";

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
    <div className="px-4 pt-10 md:px-10 flex-1">
      <Title title=" AdminDashboard" subTitle="Monitor overall platform performance including total cars, bookings, revenue and recent activities "/>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-3xl">
        {
          dashboardCards.map((card, index)=>(
            <div key={index} className=" flex gap-2 items-center justify-between p-4 rounded-md border border-borderColor">
              <div>
                <h1 className="text-xs text-gray-500">{card.title}</h1>
                <p className="text-lg font-semibold">{card.value}</p>
              </div>

            </div>
          ))
        }

      </div>
    </div>
  );
};
export default Dashboard;