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
  role: "user" | "admin" | "distributor";
}) => {
  const { data } = await api.post<{ user: User }>("/auth/register", userData, {
    withCredentials: true, // ✅ Ensure cookies are sent
  });
  return data.user;
};

// 🔹 Login User
export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const { data } = await api.post<{ user: User }>("/auth/login", credentials, {
    withCredentials: true,
  });
  return data.user;
};

// 🔹 Get Current User
export const getCurrentUser = async () => {
  try {
    const { data } = await api.get<User>("/auth/me", { withCredentials: true });
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

// 🔹 Logout User
export const logoutUser = async () => {
  await api.post("/auth/logout", {}, { withCredentials: true });
};

// 🔹 Refresh Token
export const refreshToken = async () => {
  try {
    await api.post("/auth/refresh-token", {}, { withCredentials: true });
  } catch {
    return null;
  }
};

// 🔹 Send Password Reset Email
export const sendPasswordReset = async (email: string) => {
  await api.post("/auth/forgot-password", { email });
};

// 🔹 Reset Password
export const resetPassword = async (token: string, password: string) => {
  await api.post(`/auth/reset-password/${token}`, { password });
};
