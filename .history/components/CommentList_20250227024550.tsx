/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import UserAvatar from "./UserAvatar";
import { Textarea } from "@/components/ui/textarea";
import RepliesList from "./RepliesList";
import { addReply } from "@/services/comment";
import { useState } from "react";

interface CommentType {
  _id: string;
  userId: {
    _id: string;
    username: string;
  };
  postId: string;
  content: string;
  replies: any[];
  parentComment?: string;
}

interface CommentProps {
  comments?: CommentType[];
  postId: string;
  setComments: (comment: CommentType[]) => void;
}

const CommentList = ({ comments }: CommentProps) => {
  const [showReply, setShowReply] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const toggleShowReply = (commentId: string) => {
    setShowReply((prev) => (prev === commentId ? null : commentId));
  };

  const handleAddReply = async (parentCommentId: string) => {
    if (!replyText.trim()) return;
    const response = await addReply(parentCommentId, replyText);

    if (response) {
      setReplyText("");
      setShowReply(null);
    }
  };

  if (!Array.isArray(comments)) {
    console.log("Comment is not array", comments);
    return <p>No comments yet</p>;
  }
  return (
    <div className="p-3 border rounded-md bg-white">
      {comments?.length === 0 ? (
        <p>No comments yet</p>
      ) : (
        comments.map((comment) => (
          <div key={comment._id}>
            <div className="flex items-center gap-2 mb-2">
              <UserAvatar username={comment.userId.username} />
              <span className="font-semibold">{comment.userId.username}</span>
            </div>
            <p className="text-sm text-gray-700">{comment.content}</p>
            <button
              type="button"
              className="text-blue-600 text-xs mt-2 hover:underline"
              onClick={() => toggleShowReply(comment._id)}
            >
              Reply
            </button>

            {showReply === comment._id && (
              <div className="mt-2 flex items-center gap-2 mb-5">
                <Textarea
                  placeholder="reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <Button onClick={() => handleAddReply(comment._id)}>
                  Reply
                </Button>
              </div>
            )}

            <RepliesList replies={comment.replies} />
          </div>
        ))
      )}
    </div>
  );
};

export default CommentList;
