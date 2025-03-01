/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import UserAvatar from "./UserAvatar";
import { Textarea } from "@/components/ui/textarea";
import RepliesList from "./RepliesList";
import { addReply } from "@/services/comment";
import { useState } from "react";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";

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
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
}
const CommentList = ({ comments, setComments, postId }: CommentProps) => {
  const [showReply, setShowReply] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});

  const [voteCount, setVoteCount] = useState(0);
  const [voteStatus, setVoteStatus] = useState(
    localStorage.getItem(`voteStatus-${postId}`)
  );

  const handleVote = async (type: string | undefined) => {
    try {
      const newVoteStatus = type === voteStatus ? null : type;

      localStorage.setItem(`voteStatus-${postId}`, newVoteStatus!);
    } catch (error) {
      console.error("Voting error", error);
    }
  };
  const toggleShowReply = (commentId: string) => {
    setShowReply((prev) => (prev === commentId ? null : commentId));
  };
  const handleAddReply = async (parentCommentId: string) => {
    if (!replyText[parentCommentId]?.trim()) return;

    try {
      console.log("Replying to", parentCommentId);
      console.log("Post id", postId);
      const response = await addReply(postId, {
        content: replyText[parentCommentId],
        parentCommentId,
      });

      setComments((prev: CommentType[]): CommentType[] =>
        prev.map((comment) =>
          comment?._id === parentCommentId
            ? { ...comment, replies: [...comment.replies, response] }
            : comment
        )
      );

      setReplyText((prev) => ({ ...prev, [parentCommentId]: "" }));
    } catch (error) {
      console.error("Error adding reply", error);
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
            <div className="flex gap-2 items-center">
              <button
                type="button"
                className="text-blue-600 text-xs mt-2 hover:underline"
                onClick={() => toggleShowReply(comment._id)}
              >
                Reply
              </button>
              <Button
                className={`${
                  voteStatus === "upvotes" && "bg-green-600 hover:bg-green-700"
                } `}
                variant="outline"
                onClick={() => handleVote("upvotes")}
              >
                <ArrowBigUp
                  className={`${
                    voteStatus === "upvotes" && "text-white"
                  } min-h-6 min-w-6`}
                />
              </Button>
              <span>{voteCount}</span>
              <Button
                className={`${
                  voteStatus === "downvotes" && "bg-red-600 hover:bg-red-700"
                }`}
                variant="outline"
                size="sm"
                onClick={() => handleVote("downvotes")}
              >
                <ArrowBigDown
                  className={`${
                    voteStatus === "downvotes" && "text-white"
                  } min-h-6 min-w-6`}
                />
              </Button>
            </div>

            {showReply === comment._id && (
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
