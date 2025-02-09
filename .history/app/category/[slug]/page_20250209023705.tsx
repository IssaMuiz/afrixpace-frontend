/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import PostCard from "@/components/PostCard";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { categoryImageHeader } from "@/constant";

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

  const imageCategory = categoryImageHeader[category];

  useEffect(() => {
    if (!category) return;

    if (category) {
      async function fetchPost() {
        try {
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
      <div className=" w-full flex gap-3 items-center bg-white p-3 border border-gray-100 rounded-md">
        <Image
          src={imageCategory}
          alt="image category"
          height={130}
          width={130}
          className="rounded-sm"
        />
        <h1 className=" text-xl">{category}</h1>
      </div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
}
