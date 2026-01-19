import Link from 'next/link';
import MenuCardSlider from '../ui/MainCard';

export function MainMenu() {
  return (
    <div className="p-6">
      

      {/* Slide de cards */}
      <MenuCardSlider />
    </div>
  );
}