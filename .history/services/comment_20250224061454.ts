/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";

export const addComment = async (
  postId: string,
  content: string,
  parentComment: string
) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.post(
      "post/addComment",
      { postId, content, parentComment },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error(
      "Error adding comment",
      error.response?.data || error.message
    );
  }
};
