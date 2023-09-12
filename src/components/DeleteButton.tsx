"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteButton({ itemId }: { itemId: string }): JSX.Element {
  const router = useRouter();
  const deleteItem = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(`http://localhost:3000/api/todos/${itemId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
        router.push("/todos");
      }
    }
  };

  return (
    <Button variant="outline" onClick={deleteItem} size={"icon"}>
      <Trash className="h-4 w-4" />
    </Button>
  );
}
