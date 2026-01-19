import Link from 'next/link';
import { Menu } from './menu';

export function Header() {
  return (
    <header className="bg-gray-100 shadow-md w-full">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        
        

        {/* Menu já pronto */}
        <Menu />
      </div>
    </header>
  );
}
