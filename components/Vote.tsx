"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowBigDown, ArrowBigUp, MessageCircle } from "lucide-react";
import { ShareIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface VoteProps {
  postId: string | undefined;
  votes: number | undefined;
}

const Vote = ({ postId, votes }: VoteProps) => {
  const [voteCount, setVoteCount] = useState(votes);
  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);
  const router = useRouter();

  const toggleUpvote = () => {
    if (upvote) {
      setVoteCount((prev) => prev - 1);
      setUpvote(false);
    } else {
      setVoteCount((prev) => prev + (downvote ? 2 : 1));
      setUpvote(true);
      setDownvote(false);
    }
  };

  const toggleDownvote = () => {
    if (downvote) {
      setVoteCount((prev) => prev + 1);
      setDownvote(false);
    } else {
      setVoteCount((prev) => prev - (upvote ? 2 : 1));
      setDownvote(true);
      setUpvote(false);
    }
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <Button
        className={`${upvote && "bg-green-600 hover:bg-green-700"} `}
        variant="outline"
        size="sm"
        onClick={toggleUpvote}
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
