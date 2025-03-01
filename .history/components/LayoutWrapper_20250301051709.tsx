"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import AdvertBar from "@/components/Advertbar";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function LayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("token");

    if (!user) {
      router.replace("/auth/login");
    } else {
      setAuthenticated(true);
      setLoading(false);
    }
  }, []);

  const isAuthPage = pathname.startsWith("/auth");

  if (loading) return null;

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div>
      <div
        className={cn(
          "fixed inset-0 z-40 top-[61px] bg-black/30 transition-opacity xl:hidden",
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      ></div>
      {authenticated && <Navbar setIsSidebarOpen={setIsSidebarOpen} />}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px]  h-screen p-2 lg:p-4">
        <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <AdvertBar />
        <main className=" xl:ml-[290px] lg:mr-[40px] ">{children}</main>
      </div>
    </div>
  );
}
