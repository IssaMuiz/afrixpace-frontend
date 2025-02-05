"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import AdvertBar from "@/components/Advertbar";
import { useState } from "react";

export default function LayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div>
      <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
      <div className="grid grid-rows-1 lg:grid-rows-[1fr_250px] xl:grid-rows-[250px_1fr_300px] gap-6 h-screen p-4">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className=" lg:mr-[290px]  xl:mx-[300px]">{children}</main>
        <AdvertBar />
      </div>
    </div>
  );
}
