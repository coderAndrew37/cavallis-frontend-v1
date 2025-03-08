import api from "./http";

// 🔹 Get All Products (Admin)
export const getAllProducts = async (page = 1, category = "", sort = "") => {
  const { data } = await api.get(
    `/products?page=${page}&category=${category}&sort=${sort}`
  );
  return data;
};

// 🔹 Get Product by ID (Admin)
export const getProductById = async (productId: string) => {
  const { data } = await api.get(`/products/${productId}`);
  return data;
};

// 🔹 Create New Product (Admin)
export const createProduct = async (productData: object) => {
  const { data } = await api.post("/products", productData);
  return data;
};

// 🔹 Update Product (Admin)
export const updateProduct = async (productId: string, productData: object) => {
  const { data } = await api.put(`/products/${productId}`, productData);
  return data;
};

// 🔹 Delete Product (Admin)
export const deleteProduct = async (productId: string) => {
  await api.delete(`/products/${productId}`);
};
