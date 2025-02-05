import AdventureCard from "@/components/AdventureCard";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <AdventureCard />
    </div>
  );
};

export default HomePage;
