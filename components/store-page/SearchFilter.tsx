import { Search } from "lucide-react";

export default function SearchFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar produtos..."
        className="h-10 w-full rounded-full border border-border bg-background pr-4 pl-9 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
      />
    </div>
  );
}
