"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/constant";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="fixed hidden xl:block top-14 left-0 bottom-0 w-72 border-r border-gray-200 h-screen dark:bg-gray-900 bg-white p-4">
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category}>
            <Button variant="ghost" className="w-full text-left">
              {category}
            </Button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
