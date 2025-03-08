import api from "./http";

type User = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "distributor"; // ✅ Ensure role is fetched
} | null;

// 🔹 Register User
export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin" | "distributor"; // ✅ Ensure role is sent
}) => {
  const { data } = await api.post<{ user: User }>("/auth/register", userData);
  return data.user;
};

// 🔹 Login User
export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const { data } = await api.post<{ user: User }>("/auth/login", credentials);
  return data.user;
};

// 🔹 Get Current User
export const getCurrentUser = async () => {
  const { data } = await api.get<User>("/auth/me"); // ✅ Ensure role is fetched
  return data;
};

// 🔹 Logout User
export const logoutUser = async () => {
  await api.post("/auth/logout");
};

// 🔹 Refresh Token
export const refreshToken = async () => {
  try {
    await api.post("/auth/refresh-token");
  } catch {
    return null;
  }
};
