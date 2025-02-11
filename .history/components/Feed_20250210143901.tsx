"use client";

import { useEffect, useState } from "react";
import PostCard from "./PostCard";

interface Post {
  id: string;
  title: string;
  content: string;
  votes: number;
  mediaUrl?: string;
  mediaType: "image" | "video";
  category?: string;
  comments?: [];
}

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch("/api/posts");
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Fetch error", error);
      }
    }
    fetchPost();
  }, []);
  return (
    <section className="">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
};

export default Feed;
