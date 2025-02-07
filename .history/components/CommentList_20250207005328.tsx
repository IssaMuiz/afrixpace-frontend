import { Button } from "@/components/ui/button";
import UserAvatar from "./UserAvatar";
import { Textarea } from "@/components/ui/textarea";

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

      {/* {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-3 mt-2 pl-6 border-l-2 border-gray-300">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              onReply={() => {}}
              replyingTo={null}
              setReplyText={() => {}}
              replyText=""
              handleAddReply={() => {}}
            />
          ))}
        </div>
      )} */}
    </div>
  );
};

export default CommentList;
