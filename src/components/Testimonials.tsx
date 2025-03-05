import { useEffect, useState } from "react";
import { FaStar, FaThumbsUp } from "react-icons/fa";
import Modal from "react-modal";
import { z } from "zod";
import { useAuth } from "../hooks/useAuth";
import api from "../api/http";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Define Review Type
type Review = {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  image?: string;
  likes: number;
};

// ✅ Define Zod Schema for Validation
const reviewSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  rating: z.number().min(1).max(5, "Rating must be between 1 and 5"),
  comment: z.string().min(10, "Comment must be at least 10 characters"),
});

Modal.setAppElement("#root");

const Testimonials = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await api.get("/reviews?limit=6");
        setReviews(data.reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // ✅ Handle Like Click
  const handleLike = async (reviewId: string) => {
    if (!user) {
      toast.error("You must be logged in to like reviews!");
      return;
    }

    try {
      await api.post(`/reviews/${reviewId}/like`);
      setReviews((prev) =>
        prev.map((r) => (r._id === reviewId ? { ...r, likes: r.likes + 1 } : r))
      );
      toast.success("Review liked! ❤️");
    } catch {
      toast.error("Failed to like review.");
    }
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = reviewSchema.safeParse({ name, rating, comment });

    if (!validation.success) {
      const formattedErrors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        formattedErrors[err.path[0]] = err.message;
      });
      setErrors(formattedErrors);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("rating", rating.toString());
      formData.append("comment", comment);
      if (image) formData.append("image", image);

      await api.post("/reviews", formData);
      toast.success("Review submitted! Pending admin approval. ✅");

      setModalIsOpen(false);
      setName("");
      setRating(5);
      setComment("");
      setImage(null);
    } catch {
      toast.error("Failed to submit review.");
    }
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          What Our Customers Say
        </h2>

        {/* ✅ Submit Review Button */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          onClick={() => setModalIsOpen(true)}
        >
          Write a Review
        </button>

        {/* ✅ Modal for Submitting Reviews */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Write a Review"
          className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto"
        >
          <form onSubmit={handleSubmit} className="text-left">
            <h2 className="text-2xl font-bold mb-4">Write a Review</h2>

            <div>
              <label className="block mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-2"
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label className="block mb-2">Rating</label>
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded mb-2"
                min="1"
                max="5"
              />
              {errors.rating && <p className="text-red-500">{errors.rating}</p>}
            </div>

            <div>
              <label className="block mb-2">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-2"
              />
              {errors.comment && (
                <p className="text-red-500">{errors.comment}</p>
              )}
            </div>

            <div>
              <label className="block mb-2">Upload Image (Optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </form>
        </Modal>

        {/* ✅ Display Reviews in a Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p>Loading reviews...</p>
          ) : (
            reviews.map((r) => (
              <div
                key={r._id}
                className="bg-white p-6 rounded-lg shadow-lg text-center"
              >
                {r.image && (
                  <img
                    src={r.image}
                    alt={r.name}
                    className="w-16 h-16 mx-auto rounded-full mb-2"
                  />
                )}
                <h4 className="text-gray-900 font-semibold">{r.name}</h4>

                <div className="flex justify-center mt-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < r.rating ? "text-yellow-400" : "text-gray-300"
                      }
                    />
                  ))}
                </div>

                <p className="text-gray-700 italic mt-2">"{r.comment}"</p>

                <button
                  className="flex items-center mt-4 text-gray-700 hover:text-blue-500 transition"
                  onClick={() => handleLike(r._id)}
                >
                  <FaThumbsUp className="mr-1" /> {r.likes}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
