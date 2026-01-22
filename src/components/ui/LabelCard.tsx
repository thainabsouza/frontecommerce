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
      const res = await fetch("http://localhost:3001/slid-label-tool");
      const data = await res.json();
      setCards(data);
    }

    fetchCards();
  }, []);

  const duplicated = [...cards, ...cards];

  return (
    <>
      <div className="w-full overflow-hidden py-4">
        <div className="flex items-center gap-10 whitespace-nowrap animate-marquee">
          {duplicated.map((card, index) => (
            <img
              key={index}
              src={card.imageUrl}
              alt={card.title}
              className="h-18 w-30 object-contain"
            />
          ))}
        </div>
      </div>

      {/* CSS GLOBAL */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </>
  );
}
