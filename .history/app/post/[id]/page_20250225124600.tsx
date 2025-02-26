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
import { addComment, getComment } from "@/services/comment";

export interface CommentType {
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

interface PostProps {
  _id: string;
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

const PostPage = () => {
  const [post, setPost] = useState<PostProps | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentText, SetCommentText] = useState("");

  const formattedDate = new Date(post?.createdAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  useEffect(() => {
    if (id) {
      fetchPost();
      fetchComments();
    }
  }, [id]);

  const fetchPost = async () => {
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
  };

  const fetchComments = async () => {
    try {
      const response = await getComment(id as string);
      console.log("Comment response:", response);

      if (Array.isArray(response)) {
        setComments(response);
      } else {
        console.error("Fetched comments is not array:", response);
        setComments([]);
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const response = await addComment(id as string, commentText);

    console.log("New comment", response?.data.newComment);
    setComments(response?.data.newComment);
    SetCommentText("");
  };

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
                <span>{formattedDate}</span>
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
          <Vote
            postId={post?._id}
            votesCount={post?.votesCount}
            userVote={post?.userVote}
          />
        </CardFooter>
        <div className="flex mb-4 p-2 items-center space-y-3 space-x-2">
          <UserAvatar username={post?._id} />
          <Textarea
            placeholder="Write a comments...."
            value={commentText}
            onChange={(e) => SetCommentText(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleAddComment}>
            <SendHorizonal className="w-4 h-4" />
          </Button>
        </div>

        <CommentList
          comments={comments}
          postId={id as string}
          setComments={setComments}
        />
      </Card>
    </div>
  );
};

export default PostPage;
