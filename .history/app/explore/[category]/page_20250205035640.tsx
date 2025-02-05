"use client";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";

export default function Explore() {
  const params = useParams();
  if (!params || !params.category) return notFound();

  const category = Array.isArray(params.category)
    ? params.category[0]
    : params.category;

  const uppperCategory = category?.toUpperCase() || "";

  return (
    <div className="mt-20">
      <h1 className="text-2xl font-bold">{uppperCategory} Page</h1>
      <p>Displaying post related to {uppperCategory}</p>
    </div>
  );
}
