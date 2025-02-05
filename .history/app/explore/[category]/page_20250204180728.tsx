import { notFound } from "next/navigation";
import { categories } from "@/constant";

interface ExplorePageProps {
  params?: { category?: string };
}
export default function Explore({ params }: ExplorePageProps) {
  if (!params || !params.category) return notFound();
  return (
    <div>
      <h1 className="text-2xl font-bold">{params.category} Page</h1>
      <p>Displaying post related to {params.category}</p>
    </div>
  );
}
