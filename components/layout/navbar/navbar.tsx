"use client";

import { useEffect, useState } from "react";
import { NavbarLogo } from "@/components/layout/navbar/navbar-logo";
import { NavbarLinks } from "@/components/layout/navbar/navbar-links";
import { NavbarActions } from "@/components/layout/navbar/navbar-actions";
import { MobileMenu } from "@/components/layout/navbar/mobile-menu";

export function Navbar() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const shouldHide = currentScrollY > lastScrollY && currentScrollY > 80;

      setIsVisible(!shouldHide);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-background/90 backdrop-blur-sm transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
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
