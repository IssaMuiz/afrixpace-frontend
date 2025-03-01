"use client";

import Feed from "@/components/Feed";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("token");

    if (!user) {
      router.replace("/auth/login");
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return null;
  return (
    <div className="">
      <Feed />
    </div>
  );
};

export default HomePage;
