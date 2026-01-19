'use client';

import { CreditCard, DollarSign, Box } from 'lucide-react';

type CardData = {
  title: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  color?: string;
};

type CardComumProps = {
  cards: CardData[];
};

export default function CardComum({ cards }: CardComumProps) {
  return (
    <div className="flex gap-4 flex-wrap">
      {cards.map((card, index) => (
        <div
          key={index}
          className="flex w-60 h-45 cursor-pointer flex-col items-center justify-center bg-white p-6 rounded-lg shadow hover:shadow-md transition transform hover:scale-105"
        >
          <card.Icon size={50} className={`${card.color || 'text-green-500'} mb-3`} />
          <h3 className="text-xl font-semibold text-gray-800 text-center">{card.title}</h3>
        </div>
      ))}
    </div>
  );
}
