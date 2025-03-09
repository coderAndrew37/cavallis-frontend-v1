import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

// ✅ Define schema with Zod
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// ✅ Define TypeScript type for the form
type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Setup React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // ✅ Handle Form Submission
  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);

      // Redirect to home or previous protected route
      const redirectPath = location.state?.from || "/";
      navigate(redirectPath);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Welcome Back</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded mb-2"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded mb-2"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded"
          >
            Login
          </button>
        </form>

        {/* Links for Register & Forgot Password */}
        <div className="text-center mt-4">
          <Link to="/forgot-password" className="text-sm text-blue-500">
            Forgot password?
          </Link>
          <p className="mt-2 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
