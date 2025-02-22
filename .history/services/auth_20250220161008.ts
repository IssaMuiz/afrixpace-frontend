/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";

export const login = async (email: string, password: string) => {
  try {
    const res = await api.post("/auth/login", { email, password });

    const { token } = res.data;
    localStorage.setItem("token", token);
    console.log("Token", token);

    return res.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Something went wrong!";
  }
};

export const signup = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const res = await api.post("/auth/register", { username, email, password });

    return res.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Something went wrong!";
  }
};
