import Btn from "@/components/Btn";
import Link from "next/link";
import React from "react";

const getData = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

export default async function TodoDetails({ params }: any) {
  const { id } = params;

  const data = await getData(id);
  const date = new Date(data?.createdAt);

  return (
    <main className="flex min-h-screen flex-col p-12 max-w-2xl m-auto">
      <Link
        href={"/todos"}
        className="flex self-end text-sm text-slate-400 font-light underline mb-4"
      >
        back
      </Link>

      <Btn />

      <h1 className="mb-2 font-bold text-2xl">{data?.title}</h1>
      <p className="min-h-[10rem] break-words">{data?.description}</p>
      <span className="flex font-extralight text-xs self-end">
        {date.toDateString()}
      </span>
    </main>
  );
}
