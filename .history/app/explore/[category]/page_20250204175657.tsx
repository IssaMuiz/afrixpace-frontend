import { notFound } from "next/navigation";
import { categories } from "@/constant";

interface ExplorePageProps {
  params: { category: string };
}
export default function Explore({ params }: ExplorePageProps) {
  const { category } = params;

  if (!category) return notFound();
  return (
    <div>
      <h1 className="text-2xl font-bold">{category} Page</h1>
      <p>Displaying post related to {category}</p>
    </div>
  );
}
