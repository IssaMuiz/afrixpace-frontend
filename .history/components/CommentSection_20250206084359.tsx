"use client";

import { useState } from "react";
import { MessageSquare, SendHorizonal } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardHeader, CardContent } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Textarea } from "./ui/textarea";

interface Comment {
  id: number;
  text: string;
  author: string;
  avatar: string;
  replies: CommentType[];
}

const intialComments: CommentType[] = [
  { id: 1, user: "Issa Muiz", text: "This is an awesome post" },
  { id: 2, user: "John Doe", text: "I totally agree with this" },
  { id: 3, user: "Jane Smith", text: "I totally disagree with this" },
];

const CommentSection = () => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    setComments((prev) => [
      ...prev,
      { id: prev.length + 1, user: "You", text: newComment },
    ]);
    setNewComment("");
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
            <div className="space-y-3">
              {" "}
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="border-b pb-2">
                    <p className="text-sm text-gray-600">{comment.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No comments yet</p>
              )}
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Input
                type="text"
                placeholder="Write a comments...."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1"
              />{" "}
              <Button onClick={handleAddComment}>
                <SendHorizonal className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CommentSection;
