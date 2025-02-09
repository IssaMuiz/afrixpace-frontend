import { NextResponse } from "next/server";

export async function GET() {
  const posts = [
    {
      id: "1",
      title: "Hiking the Rocky Mountains",
      content: "This was an amazing experience",

      image: "/politics-image.jpg",
      votes: 12,
      mediaUrl: "/provincial-archives-of-alberta-u740lqjepOM-unsplash.jpg",
      mediaType: "image",
      category: "politics",
      comments: [],
    },
    {
      id: "2",
      title: "Lion encounter in Africa",
      content: "Saw a lion up close in the wild",
      votes: 12,
      mediaUrl: "/feed4.jpg",
      mediaType: "image",
    },
    {
      id: "3",
      title: "Hiking the Rocky Mountains",
      content: "This was an amazing experience",
      votes: 12,
      mediaUrl: "/provincial-archives-of-alberta-u740lqjepOM-unsplash.jpg",
      mediaType: "image",
    },
  ];
  return NextResponse.json(posts);
}
