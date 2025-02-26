import { Button } from "@/components/ui/button";
import UserAvatar from "./UserAvatar";
import { Textarea } from "@/components/ui/textarea";
import RepliesList from "./RepliesList";

interface CommentType {
  _id: string;
  content: string;
  user: string;
  replies?: CommentType[];
}
const CommentList = ({
  comment,
  onReply,
  replyingTo,
  setReplyText,
  replyText,
  handleAddReply,
}: {
  comment: CommentType;
  onReply: () => void;
  replyingTo: string | null;
  setReplyText: (text: string) => void;
  replyText: string;
  handleAddReply: (parentId: string) => void;
}) => {
  const handleAddReply = async (parentCommentId: string) => {
    if (!replyText[parentCommentId]?.trim()) return;

    await addReply(parentCommentId, replyText[parentCommentId]);

    const response = await getComment(post?._id as string);

    setComments(response.data);

    setReplyText((prev) => ({ ...prev, [parentCommentId]: "" }));
  };
  return (
    <div className="p-3 border rounded-md bg-white">
      <div className="flex items-center gap-2 mb-2">
        <UserAvatar username={comment.user.username} />
        <span className="font-semibold">{comment.user.username}</span>
      </div>
      <p className="text-sm text-gray-700">{comment.content}</p>
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
