// src/app/lanternas/[id]/page.tsx

import ProdutoClient from "./LenteFarol";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProdutoPage({ params }: Props) {
  const { id } = await params;

  try {
    const res = await fetch(`http://localhost:3001/lenteFarol/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return (
        <div className="text-center text-gray-600 py-10">
          Produto não encontrado 😢
        </div>
      );
    }

    const produto = await res.json();

    return <ProdutoClient product={produto} />;
  } catch (error) {
    console.error("Erro buscando produto:", error);

    return (
      <div className="text-center text-gray-600 py-10">
        Erro ao carregar produto.
      </div>
    );
  }
}
