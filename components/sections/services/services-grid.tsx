import { Bath, Droplets, Footprints, Stethoscope } from "lucide-react";
import { ServiceCard, type ServiceCardProps } from "@/components/sections/services/service-card";

const services: Omit<ServiceCardProps, "delay">[] = [
  {
    image: "/images/services/banho-e-tosa.jpg",
    icon: Bath,
    variant: "amber",
    title: "Banho e Tosa",
    description: "Higiene completa com muito carinho e produtos premium.",
    href: "#servicos",
  },
  {
    image: "/images/services/hidratacao.jpg",
    icon: Droplets,
    variant: "blue",
    title: "Hidratação",
    description: "Tratamentos especiais para pelos saudáveis e brilhantes.",
    href: "#servicos",
  },
  {
    image: "/images/services/passeios.jpg",
    icon: Footprints,
    variant: "amber",
    title: "Passeios",
    description: "Passeios seguros e divertidos com profissionais treinados.",
    href: "#servicos",
  },
  {
    image: "/images/services/cuidados-veterinarios.jpg",
    icon: Stethoscope,
    variant: "blue",
    title: "Cuidados Veterinários",
    description: "Atendimento profissional para a saúde do seu melhor amigo.",
    href: "#servicos",
  },
];

export function ServicesGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((service, index) => (
        <ServiceCard key={service.title} {...service} delay={index * 0.08} />
      ))}
    </div>
  );
}
