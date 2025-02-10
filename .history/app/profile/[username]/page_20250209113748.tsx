/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { UploadCloud } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

async function fetchUser(username: string) {
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await fetchUser(username as string);
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user", error);
      }
    }
    loadUser();
  }, [username]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };
  return (
    <section className="mt-20">
      {loading ? (
        <Skeleton className="w-full h-60 rounded-lg" />
      ) : (
        <>
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 rounded-full">
              <Image
                src={selectedImage || user.avatar || "/profile.svg"}
                alt="Profile picture"
                width={100}
                height={100}
                className="rounded-full object-cover border"
              />
              <label
                htmlFor="upload-avatar"
                className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md cursor-pointer"
              >
                <UploadCloud className="w-5 h-5 text-gray-600" />
              </label>

              <Input
                type="file"
                id="upload-avatar"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>

            <div>
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <p text-gray-500>@{username}</p>
              <p className="mt-1 text-gray-600">{user.bio}</p>
              <div className="mt-2 flex gap-4 text-gray-700">
                <span>{user.followers}Followers</span>
                <span>{user.following}Following</span>
              </div>
            </div>
          </div>

          <h3 className="mt-6 text-xl font-semibold">Posts</h3>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {user.posts.length > 0 ? (
              user.posts.map((post: any) => (
                <div key={post.id} className="relative aspect-square">
                  {" "}
                  <Image
                    src={post.image}
                    alt="Post"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              ))
            ) : (
              <p>No posts yet.</p>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default ProfilePage;
