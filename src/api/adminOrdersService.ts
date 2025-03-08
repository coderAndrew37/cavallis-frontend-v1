import api from "./http";

// 🔹 Get All Orders (Admin)
export const getAllOrders = async (page = 1, status = "") => {
  const { data } = await api.get(`/admin/orders?page=${page}&status=${status}`);
  return data;
};

// 🔹 Get Order by ID (Admin)
export const getOrderById = async (orderId: string) => {
  const { data } = await api.get(`/admin/orders/${orderId}`);
  return data;
};

// 🔹 Update Order Status (Admin)
export const updateOrderStatus = async (orderId: string, status: string) => {
  const { data } = await api.patch(`/admin/orders/${orderId}/status`, {
    status,
  });
  return data;
};

// 🔹 Delete Order (Admin)
export const deleteOrder = async (orderId: string) => {
  await api.delete(`/admin/orders/${orderId}`);
};
