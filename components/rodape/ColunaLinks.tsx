import Link from "next/link";

export type LinkRodape = { label: string; href: string; external?: boolean };

export default function ColunaLinks({
  titulo,
  links,
  children,
}: {
  titulo: string;
  links: LinkRodape[];
  children?: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-lg font-bold">{titulo}</p>
      <ul className="mt-4 space-y-2.5 text-sm text-background/75">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noopener noreferrer" : undefined}
              className="transition-colors hover:text-background"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
}
