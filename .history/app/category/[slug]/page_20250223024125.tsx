"use client";
import PostCard from "@/components/PostCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { categoryImageHeader } from "@/constant";
import { getPostByCategories } from "@/services/post";
import { Skeleton } from "@/components/ui/skeleton";

interface Post {
  _id: string;
  title: string;
  user: {
    _id: string;
    username: string;
  };
  content: string;
  media: { url: string; mediaType: string };
  upvotes: string[];
  downvotes: string[];
  userVote: string;
  votesCount: number;
  createdAt: string;
}

export default function CategoryPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { slug } = router.query;

  const categoryParam = slug ? slug.toString() : "default";

  const imageCategory = categoryImageHeader[categoryParam];

  useEffect(() => {
    if (!slug) return;

    if (slug) {
      async function fetchPost(lastPostId = "") {
        try {
          setLoading(true);
          const res = await getPostByCategories(slug, lastPostId);

          setPosts((prev) => (lastPostId ? [...prev, ...res.data] : res.data));
          setLoading(false);
        } catch (error) {
          console.error("Error fetching category post", error);
        }
      }
      fetchPost();
    }
  }, [slug]);

  if (!slug) return <div>Loading...</div>;
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
        <h1 className=" text-xl">{slug}</h1>
      </div>
      <div className="space-y-6 mt-20">
        {loading ? (
          <Skeleton className="w-full h-40 mb-4" />
        ) : Array.isArray(posts) && posts.length === 0 ? (
          <p>No posts found</p>
        ) : (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        )}
      </div>
    </section>
  );
}
