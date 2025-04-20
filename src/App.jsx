import { useEffect, useState } from 'react';
import './App.css';
import { Header, Footer } from './components/index';
import { Minus, Copy, X } from '@phosphor-icons/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

function App() {
  const [userInput, setUserInput] = useState('');
  const placeholderCode = `function hiAnon() {
    return "Ssup Anon";
}`;

  // console.log(userInput);


  return (
    <>
      {/* <Header /> */}
      <main className="w-full min-h-[92.5vh]">
        <div className="flex flex-col gap-10 justify-start items-center min-w-[40%] p-10 border-r border-black transition focus:outline-none focus:shadow-xs">
          <textarea
            value={userInput}
            className="px-4 py-2 w-[40%] min-h-[60px] border border-black hover:shadow-none shadow-[4px_4px_0px_0px_black] transition focus:outline-none focus:shadow-xs"
            placeholder="Clip your code..."
            aria-label="Code input area"
            onChange={(e) => setUserInput(e.target.value)}
          />
          {/* <div className="px-4 py-2 h-[40%] w-[80%] border border-black shadow-md transition focus:outline-none focus:shadow-xs"></div> */}
        </div>
        <div className="p-10 w-full flex justify-center items-start transition focus:outline-none focus:shadow-xs">
          <div className="overflow-hidden min-h-[120px] border border-black hover:shadow-none shadow-[4px_4px_0px_0px_black] transition focus:outline-none focus:shadow-xs">
            <div className="flex justify-end border-b border-black h-10">
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
              <pre>
                <SyntaxHighlighter className='rounded-lg'  customStyle={{
                  display: 'inline-block',
                  whiteSpace: 'pre',
                  wordBreak: 'normal',
                  overflow: 'visible',
                }} language="javascript" style={tomorrow} showLineNumbers>
                  {userInput || placeholderCode}
                </SyntaxHighlighter>
              </pre>
            </div>
          </div>
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
}

export default App;