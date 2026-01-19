// src/components/ui/Title.tsx
'use client';

type Title2Props = {
  text: string;
  className?: string;
};

export default function Title2({ text, className }: Title2Props) {
  return (
   <h1 className={`text-3xl md:text-5xl mt-12 font-bold text-black ${className || ''}`}>
      {text}
    </h1>

  );
}
