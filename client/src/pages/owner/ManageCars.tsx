import { useEffect, useState } from "react";
import { dummyCarData } from "../../assets/assets";
import type { Car } from "../../types/DataType";
import Title from "../../components/owner/Title";

const ManageCars = () => {
  const [cars, setCars] = useState<Car[]>([]);

  const fetchOwerCars = async () => {
    setCars(dummyCarData);
  };
  useEffect(() => {
    fetchOwerCars();
  }, []);
  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title
        title="Manage Cars"
        subTitle="view all listed cars, update their details and remove then from the booking platform"
      />
      <div className="max-w-3xl w-ful rounded-md overflow-hidden border border-borderColor mt-6">
        <table className="w-full border border-collapse text-left text-sm text-gray-600 ">
          <thead className="text-gray-500">
            <tr>
              <th className="p-3 font-medium">Car</th>
              <th className="p-3 font-medium">Category</th>
              <th className="p-3 font-medium">Price</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3 font-medium">Actionr</th>
            </tr>
          </thead>
          
        </table>
      </div>
    </div>
  );
};

export default ManageCars;
