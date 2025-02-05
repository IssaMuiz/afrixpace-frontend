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
  id: string;
  title: string;
  content: string;
  votes: number;
  mediaUrl?: string;
  meidaType?: "image" | "video";
}

const PostCard = ({
  id,
  title,
  content,
  votes,
  mediaUrl,
  meidaType,
}: PostProps) => {
  console.log({});
  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="mb-4">
        <p>{content}</p>
        {mediaUrl && meidaType === "image" && (
          <Image
            src={mediaUrl}
            alt="Post media"
            height={400}
            width={800}
            className="rounded-lg w-full max-h-[400px] object-cover"
          />
        )}
        {mediaUrl && meidaType === "video" && (
          <video controls className="rounded-lg w-full max-h-[400px]">
            <source src={mediaUrl} type="video/mp4" /> Your browser does not
            support the video tag
          </video>
        )}
      </CardContent>
      <CardFooter className="flex space-x-4 items-center">
        <Vote postId={id} votes={votes} />
      </CardFooter>
    </Card>
  );
};

export default PostCard;
