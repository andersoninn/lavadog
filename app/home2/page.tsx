import { permanentRedirect } from "next/navigation";

// A /home2 foi a página de teste do layout novo, que passou para a home.
export default function Home2() {
  permanentRedirect("/");
}
