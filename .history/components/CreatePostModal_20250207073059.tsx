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
import { X } from "lucide-react";

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
        <Button>Create Post</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl min-h-2xl p-6 rounded-lg bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Create a Post
          </DialogTitle>
          <button className="absolute top-3 right-3" aria-label="Close">
            <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
          </button>
        </DialogHeader>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
                <div className="h-48 relative">
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
