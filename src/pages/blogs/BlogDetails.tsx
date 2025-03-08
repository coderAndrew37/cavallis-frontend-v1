import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getBlogById,
  BlogPost,
  getBlogComments,
  Comment,
} from "../../api/blogService";
import CommentSection from "../../components/CommentSection";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const blogData = await getBlogById(id);
        setBlog(blogData);
        const commentsData = await getBlogComments(id);
        setComments(commentsData);
      }
    };
    fetchData();
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <p className="text-sm text-gray-600">Category: {blog.category}</p>
      <p className="mt-4">{blog.content}</p>

      <CommentSection
        blogId={blog._id}
        comments={comments}
        setComments={setComments}
      />
    </div>
  );
};

export default BlogDetails;
