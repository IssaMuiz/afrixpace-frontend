import { NextResponse } from "next/server";

const posts = [
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
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  if (category) {
    const filteredPost = posts.filter((post) => post.category === category);
    return NextResponse.json(filteredPost.length > 0 ? filteredPost : []);
  }
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const newPost = await req.json();
  newPost.id = String(posts.length + 1);

  newPost.votes = 0;
  newPost.comment = [];
  posts.push(newPost);
  return NextResponse.json(newPost, { status: 201 });
}
