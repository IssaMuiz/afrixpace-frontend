"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowBigDown, ArrowBigUp, MessageCircle } from "lucide-react";
import { ShareIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { upvotePost, downvotePost } from "@/services/post";

interface VoteProps {
  postId: string;
  votesCount: number;
}

const Vote = ({ postId, votesCount }: VoteProps) => {
  const [userVote, setUserVote] = useState<string | null>(null);

  const router = useRouter();

  const handleUpvote = async () => {
    try {
      const res = await upvotePost(postId);
      console.log(res);
      setUserVote("up");
    } catch (error) {
      console.error("Error upvoting", error);
    }
  };

  const handleDownVote = async () => {
    try {
      const res = await downvotePost(postId);
      console.log(res);
      setUserVote("down");
    } catch (error) {
      console.error("Error downvoting", error);
    }
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <Button
        className={`${userVote === "up" && "bg-green-600 hover:bg-green-700"} `}
        variant="outline"
        size="sm"
        onClick={handleUpvote}
      >
        <ArrowBigUp
          className={`${userVote === "up" && "text-white"} min-h-6 min-w-6`}
        />
      </Button>
      <span>{votesCount}</span>
      <Button
        className={`${userVote === "down" && "bg-red-600 hover:bg-red-700"}`}
        variant="outline"
        size="sm"
        onClick={handleDownVote}
      >
        <ArrowBigDown
          className={`${userVote === "dowm" && "text-white"} min-h-6 min-w-6`}
        />
      </Button>
      <Button
        className="ml-5"
        size="sm"
        variant="outline"
        onClick={() => router.push(`/post/${postId}`)}
      >
        <MessageCircle className="min-h-5 min-w-5" />
      </Button>
      <Button className="ml-5" size="sm" variant="outline">
        <ShareIcon className="min-h-4 min-w-4" />
      </Button>
    </div>
  );
};

export default Vote;
