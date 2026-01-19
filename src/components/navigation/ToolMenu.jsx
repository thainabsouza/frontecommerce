import Link from 'next/link';
import ToolCardSlider from '../ui/CardTool';

export function ToolMenu() {
  return (
    <div className="p-6">
      

      {/* Slide de cards */}
      <ToolCardSlider />
    </div>
  );
}