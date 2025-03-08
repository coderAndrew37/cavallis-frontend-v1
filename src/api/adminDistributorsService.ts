import api from "./http";

// 🔹 Get All Distributors (Admin)
export const getAllDistributors = async () => {
  const { data } = await api.get("/distributors");
  return data;
};

// 🔹 Update Distributor Status (Admin)
export const updateDistributorStatus = async (
  distributorId: string,
  status: string
) => {
  const { data } = await api.patch(`/distributors/${distributorId}/status`, {
    status,
  });
  return data;
};

// 🔹 Delete Distributor (Admin)
export const deleteDistributor = async (distributorId: string) => {
  await api.delete(`/distributors/${distributorId}`);
};
