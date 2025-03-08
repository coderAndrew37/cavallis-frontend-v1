import { useEffect, useState } from "react";
import {
  getUserBlogs,
  updateBlogPost,
  deleteBlogPost,
} from "../api/userBlogService";
import { useAuth } from "../hooks/useAuth";

interface BlogPost {
  _id: string;
  title: string;
  category: string;
  content: string;
  status: "pending" | "approved";
}

const MyBlogs = () => {
  const { user } = useAuth();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchBlogs = async () => {
      try {
        const data = await getUserBlogs(user.id);
        setBlogPosts(data);
      } catch {
        setError("Failed to fetch your blog posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [user]);

  // ✅ Handle Blog Post Update
  const handleUpdate = async () => {
    if (!editingBlog) return;

    try {
      const updatedBlog = await updateBlogPost(editingBlog._id, {
        title: editingBlog.title,
        category: editingBlog.category,
        content: editingBlog.content,
      });

      setBlogPosts((prev) =>
        prev.map((b) => (b._id === updatedBlog._id ? updatedBlog : b))
      );
      setEditingBlog(null);
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  // ✅ Handle Blog Post Deletion
  const handleDelete = async (id: string) => {
    try {
      await deleteBlogPost(id);
      setBlogPosts((prev) => prev.filter((b) => b._id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">My Blogs</h2>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
        {loading ? (
          <p>Loading blog posts...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogPosts.map((post) => (
                <tr key={post._id} className="border-b">
                  <td className="p-3">{post.title}</td>
                  <td className="p-3">{post.category}</td>
                  <td className="p-3">
                    {post.status === "pending" ? "⏳ Pending" : "✅ Approved"}
                  </td>
                  <td className="p-3">
                    {post.status === "pending" && (
                      <>
                        <button
                          onClick={() => setEditingBlog(post)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit Form */}
      {editingBlog && (
        <div className="mt-6 bg-gray-100 p-4 rounded shadow-lg">
          <h3 className="text-xl font-bold mb-2">Edit Blog Post</h3>
          <input
            type="text"
            value={editingBlog.title}
            onChange={(e) =>
              setEditingBlog({ ...editingBlog, title: e.target.value })
            }
            className="border p-2 w-full mb-2"
          />
          <input
            type="text"
            value={editingBlog.category}
            onChange={(e) =>
              setEditingBlog({ ...editingBlog, category: e.target.value })
            }
            className="border p-2 w-full mb-2"
          />
          <textarea
            value={editingBlog.content}
            onChange={(e) =>
              setEditingBlog({ ...editingBlog, content: e.target.value })
            }
            className="border p-2 w-full mb-2 h-24"
          />
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={() => setEditingBlog(null)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default MyBlogs;
