import { Button } from "./ui/button";

const categories = ["Traveling", "Diving", "Nature"];

const Sidebar = () => {
  return (
    <aside className="fixed hidden xl:block top-14 left-0 bottom-0 w-72 border-r border-gray-200 h-full bg-white p-4">
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
