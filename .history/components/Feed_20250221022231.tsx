"use client";

import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { Skeleton } from "./ui/skeleton";
import { getAllPosts } from "@/services/post";
interface PostProps {
  _id: string;
  user: string;
  title: string;
  content: string;
  media: {
    url: string;
    mediaType: "image" | "video";
    publicId: string;
  };
  category?: string;
  upvotes: string;
  downvotes: string;
  votesCount: number;
  comments: string;
  commentCount: number;
}

const Feed = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await getAllPosts();
        console.log(data);
        setPosts(Array.isArray(data.posts) ? data.posts : []);
      } catch (error) {
        console.error("Fetch error", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, []);
  return (
    <section className="space-y-6 mt-20">
      {loading ? (
        <Skeleton className="w-full h-40 mb-4" />
      ) : Array.isArray(posts) && posts.length === 0 ? (
        <p>No posts found</p>
      ) : (
        posts.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </section>
  );
};

export default Feed;
