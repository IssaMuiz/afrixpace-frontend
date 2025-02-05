import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import Vote from "./Vote";

interface PostProps {
  post: {
    id: string;
    title: string;
    content: string;
    votes: number;
    mediaUrl?: string;
    meidaType?: "image" | "video";
  };
}

const PostCard = ({ post }: PostProps) => {
  return (
    <Card className="p-1 hover:bg-gray-50 cursor-pointer">
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>

      <CardContent className="mb-4">
        <p className="mb-4">{post.content}</p>

        <Image
          src={post.mediaUrl}
          alt="Post media"
          height={400}
          width={800}
          className="rounded-lg w-full max-h-[400px] object-cover"
        />

        {post.mediaUrl && post.meidaType === "video" && (
          <video controls className="rounded-lg w-full max-h-[400px]">
            <source src={post.mediaUrl} type="video/mp4" /> Your browser does
            not support the video tag
          </video>
        )}
      </CardContent>
      <CardFooter className="flex space-x-4 items-center">
        <Vote postId={post.id} votes={post.votes} />
      </CardFooter>
    </Card>
  );
};

export default PostCard;
