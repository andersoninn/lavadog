"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavbarLogo } from "@/components/layout/navbar/navbar-logo";
import { NavbarLinks } from "@/components/layout/navbar/navbar-links";
import { NavbarActions } from "@/components/layout/navbar/navbar-actions";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
          aria-label="Abrir menu"
        >
          <Menu className="size-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-4/5 max-w-xs">
        <div onClick={() => setOpen(false)}>
          <NavbarLogo />
        </div>
        <NavbarLinks
          className="mt-4 flex-col items-start gap-5"
          linkClassName="text-[1.15rem]"
          onNavigate={() => setOpen(false)}
        />
        <NavbarActions className="mt-auto pt-6" />
      </SheetContent>
    </Sheet>
  );
}
