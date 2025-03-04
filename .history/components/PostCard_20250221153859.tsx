import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Vote from "./Vote";
import { useState } from "react";

interface PostCardProp {
  _id: string;
  title: string;
  content: string;
  media: { url: string; mediaType: string };
  upvote: string[];
  downvote: string[];
}

const PostCard = ({
  post,

  onVoteUpdate,
}: {
  post: PostCardProp;
  onVoteUpdate: (
    postId: string,
    updatedVotes: { upvotes: string[]; downvotes: string[] }
  ) => void;
}) => {
  const [upvotes, setUpvotes] = useState<string[]>(post.upvote);
  const [downvotes, setDownvotes] = useState<string[]>(post.downvote);

  const handleUpvoteUpdate = (updatedVotes: {
    upvotes: string[];
    downvotes: string[];
  }) => {
    setUpvotes(updatedVotes.upvotes);
    setDownvotes(updatedVotes.downvotes);
    onVoteUpdate(post._id, updatedVotes);
  };
  return (
    <Card className="hover:bg-gray-50 cursor-pointer">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center mb-3">
            <Image
              src="https://img.icons8.com/?size=100&id=kDoeg22e5jUY&format=png&color=000000"
              alt="profile image"
              height={50}
              width={50}
              className="rounded-full"
            />
            <div className="flex flex-col text-sm">
              <span className="font-semibold">Username</span> <span>Feb 3</span>
            </div>
          </div>
          <span className="text-blue-500 hover:underline text-sm font-semibold">
            Follow
          </span>
        </div>

        <CardTitle>{post.title}</CardTitle>
      </CardHeader>

      <CardContent className="mb-4">
        <p className="mb-4">{post.content}</p>

        {post.media.url &&
          (post.media.mediaType === "image" ? (
            <Image
              src={post.media.url}
              alt="Post media"
              height={400}
              width={800}
              className="rounded-lg w-full max-h-[400px] object-cover"
            />
          ) : (
            <video
              controls
              className="rounded-lg w-full max-h-[400px] object-cover"
            >
              {" "}
              <source src={post.media.url} type="video/mp4" />
              Your browser does not support the video tag
            </video>
          ))}
      </CardContent>
      <CardFooter className="flex space-x-4 items-center">
        <Vote
          postId={post._id}
          upvotes={upvotes}
          downvotes={downvotes}
          onUpdate={handleUpvoteUpdate}
        />
      </CardFooter>
    </Card>
  );
};

export default PostCard;
