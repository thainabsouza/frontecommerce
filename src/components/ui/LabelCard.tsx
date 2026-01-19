'use client';

import { useEffect, useState } from "react";

export interface LabelCard {
  id: number;
  title: string;
  imageUrl: string;
}

export default function LabelCard() {
  const [cards, setCards] = useState<LabelCard[]>([]);

  useEffect(() => {
    async function fetchCards() {
      try {
        const res = await fetch("http://localhost:3001/slid-label-tool");
        const data = await res.json();
        setCards(data);
      } catch (error) {
        console.error("Erro ao buscar cards:", error);
      }
    }

    fetchCards();
  }, []);

  const duplicated = [...cards, ...cards];

  return (
    <div className="hidden md:block w-full overflow-hidden py-2 min-h-[200px]">
  <div className="flex items-center animate-marquee whitespace-nowrap h-[200px]">
    {duplicated.map((card, index) => (
      <div key={index} className="flex items-center mx-3">
        <img
          src={card.imageUrl}
          alt={card.title}
           className="object-fill lg:h-[50] lg:w-[50] md:h-[50] md:w-[50]"
        />
      </div>
    ))}
  </div>
</div>
  );
}
