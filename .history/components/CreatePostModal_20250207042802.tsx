import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { X } from "lucide-react";

const CreatePostModal = ({ onClose }: { onClose: () => void }) => {
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
      <DialogContent className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md p-4">
        <Button onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
        <Card className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle>Create a Post</CardTitle>
          </CardHeader>
          <CardContent>
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
                    <video
                      src={preview}
                      controls
                      className="w-full h-48 rounded"
                    />
                  )}
                </div>
              )}
              <Button type="submit" className="w-full">
                Post
              </Button>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
