import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// ✅ Define schema with Zod
const registerSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// ✅ Define TypeScript type for the form
type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: "user" | "admin" | "distributor";
};

const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  // ✅ Handle Form Submission
  const onSubmit = async (data: RegisterFormData) => {
    try {
      const { name, email, password } = data;
      await registerUser({ name, email, password, role: "user" });
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("name")}
            type="text"
            placeholder="Full Name"
            className="w-full p-2 border rounded mb-2"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

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
            Register
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
