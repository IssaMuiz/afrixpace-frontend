"use client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="border-b bg-white z-20 fixed left-0 right-0 top-0 border-gray-200 px-6 py-3 flex justify-between items-center">
      <div className="flex space-x-2 items-center">
        <Menu className="lg:hidden block" />
        <h1 className="lg:hidden block text-xl font-semibold">A</h1>
        <h1 className="text-xl font-semibold hidden lg:flex">Adventures</h1>
      </div>
      <div className="relative max-w-xl flex-1 mx-6">
        <Search className=" h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <Input
          type="text"
          placeholder="Search"
          className="pl-10 w-full border rounded-lg"
        />
      </div>

      <div className=" flex gap-4">
        <Button variant="outline" className="hover:bg-gray-100">
          Login
        </Button>
        <Button className="hover:bg-white hover:text-black ">Sign up</Button>
      </div>
    </nav>
  );
};

export default Navbar;
