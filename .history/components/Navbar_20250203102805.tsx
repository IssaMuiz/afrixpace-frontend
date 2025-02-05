"use client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="border-b border-gray-200 px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Adventures</h1>

      <div className="relative flex-1 mx-6">
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
