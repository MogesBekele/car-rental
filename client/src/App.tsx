import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { Route, Routes,  } from "react-router-dom";
import Home from "./pages/Home";
import CarDetails from "./pages/CarDetails";
import Cars from "./pages/Cars";
import MyBookings from "./pages/MyBookings";

const App = () => {
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const isOwnerPath = useLocation().pathname.startsWith("/owner");

  return <>
  {!isOwnerPath && <Navbar setShowLogin={setShowLogin} />}

  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/car-details/:id" element={<CarDetails/>} />
    <Route path="/cars" element={<Cars/>} />
    <Route path="/my-bookings" element={<MyBookings/>} />
    {/* Add more routes as needed */}

  </Routes>
  </>;
};

export default App;
