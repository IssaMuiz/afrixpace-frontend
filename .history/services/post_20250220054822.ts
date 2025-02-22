/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";

export const createPost = async (
  title: string,
  content: string,
  media: File[] | null
) => {
  try {
    const res = await api.post("/post/create-post", { title, content, media });
    return res.data;
  } catch (error: any) {
    throw error.response.data.message || "Something went wrong";
  }
};
