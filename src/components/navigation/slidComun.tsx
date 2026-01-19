import CardComum from '../ui/cardComun';
import { CreditCard, Box, DollarSign, ShoppingBag } from 'lucide-react';

export function SlidComum() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
    <CardComum
      cards={[
        { title: "Pague com Cartão de Crédito", Icon: CreditCard, color: "text-green-500" },
        { title: "Enviamos para todo o Brasil", Icon: Box, color: "text-blue-500" },
        { title: "Pague com Pix", Icon: DollarSign, color: "text-yellow-500" },
        { title: "Experiencia de compra personalizada", Icon: ShoppingBag, color: "text-purple-500" },
      ]}
    />
    </div>
  );
}
