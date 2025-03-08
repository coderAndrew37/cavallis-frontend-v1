import api from "./http";

// 🔹 Get All Users (Admin)
export const getAllUsers = async () => {
  const { data } = await api.get("/admin/users");
  return data;
};

// 🔹 Update User Role (Admin)
export const updateUserRole = async (userId: string, role: string) => {
  const { data } = await api.patch(`/admin/users/${userId}/role`, { role });
  return data;
};

// 🔹 Delete User (Admin)
export const deleteUser = async (userId: string) => {
  await api.delete(`/admin/users/${userId}`);
};
