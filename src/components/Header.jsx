import React from 'react';
import { Sun, MoonIcon } from 'lucide-react';
import { ThemeProvider, useTheme } from '../context/context';

export default function Header() {
  const { themeMode, lightTheme, darkTheme } = useTheme();

  const handleMode = (e) => {
    const status = e.currentTarget.checked
    status ? darkTheme() : lightTheme();
  };

  return (
    <>
      <header className="inset-0 font backdrop-blur-lg border text-black bg-white/90  dark:text-white dark:bg-black border-black shadow-white/15 shadow-sm transition focus:shadow-xs focus:outline-none">
        <div className="flex inset-0 backdrop-blur-lg h-16 w-full items-center justify-between px-4 md:px-8 lg:px-64 py-2">
          <h1 className="text-base font-semibold lg:text-xl">Clipe.</h1>
          <div className="flex items-center gap-2">
            <h1 className="text-xs sm:text-sm">
              With love & inspiration{' '}
              <a className="underline-offset-4 underline" href="https://faizshaikh.vercel.app/" target="_blank" rel="noopener noreferrer">
                Faiz
              </a>
            </h1>
            <label className="relative inline-flex items-center cursor-pointer" aria-label="Toggle dark mode">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={handleMode}
                checked={themeMode === 'dark'}
              />
              <div className="h-8 w-8 flex justify-center items-center">
                {themeMode === 'dark' ? <Sun size={18} /> : <MoonIcon size={18} />}
              </div>
            </label>
          </div>
        </div>
      </header>

    </>
  );
}