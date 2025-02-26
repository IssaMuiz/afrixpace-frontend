/* eslint-disable @typescript-eslint/no-explicit-any */
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
import CommentList from "@/components/CommentList";
import { getAllPosts } from "@/services/post";

interface CommentType {
  id: string;
  text: string;
  author: string;
  replies?: CommentType[];
}

interface PostProps {
  id: string;
  title: string;
  user: {
    _id: string;
    username: string;
  };
  content: string;
  media: { url: string; mediaType: string };
  upvotes: string[];
  downvotes: string[];
  userVote: string;
  votesCount: number;
  createdAt: string;
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
        const res = await getAllPosts();

        console.log(res.data);
        const foundPost = res.data.find((p: any) => p._id.toString() === id);
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
    <div className="mt-20 pb-10 bg-white">
      <Card className="p-1 bg-white cursor-pointer">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center mb-3">
              <Image
                src="https://img.icons8.com/color/48/circled-user-male-skin-type-7--v1.png"
                alt="user profile"
                height={50}
                width={50}
                className="rounded-full"
              />
              <div className="flex flex-col text-sm">
                <span className="font-semibold">{post?.user.username}</span>
                <span>{post?.createdAt}</span>
              </div>
            </div>
            <span className="text-blue-500 hover:underline text-sm font-semibold">
              Follow
            </span>
          </div>
          <CardTitle>{post?.title}</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="mb-4">{post?.content}</p>

          {post?.media.url && (
            <Image
              src={post?.media.url}
              alt={post.title}
              height={400}
              width={800}
              className="rounded-lg w-full max-h-[400px] object-cover"
            />
          )}

          {post?.media.url && post?.media.mediaType === "video" && (
            <video controls className="rounded-lg w-full max-h-[400px]">
              <source src={post?.media.url} type="video/mp4" /> Your browser
              does not support the video tag
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
              <CommentList
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
};

export default PostPage;
