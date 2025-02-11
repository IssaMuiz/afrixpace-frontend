"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import AdvertBar from "@/components/Advertbar";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function LayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const isAuthPage = pathname.startsWith("/auth");

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
      <Navbar setIsSidebarOpen={setIsSidebarOpen} />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px]  gap-6 h-screen p-4">
        <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <AdvertBar />
        <main className=" xl:ml-[100px] mx-auto ">{children}</main>
      </div>
    </div>
  );
}
