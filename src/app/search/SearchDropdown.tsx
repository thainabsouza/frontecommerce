'use client';

import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import Link from "next/link"

interface Product {
  id: number;
  title: string;
  imgUrl: string;
  type?: string;
}

export default function SearchDropdown() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchAllProducts() {
      const endpoints = [
        "carcacafarol",
        "lanternas",
        "lentefarol",
        "lentelanterna",
        "products"
      ];

      const all = await Promise.all(
        endpoints.map(async (ep) => {
          try {
            const res = await fetch(`http://localhost:3001/${ep}`);

            if (!res.ok) return []; // ignora erros

            const data = await res.json();

            if (!Array.isArray(data)) return []; // evita erro "map is not a function"

            return data.map((item: Product) => ({
              ...item,
              type: ep,
            }));
          } catch {
            return []; // evita quebrar se uma rota estiver offline
          }
        })
      );

      setProducts(all.flat());
    }

    fetchAllProducts();
  }, []);

  // 🔹 Filtrar
  useEffect(() => {
    const result = products.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(result);
  }, [query, products]);

  // 🔹 Fechar ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex items-center cursor-pointer" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full hover:bg-gray-200 transition"
      >
        <Search className="cursor-pointer w-5 h-5 text-gray-600 hover:text-gray-700" />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 w-72 bg-white border rounded-lg shadow-lg z-[9999] p-2">
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="  w-full px-3 py-2 focus:outline-none  "
          />

          {query.length > 0 && (
            <ul className=" relative mt-2 max-h-60 overflow-y-auto">
              {filtered.length === 0 && (
                <li className="p-2 text-gray-500 text-sm">Nenhum produto encontrado</li>
              )}

              {filtered.map((p) => (
                p.type && (
                <Link
                  key={`${p.type}-${p.id}`}
                  href={`/${p.type}/${p.id}`}
                  className="p-2 hover:bg-gray-100 cursor-pointer rounded text-sm block"
                  onClick={() => setOpen(false)}
                >
                  {p.title}
                </Link>
                )
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
