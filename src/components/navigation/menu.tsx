import Link from 'next/link';
import { ShoppingCart, Globe } from 'lucide-react';
import SearchDropdown from "@/app/search/SearchDropdown";
import Logo from "@/app/logo/page"


export function Menu() {
  return (
    <nav className="flex items-center space-x-6 text-gray-500">
       <Logo />
      <Link className='font-semibold hover:text-gray-100' href="/">Home</Link>
      <Link className='font-semibold hover:text-gray-100' href="/products">Farol</Link>
      <Link className='font-semibold hover:text-gray-100' href="/lanternas">Lanterna</Link>
      <Link className='font-semibold hover:text-gray-100' href="/lentelanterna">Lentes de Lanterna</Link>
      <Link className='font-semibold hover:text-gray-100' href="/lentefarol">Lentes de Farol</Link>
      <Link className='font-semibold hover:text-gray-100' href="/carcacafarol">Carcaça de Farol</Link>
      <Link className='font-semibold hover:text-gray-100' href="/sobre">Sobre</Link>
      <SearchDropdown />
      <Link className='hover:font-semibold' href="/carrinho">
        <ShoppingCart className="w-5 h-5 text-gray-500 hover:text-gray-200 font-semibold transition" />
      </Link>
    </nav>
  );
}