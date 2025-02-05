"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/constant";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  useEffect(() => {
    const handleOustiseClick = (event: MouseEvent) => {
      if (
        isOpen &&
        !document.getElementById("sidebar")?.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOustiseClick);
    return () => document.removeEventListener("mousedown", handleOustiseClick);
  }, [isOpen, onClose]);
  const pathname = usePathname();
  return (
    <aside
      id="sidebar"
      className={cn(
        "fixed hidden xl:block top-14 left-0 bottom-0 w-72 border-r border-gray-200 h-screen dark:bg-gray-900 px-4 pt-12",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat.name}>
            <Link
              href={`/${cat.path}`}
              className={cn(
                "flex items-center gap-3 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition",
                pathname === `/${cat.path}` &&
                  "bg-gray-300 dark:bg-gray-700 font-semibold"
              )}
            >
              <cat.icon className="w-5 h-5" />
              <span>{cat.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
