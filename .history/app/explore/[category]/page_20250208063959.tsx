"use client";

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

  return (
    <div className="mt-20">
      <h1 className="text-2xl font-bold">{uppperCategory} Page</h1>
      <p>Displaying post related to {uppperCategory}</p>
    </div>
  );
}
