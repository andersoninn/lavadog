import { EMPRESA } from "@/lib/empresa";

export default function IdentificacaoVendedor() {
  return (
    <ul>
      <li>Nome comercial: {EMPRESA.nomeComercial}</li>
      <li>Titular: {EMPRESA.titular} (empresária em nome individual)</li>
      <li>NIF: {EMPRESA.nif}</li>
      <li>Morada: {EMPRESA.morada}</li>
      <li>
        Email: <a href={`mailto:${EMPRESA.email}`}>{EMPRESA.email}</a>
      </li>
      <li>Telefone / WhatsApp: {EMPRESA.telefone}</li>
    </ul>
  );
}
