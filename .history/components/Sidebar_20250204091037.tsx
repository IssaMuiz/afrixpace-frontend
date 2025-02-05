import { Button } from "./ui/button";

const categories = ["Traveling", "Diving", "Nature"];

const Sidebar = () => {
  return (
    <aside className="w-72 border-r border-gray-200 h-screen bg-white p-4">
      <h2 className="font-semibold text-lg mb-4">Categories</h2>
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
