'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { launch } from "puppeteer";

type Lanterna = {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  imgUrl1: string;
  imgUrl2: string;
  imgUrl3: string;
};

export default function ProdutosPage() {
  const [lentelanterna, setLentelanterna] = useState<Lanterna[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();




  useEffect(() => {
  async function fetchProdutos() {
    try {
        const res = await fetch("http://localhost:3001/lentelanterna");
        if (res.ok) {
          const data = await res.json();
          setLentelanterna(data);
        } else {
          console.error("Erro ao buscar produtos:", res.status);
        }
      } catch (err) {
        console.error("Erro no fetch:", err);
      } finally {
        setLoading(false);
      }
    }

  fetchProdutos();
}, []);

  if (loading) return <div className="text-center py-10">Carregando produtos...</div>;

  return (
    <main className="max-w-7xl  mt-20 mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Lente da Lanterna</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {lentelanterna.map((lentelanterna) => (
          <div
            key={lentelanterna.id}
            className="bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition flex flex-col"
          >
            <Link href={`/lentelanterna/${lentelanterna.id}`}>
              <img
                src={lentelanterna.imageUrl}
                alt={lentelanterna.title}
                className="w-60 h-60 object-cover"
              />
            </Link>

            <div className="p-4 flex flex-col flex-grow justify-between">
              <div>
                <Link href={`/lentelanterna/${lentelanterna.id}`}>
                  <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition">
                    {lentelanterna.title}
                  </h2>
                </Link>
                <p className="text-green-600 font-semibold text-lg mt-2">
                  R$ {lentelanterna.price.toFixed(2)}
                </p>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <Link
                  href={`/lentelanterna/${lentelanterna.id}`}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg text-center font-bold transition"
                >
                  Comprar Agora
                </Link>

                <button
                onClick={() =>
                  addToCart({
                    ...lentelanterna,
                    imgUrl1: lentelanterna.imgUrl1 ?? "",
                  })
                }
                  //onClick={() => addToCart(lentelanterna)}
                  className="bg-black hover:bg-gray-600 text-white py-2 rounded-lg font-bold transition"
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
