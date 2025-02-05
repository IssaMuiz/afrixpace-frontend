"use client";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";

export default function Explore() {
  const params = useParams();
  if (!params || !params.category) return notFound();

  return (
    <div className="mt-20">
      <h1 className="text-2xl font-bold">
        {params.category.toUpperCase()} Page
      </h1>
      <p>Displaying post related to {params.category.toUpperCase()}</p>
    </div>
  );
}
