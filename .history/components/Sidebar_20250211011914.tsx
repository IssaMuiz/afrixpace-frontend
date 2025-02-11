"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/constant";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface SidebarProps {
  isOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ isOpen, setIsSidebarOpen }: SidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isOpen, setIsSidebarOpen]);

  const pathname = usePathname();
  return (
    <aside
      ref={sidebarRef}
      className={cn(
        "fixed top-[61px] left-0 bottom-0 border-r bg-gray-50 border-gray-200 h-screen dark:bg-gray-900 px-4 pt-12 transition-transform xl:z-0 z-50  xl:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat.name}>
            <Link
              onClick={() => setIsSidebarOpen(false)}
              href={`/${cat.path}`}
              className={cn(
                "flex items-center gap-3 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition ",
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
