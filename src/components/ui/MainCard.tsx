'use client';

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";

export interface MenuCard {
  id: number;
  title: string;
  imageUrl: string;
}

const routeMap: Record<string, string> = {
  "Farol": "/products",
  "Lanterna": "/lanternas",
  "Lente de Lanterna": "/lentelanterna",
  "Lente de Farol": "/lentefarol",
  "Carcaça de Farol": "/carcacafarol",
};

export default function MainCardSlider() {
  const [cards, setCards] = useState<MenuCard[]>([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchCards() {
      try {
        const res = await fetch("http://localhost:3001/menu-cards");
        const data = await res.json();
        setCards(data);
      } catch (error) {
        console.error("Erro ao buscar cards:", error);
      }
    }

    fetchCards();
  }, []);

  // 🔄 Atualiza se pode rolar para os lados
  const updateScrollButtons = () => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    updateScrollButtons();
    container.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      container.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [cards]);

  const scrollLeft = () => {
    containerRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="relative py-4">
      {/* Botão esquerda */}
      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="absolute text-black left-0 cursor-pointer top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 z-10 hover:bg-gray-100"
        >
          <ArrowLeft size={20} />
        </button>
      )}

      {/* Cards */}
      <div
        ref={containerRef}
        className="flex gap-4 overflow-hidden scroll-smooth"
      >
        {cards.map((card) => (
          <Link
            key={card.id}
            href={routeMap[card.title] || "/"} 
            className="flex-shrink-0 h-140 w-95 aspect-[4/3] relative rounded-xl shadow overflow-hidden hover:scale-105 transition-transform"
            style={{ aspectRatio: "4/3" }}
          >
            <img
              src={card.imageUrl}
              alt={card.title}
              className="w-full h-full object-cover scale-100"
            />
            <div className="absolute bottom-0 left-0 right-0 font-semibold text-black text-center p-2">
              <h1 className="text-4xl text-black font-bold [text-shadow:_2px_2px_0_#fff,_-2px_-2px_0_#fff,_2px_-2px_0_#fff,_-2px_2px_0_#fff]">
                {card.title}
              </h1>
            </div>
          </Link>
        ))}
      </div>

      {/* Botão direita */}
      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="absolute text-black right-0 cursor-pointer top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 z-10 hover:bg-gray-100"
        >
          <ArrowRight size={20} />
        </button>
      )}
    </div>
  );
}
