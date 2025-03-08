import { useEffect, useState } from "react";
import { getAllBlogs, BlogPost } from "../../api/blogService";
import BlogCard from "../../components/BlogCard";

const BlogList = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getAllBlogs();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Blogs</h2>
      {loading ? (
        <p>Loading blogs...</p>
      ) : (
        <div className="grid gap-4">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
