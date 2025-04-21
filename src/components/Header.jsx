import React from 'react';

export default function Header() {
  return (
    <header className="flex inset-0 backdrop-blur-lg h-15 w-full items-center justify-between border border-black px-20 py-2 shadow-md transition focus:shadow-xs focus:outline-none">
      <h1 className="text-lg font-semibold lg:text-2xl">Clip.</h1>
      <h1 className="text-lg font-semibold lg:text-2xl">Faiz</h1>
    </header>
  );
}