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
}

const Feed = ({ userId, token }: { userId: string; token: string }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await getAllPosts(token);
        console.log(data);
        setPosts(Array.isArray(data.posts) ? data.posts : []);
      } catch (error) {
        console.error("Fetch error", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [token]);

  const handleVoteUpdate = (
    postId: string,
    updatedVotes: { upvotes: string[]; downvotes: string[] }
  ) => {
    setPosts((prev) =>
      prev.map((post) =>
        post._id === postId ? { ...post, ...updatedVotes } : post
      )
    );
  };

  return (
    <section className="space-y-6 mt-20">
      {loading ? (
        <Skeleton className="w-full h-40 mb-4" />
      ) : Array.isArray(posts) && posts.length === 0 ? (
        <p>No posts found</p>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            userId={userId}
            token={token}
            onVoteUpdate={handleVoteUpdate}
          />
        ))
      )}
    </section>
  );
};

export default Feed;
