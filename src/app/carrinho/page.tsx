'use client';
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { CreditCard, QrCode, X } from "lucide-react";

export default function CarrinhoPage() {
  const { cart } = useCart();
  const [showPix, setShowPix] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit_card'>('pix');
  const [loading, setLoading] = useState(false);

  const [total, setTotal] = useState(0);

  const pixKey = "11941394149";
  const pixMessage = `Pagamento Euro Autoparts - Total R$ ${total.toFixed(2)}`;

  // Atualiza total apenas no cliente
  useEffect(() => {
    setTotal(cart.reduce((acc, p) => acc + p.price, 0));
  }, [cart]);

  const handlePixPayment = async () => {
    try {
      const res = await fetch("http://localhost:3001/payments/pix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          total,
          description: "Compra Euro Autoparts"
        })
      });

      if (!res.ok) throw new Error('Erro ao gerar QR Code');

      const data = await res.json();
      setQrCode(`data:image/png;base64,${data.qr_code_base64}`);
      setShowPix(true);
    } catch (err) {
      console.error(err);
      alert('Erro ao gerar pagamento Pix.');
    }
  };

  const handleMercadoPago = async () => {
  try {
    const res = await fetch("http://localhost:3001/payments/mercadopago", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cart.map(p => ({
          title: p.title,
          quantity: 1,
          unit_price: p.price
        })),
        total
      })
    });

    if (!res.ok) throw new Error("Erro ao iniciar pagamento.");

    const data = await res.json();

    // redireciona para o checkout do Mercado Pago
    window.location.href = data.init_point;

  } catch (err) {
    console.error(err);
    alert("Erro ao iniciar pagamento Mercado Pago.");
  }
};

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3001/orders', { // rota plural corrigida
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          items: cart.map(p => ({
            id: Number(p.id), // garante que seja número
            title: p.title,
            price: p.price
          })),
          total,
          paymentMethod,
          paymentStatus: 'pending',
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error('Erro ao criar pedido:', errorData);
        alert('Erro ao criar pedido.');
      } else {
        setShowForm(false);
        alert('Pedido criado com sucesso!');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao criar pedido.');
    }

    setLoading(false);
  };

  if (cart.length === 0) {
    return (
      <main className="max-w-4xl mx-auto p-6 text-center text-gray-600">
        <h1 className="text-3xl font-bold mb-4">Seu carrinho</h1>
        <p>Seu carrinho está vazio 😕</p>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6 relative">
      <h1 className="text-3xl font-bold mb-6">Seu carrinho</h1>

      {/* Lista de produtos */}
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

      {/* Total */}
      <div className="flex justify-end p-4 bg-gray-100 rounded-lg text-xl font-bold">
        Total: R$ {total.toFixed(2)}
      </div>

      {/* Formas de pagamento */}
      <div className="bg-white p-4 rounded-lg shadow mt-6">
        <h2 className="text-lg font-semibold mb-4">Formas de pagamento</h2>
        <div className="flex items-center gap-6 text-gray-700">
          <button
            onClick={handlePixPayment}
            className="flex items-center gap-2 hover:text-green-600 transition cursor-pointer"
          >
            <QrCode className="w-6 h-6" />
            <span>Pix</span>
          </button>

          <div
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 hover:text-blue-600 transition cursor-pointer"
          >
            <CreditCard className="w-6 h-6" />
            <span>Cartão / Finalizar Pedido</span>
          </div>
        </div>
      </div>

      {/* Modal Pix */}
      {showPix && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center relative">
            <button
              onClick={() => setShowPix(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold mb-4">Pague com Pix</h2>
            {qrCode ? (
              <img src={qrCode} alt="QR Code Pix" className="mx-auto mb-4" />
            ) : (
              <p>Gerando QR Code...</p>
            )}
            <p className="mt-2 text-gray-600 text-sm">{pixMessage}</p>
            <p className="text-gray-500 text-xs mt-2">Chave Pix: <strong>{pixKey}</strong></p>
          </div>
        </div>
      )}

      {/* Modal Formulário */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg w-96 relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold mb-4">Finalize seu pedido</h2>
            <form
              onSubmit={handleSubmitOrder}
              className="flex flex-col gap-4"
            >
              <label className="flex flex-col text-sm">
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border p-2 rounded"
                />
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="pix"
                  checked={paymentMethod === 'pix'}
                  onChange={() => setPaymentMethod('pix')}
                />
                Pix
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit_card"
                  checked={paymentMethod === 'credit_card'}
                  onChange={() => setPaymentMethod('credit_card')}
                />
                Cartão de Crédito
              </label>

                <button
                onClick={handleMercadoPago}
                className="flex items-center gap-2 hover:text-blue-600 transition cursor-pointer"
              >
                <CreditCard className="w-6 h-6" />
                <span>Pagar com Mercado Pago</span>
              </button>

              {/* FORMULÁRIO ATUAL */}
              <div
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 hover:text-indigo-600 transition cursor-pointer"
              >
                <CreditCard className="w-6 h-6" />
                <span>Cartão / Finalizar Pedido</span>
              </div>

              <button
                type="submit"
                className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
                disabled={loading}
              >
                {loading ? 'Enviando...' : 'Finalizar Pedido'}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
