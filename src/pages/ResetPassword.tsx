import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/http";

// ✅ Define schema with Zod
const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ResetPassword = () => {
  const { token } = useParams<{ token: string }>(); // Get token from URL
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ password: string; confirmPassword: string }>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: { password: string }) => {
    try {
      await api.post(`/users/reset-password/${token}`, {
        password: data.password,
      });
      setMessage("Password reset successful. Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch {
      setMessage("Failed to reset password.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-md rounded-md bg-white">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("password")}
          type="password"
          placeholder="New Password"
          className="w-full p-2 border rounded mb-2"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <input
          {...register("confirmPassword")}
          type="password"
          placeholder="Confirm Password"
          className="w-full p-2 border rounded mb-2"
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          Reset Password
        </button>
      </form>
      {message && <p className="text-blue-500 mt-4">{message}</p>}
    </div>
  );
};

export default ResetPassword;
