import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import api from "../api/http";

// ✅ Define schema with Zod
const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email format"),
});

const ForgotPassword = () => {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: { email: string }) => {
    try {
      await api.post("/users/forgot-password", data);
      setMessage("If this email is registered, you'll receive a reset link.");
    } catch {
      setMessage("Failed to send reset email.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-md rounded-md bg-white">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-2"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          Send Reset Link
        </button>
      </form>
      {message && <p className="text-blue-500 mt-4">{message}</p>}
    </div>
  );
};

export default ForgotPassword;
