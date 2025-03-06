import { useEffect, useState } from "react";
import { getAllReviews, approveReview } from "../services/adminService";

interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  isApproved: boolean;
}

const ReviewManagement = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await getAllReviews();
      setReviews(data);
    };
    fetchReviews();
  }, []);

  const handleApprove = async (id: string) => {
    await approveReview(id);
    setReviews((prev) =>
      prev.map((review) =>
        review._id === id ? { ...review, isApproved: true } : review
      )
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Review Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg">
          <thead>
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Rating</th>
              <th className="p-3 text-left">Comment</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id} className="border-t border-gray-700">
                <td className="p-3">{review.name}</td>
                <td className="p-3">{review.rating}</td>
                <td className="p-3">{review.comment}</td>
                <td className="p-3">
                  {review.isApproved ? (
                    <span className="text-green-500">Approved</span>
                  ) : (
                    <span className="text-yellow-500">Pending</span>
                  )}
                </td>
                <td className="p-3">
                  {!review.isApproved && (
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
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
      </div>
    </div>
  );
};

export default ReviewManagement;
