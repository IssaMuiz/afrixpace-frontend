"use client";

import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { Skeleton } from "./ui/skeleton";
import { getAllPosts } from "@/services/post";

interface Post {
  _id: string;
  title: string;
  content: string;
  media: { url: string; mediaType: string };
  upvotes: string[];
  downvotes: string[];
  voteCount: number;
}

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await getAllPosts();
        console.log(res);
        setPosts(Array.isArray(res.data) ? res.data : []);
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
