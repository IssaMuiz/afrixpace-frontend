"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowBigDown, ArrowBigUp, MessageCircle } from "lucide-react";
import { ShareIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { upvotePost, downvotePost } from "@/services/post";

interface VoteProps {
  postId: string;
  initialVoteCount: number;
}

const Vote = ({ postId, initialVoteCount }: VoteProps) => {
  const;

  const handleUpvote = async () => {
    try {
      const data = await upvotePost(postId);
      console.log(data);
    } catch (error) {}
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <Button
        className={`${upvote && "bg-green-600 hover:bg-green-700"} `}
        variant="outline"
        size="sm"
        onClick={() => upvote(post._)}
      >
        <ArrowBigUp className={`${upvote && "text-white"} min-h-6 min-w-6`} />
      </Button>
      <span>{voteCount}</span>
      <Button
        className={`${downvote && "bg-red-600 hover:bg-red-700"}`}
        variant="outline"
        size="sm"
        onClick={toggleDownvote}
      >
        <ArrowBigDown
          className={`${downvote && "text-white"} min-h-6 min-w-6`}
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
