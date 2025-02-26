/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import UserAvatar from "./UserAvatar";
import { Textarea } from "@/components/ui/textarea";
import RepliesList from "./RepliesList";
import { addReply, getComment } from "@/services/comment";
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

const CommentList = ({ comments, postId, setComments }: CommentProps) => {
  const [showReply, setShowReply] = useState<string | null>(null);

  const toggleShowReply = (commentId: string) => {
    setShowReply((prev) => (prev === commentId ? null : commentId));
  };
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});

  const handleAddReply = async (parentCommentId: string) => {
    if (!replyText[parentCommentId]?.trim()) return;

    await addReply(parentCommentId, replyText[parentCommentId]);

    const response = await getComment(postId as string);

    setComments(response);

    setReplyText((prev) => ({ ...prev, [parentCommentId]: "" }));
  };

  if (!Array.isArray(comments)) {
    console.log("Comment is not array", comments);
    return <p>No comments available</p>;
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

            {showReply && (
              <div className="mt-2 flex items-center gap-2 mb-5">
                <Textarea
                  placeholder="reply..."
                  value={replyText[comment._id] || ""}
                  onChange={(e) =>
                    setReplyText((prev) => ({
                      ...prev,
                      [comment._id]: e.target.value,
                    }))
                  }
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
