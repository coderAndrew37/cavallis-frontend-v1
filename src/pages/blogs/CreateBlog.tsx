import { useState } from "react";
import { createBlogPost } from "../../api/blogService";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState({ title: "", content: "", category: "" });

  const handleCreate = async () => {
    if (!blog.title || !blog.content || !blog.category)
      return alert("All fields are required.");
    try {
      await createBlogPost(blog);
      navigate("/blogs");
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Create Blog</h2>
      <input
        type="text"
        placeholder="Title"
        value={blog.title}
        onChange={(e) => setBlog({ ...blog, title: e.target.value })}
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        placeholder="Category"
        value={blog.category}
        onChange={(e) => setBlog({ ...blog, category: e.target.value })}
        className="border p-2 w-full mb-2"
      />
      <textarea
        placeholder="Content"
        value={blog.content}
        onChange={(e) => setBlog({ ...blog, content: e.target.value })}
        className="border p-2 w-full mb-2 h-24"
      />
      <button
        onClick={handleCreate}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create Blog
      </button>
    </div>
  );
};

export default CreateBlog;
