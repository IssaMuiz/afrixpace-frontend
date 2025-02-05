import { notFound } from "next/navigation";
import { categories } from "@/constant";

interface ExplorePageProps {
  params?: { category?: string };
}
export default function Explore({ params }: ExplorePageProps) {
  const category = categories.find(
    (c) => c.path === `/explore/${params?.category}`
  );

  if (!params || !params.category) return notFound();
  return (
    <div>
      <h1 className="text-2xl font-bold">{category?.name} Page</h1>
      <p>Displaying post related to {category?.name}</p>
    </div>
  );
}
