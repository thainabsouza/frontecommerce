"use client";

import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <img
        src="https://i.postimg.cc/1gqPN1RV/logo.png"
        alt="Logo"
        className="w-12 h-12 rounded-full object-contain hover:opacity-80 transition"
      />
    </Link>
  );
}