// src/context/CartContext.tsx
'use client';
import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

export type Lanterna = {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  imgUrl1: string;
  imgUrl2: string;
  imgUrl3: string;
};

type CartContextType = {
  cart: Lanterna[];
  addToCart: (product: Lanterna) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Lanterna[]>([]);
  const router = useRouter();

  const addToCart = (product: Lanterna) => {
    setCart(prev => [product, ...prev]); // pilha
    router.push("/carrinho"); // redireciona
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart deve ser usado dentro de CartProvider");
  return context;
}
