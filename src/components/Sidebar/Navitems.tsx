"use client";

import { cn } from "@pal/lib/utils";
import { BadgeIndianRupee, Gauge, PieChart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { title: "Dashboard", href: "/", id: 1, icon: <Gauge /> },
  {
    title: "Transactions",
    href: "/transactions",
    id: 2,
    icon: <BadgeIndianRupee />,
  },
  { title: "Budgets", href: "/budgets", id: 3, icon: <PieChart /> },
];
export const Navitems = () => {
  const pathname = usePathname();
  return (
    <nav className="fixed bg-accent md:bg-transparent bottom-0 md:static flex justify-between md:justify-normal md:flex-col p-4 w-full gap-4">
      {navItems.map(({ id, href, title, icon }) => (
        <Link
          key={id}
          href={href}
          className={cn(
            "flex justify-between gap-1 py-2 px-3 hover:bg-secondary rounded-md transition-colors duration-200",
            { "bg-secondary": pathname === href }
          )}
        >
          <span className="hidden md:block">{title}</span>
          <span
            className={cn({
              "text-primary md:text-accent-foreground": pathname === href,
            })}
          >
            {icon}
          </span>
        </Link>
      ))}
    </nav>
  );
};
