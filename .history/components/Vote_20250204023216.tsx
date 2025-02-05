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
  const [count, setCount] = useState(votes);

  return (
    <div className="flex items-center gap-2 mt-2">
      <Button variant="outline" onClick={() => setCount((prev) => prev + 1)}>
        <ArrowBigUp />
      </Button>
      <span>{count}</span>
      <Button variant="outline" onClick={() => setCount((prev) => prev - 1)}>
        <ArrowBigDown />
      </Button>
      <Button className="ml-5" variant="outline">
        <MessageCircle />
      </Button>
      <Button className="ml-5" variant="outline">
        <ShareIcon />
      </Button>
    </div>
  );
};

export default Vote;
