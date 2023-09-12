import Link from "next/link";
import React from "react";

export default async function TodosList() {
  const { todos: todoItems } = await (
    await fetch("http://localhost:3000/api/todos")
  ).json();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {todoItems?.map((item: any) => (
        <Link href={`http://localhost:3000/todos/${item._id}`} className="">
          {item.title}
        </Link>
      ))}

      {todoItems.length > 1 ? <h1>No Items To List</h1> : ''}
    </main>
  );
}
