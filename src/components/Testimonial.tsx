import { useState, useEffect } from "react";
import { FaStar, FaThumbsUp } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../api/http";
import { useAuth } from "../hooks/useAuth";

type Review = {
  _id: string;
  name?: string;
  rating?: number;
  comment?: string;
  image?: string;
  likes?: number;
};

type Props = {
  review?: Review; // ✅ Handle possible undefined reviews
};

const Testimonial = ({ review }: Props) => {
  const { user } = useAuth() || { user: null }; // ✅ Prevent auth errors
  const [likes, setLikes] = useState(review?.likes || 0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && review?._id) {
      setLiked(localStorage.getItem(`liked_${review._id}`) === "true");
    }
  }, [review?._id]);

  const handleLike = async () => {
    if (!user) {
      toast.error("You must be logged in to like reviews!");
      return;
    }
    if (liked) {
      toast.warning("You've already liked this review!");
      return;
    }
    try {
      await api.post(`/reviews/${review?._id}/like`);
      setLikes((prev) => prev + 1);
      setLiked(true);
      localStorage.setItem(`liked_${review?._id}`, "true");
      toast.success("Review liked! ❤️");
    } catch {
      toast.error("Failed to like review.");
    }
  };

  if (!review) return <p className="text-gray-500">Loading review...</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center flex flex-col items-center">
      {review.image && (
        <img
          src={review.image}
          alt={review.name || "User"}
          className="w-24 h-24 object-cover rounded-full border-4 border-green-500 mb-4"
        />
      )}
      <h4 className="text-gray-900 font-semibold text-lg">
        {review.name || "Anonymous"}
      </h4>
      <div className="flex justify-center mt-2">
        {Array.from({ length: 5 }, (_, i) => (
          <FaStar
            key={i}
            className={
              i < (review.rating || 0) ? "text-yellow-400" : "text-gray-300"
            }
          />
        ))}
      </div>
      <p className="text-gray-700 italic mt-2">
        "{review.comment || "No comment provided."}"
      </p>
      <button
        className={`flex items-center mt-4 ${
          liked ? "text-blue-500" : "text-gray-700 hover:text-blue-500"
        } transition`}
        onClick={handleLike}
        disabled={liked}
      >
        <FaThumbsUp className="mr-1" /> {likes}
      </button>
    </div>
  );
};

export default Testimonial;
