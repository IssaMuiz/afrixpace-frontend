/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { PlusIcon } from "@heroicons/react/24/outline";
import { createPost } from "@/services/post";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const postSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  category: z.string().nonempty("Category is required"),
  media: z.any().optional(),
});

type PostFormDate = {
  title: string;
  content: string;
  category: string;
  media: FileList | null;
};

const CreatePostModal = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<PostFormDate>({
    resolver: zodResolver(postSchema),
  });

  const mediaFile = watch("media");

  /* const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileType = file.type.split("/")[0];

    if (fileType !== "image" && fileType !== "video") {
      setError("Only images and videos are allowed");
      return;
    }

    setMedia(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }; */

  const onSubmit = async (data: z.infer<typeof postSchema>) => {
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("category", data.category);
      formData.append("content", data.content);

      if (
        data.media &&
        data.media instanceof FileList &&
        data.media.length > 0
      ) {
        formData.append("media", data.media[0]);
      }

      await createPost(formData);

      reset();
      router.push("/");
    } catch (error: any) {
      setError(error?.response.data.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
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
      <DialogContent className="max-w-sm h-[550px] xl:max-w-2xl xl:h-[600px] p-6 rounded-lg bg-white overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg text-center font-semibold">
            Create a Post
          </DialogTitle>
        </DialogHeader>
        {error && <p className="text-red-500 text-sm mb-1">{String(error)}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-2">
          <Input
            placeholder="Post Title"
            {...register("title")}
            className=" py-5"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}

          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Entrepreneur">Entrepreneur</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-red-500">{errors.category.message}</p>
          )}

          <Textarea
            placeholder="Write something...."
            {...register("content")}
            rows={4}
          />

          <Input
            type="file"
            accept="image/*, video/*"
            onChange={(e) => setValue("media", e.target.files)}
          />
          {errors.media && (
            <p className="text-red-500">{errors.media.message}</p>
          )}

          {mediaFile && mediaFile[0] && (
            <p>Selected file: {mediaFile[0].name}</p>
          )}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "processing..." : "Post"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
