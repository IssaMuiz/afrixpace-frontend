/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";

export const addComment = async (postId: string, content: string) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.post(
      "/comment",
      { postId, content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.newComment;
  } catch (error: any) {
    console.error(
      "Error adding comment",
      error.response?.data || error.message
    );
  }
};

export const getComment = async (
  postId: string,
  skip: number = 0,
  limit: number = 10
) => {
  const token = localStorage.getItem("token");
  try {
    const response = await api.get(
      `/comment/${postId}?limit=${limit}&skip=${skip}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.comments;
  } catch (error: any) {
    console.error(
      "Error getting comment",
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
      `/comment/${postId}/reply`,
      { content, parentCommentId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data.reply;
  } catch (error: any) {
    console.error("Error adding reply", error.response?.data || error.message);
  }
};
