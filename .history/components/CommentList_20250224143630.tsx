import { Button } from "@/components/ui/button";
import UserAvatar from "./UserAvatar";
import { Textarea } from "@/components/ui/textarea";
import RepliesList from "./RepliesList";
import { addReply, getComment } from "@/services/comment";
import { useState } from "react";

export interface CommentType {
  _id: string;
  userId: string;
  postId: string;
  content: string;
  parentComment?: string;
}

const CommentList = ({
  comment,
  setComment,
  postId,
}: {
  comment: CommentType;
  setComment: (comment: CommentType) => void;
  postId: string;
}) => {
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
        <UserAvatar username={comment.user} />
        <span className="font-semibold">{comment.userId.username}</span>
      </div>
      <p className="text-sm text-gray-700">{comment._id}</p>
      <button
        type="button"
        className="text-blue-600 text-xs mt-2 hover:underline"
        onClick={onReply}
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
