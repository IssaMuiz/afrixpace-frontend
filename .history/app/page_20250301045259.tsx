"use client";

import Feed from "@/components/Feed";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("token");

    if (!user) {
      router.push("/auth/login");
    }
  }, []);
  return (
    <div className="">
      <Feed />
    </div>
  );
};

export default HomePage;
