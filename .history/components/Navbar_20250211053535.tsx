"use client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Search } from "lucide-react";
import { Menu } from "lucide-react";
import { BellIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import CreatePostModal from "./CreatePostModal";
import { useState } from "react";
import Image from "next/image";

const Navbar = ({
  setIsSidebarOpen,
}: {
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [user] = useState({
    username: "johndoe",
    avatar:
      "https://img.icons8.com/?size=100&id=kDoeg22e5jUY&format=png&color=000000",
  });

  const handleSignOut = async () => {
    setTimeout(() => {
      router.push("/login");
    }, 1500);
  };
  return (
    <nav className="border-b bg-white z-20 fixed left-0 right-0 top-0 border-gray-200 px-4 py-3 flex justify-between items-center shadow-sm">
      <div className="flex space-x-3 items-center">
        <Button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="xl:hidden block hover:bg-gray-300 rounded-full  cursor-pointer border-none shadow-none p-1"
          variant="outline"
        >
          <Menu className="min-h-7 min-w-7" />
        </Button>
        <h1
          onClick={() => router.push("/")}
          className="lg:hidden block text-2xl font-semibold cursor-pointer text-red-500"
        >
          A
        </h1>
        <h1
          onClick={() => router.push("/")}
          className="text-4xl font-semibold hidden lg:flex text-red-500 cursor-pointer"
        >
          Mitty
        </h1>
      </div>
      <div className="relative max-w-xl flex-1 mx-5">
        <Search className=" h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <Input
          type="text"
          placeholder="Search"
          className="pl-10 w-full border rounded-lg"
        />
      </div>

      <div className=" flex gap-2 lg:gap-5 items-center">
        <Button
          className="relative hover:bg-gray-300 rounded-full cursor-pointer border-none shadow-none p-1 group"
          variant="outline"
        >
          <BellIcon className="min-h-7 min-w-7" />
          <span className="absolute -top-1 right-0 text-white rounded-full h-5 w-5 bg-red-500">
            3
          </span>
          <span className="absolute left-1/2 -translate-x-1/2 top-12 px-2 py-1 text-sm text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-transform pointer-events-none">
            Notification
          </span>
        </Button>

        <CreatePostModal />

        <DropdownMenu>
          <DropdownMenuTrigger className="relative hover:bg-gray-300 rounded-full cursor-pointer border-none shadow-none group p-1">
            <Image src={user.avatar} alt="Profile" width={30} height={30} />

            <span className="absolute left-1/2 -translate-x-1/2 top-12 px-2 py-1 text-sm text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-transform pointer-events-none">
              Profile
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-52 mt-3 shadow-lg flex flex-col p-4 gap-3 bg-white mb rounded-md">
            <DropdownMenuItem
              className="cursor-pointer rounded-md hover:bg-gray-100 p-2"
              onClick={() => router.push(`/profile/${user.username}`)}
            >
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleSignOut}
              className="cursor-pointer text-red-500 rounded-md hover:bg-gray-100 p-2"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* <Button
          onClick={() => router.push("/auth/login")}
          variant="outline"
          className="hover:bg-gray-100"
        >
          Login
        </Button>
        <Button
          onClick={() => router.push("/auth/signup")}
          className="hover:bg-white hover:text-black "
        >
          Sign up
        </Button> */}
      </div>
    </nav>
  );
};

export default Navbar;
