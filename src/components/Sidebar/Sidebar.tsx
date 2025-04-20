import { Navitems } from "./Navitems";
import { getServerSession } from "next-auth";
import { ThemeTogggle } from "@pal/components/ThemeToggle";
import { ProfileMenu } from "./ProfileMenu";

export const Sidebar = async () => {
  const data = await getServerSession();
  const user = data?.user;

  return (
    <>
      <div className="hidden md:flex flex-col w-44 text-foreground bg-card h-full border border-accent rounded-md fixed left-0">
        <div className="flex items-center justify-center h-16">
          <h1 className="text-xl font-bold">PaisaPal</h1>
        </div>
        <Navitems />
        <div className="flex flex-col h-full justify-end items-center p-7 gap-4">
          <ThemeTogggle />
          <ProfileMenu user={user} />
        </div>
      </div>
      <div className="flex md:hidden w-full">
        <Navitems />
      </div>
    </>
  );
};
