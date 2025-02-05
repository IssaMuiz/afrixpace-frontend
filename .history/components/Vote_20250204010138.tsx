"use client";

import { useState } from "react";
import { Button } from "./ui/button";

interface VoteProps {
  postId: string;
  votes: number;
}

const Vote = ({ postId, votes }: VoteProps) => {
  const [count, setCount] = useState(votes);

  return (
    <div className="flex items-center gap-2 mt-2">
      <Button variant="outline" onClick={() => setCount((prev) => prev + 1)}>
        up
      </Button>
      <span>{count}</span>
      <Button variant="outline" onClick={() => setCount((prev) => prev - 1)}>
        down
      </Button>
    </div>
  );
};

export default Vote;
