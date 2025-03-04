/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import UserAvatar from "./UserAvatar";
import { Textarea } from "@/components/ui/textarea";
import RepliesList from "./RepliesList";
import { addReply, getComment } from "@/services/comment";
import { useState } from "react";

interface CommentType {
  _id: string;
  user: {
    _id: string;
    username: string;
  };
  postId: string;
  content: string;
  replies: any[];
  parentComment?: string;
}

interface CommentProps {
  comment: CommentType[];
  postId: string;
  setComment: (comment: CommentType[]) => void;
}

const CommentList = ({ comment }: CommentProps) => {
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});

  const handleAddReply = async (parentCommentId: string) => {
    if (!replyText[parentCommentId]?.trim()) return;

    await addReply(parentCommentId, replyText[parentCommentId]);

    const response = await getComment(postId as string);

    setComment(response);

    setReplyText((prev) => ({ ...prev, [parentCommentId]: "" }));
  };
  return (
    <div className="p-3 border rounded-md bg-white">
      <div className="flex items-center gap-2 mb-2">
        <UserAvatar username={comment.userId} />
        <span className="font-semibold">{comment.userId}</span>
      </div>
      <p className="text-sm text-gray-700">{comment._id}</p>
      <button
        type="button"
        className="text-blue-600 text-xs mt-2 hover:underline"
        onClick={() => handleAddReply(comment._id)}
      >
        Reply
      </button>

      <div className="mt-2 flex items-center gap-2 mb-5">
        <Textarea
          placeholder="reply..."
          value={replyText[comment._id] || ""}
          onChange={(e) =>
            setReplyText((prev) => ({ ...prev, [comment._id]: e.target.value }))
          }
        />
        <Button onClick={() => handleAddReply(comment._id)}>Reply</Button>
      </div>

      <RepliesList replies={comment.replies} />
    </div>
  );
};

export default CommentList;
