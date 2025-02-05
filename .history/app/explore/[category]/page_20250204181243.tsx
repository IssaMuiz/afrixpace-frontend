import { notFound } from "next/navigation";

interface ExplorePageProps {
  params?: { category?: string };
}
export default async function Explore({ params }: ExplorePageProps) {
  if (!params || !params.category) return notFound();
  return (
    <div className="mt-20">
      <h1 className="text-2xl font-bold">{params?.category} Page</h1>
      <p>Displaying post related to {params?.category}</p>
    </div>
  );
}
