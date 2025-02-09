import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { PlusCircle } from "lucide-react";

const CreatePostModal = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");

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

    const postData = {
      title,
      content,
      media,
    };

    console.log("Post submitted", postData);

    setTitle("");
    setContent("");
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
          <PlusCircle className="min-h-7 min-w-7" />
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
                <div className="h-28 w-28 relative">
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="rounded object-cover"
                  />
                </div>
              ) : (
                <video src={preview} controls className="w-full h-48 rounded" />
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
