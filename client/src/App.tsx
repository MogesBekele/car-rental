import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState } from "react";

const App = () => {
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const isOwnerPath = useLocation().pathname.startsWith("owner");

  return <>{!isOwnerPath && <Navbar setShowLogin={setShowLogin} />}</>;
};

export default App;
