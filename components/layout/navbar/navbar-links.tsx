"use client";

import Link from "next/link";
import { navLinks } from "@/lib/nav-links";
import { cn } from "@/lib/utils";

type NavbarLinksProps = {
  className?: string;
  onNavigate?: () => void;
  linkClassName?: string;
};

export function NavbarLinks({
  className,
  onNavigate,
  linkClassName,
}: NavbarLinksProps) {
  return (
    <ul className={cn("flex items-center gap-8", className)}>
      {navLinks.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            onClick={onNavigate}
            className={cn(
              "text-[1.00625rem] font-medium text-foreground/80 transition-colors hover:text-foreground",
              linkClassName,
            )}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
