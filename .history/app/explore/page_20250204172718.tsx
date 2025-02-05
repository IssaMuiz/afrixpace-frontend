import { notFound } from "next/navigation";
import { categories } from "@/constant";

const Explore = ({ params }: { params: { category: string } }) => {
  const category = categories.find(
    (c) => c.path === `/explore/${params.category}`
  );

  if (!category) return notFound();
  return (
    <div>
      <h1 className="text-2xl font-bold">{category.name} Page</h1>
      <p>Displaying post related to {category.name}</p>
    </div>
  );
};

export default Explore;
