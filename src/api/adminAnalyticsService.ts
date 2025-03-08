import api from "./http";

// 🔹 Get Sales Trends (Admin)
export const getSalesTrends = async () => {
  const { data } = await api.get("/admin/trends/sales-trends");
  return data;
};

// 🔹 Get Top Products (Admin)
export const getTopProducts = async () => {
  const { data } = await api.get("/admin/trends/top-products");
  return data;
};
