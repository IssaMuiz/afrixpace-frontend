import { Button } from "@/components/ui/button";
import UserAvatar from "./UserAvatar";
import { Textarea } from "@/components/ui/textarea";
import RepliesList from "./RepliesList";

interface CommentType {
  id: string;
  text: string;
  author: string;
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
  return (
    <div className="p-3 border rounded-md bg-gray-100">
      <div className="flex items-center gap-2 mb-2">
        <UserAvatar username={comment.author} />
        <span className="font-semibold">{comment.author}</span>
      </div>
      <p className="text-sm text-gray-700">{comment.text}</p>
      <button
        type="button"
        className="text-blue-600 text-xs mt-2 hover:underline"
        onClick={onReply}
      >
        Reply
      </button>

      {replyingTo === comment.id && (
        <div className="mt-2 flex items-center gap-2 mb-5">
          <Textarea
            placeholder="reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <Button onClick={() => handleAddReply(comment.id)}>Reply</Button>
        </div>
      )}

      <RepliesList replies={comment.replies} />
    </div>
  );
};

export default CommentList;
