"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/constant";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="fixed hidden xl:block top-14 left-0 bottom-0 w-72 border-r border-gray-200 h-screen dark:bg-gray-900 px-4 pt-12">
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
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
