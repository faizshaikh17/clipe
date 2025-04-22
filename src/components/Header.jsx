import React from 'react';

export default function Header() {
  return (
    <header className=" inset-0 backdrop-blur-lg border border-black shadow-md transition focus:shadow-xs focus:outline-none">
      <div className="flex inset-0 backdrop-blur-lg h-15 w-full items-center justify-between px-[17rem] py-2">
        <h1 className="text-base font-semibold lg:text-xl">Clip.</h1>
        <h1 className="text-base font-semibold underline lg:text-xl"><a href="https://faizshaikh.vercel.app/" target='_blank'>Faiz</a></h1>
      </div>
    </header>
  );
}