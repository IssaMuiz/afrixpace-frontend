/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";

export const createPost = async (formData: FormData): Promise<any> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User is not authenticated");
    }

    const res = await api.post("/post/create-post", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    throw error.response.data.message || "Something went wrong";
  }
};
