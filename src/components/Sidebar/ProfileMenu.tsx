"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";

export const ProfileMenu = ({
  user,
}: {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}) => {
  const handleLogout = () => {
    signOut();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex gap-1 items-center">
          {user?.image ? (
            <Image
              src={user.image ?? ""}
              alt="userImage"
              className="rounded-full w-8 h-8"
              width={32}
              height={32}
            />
          ) : null}
          <span>{user?.name}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="flex justify-between items-center"
          onClick={handleLogout}
        >
          <span>Logout</span> <LogOut className="text-destructive" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
