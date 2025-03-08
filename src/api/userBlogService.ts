import api from "./http";

interface BlogPost {
  _id: string;
  title: string;
  category: string;
  content: string;
  status: "pending" | "approved";
}

// 🔹 Fetch user's blogs
export const getUserBlogs = async (userId: string): Promise<BlogPost[]> => {
  const { data } = await api.get(`/blogs?author=${userId}&status=pending`);
  return data.blogPosts;
};

// 🔹 Update a pending blog post
export const updateBlogPost = async (
  blogId: string,
  updatedData: Partial<BlogPost>
): Promise<BlogPost> => {
  const { data } = await api.put(`/blogs/${blogId}`, updatedData);
  return data;
};

// 🔹 Delete a pending blog post
export const deleteBlogPost = async (blogId: string): Promise<void> => {
  await api.delete(`/blogs/${blogId}`);
};
