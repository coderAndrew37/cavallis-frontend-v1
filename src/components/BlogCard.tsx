import { Link } from "react-router-dom";
import { BlogPost } from "../api/blogService";

const BlogCard = ({ blog }: { blog: BlogPost }) => (
  <div className="border p-4 rounded shadow">
    <h3 className="text-xl font-semibold">{blog.title}</h3>
    <p className="text-gray-500">{blog.category}</p>
    <p>{blog.content.slice(0, 100)}...</p>
    <Link to={`/blogs/${blog._id}`} className="text-blue-500">
      Read More
    </Link>
  </div>
);

export default BlogCard;
