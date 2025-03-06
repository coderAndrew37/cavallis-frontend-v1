import axios from "axios";

const API_URL = "http://localhost:5000/api/admin";

export const getAdminStats = async () => {
  const response = await axios.get(`${API_URL}/analytics`);
  return response.data;
};

export const getAllProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await axios.delete(`${API_URL}/products/${id}`);
  return response.data;
};

export const getAllOrders = async () => {
  const response = await axios.get(`${API_URL}/orders`);
  return response.data;
};

export const updateOrderStatus = async (id: string, status: string) => {
  const response = await axios.patch(`${API_URL}/orders/${id}`, { status });
  return response.data;
};

export const getAllReviews = async () => {
  const response = await axios.get(`${API_URL}/reviews`);
  return response.data;
};

export const approveReview = async (id: string) => {
  const response = await axios.patch(`${API_URL}/reviews/${id}/approve`);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const updateUserRole = async (id: string, role: string) => {
  const response = await axios.patch(`${API_URL}/users/${id}`, { role });
  return response.data;
};

export const getAllDistributors = async () => {
  const response = await axios.get(`${API_URL}/distributors`);
  return response.data;
};

export const deleteDistributor = async (id: string) => {
  const response = await axios.delete(`${API_URL}/distributors/${id}`);
  return response.data;
};

export const getAdminAnalytics = async () => {
  const response = await axios.get(`${API_URL}/analytics`);
  return response.data;
};
