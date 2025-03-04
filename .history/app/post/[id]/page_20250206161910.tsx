"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import Vote from "@/components/Vote";
import UserAvatar from "@/components/UserAvatar";

interface CommentType {
  id: string;
  text: string;
  author: string;
  replies?: CommentType[];
}

interface PostProps {
  id: string;
  title: string;
  content: string;
  votes: number;
  mediaUrl?: string;
  meidaType?: "image" | "video";
}

const intialComments: CommentType[] = [
  {
    id: "1",
    author: "Issa Muiz",
    text: "This is an awesome post",

    replies: [
      {
        id: "2",
        author: "John Doe",
        text: "I totally agree with this",
      },
    ],
  },
];

const PostPage = () => {
  const [post, setPost] = useState<PostProps | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<CommentType[]>(intialComments);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    setComments((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        author: "You",
        text: newComment,
        avatar: "/avatar/default.png",
        replies: [],
      },
    ]);
    setNewComment("");
  };

  const handleAddReply = (parentId: string) => {
    if (!replyText.trim()) return;
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === parentId
          ? {
              ...comment,
              replies: [
                ...(comment.replies || []),
                {
                  id: Date.now().toString(),
                  text: replyText,
                  author: "You",
                },
              ],
            }
          : comment
      )
    );

    setReplyingTo(null);
    setReplyText("");
  };

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch("/api/posts");
        const data: PostProps[] = await res.json();
        console.log(data);
        const foundPost = data.find((p) => p.id === id);
        console.log(foundPost);
        setPost(foundPost || null);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchPost();
    }
  }, [id]);

  if (loading) return <p className="mt-20">Loading...</p>;
  return (
    <div className="mt-20 pb-10">
      <Card className="p-1 bg-gray-50 cursor-pointer">
        <CardHeader>
          <CardTitle>{post?.title}</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="mb-4">{post?.content}</p>

          {post?.mediaUrl && (
            <Image
              src={post?.mediaUrl}
              alt={post.title}
              height={400}
              width={800}
              className="rounded-lg w-full max-h-[400px] object-cover"
            />
          )}

          {post?.mediaUrl && post?.meidaType === "video" && (
            <video controls className="rounded-lg w-full max-h-[400px]">
              <source src={post?.mediaUrl} type="video/mp4" /> Your browser does
              not support the video tag
            </video>
          )}
        </CardContent>
        <CardFooter className="w-full max-w-lg">
          <Vote postId={post?.id} votes={post?.votes} />
        </CardFooter>
        <div className="flex mb-4 p-2 items-center space-y-3 space-x-2">
          <UserAvatar username={post?.id} />
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
            <div key={comment.id} className=" p-2">
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
      </Card>
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
    replyingTo: string | null;
    setReplyText: (text: string) => void;
    replyText: string;
    handleAddReply: (parentId: string) => void;
  }) {
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

        {comment.replies && comment.replies.length > 0 && (
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
        )}
      </div>
    );
  }
};

export default PostPage;
