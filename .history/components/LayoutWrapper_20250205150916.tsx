"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import AdvertBar from "@/components/Advertbar";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function LayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div>
      <div
        className={cn(
          "fixed inset-0 z-40 top-[61px] bg-black/30 transition-opacity xl:hidden",
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      ></div>
      <Navbar setIsSidebarOpen={setIsSidebarOpen} />

      <div className="grid grid-rows-1 lg:grid-rows-[1fr_250px] xl:grid-rows-[250px_1fr_300px] gap-6 h-screen p-4">
        <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        <main className=" lg:mr-[290px]  xl:mx-[300px]">{children}</main>
        <AdvertBar />
      </div>
    </div>
  );
}
