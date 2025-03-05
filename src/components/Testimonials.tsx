import { useState, useEffect } from "react";
import Testimonial from "./Testimonial";
import { useAuth } from "../hooks/useAuth";
import api from "../api/http";
import { toast } from "react-toastify";
import { z } from "zod";
import { Link } from "react-router-dom";

type Review = {
  _id: string;
  name?: string;
  rating?: number;
  comment?: string;
  image?: string;
  likes?: number;
};

// 🔥 Define Zod Schema for Form Validation
const reviewSchema = z.object({
  comment: z.string().min(10, "Comment must be at least 10 characters long"),
  rating: z.number().min(1).max(5, "Rating must be between 1 and 5"),
  image: z.instanceof(File).optional(),
});

const Testimonials = () => {
  const { user } = useAuth() || { user: null };
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [image, setImage] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get("/reviews");
        setReviews(response.data.reviews || []);
      } catch {
        setError("Failed to fetch reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});

    // 🔥 Validate input using Zod
    const validationResult = reviewSchema.safeParse({ comment, rating, image });
    if (!validationResult.success) {
      const formattedErrors = validationResult.error.format();
      setValidationErrors({
        comment: formattedErrors.comment?._errors[0] || "",
        rating: formattedErrors.rating?._errors[0] || "",
        image: formattedErrors.image?._errors[0] || "",
      });
      return;
    }

    if (!user) {
      toast.error("You must be logged in to submit a review!");
      return;
    }

    const formData = new FormData();
    formData.append("comment", comment);
    formData.append("rating", rating.toString());
    if (image) formData.append("image", image);

    setSubmitting(true);
    try {
      const response = await api.post("/reviews", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Review submitted for approval! ✅");
      setReviews((prev) => [response.data.review, ...prev]);
      setComment("");
      setImage(null);
    } catch {
      toast.error("Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Real People, Real Success
        </h2>
        <p className="text-gray-600 mt-2 mb-6">
          Hear from our amazing customers about their experiences.
        </p>
        {error && <p className="text-red-500">{error}</p>}
        {/* 🔥 Review Submission Form (For Logged-in Users) */}
        {user && (
          <form
            onSubmit={handleReviewSubmit}
            className="bg-white p-6 rounded-lg shadow-lg text-left max-w-lg mx-auto mb-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Leave a Review
            </h3>
            <textarea
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-green-500"
              placeholder="Share your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            {validationErrors.comment && (
              <p className="text-red-500 text-sm">{validationErrors.comment}</p>
            )}

            <div className="mt-3">
              <label className="block text-gray-700 font-semibold">
                Rating:
              </label>
              <select
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-500"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                {[5, 4, 3, 2, 1].map((num) => (
                  <option key={num} value={num}>
                    {num} Stars
                  </option>
                ))}
              </select>
              {validationErrors.rating && (
                <p className="text-red-500 text-sm">
                  {validationErrors.rating}
                </p>
              )}
            </div>

            <div className="mt-3">
              <label className="block text-gray-700 font-semibold">
                Upload Image:
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full p-2 border rounded-lg"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
              {validationErrors.image && (
                <p className="text-red-500 text-sm">{validationErrors.image}</p>
              )}
            </div>

            <button
              type="submit"
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition w-full"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        )}
        {/* 🔥 Display Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center animate-pulse"
              >
                <div className="w-24 h-24 bg-gray-300 rounded-full mb-4"></div>
                <div className="w-32 h-6 bg-gray-300 rounded mb-2"></div>
                <div className="w-20 h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-full h-12 bg-gray-200 rounded"></div>
              </div>
            ))
          ) : reviews.length === 0 ? (
            <p className="text-gray-500 col-span-full">
              No testimonials available yet.
            </p>
          ) : (
            reviews.map((review) => (
              <Testimonial key={review._id} review={review} />
            ))
          )}
        </div>

        {/* ✅ "View All" Button at the Bottom */}
        <Link
          to="/testimonials"
          className="mt-6 inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold"
        >
          View All Reviews
        </Link>
      </div>
    </section>
  );
};

export default Testimonials;
