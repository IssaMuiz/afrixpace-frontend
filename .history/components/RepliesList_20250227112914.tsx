import UserAvatar from "./UserAvatar";

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
  return (
    <div>
      {replies && replies.length > 0 && (
        <div className="space-y-3 mt-2 pl-6 border-l-2 bg-white border-gray-300">
          {replies.map((reply) => (
            <div
              key={reply._id}
              className="flex items-center gap-3 p-2 border-b"
            >
              <UserAvatar username={reply.userId.username} />
              <p>{reply.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RepliesList;
