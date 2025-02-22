import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import Image from "next/image";
import { PlusIcon } from "@heroicons/react/24/outline";
import { createPost } from "@/services/post";
import { useRouter } from "next/navigation";

const CreatePostModal = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileType = file.type.split("/")[0];

    if (fileType !== "image" && fileType !== "video") {
      setError("Only images and videos are allowed");
      return;
    }

    setMedia(file);
    setError("");

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required");
      return;
    }

    const res = createPost(title, content, category, media);

    console.log(res);

    router.push("/");

    setTitle("");
    setContent("");
    setCategory("");
    setMedia(null);
    setPreview(null);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="relative hover:bg-gray-300 rounded-full cursor-pointer border-none shadow-none p-1 group"
          variant="outline"
        >
          <PlusIcon className="min-h-7 min-w-7" />
          <span className="absolute left-1/2 -translate-x-1/2 top-12 px-2 py-1 text-sm text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-transform pointer-events-none text-nowrap">
            Create Post
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm h-[550px] xl:max-w-2xl xl:h-[600px] p-6 rounded-lg bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg text-center font-semibold">
            Create a Post
          </DialogTitle>
        </DialogHeader>
        {error && <p className="text-red-500 text-sm mb-1">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5 p-2">
          <Input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className=" py-5"
          />

          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer relative w-full items-center flex gap-2">
              {/* <Input
                type=""
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="py-5 w-full"
              /> */}
              <Button variant="outline">Category</Button>
              <ArrowDown size="20" className="absolute right-2 text-gray-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              <DropdownMenuItem>Entrepreneur</DropdownMenuItem>
              <DropdownMenuItem>Technology</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Textarea
            placeholder="Write something...."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
          />

          <Input
            type="file"
            accept="image/*, video/*"
            onChange={handleMediaChange}
          />

          {preview && (
            <div className="relative w-full mt-2">
              {media?.type.startsWith("image") ? (
                <div className="h-32 w-32 relative">
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="rounded object-cover"
                  />
                </div>
              ) : (
                <video src={preview} controls className="h-32 w-32 rounded" />
              )}
            </div>
          )}
          <Button type="submit" className="w-full">
            Post
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
