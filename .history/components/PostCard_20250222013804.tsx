import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Vote from "./Vote";

interface PostCardProp {
  _id: string;
  title: string;
  user: {
    _id: string;
    username: string;
  };
  content: string;
  media: { url: string; mediaType: string };
  upvotes: string[];
  downvotes: string[];
  voteCount: number;
  createdAt: string;
}

const PostCard = ({ post }: { post: PostCardProp }) => {
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
              <span className="font-semibold">{post.user.username}</span>
              <span>{post.createdAt}</span>
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

        {post.media.url && (
          <Image
            src={post.media.url}
            alt="Post media"
            height={400}
            width={800}
            className="rounded-lg w-full max-h-[400px] object-cover"
          />
        )}
      </CardContent>
      <CardFooter className="flex space-x-4 items-center">
        <Vote postId={post._id} initialVoteCount={post.voteCount} />
      </CardFooter>
    </Card>
  );
};

export default PostCard;
