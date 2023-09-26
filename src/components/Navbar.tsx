"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const { data, status } = useSession();
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  console.log("...", status);

  return (
    <div className="w-full h-16 bg-slate-600 sticky top-0 flex justify-between items-center px-8 relative">
      <Edit width={32} height={32} className="text-white" />
      <ul className="hidden md:flex gap-x-6 text-white">
        {status === "authenticated" ? (
          <>
            <li>
              <Link href={"/"}>Create</Link>
            </li>
            <li>
              <Link href="/todos">List</Link>
            </li>
            <button onClick={() => signOut()}>Logout</button>
          </>
        ) : (
          <>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/register">Register</Link>
            </li>
          </>
        )}
      </ul>

      <Avatar onClick={toggleOpen} className="cursor-pointer">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      {open && (
        <>
          <ul className="flex flex-col gap-2 list-none absolute right-0 top-14 bg-gray-50 border shadow-sm p-4 text-slate-700 text-sm min-w-[160px]">
            {status === "authenticated" ? (
              <>
                <li>
                  <Link href={"/"}>Create</Link>
                </li>
                <li>
                  <Link href="/todos">List</Link>
                </li>
                <button onClick={() => signOut()}>Logout</button>
              </>
            ) : (
              <>
                <li onClick={toggleOpen}>
                  <Link href="/login">Login</Link>
                </li>
                <li>
                  <Link href="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default Navbar;
