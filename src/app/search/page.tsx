'use client';
import { useCart } from "@/context/CartContext";

export default function CarrinhoPage() {
  const { cart } = useCart();

  if (cart.length === 0) {
    return (
      <main className="max-w-4xl mx-auto p-6 text-center text-gray-600">
        <h1 className="text-3xl font-bold mb-4">Seu carrinho</h1>
        <p>Seu carrinho está vazio 😕</p>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Seu carrinho</h1>
      <ul className="space-y-4">
        {cart.map((product) => (
          <li key={product.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-4">
              <img src={product.imageUrl} alt={product.title} className="w-20 h-20 object-cover rounded" />
              <div>
                <h2 className="font-semibold">{product.title}</h2>
                <p className="text-green-600 font-semibold">R$ {product.price.toFixed(2)}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
