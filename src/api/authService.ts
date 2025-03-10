import api from "./http";

type User = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "distributor";
} | null;

// 🔹 Register User
export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
  role?: "user" | "admin" | "distributor"; // ✅ Role defaults to "user"
}): Promise<User> => {
  const { data } = await api.post<{ user: User }>("/auth/register", {
    ...userData,
    role: userData.role || "user",
  });
  return data.user;
};

// 🔹 Login User
export const loginUser = async (credentials: {
  email: string;
  password: string;
}): Promise<User> => {
  const { data } = await api.post<{ user: User }>("/auth/login", credentials);
  return data.user;
};

// 🔹 Get Current User
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const { data } = await api.get<User>("/auth/me");
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

// 🔹 Logout User
export const logoutUser = async (): Promise<void> => {
  await api.post("/auth/logout");
  window.location.href = "/login"; // 🔥 Redirect to login after logout
};

// 🔹 Refresh Token
export const handleTokenRefresh = async (): Promise<string | null> => {
  try {
    const { data } = await api.post<{ token: string }>("/auth/refresh-token");

    if (!data.token) {
      throw new Error("Invalid token response");
    }

    return data.token;
  } catch (error) {
    console.error("Token refresh failed:", error);
    await logoutUser(); // 🔥 Force logout if refresh fails
    return null;
  }
};

// 🔹 Send Password Reset Email
export const sendPasswordReset = async (email: string): Promise<void> => {
  await api.post("/auth/forgot-password", { email });
};

// 🔹 Reset Password
export const resetPassword = async (
  token: string,
  password: string
): Promise<void> => {
  await api.post(`/auth/reset-password/${token}`, { password });
};
