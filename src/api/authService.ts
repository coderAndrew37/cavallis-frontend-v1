import api from "./http";

type User = { id: string; name: string; email: string } | null;

// 🔹 Register User
export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
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
  const { data } = await api.get<{ user: User }>("/auth/me");
  return data.user;
};

// 🔹 Logout User
export const logoutUser = async () => {
  await api.post("/auth/logout");
};

// 🔹 Refresh Token (No Manual Storage Needed)
export const refreshToken = async () => {
  try {
    await api.post("/auth/refresh-token");
  } catch {
    return null;
  }
};
