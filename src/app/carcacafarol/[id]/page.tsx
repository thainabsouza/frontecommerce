// src/app/produtos/[id]/page.tsx
'use client';
import { useEffect, useState } from 'react';
import ProdutoClient from './carcacafarol';
import { Product } from '@/context/CartContext';
import CartProviderWrapper from '@/app/CartProviderWrapper';

type Props = { params: { id: string } };

export default function ProdutoPage({ params }: Props) {
  const [carcacaFarol, setCarcacaFarol] = useState<Product| null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`http://localhost:3001/carcacafarol/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setCarcacaFarol(data);
        } else {
          console.error('Erro ao buscar produto:', res.status);
        }
      } catch (err) {
        console.error('Erro no fetch:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [params.id]);

  if (loading) {
    return <div className="text-center text-gray-600 py-10">Carregando produto...</div>;
  }

  // 👇 Aqui, garantimos o Provider mesmo se o global falhar
  return <ProdutoClient product={carcacaFarol} />
}
