import { AboutContent } from "@/components/sections/about/about-content";
import { AboutImage } from "@/components/sections/about/about-image";

export function About() {
  return (
    <section
      id="sobre"
      className="overflow-hidden bg-white px-8 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-16">
        <div className="order-1 lg:order-2">
          <AboutContent />
        </div>
        <div className="order-2 lg:order-1">
          <AboutImage />
        </div>
      </div>
    </section>
  );
}
