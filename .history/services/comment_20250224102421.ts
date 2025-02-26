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
      "/comment",
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

export const getComment = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await api.get("/comment/:postId", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(
      "Error adding comment",
      error.response?.data || error.message
    );
  }
};

export const addReply = async (
  content: string,
  parentCommentId: string,
  postId: string
) => {
  const token = localStorage.getItem("token");
  try {
    const res = await api.post(
      "/comment/reply",
      { content, parentCommentId, postId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error: any) {
    console.error(
      "Error adding comment",
      error.response?.data || error.message
    );
  }
};
