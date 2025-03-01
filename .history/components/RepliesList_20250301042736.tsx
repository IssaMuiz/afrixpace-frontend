import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { Button } from "./ui/button";
import UserAvatar from "./UserAvatar";
import { useState } from "react";
import { Textarea } from "./ui/textarea";

interface Reply {
  _id: string;
  content: string;
  userId: {
    username: string;
    _id: string;
  };
}

interface ReplyType {
  replies?: Reply[];
}
const RepliesList = ({ replies }: ReplyType) => {
  const [showReply, setShowReply] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});

  const [voteCount, setVoteCount] = useState(0);
  const [voteStatus, setVoteStatus] = useState();

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
      setReplyText((prev) => ({ ...prev, [parentCommentId]: "" }));
    } catch (error) {
      console.error("Error adding reply", error);
    }
  };
  return (
    <div>
      {replies && replies.length > 0 && (
        <div className="space-y-3 my-3 pl-6 border-l-2 bg-white border-gray-300 ml-8">
          {replies.map((reply) => (
            <div
              key={reply._id}
              className="flex items-center gap-3 p-2 border-b"
            >
              {showReply === reply._id && (
                <div className="mt-2 flex items-center gap-2 mb-5">
                  <Textarea
                    placeholder="reply..."
                    value={replyText[reply._id] || ""}
                    onChange={(e) =>
                      setReplyText((prev) => ({
                        ...prev,
                        [reply._id]: e.target.value,
                      }))
                    }
                  />
                  <Button onClick={() => handleAddReply(reply._id)}>
                    Reply
                  </Button>
                </div>
              )}
              <div>
                <UserAvatar username={reply.userId.username} />
                <div className="flex flex-col ">
                  <span className="font-semibold">{reply.userId.username}</span>
                  <p className="text-xs">{reply.content}</p>
                  <div className="flex gap-2 items-center mt-2">
                    <div className="flex gap-2 items-center">
                      <Button
                        className={`${
                          voteStatus === "upvotes" &&
                          "bg-green-600 hover:bg-green-700 "
                        } h-5 w-5`}
                        variant="outline"
                        onClick={() => handleVote("upvotes")}
                      >
                        <ArrowBigUp
                          className={`${
                            voteStatus === "upvotes" && "text-white"
                          } min-h-3 min-w-3`}
                        />
                      </Button>
                      <span className="text-sm">{voteCount}</span>
                      <Button
                        className={`${
                          voteStatus === "downvotes" &&
                          "bg-red-600 hover:bg-red-700"
                        } h-5 w-5`}
                        variant="outline"
                        onClick={() => handleVote("downvotes")}
                      >
                        <ArrowBigDown
                          className={`${
                            voteStatus === "downvotes" && "text-white"
                          } min-h-3 min-w-3`}
                        />
                      </Button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="text-blue-600 text-xs hover:underline h-5 w-5"
                        onClick={() => toggleShowReply(reply._id)}
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RepliesList;
