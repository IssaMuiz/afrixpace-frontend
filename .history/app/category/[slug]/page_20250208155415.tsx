/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import PostCard from "@/components/PostCard";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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

export default function CategoryPage() {
  const params = useParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const category = params?.slug;

  useEffect(() => {
    if (!category) return;

    if (category) {
      async function fetchPost() {
        try {
          console.log("Fetching post for category", category);
          const res = await fetch(`/api/posts?category=${category}`);
          const data = await res.json();
          setPosts(data);
        } catch (error) {
          console.error("Error fetching category post", error);
        }
      }
      fetchPost();
    }
  }, [category]);

  if (!category) return <div>Loading...</div>;
  return (
    <section className="space-y-6 mt-20">
      <div className="h-20 w-full bg-white p-3 border border-gray-100 rounded-md">
        <h1 className="font-semibold text-lg">{category}</h1>
      </div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
}
