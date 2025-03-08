import { useEffect, useState } from "react";
import {
  getAllBlogs,
  approveBlogPost,
  deleteBlogPost,
  BlogPost,
} from "../../api/blogService";

const BlogManagement = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getAllBlogs();
        setBlogs(data);
      } catch {
        setError("Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // 🔹 Approve Blog Post
  const handleApprove = async (id: string) => {
    try {
      await approveBlogPost(id);
      setBlogs((prev) =>
        prev.map((blog) =>
          blog._id === id ? { ...blog, status: "approved" } : blog
        )
      );
    } catch (error) {
      console.error("Error approving blog:", error);
    }
  };

  // 🔹 Delete Blog Post
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await deleteBlogPost(id);
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Blog Management</h2>

      {loading ? (
        <p>Loading blogs...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id} className="border-t">
                <td className="p-3">{blog.title}</td>
                <td className="p-3">{blog.category}</td>
                <td className="p-3">
                  {blog.status === "approved" ? (
                    <span className="text-green-500">Approved</span>
                  ) : (
                    <span className="text-yellow-500">Pending</span>
                  )}
                </td>
                <td className="p-3">
                  {blog.status !== "approved" && (
                    <button
                      onClick={() => handleApprove(blog._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BlogManagement;
