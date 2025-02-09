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
    category?: string;
    comment?: [];
  };
}

const PostCard = ({ post }: PostProps) => {
  return (
    <Card className="p-1 hover:bg-gray-50 cursor-pointer">
      <CardHeader>
        <div className="flex gap-2 items-center mb-3">
          <Image
            src="https://img.icons8.com/color/48/circled-user-male-skin-type-7--v1.png"
            alt="user profile"
            height={50}
            width={50}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <span>Username</span> <span>Feb 3</span>
          </div>
        </div>

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
