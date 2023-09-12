"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BackButton({
  destPath,
}: {
  destPath: string;
}): JSX.Element {
  const router = useRouter();

  return (
    <Button variant="outline" size={"icon"}>
      <Link href={destPath}>
        <ChevronLeft className="h-4 w-4" />
      </Link>
    </Button>
  );
}
