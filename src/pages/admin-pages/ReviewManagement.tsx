import { useEffect, useState } from "react";
import { getAllReviews, approveReview } from "../../api/adminReviewsService";

interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  isApproved: boolean;
}

const ReviewManagement = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getAllReviews();
        setReviews(data);
      } catch {
        setError("Failed to fetch reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // 🔹 Handle Review Approval
  const handleApprove = async (id: string) => {
    try {
      await approveReview(id);
      setReviews((prev) =>
        prev.map((review) =>
          review._id === id ? { ...review, isApproved: true } : review
        )
      );
    } catch (error) {
      console.error("Error approving review:", error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Review Management</h2>

      {/* 🔹 Reviews Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
        {loading ? (
          <p>Loading reviews...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Rating</th>
                <th className="p-3 text-left">Comment</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review._id} className="border-b">
                  <td className="p-3">{review.name}</td>
                  <td className="p-3">{review.rating}</td>
                  <td className="p-3">{review.comment}</td>
                  <td className="p-3">
                    {review.isApproved ? "Approved" : "Pending"}
                  </td>
                  <td className="p-3">
                    {!review.isApproved && (
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                        onClick={() => handleApprove(review._id)}
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ReviewManagement;
