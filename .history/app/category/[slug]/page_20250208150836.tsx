/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import PostCard from "@/components/PostCard";
import { useEffect, useState } from "react";

interface Post {
  id: string;
  title: string;
  content: string;
  votes: number;
  mediaUrl?: string;
  mediaType: "image" | "video";
  category?: string;
  comments: [];
}

export default function CategoryPage({ params }: { params: any }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const category = params.slug;

  useEffect(() => {
    if (category) {
      async function fetchPost() {
        const res = await fetch(`/api/posts?category/${category}`);
        const data = await res.json();
        setPosts(data);
      }
      fetchPost();
    }
  }, [category]);

  if (!category) return <div>Loading...</div>;
  return (
    <section className="space-y-6 mt-20">
      <h1>This is a {category} page</h1>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
}
