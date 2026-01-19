// src/components/ui/Title.tsx
'use client';

type TitleProps = {
  text: string;
  className?: string;
};

export default function Title({ text, className }: TitleProps) {
  return (
    <h1
      className={`text-4xl md:text-3xl mt-12 font-bold text-black ${className || ''}`}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}