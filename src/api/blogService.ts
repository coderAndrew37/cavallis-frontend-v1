import api from "./http";

export interface BlogPost {
  _id: string;
  title: string;
  category: string;
  content: string;
  author: string;
  status: "pending" | "approved";
  createdAt: string;
  comments: Comment[];
}

export interface Comment {
  _id: string;
  name: string;
  comment: string;
  isApproved: boolean;
}

// 🔹 Get All Blogs (Only Approved by Default)
export const getAllBlogs = async () => {
  const { data } = await api.get<{ blogPosts: BlogPost[] }>("/blogs");
  return data.blogPosts;
};

// 🔹 Get Blog By ID
export const getBlogById = async (id: string) => {
  const { data } = await api.get<BlogPost>(`/blogs/${id}`);
  return data;
};

// 🔹 Create Blog Post
export const createBlogPost = async (blog: {
  title: string;
  category: string;
  content: string;
}) => {
  const { data } = await api.post<BlogPost>("/blogs", blog);
  return data;
};

// 🔹 Edit Blog Post (Admin Only)
export const updateBlogPost = async (id: string, blog: Partial<BlogPost>) => {
  const { data } = await api.put<BlogPost>(`/blogs/${id}`, blog);
  return data;
};

// 🔹 Delete Blog Post (Admin Only)
export const deleteBlogPost = async (id: string) => {
  await api.delete(`/blogs/${id}`);
};

// 🔹 Approve Blog Post (Admin Only)
export const approveBlogPost = async (id: string) => {
  const { data } = await api.patch<BlogPost>(`/blogs/${id}/approve`);
  return data;
};

// 🔹 Get Comments for a Blog
export const getBlogComments = async (blogId: string) => {
  const { data } = await api.get<Comment[]>(`/blogs/${blogId}/comments`);
  return data;
};

// 🔹 Add a Comment
export const addComment = async (blogId: string, comment: { name: string; comment: string }) => {
  await api.post(`/blogs/${blogId}/comments`, comment);
};

// 🔹 Approve Comment (Admin Only)
export const approveComment = async (blogId: string, commentId: string) => {
  await api.patch(`/blogs/${blogId}/comments/${commentId}/approve`);
};
