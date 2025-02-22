"use client";

import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { Skeleton } from "./ui/skeleton";
import { getAllPosts } from "@/services/post";

interface Post {
  id: string;
  title: string;
  content: string;
  votes: number;
  media: string;
  category?: string;
  comments?: [];
}

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await getAllPosts();
        setPosts(data);
      } catch (error) {
        console.error("Fetch error", error);
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
      ) : posts.length === 0 ? (
        <p>No posts found</p>
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </section>
  );
};

export default Feed;
