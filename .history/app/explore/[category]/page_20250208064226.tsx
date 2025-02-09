"use client";

import PostCard from "@/components/PostCard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Post {
  id: string;
  title: string;
  content: string;
  votes: number;
  mediaUrl?: string;
  mediaType: "image" | "video";
}

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (category) {
      async function fetchPost() {
        const res = await fetch(`/api/posts/${category}`);
        const data = await res.json();
        setPosts(data);
      }
      fetchPost();
    }
  }, [category]);

  if (!category) return <div>Loading...</div>;
  return (
    <section className="space-y-6 mt-20">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
}
