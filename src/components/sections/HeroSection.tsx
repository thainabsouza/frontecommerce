type HeroProps = {
  title: string;
  subtitle: string;
};

export function HeroSection({ title, subtitle }: HeroProps) {
  return (
    <section className="bg-gray-100 rounded-lg p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-lg text-gray-700">{subtitle}</p>
    </section>
  );
}
