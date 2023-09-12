"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

// enum Variant {
//   "default",
//   "link",
//   "destructive",
//   "outline",
//   "secondary",
//   "ghost",
//   null,
//   undefined,
// }

export default function Btn() {
  function deleteItem() {
    console.log("hi");
  }

  return (
    <Button variant="outline" onClick={() => deleteItem()} size={"icon"}>
      <Trash className="h-4 w-4" />
    </Button>
  );
}
