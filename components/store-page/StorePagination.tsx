"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

function getPageList(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = new Set<number>([1, total, current, current - 1, current + 1]);
  const sorted = Array.from(pages)
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);

  const result: (number | "ellipsis")[] = [];
  sorted.forEach((page, i) => {
    if (i > 0 && page - sorted[i - 1] > 1) {
      result.push("ellipsis");
    }
    result.push(page);
  });

  return result;
}

export default function StorePagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages = getPageList(currentPage, totalPages);

  return (
    <nav aria-label="Paginação" className="mt-10 flex items-center justify-center gap-2">
      <button
        type="button"
        aria-label="Página anterior"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex size-9 items-center justify-center rounded-full text-foreground transition-colors disabled:opacity-30 enabled:hover:bg-muted"
      >
        <ChevronLeft className="size-4" />
      </button>

      {pages.map((page, i) =>
        page === "ellipsis" ? (
          <span key={`ellipsis-${i}`} className="px-1 text-sm text-muted-foreground">
            …
          </span>
        ) : (
          <button
            key={page}
            type="button"
            aria-label={`Página ${page}`}
            aria-current={page === currentPage}
            onClick={() => onPageChange(page)}
            className={cn(
              "flex size-9 items-center justify-center rounded-full text-sm font-semibold transition-colors",
              page === currentPage
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-muted",
            )}
          >
            {page}
          </button>
        ),
      )}

      <button
        type="button"
        aria-label="Próxima página"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex size-9 items-center justify-center rounded-full text-foreground transition-colors disabled:opacity-30 enabled:hover:bg-muted"
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  );
}
