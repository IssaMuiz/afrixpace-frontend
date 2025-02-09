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
}

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPost() {
      const res = await fetch("http://localhost:3000/api/posts");
      const data = await res.json();
      setPosts(data);
    }
    fetchPost();
  }, []);
  return (
    <section className="space-y-6 mt-20">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
};

export default Feed;
