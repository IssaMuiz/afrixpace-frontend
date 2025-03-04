"use client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
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
        <h1 className="lg:hidden block text-2xl font-semibold text-red-500">
          A
        </h1>
        <h1 className="text-4xl font-semibold hidden lg:flex text-red-500">
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

      <div className=" flex space-x-2 lg:space-x-4 items-center">
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

        <Button
          className="relative hover:bg-gray-300 rounded-full cursor-pointer border-none shadow-none  h-auto w-auto group"
          variant="outline"
          onClick={() => router.push(`/profile/${user.username}`)}
        >
          <Image
            src={user.avatar}
            alt="Profile"
            width={35}
            height={35}
            className="rounded-full"
          />
          <span className="absolute left-1/2 -translate-x-1/2 top-12 px-2 py-1 text-sm text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-transform pointer-events-none">
            Profile
          </span>
        </Button>

        {/* <Button variant="outline" className="hover:bg-gray-100">
          Login
        </Button>
        <Button className="hover:bg-white hover:text-black ">Sign up</Button> */}
      </div>
    </nav>
  );
};

export default Navbar;
