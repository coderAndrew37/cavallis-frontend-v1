import { useState } from "react";
import { addComment, Comment } from "../api/blogService";

const CommentSection = ({
  blogId,
  comments,
  setComments,
}: {
  blogId: string;
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
}) => {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    await addComment(blogId, { name: "User", comment: newComment });
    setNewComment("");
    setComments([
      ...comments,
      {
        _id: Date.now().toString(),
        name: "User",
        comment: newComment,
        isApproved: false,
      },
    ]);
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold">Comments</h3>
      <ul>
        {comments.map((c) => (
          <li key={c._id} className="border-b p-2">
            <p>
              <strong>{c.name}</strong>: {c.comment}
            </p>
            {!c.isApproved && (
              <span className="text-yellow-500">Pending approval</span>
            )}
          </li>
        ))}
      </ul>
      <textarea
        placeholder="Write a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="border w-full p-2 mt-3"
      />
      <button
        onClick={handleAddComment}
        className="bg-blue-500 text-white px-3 py-1 mt-2"
      >
        Add Comment
      </button>
    </div>
  );
};

export default CommentSection;
