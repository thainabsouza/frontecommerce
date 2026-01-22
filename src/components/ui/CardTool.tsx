'use client';

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";

export interface CardTool {
  id: number;
  title: string;
  imageUrl: string;
}

const routeMap: Record<string, string> = {
  "farol": "/products",
  "lanterna": "/lanternas",
  "lente de lanterna": "/lentelanterna",
  "lente de farol": "/lentefarol",
  "Carcaça": "/carcacafarol",
};

export default function ToolCardSlider() {
  const [cards, setCards] = useState<CardTool[]>([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchCards() {
      try {
        const res = await fetch("http://localhost:3001/menu-tools-button");
        const data = await res.json();
        setCards(data);
      } catch (error) {
        console.error("Erro ao buscar cards:", error);
      }
    }

    fetchCards();
  }, []);

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

      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="absolute cursor-pointer text-black left-0 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 z-10 hover:bg-gray-102 hidden md:block"
        >
          <ArrowLeft size={20} />
        </button>
      )}

      <div
        ref={containerRef}
        className="
          flex gap-4 md:gap-6 pb-4 overflow-x-hidden
        "
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className="
              flex-shrink-0 w-10   
              sm:w-1/2
              md:w-1/4 
              lg:w-1/6
              max-w-[180px]
              flex flex-col items-center 
            "
          >
            <Link
              href={routeMap[card.title] || "/"}
              className="block w-full text-black no-scrollbar overflow-visible py-2 rounded-lg hover:scale-100 transition-transform"
            >
              <img
                src={card.imageUrl}
                alt={card.title}
                className="
                w-full h-full 
                no-scrollbar 
                object-cover 
                rounded-lg"
              />
            </Link>

            <Link
              href={routeMap[card.title] || "/"}
              className="mt-0 text-center text-black font-semibold no-scrollbar text-sm md:text-base hover:underline"
            >
              {card.title}
            </Link>
          </div>
        ))}
      </div>

      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="absolute text-black right-0 cursor-pointer top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 z-10 no-scrollbar hover:bg-gray-100 hidden md:block"
        >
          <ArrowRight size={20} />
        </button>
      )}
    </div>
  );
}
