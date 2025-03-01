import Feed from "@/components/Feed";
import { useEffect } from "react";
import { useRouter } from "next/router";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("token");

    if (!user) {
      router.push("/login");
    }
  }, []);
  return (
    <div className="">
      <Feed />
    </div>
  );
};

export default HomePage;
