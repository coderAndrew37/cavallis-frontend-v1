import { useEffect, useState } from "react";
import {
  getAllDistributors,
  updateDistributorStatus,
  deleteDistributor,
} from "../../api/adminDistributorsService";

interface Distributor {
  _id: string;
  businessName: string;
  contactInfo: string;
  status: "pending" | "approved" | "rejected";
}

const DistributorManagement = () => {
  const [distributors, setDistributors] = useState<Distributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDistributors = async () => {
      try {
        const data = await getAllDistributors();
        setDistributors(data.distributors);
      } catch {
        setError("Failed to fetch distributors");
      } finally {
        setLoading(false);
      }
    };

    fetchDistributors();
  }, []);

  // 🔹 Handle Distributor Status Update
  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const updatedDistributor = await updateDistributorStatus(id, status);
      setDistributors((prev) =>
        prev.map((d) => (d._id === id ? updatedDistributor : d))
      );
    } catch (error) {
      console.error("Error updating distributor status:", error);
    }
  };

  // 🔹 Handle Distributor Deletion
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this distributor?"))
      return;
    try {
      await deleteDistributor(id);
      setDistributors((prev) => prev.filter((d) => d._id !== id));
    } catch (error) {
      console.error("Error deleting distributor:", error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Distributor Management</h2>

      {/* 🔹 Distributors Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
        {loading ? (
          <p>Loading distributors...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left">Business Name</th>
                <th className="p-3 text-left">Contact</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {distributors.map((distributor) => (
                <tr key={distributor._id} className="border-b">
                  <td className="p-3">{distributor.businessName}</td>
                  <td className="p-3">{distributor.contactInfo}</td>
                  <td className="p-3">
                    <select
                      value={distributor.status}
                      onChange={(e) =>
                        handleUpdateStatus(distributor._id, e.target.value)
                      }
                      className="border rounded px-2 py-1"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="p-3">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleDelete(distributor._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DistributorManagement;
