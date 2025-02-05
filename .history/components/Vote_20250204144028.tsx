"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowBigDown, ArrowBigUp, MessageCircle } from "lucide-react";
import { ShareIcon } from "lucide-react";

interface VoteProps {
  postId: string;
  votes: number;
}

const Vote = ({ postId, votes }: VoteProps) => {
  const [voteCount, setVoteCount] = useState(votes);
  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);

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
        <ArrowBigUp size={100} className="h-20 w-12 hover:text-white" />
      </Button>
      <span>{voteCount}</span>
      <Button
        className={`${downvote && "bg-red-600 hover:bg-red-700"}`}
        variant="outline"
        size="sm"
        onClick={toggleDownvote}
      >
        <ArrowBigDown />
      </Button>
      <Button className="ml-5" size="sm" variant="outline">
        <MessageCircle />
      </Button>
      <Button className="ml-5" size="sm" variant="outline">
        <ShareIcon />
      </Button>
    </div>
  );
};

export default Vote;
