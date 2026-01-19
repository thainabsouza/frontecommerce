'use client';
import { useEffect, useState } from "react";
import { useCart, Product } from "@/context/CartContext";

export default function ProdutoClient({ product}: { product: Product | null }) {
  const { addToCart } = useCart();

  if (!product) return <div className="text-center text-gray-600 py-10">Produto não encontrado 😢</div>;

  // monta lista de imagens válidas do produto
  const imageList = [
    product.imageUrl,
    product.imgUrl1,
    product.imgUrl2,
    product.imgUrl3,
  ].filter(Boolean) as string[]; // força string[] após filter

  const [mainImage, setMainImage] = useState<string>(imageList[0] || '');

  // se o product mudar (fetch client-side), atualiza a mainImage
  useEffect(() => {
    setMainImage(imageList[0] || '');
  }, [product]); // dependência em product garante atualização quando a prop mudar

  return (
    <main className="max-w-6xl mt-20 mx-auto p-8 bg-gray-50 min-h-screen">
      <div className="grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow p-6">
        <div>
          <img
            src={mainImage || '/placeholder.png'}
            alt={product.title}
            className="w-full max-h-[500px] object-contain rounded-xl shadow"
          />

          <div className="flex gap-3 mt-4 justify-center flex-wrap">
            {imageList.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${product.title} ${i + 1}`}
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 object-cover rounded-md border-2 cursor-pointer transition
                  ${mainImage === img ? 'border-blue-600 scale-105' : 'border-gray-300 hover:border-blue-400'}`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
            <p className="text-gray-600 mb-6 leading-relaxed text-justify">{product.description}</p>
            <p className="text-3xl font-semibold text-green-600 mb-8">R$ {product.price.toFixed(2)}</p>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 cursor-pointer text-white py-3 rounded-lg font-bold transition">
              Comprar Agora
            </button>
            <button onClick={() => addToCart(product)} className="flex-1 cursor-pointer bg-black hover:bg-gray-600 text-white py-3 rounded-lg font-bold transition">
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
