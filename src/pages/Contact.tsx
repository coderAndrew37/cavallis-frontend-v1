import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import api from "../api/http";

// ✅ Zod Schema for Validation
const contactSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// ✅ TypeScript Type from Zod Schema
type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema), // ✅ Zod Validation
  });

  // 🔹 Handle Form Submission
  const onSubmit = async (data: ContactFormData) => {
    try {
      await api.post("/contact", data);
      toast.success("Message sent successfully! ✅");
      reset(); // ✅ Reset form after success
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message ❌");
    }
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto max-w-5xl bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* 🔹 Left Column: Contact Form */}
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div>
                <input
                  type="text"
                  {...register("name")}
                  placeholder="Your Name"
                  className="w-full p-3 border rounded"
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Your Email"
                  className="w-full p-3 border rounded"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <textarea
                  {...register("message")}
                  placeholder="Your Message"
                  rows={4}
                  className="w-full p-3 border rounded"
                />
                {errors.message && (
                  <p className="text-red-500">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* 🔹 Right Column: Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <FaPhoneAlt className="text-blue-500 text-2xl" />
              <a
                href="tel:+254700000000"
                className="text-lg text-gray-700 hover:text-blue-500"
              >
                +254 700 000 000
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-blue-500 text-2xl" />
              <a
                href="mailto:support@cavallis.com"
                className="text-lg text-gray-700 hover:text-blue-500"
              >
                support@cavallis.com
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-blue-500 text-2xl" />
              <p className="text-lg text-gray-700">
                123 Herbal Street, Nairobi, Kenya
              </p>
            </div>

            {/* Google Map */}
            <div className="mt-4">
              <iframe
                title="Company Location"
                className="w-full h-48 rounded"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.178736474345!2d36.8219465!3d-1.2863898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d3e12a689b%3A0x682d43a0112e8bb!2sNairobi!5e0!3m2!1sen!2ske!4v1645456504902"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
