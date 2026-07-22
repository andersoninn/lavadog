import Image from "next/image";
import Link from "next/link";

export function NavbarLogo() {
  return (
    <Link href="/" className="flex items-center" aria-label="LavaDog Store, ir para o início">
      <Image
        src="/images/logo.png"
        alt="LavaDog Store"
        width={140}
        height={40}
        className="h-24 w-auto mt-8"
        priority
      />
    </Link>
  );
}
