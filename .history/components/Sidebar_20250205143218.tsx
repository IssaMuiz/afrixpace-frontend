"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/constant";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, onClose]);

  const pathname = usePathname();
  return (
    <aside>
      <div
        className={cn(
          "fixed inset-0 z-40 top-16 bg-black/30 transition-opacity xl:hidden",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      ></div>
      <div
        ref={sidebarRef}
        className={cn(
          "fixed top-16 left-0 bottom-0 w-72 border-r bg-white border-gray-200 h-screen dark:bg-gray-900 px-4 pt-12 transition-transform xl:z-0 z-50 xl:relative xl:translate-x-0",
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
      </div>
    </aside>
  );
};

export default Sidebar;
