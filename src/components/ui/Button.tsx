type CardProps = {
  title: string;
  price: number;
};

export function Card({ title, price }: CardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-gray-700 font-bold">R$ {price}</p>
    </div>
  );
}
