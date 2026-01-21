'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { launch } from "puppeteer";

type Lentefarol = {
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
  const [lanterna, setLanterna] = useState<Lentefarol[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();


//const res = await fetch("http://localhost:3001/lanternas");

  useEffect(() => {
  async function fetchProdutos() {
    try {
        const res = await fetch("http://localhost:3001/lentefarol");
        if (res.ok) {
          const data = await res.json();
          setLanterna(data);
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
      <h1 className="text-3xl font-bold mb-8 text-center">Lente Farol</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {lanterna.map((lentefarol) => (
          <div
            key={lentefarol.id}
            className="bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition flex flex-col"
          >
            <Link href={`/lentefarol/${lentefarol.id}`}>
              <img
                src={lentefarol.imageUrl}
                alt={lentefarol.title}
                className="w-60 h-60 object-cover"
              />
            </Link>

            <div className="p-4 flex flex-col flex-grow justify-between">
              <div>
                <Link href={`/lentefarol/${lentefarol.id}`}>
                  <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition">
                    {lentefarol.title}
                  </h2>
                </Link>
                <p className="text-green-600 font-semibold text-lg mt-2">
                  R$ {lentefarol.price.toFixed(2)}
                </p>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <Link
                  href={`/lentefarol/${lentefarol.id}`}
                  className="bg-yellow-500 hover:bg-yellow-600 cursor-pointer text-white py-2 rounded-lg text-center font-bold transition"
                >
                  Comprar Agora
                </Link>

                <button
                onClick={() =>
                    addToCart({
                      ...lentefarol,
                      imgUrl1: lentefarol.imgUrl1 ?? "",
                    })
                  }
                  //onClick={() => addToCart(lentefarol)}
                  className="bg-black hover:bg-gray-600 cursor-pointer text-white py-2 rounded-lg font-bold transition"
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
