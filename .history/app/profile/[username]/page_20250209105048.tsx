"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadCloud } from "lucide-react";

async function fetchUse(username: string) {
  await new Promise((res) => setTimeout(res, 500));
  return {
    username,
    name: "John Doe",
    bio: "Passionate developer and tech enthusiast",
    avatar: "",
    followers: 1200,
    following: 450,
    posts: [
      {
        id: "1",
        title: "Hiking the Rocky Mountains",
        content:
          "This was an amazing experience it was all fun making this project and i am loving it i can even type really fast",
        votes: 12,
        mediaUrl: "/provincial-archives-of-alberta-u740lqjepOM-unsplash.jpg",
        mediaType: "image",
        category: "Entrepreneurship",
        comments: [],
      },
      {
        id: "2",
        title: "Lion encounter in Africa",
        content: "Saw a lion up close in the wild",
        votes: 12,
        mediaUrl: "/feed4.jpg",
        mediaType: "image",
        category: "Technology",
        comments: [],
      },
    ],
  };
}

const ProfilePage = () => {
  const { username } = useParams();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  return (
    <section>
      <div>
        <Image />
      </div>
    </section>
  );
};

export default ProfilePage;
