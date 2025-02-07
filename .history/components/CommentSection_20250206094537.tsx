"use client";

import { useState } from "react";
import { MessageSquare, SendHorizonal } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardContent } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Textarea } from "./ui/textarea";

interface CommentType {
  id: number;
  text: string;
  author: string;
  avatar: string;
  replies?: CommentType[];
}

const intialComments: CommentType[] = [
  {
    id: 1,
    author: "Issa Muiz",
    text: "This is an awesome post",
    avatar: "/Issa muiz pic.jpg",
    replies: [
      {
        id: 2,
        author: "John Doe",
        text: "I totally agree with this",
        avatar: "/Issa muiz pic.jpg",
      },
    ],
  },
];

const CommentSection = () => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<CommentType[]>(intialComments);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    setComments((prev) => [
      ...prev,
      {
        id: Date.now(),
        author: "You",
        text: newComment,
        avatar: "/avatar/default.png",
        replies: [],
      },
    ]);
    setNewComment("");
  };

  const handleAddReply = (parentId: number) => {
    if (!replyText.trim()) return;
    setComments(
      comments.map((comment) =>
        comment.id === parentId
          ? {
              ...comment,
              replies: [
                ...(comment.replies || []),
                {
                  id: Date.now(),
                  text: replyText,
                  author: "You",
                  avatar: "/avatars/default.png",
                },
              ],
            }
          : comment
      )
    );

    setReplyingTo(null);
    setReplyText("");
  };
  return (
    <div className="p-4">
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => setShowComments(!showComments)}
      >
        <MessageSquare className="w-4 h-4" />
        {showComments ? "Hide Comments" : "Show Comments"}
      </Button>

      {showComments && (
        <Card className="mt-4 w-full max-w-lg">
          <CardHeader>
            <h3 className="text-lg font-semibold">Comments</h3>
          </CardHeader>
          <CardContent>
            <div className="flex mb-4 space-y-3">
              <Avatar>
                <AvatarImage src="/avatars/default.png" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Textarea
                placeholder="Write a comments...."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleAddComment}>
                <SendHorizonal className="w-4 h-4" />
              </Button>
            </div>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="border-b pb-2">
                  <Comment
                    comment={comment}
                    onReply={() => setReplyingTo(comment.id)}
                    replyingTo={replyingTo}
                    setReplyText={setReplyText}
                    replyText={replyText}
                    handleAddReply={handleAddReply}
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments yet</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );

  function Comment({
    comment,
    onReply,
    replyingTo,
    setReplyText,
    replyText,
    handleAddReply,
  }: {
    comment: CommentType;
    onReply: () => void;
    replyingTo: number | null;
    setReplyText: (text: string) => void;
    replyText: string;
    handleAddReply: (parentId: number) => void;
  }) {
    return (
      <div className="p-3 border rounded-md bg-gray-100">
        <div className="flex items-center gap-2 mb-2">
          {" "}
          <Avatar>
            <AvatarImage src={comment.avatar} />
            <AvatarFallback>{comment.author[0]}</AvatarFallback>
          </Avatar>
          <span className="font-semibold">{comment.author}</span>
        </div>
        <p className="text-sm text-gray-700">{comment.text}</p>
        <button
          className="text-blue-600 text-xs mt-2 hover:underline"
          onClick={onReply}
        >
          Reply
        </button>

        {replyingTo === comment.id && (
          <div className="mt-2 flex gap-2">
            <Textarea
              placeholder="reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <Button onClick={() => handleAddReply(comment.id)}>Reply</Button>
          </div>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-2 pl-6 border-l-2 border-gray-300">
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
        )}
      </div>
    );
  }
};

export default CommentSection;
