import { NavLink, useLocation } from "react-router-dom";
import { assets, ownerMenuLinks } from "../../assets/assets";
import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Sidebar = () => {
  const { user, axios, fetchUser } = useAppContext();
  const location = useLocation();
  const [image, setImage] = useState<File | string | null>(null);

  const updateImage = async () => {
    try {
      if (!image) return;

      const formData = new FormData();
      formData.append("image", image);

      const { data } = await axios.post("/api/owner/update-image", formData);

      if (data.success) {
        fetchUser();
        toast.success(data.message);
        setImage("");
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 border-r border-borderColor text-sm">
      <div className="group relative">
        <label htmlFor="image">
          <img
            className="h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto"
            src={
              image
                ? typeof image === "string"
                  ? image
                  : URL.createObjectURL(image)
                : user?.image
            }
            alt="Profile"
          />
          <input
            type="file"
            accept="image/*"
            id="image"
            hidden
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
          <div className="absolute hidden top-0 right-0 bottom-0 left-0 bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer">
            <img src={assets.edit_icon} alt="Edit" />
          </div>
        </label>
      </div>

      {image && (
        <button
          onClick={updateImage}
          className="absolute top-0 right-0 p-2 flex items-center gap-1 bg-primary text-white cursor-pointer rounded"
        >
          Save <img src={assets.check_icon} width={13} alt="Check" />
        </button>
      )}

      <p className="mt-2 text-base max-md:hidden">{user?.name}</p>

      <div className="w-full">
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={`relative flex items-center gap-2 w-full py-3 pl-4 first:mt-6 ${
              link.path === location.pathname
                ? "bg-primary/10 text-primary"
                : "text-gray-600"
            }`}
          >
            <img
              src={
                link.path === location.pathname ? link.coloredIcon : link.icon
              }
              alt={link.name}
            />
            <span className="max-md:hidden">{link.name}</span>
            {link.path === location.pathname && (
              <div className="bg-primary h-8 w-1 rounded-l right-0 absolute" />
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
