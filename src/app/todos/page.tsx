import { nextauthOptions } from "@/lib/nextauthOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";

export interface ITodoItem {
  title: string;
  description: string;
  _id: string;
}

export default async function TodosList() {
  const { todos: todoItems } = await (
    await fetch("http://localhost:3000/api/todos", { cache: "no-store" })
  ).json();

  const session = await getServerSession(nextauthOptions)

  // console.log('sessh', session);
  

  return (
    <main className="flex min-h-screen flex-col items-center p-12 lg:p-24 max-w-2xl m-auto">
      {todoItems?.map((item: ITodoItem) => (
        <Link
          href={`http://localhost:3000/todos/${item._id}`}
          className="p-8 text-xl cursor-pointer hover:text-slate-600"
        >
          {item.title}
        </Link>
      ))}

      {todoItems.length < 1 ? (
        <h1 className="font-bold text-2xl">No Items To List</h1>
      ) : (
        ""
      )}
    </main>
  );
}
