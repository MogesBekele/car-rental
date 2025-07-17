import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// 1. Define the context value type
interface AppContextType {
  // Add your context values here, example:
  // user: User | null;
}

// 2. Create the context with an initial value
export const AppContext = createContext<AppContextType | undefined>(undefined);

// 3. Define the props type for the provider
interface AppProviderProps {
  children: ReactNode;
}

// 4. Create the provider component
export const AppProvider = ({ children }: AppProviderProps) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [cars, setCars] = useState([]);

  //function to check if user is logged in
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/data");
      if (data.success) {
        setUser(data.user);
        setIsOwner(data.user.role === "owner");
      } else {
        navigate("/");
      }
    } catch (error: unknown) {
      const err = error as any; // or `as AxiosError`
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };
  //function to fetch all cars from the server
  const fetchCars = async () => {
    try {
      const { data } = await axios.get("/api/user/cars");
      if (data.success) {
        setCars(data.cars);
      }
    } catch (error: unknown) {
      const err = error as any; // or `as AxiosError`
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };
  // function to logout the user
  const logout = ()=>{
    localStorage.removeItem("token");
    setToken(null)
    setUser(null)
    setIsOwner(false)
     axios.defaults.headers.common["Authorization"] = ``;
     toast.success("Logged out successfully");
  }
  // useeffect to retrieve the token from local storage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    fetchCars()
  }, []);
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `${token}`;
      fetchUser();
    }
  });

  const contextValue: AppContextType = {
    navigate,
    currency,
    token,
    setToken,
    user,
    setUser,
    isOwner,
    setIsOwner,
    showLogin,
    setShowLogin,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
    cars,
    setCars,
    fetchCars,
    logout,
    axios,
    fetchUser,

    
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
