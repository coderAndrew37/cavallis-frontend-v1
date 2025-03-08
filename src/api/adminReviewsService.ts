import api from "./http";

// 🔹 Get All Reviews (Admin)
export const getAllReviews = async () => {
  const { data } = await api.get("/reviews");
  return data.reviews;
};

// 🔹 Approve Review (Admin)
export const approveReview = async (reviewId: string) => {
  const { data } = await api.patch(`/reviews/${reviewId}/approve`);
  return data;
};
