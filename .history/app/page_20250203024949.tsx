import React from "react";

const HomePage = () => {
  return (
    <div>
      <nav className=" h-12 flex justify-between items-center shadow-md p-2">
        <h1>Logo</h1>
        <input className="border rounded-sm p-3" placeholder="search" />
        <h1>Left nav</h1>
      </nav>
    </div>
  );
};

export default HomePage;
