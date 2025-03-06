import { useEffect, useState } from "react";
import {
  getAllDistributors,
  deleteDistributor,
} from "../services/adminService";

interface Distributor {
  _id: string;
  name: string;
  location: string;
}

const DistributorManagement = () => {
  const [distributors, setDistributors] = useState<Distributor[]>([]);

  useEffect(() => {
    const fetchDistributors = async () => {
      const data = await getAllDistributors();
      setDistributors(data);
    };
    fetchDistributors();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteDistributor(id);
    setDistributors((prev) =>
      prev.filter((distributor) => distributor._id !== id)
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Distributor Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg">
          <thead>
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {distributors.map((distributor) => (
              <tr key={distributor._id} className="border-t border-gray-700">
                <td className="p-3">{distributor.name}</td>
                <td className="p-3">{distributor.location}</td>
                <td className="p-3">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(distributor._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DistributorManagement;
