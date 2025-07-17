import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Set base URL
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// ✅ Define types
interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "owner";
  // add other fields as needed
}

interface Car {
  _id: string;
  brand: string;
  model: string;
  price: number;
  available: boolean;
  // add other fields as needed
}

interface AppContextType {
  navigate: ReturnType<typeof useNavigate>;
  currency: string;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isOwner: boolean;
  setIsOwner: React.Dispatch<React.SetStateAction<boolean>>;
  showLogin: boolean;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  pickupDate: string;
  setPickupDate: React.Dispatch<React.SetStateAction<string>>;
  returnDate: string;
  setReturnDate: React.Dispatch<React.SetStateAction<string>>;
  cars: Car[];
  setCars: React.Dispatch<React.SetStateAction<Car[]>>;
  fetchCars: () => Promise<void>;
  logout: () => void;
  axios: typeof axios;
  fetchUser: () => Promise<void>;
}

interface AppProviderProps {
  children: ReactNode;
}

// ✅ Create context
export const AppContext = createContext<AppContextType | undefined>(undefined);

// ✅ AppProvider component
export const AppProvider = ({ children }: AppProviderProps) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [cars, setCars] = useState<Car[]>([]);

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
      const err = error as any;
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const fetchCars = async () => {
    try {
      const { data } = await axios.get("/api/user/cars");
      if (data.success) {
        setCars(data.cars);
      }
    } catch (error: unknown) {
      const err = error as any;
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsOwner(false);
    delete axios.defaults.headers.common["Authorization"];
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    fetchCars();
  }, []);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUser();
    }
  }, [token]);

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
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// ✅ Custom hook
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
