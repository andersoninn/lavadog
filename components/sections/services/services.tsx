import { ServicesHeader } from "@/components/sections/services/services-header";
import { ServicesGrid } from "@/components/sections/services/services-grid";

export function Services() {
  return (
    <section
      id="servicos"
      className="overflow-hidden bg-blue-soft px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:gap-12">
        <ServicesHeader />
        <ServicesGrid />
      </div>
    </section>
  );
}
