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
  userVote: string | null;
}

const Vote = ({ postId, votesCount, userVote }: VoteProps) => {
  const [voteCount, setVoteCount] = useState(votesCount);
  const [voteStatus, setVoteStatus] = useState(
    localStorage.getItem(`voteStatus-${postId}`) || userVote
  );
  const router = useRouter();

  const handleVote = async (type: string | null) => {
    try {
      const newVoteStatus = type === voteStatus ? null : type;
      const res =
        type === "upvotes"
          ? await upvotePost(postId)
          : await downvotePost(postId);
      console.log(res);
      setVoteCount(res.votesCount);
      setVoteStatus(newVoteStatus);

      localStorage.setItem(`voteStatus-${postId}`, newVoteStatus!);
    } catch (error) {
      console.error("Voting error", error);
    }
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <Button
        className={`${
          voteStatus === "upvotes" && "bg-green-600 hover:bg-green-700"
        } `}
        variant="outline"
        size="sm"
        onClick={() => handleVote("upvotes")}
      >
        <ArrowBigUp
          className={`${
            voteStatus === "upvotes" && "text-white"
          } min-h-6 min-w-6`}
        />
      </Button>
      <span>{voteCount}</span>
      <Button
        className={`${
          voteStatus === "downvotes" && "bg-red-600 hover:bg-red-700"
        }`}
        variant="outline"
        size="sm"
        onClick={() => handleVote("downvotes")}
      >
        <ArrowBigDown
          className={`${
            voteStatus === "downvotes" && "text-white"
          } min-h-6 min-w-6`}
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
