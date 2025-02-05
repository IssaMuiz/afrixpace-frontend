import { NextResponse } from "next/server";

export async function GET() {
  const posts = [
    {
      id: 1,
      title: "Hiking the Rocky Mountains",
      content: "This was an amazing experience",
      votes: 12,
      mediaUrl: "https//source.unsplash.com/800x600/?mountains",
      mediaType: "image",
    },
    {
      id: 2,
      title: "Lion encounter in Africa",
      content: "Saw a lion up close in the wild",
      votes: 12,
      mediaUrl: "https//source.unsplash.com/800x600/?lion",
      mediaType: "image",
    },
    {
      id: 1,
      title: "Hiking the Rocky Mountains",
      content: "This was an amazing experience",
      votes: 12,
      mediaUrl: "https//source.unsplash.com/800x600/?mountains",
      mediaType: "image",
    },
  ];
  return NextResponse.json(posts);
}
