import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Testimonial from "../components/Testimonial";
import api from "../api/http";
import { toast } from "react-toastify";

type Review = {
  _id: string;
  name?: string;
  rating?: number;
  comment?: string;
  image?: string;
  likes?: number;
};

const TestimonialsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/reviews?page=${currentPage}&limit=6`);
        setReviews(data.reviews || []);
        setTotalPages(data.totalPages || 1);
      } catch {
        toast.error("Failed to load reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [currentPage]);

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Customer Testimonials
        </h1>
        <p className="text-gray-600 mt-2 mb-6">
          See what our customers have to say about our products.
        </p>

        {/* ✅ Display Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p>Loading reviews...</p>
          ) : (
            reviews
              .sort((a, b) => (b.image && !a.image ? 1 : -1)) // ✅ Both `a` and `b` are now used
              .map((review) => <Testimonial key={review._id} review={review} />)
          )}
        </div>

        {/* ✅ Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center items-center gap-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50 flex items-center"
            >
              <FaArrowLeft className="mr-2" /> Previous
            </button>

            <span className="text-gray-800 font-semibold">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50 flex items-center"
            >
              Next <FaArrowRight className="ml-2" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsPage;
