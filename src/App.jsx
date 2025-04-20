import { useEffect, useState } from 'react';
import './App.css';
import { Header, Footer, CodeArea } from './components/index';
import { Minus, Copy, X } from '@phosphor-icons/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

function App() {
  const [userInput, setUserInput] = useState('');
  const placeholderCode = `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`;

  const text = `function App() {
  const [userInput, setUserInput] = useState('');
  const placeholderCode = import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};`


  useEffect(() => {

    const wordBreak = (userInput) => {
      const words = userInput.split(' ')
      words.slice(0, 25).join(' ')
      const rest = words.slice(25).join(' ')
      console.log(words);
      console.log(rest);
      return (
        <>
          <p>
            {words}
            {rest && <br />}
            {rest}
          </p>
        </>
      )
    }

    wordBreak(userInput)
  }, [userInput])


  return (
    <>
      {/* <Header /> */}
      <main className="w-full min-h-[100vh]">
        <CodeArea userInput={userInput} setUserInput={setUserInput} />
        <div className="p-6 w-full flex  justify-center items-start transition focus:outline-none focus:shadow-xs">
          <div className="overflow-hidden border border-black hover:shadow-none shadow-[4px_4px_0px_0px_black] transition focus:outline-none focus:shadow-xs">
            <div className="flex justify-end border-b bg-[#7EE0B8] border-black h-10">
              <button
                className="w-10 border-l flex justify-center items-center border-black"
                aria-label="Minimize"
              >
                <Minus />
              </button>
              <button
                className="w-10 flex justify-center items-center border-l border-black"
                aria-label="Copy code"
                onClick={() => navigator.clipboard.writeText(userInput || placeholderCode)}
              >
                <Copy />
              </button>
              <button
                className="w-10 border-l flex justify-center items-center border-black"
                aria-label="Clear code"
                onClick={() => setUserInput('')}
              >
                <X />
              </button>
            </div>
            <div className="flex items-center justify-center p-8 max-w-full whitespace-pre-wrap overflow-auto min-h-[80px]">
              <SyntaxHighlighter
                className="rounded-lg highlighter"
                customStyle={{
                  display: 'block',
                  padding: '3rem 2rem',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  overflowX: 'auto',
                  width: '100%',
                  maxWidth: '100%',
                }}
                language="javascript"
                style={tomorrow}
                showLineNumbers
                wrapLongLines={true}
                wrapLines={true}
              >
                {userInput || placeholderCode}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
}

export default App;