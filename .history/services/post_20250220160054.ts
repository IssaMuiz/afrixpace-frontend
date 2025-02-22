/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";

export const createPost = async (formData: FormData): Promise<any> => {
  try {
    const token = localStorage.getItem("token");
    console.log("Token", token);
    if (!token) {
      throw new Error("User is not authenticated");
    }

    const response = await api.post("/post/create-post", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Response data:", response);
    return response.data;
  } catch (error: any) {
    console.error("Axios error", error?.response);
    console.error("Axios full error", error);
    throw error.response.data.message || "Something went wrong";
  }
};
