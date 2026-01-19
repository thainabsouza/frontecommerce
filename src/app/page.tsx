'use client';

import { Card } from '@/components/ui/Card';
import CartProviderWrapper from "./CartProviderWrapper";
import Title from '@/components/ui/titulo';
import Title2 from '@/components/ui/titulo2';
import {MainMenu } from '@/components/navigation/MainMenu'
import { ToolMenu} from '@/components/navigation/ToolMenu'
import {LabelSlid} from '@/components/navigation/LabelSlid'
import { SlidComum } from '@/components/navigation/slidComun';

export default function HomePage() {
  

  return (
    <CartProviderWrapper>
      {/* Padding geral da página */}
      <div className="px-4 sm:px-8 bg-gray-100 md:px-16 lg:px-24 py-12 space-y-12 bg-cover bg-center bg-no-repeat "
        style={{ backgroundImage: "url('https://i.postimg.cc/D03ZBwjD/background.jpg')" }}>
        {/* Título principal */}
        <div className="flex justify-between items-center">
        <Title2 text="Loja" />
        <h1 className="text-3xl md:text-3xl mt-12 font-bold text-black"> O melhor lugar para comprar <br/>peças para o seu carro</h1>
      </div>
        {/* Seção de produtos */}
        
        <section>
          <div className="flex justify-center">
        <ToolMenu/>
        </div>
           <h1 className="text-3xl md:text-3xl mt-12 font-bold text-black">Nossas Principais categorias.</h1>
          <MainMenu/>
          <h1 className="text-3xl md:text-3xl mt-12 font-bold text-black">Mais Motivos para comprar com a gente.</h1>
          <br/>
          <SlidComum/>
        </section>
        <LabelSlid/>
      </div>
    </CartProviderWrapper>
  );
}
