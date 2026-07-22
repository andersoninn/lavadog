import { NavbarLogo } from "@/components/layout/navbar/navbar-logo";
import { NavbarLinks } from "@/components/layout/navbar/navbar-links";
import { NavbarActions } from "@/components/layout/navbar/navbar-actions";
import { MobileMenu } from "@/components/layout/navbar/mobile-menu";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full  bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <NavbarLogo />

        <NavbarLinks className="hidden lg:flex" />

        <div className="flex items-center gap-3">
          <NavbarActions className="flex" />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
