import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre nós | Autopeças Premium",
  description: "Conheça a Autopeças Premium — qualidade e confiança em cada peça automotiva.",
  keywords: ["autopeças", "carros", "freios", "motor", "acessórios automotivos"],
};

export default function SobrePage() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Sobre nós</h1>
      <p>
        Somos especialistas em peças automotivas, oferecendo produtos de qualidade e entrega rápida
        em todo o Brasil.
      </p>
    </main>
  );
}