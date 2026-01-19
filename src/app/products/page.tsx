'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
};

export default function ProdutosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const res = await fetch("http://localhost:3001/products");
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
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
      <h1 className="text-3xl font-bold mb-8 text-center">Farois</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((products) => (
          <div
            key={products.id}
            className="bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition flex flex-col"
          >
            <Link href={`/products/${products.id}`}>
              <img
                src={products.imageUrl}
                alt={products.title}
                className="w-60 h-60 object-cover"
              />
            </Link>

            <div className="p-4 flex flex-col flex-grow justify-between">
              <div>
                <Link href={`/products/${products.id}`}>
                  <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition">
                    {products.title}
                  </h2>
                </Link>
                <p className="text-green-600 font-semibold text-lg mt-2">
                  R$ {products.price.toFixed(2)}
                </p>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <Link
                  href={`/produtos/${products.id}`}
                  className="bg-yellow-400 hover:bg-yellow-600 font-bold text-white  py-2 rounded-lg text-center  transition"
                >
                  Comprar Agora
                </Link>

                <button
                  onClick={() => addToCart(products)}
                  className="bg-black cursor-pointer font-bold hover:bg-gray-600 text-white py-2 rounded-lg  transition"
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
