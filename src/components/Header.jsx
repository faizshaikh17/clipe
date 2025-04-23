import React from 'react';

export default function Header() {
  return (
    <header className=" inset-0 backdrop-blur-lg border border-black shadow-md transition focus:shadow-xs focus:outline-none">
      <div className="flex inset-0 backdrop-blur-lg h-15 w-full items-center justify-between px-[17rem] py-2">
        <h1 className="text-base font-semibold lg:text-xl">Clipe.</h1>
        <h1 className=" text-sm">With love & inspiration <a className='underline ' href="https://faizshaikh.vercel.app/" target='_blank'>Faiz</a></h1>
      </div>
    </header>
  );
}




// "@phosphor-icons/react": "^2.1.7",
//         "@tailwindcss/vite": "^4.1.4",
//         "dom-to-image": "^2.6.0",
//         "html-to-image": "^1.11.13",
//         "html2canvas": "^1.4.1",
//         "html2canvas-pro": "^1.5.8",
//         "lucide-react": "^0.501.0",
//         "react": "^19.0.0",
//         "react-dom": "^19.0.0",
//         "react-syntax-highlighter": "^15.6.1"