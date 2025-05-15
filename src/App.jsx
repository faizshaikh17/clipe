import { useEffect, useRef, useState } from 'react';
import './App.css';
import { Header, Footer, CodeArea } from './components';
import { Minus, Copy, X } from '@phosphor-icons/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  prism, coy, dark, funky, okaidia, solarizedlight, tomorrow, twilight,
  atomDark, duotoneDark, duotoneLight, ghcolors, hopscotch, pojoaque, vs,
  vscDarkPlus, xonokai, a11yDark, cb,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ThemeProvider } from './context/context';

// --------------------------- CONSTANTS ---------------------------
const uiThemes = {
  googiePop: { toolbarBg: '#2DD4BF', buttonHover: '#FF6B6B', codeBg: '#F0FFF4', textColor: '#4A4A4A' },
  sketchy: { toolbarBg: '#EDEDED', buttonHover: '#B0B0B0', codeBg: '#F8F8F8', textColor: '#212121' },
  limeFiesta: { toolbarBg: '#B1FA63', buttonHover: '#FE7733', codeBg: '#F0FFF0', textColor: '#2A2A2A' },
  coralPulse: { toolbarBg: '#FE7733', buttonHover: '#B2A1FF', codeBg: '#FFF3EB', textColor: '#1F2A44' },
  violetWhirl: { toolbarBg: '#B2A1FF', buttonHover: '#B1FA63', codeBg: '#F5F0FF', textColor: '#2E1C3A' },
  tangerineTwist: { toolbarBg: '#FF914D', buttonHover: '#A1E6FF', codeBg: '#FFF7E6', textColor: '#3C2005' },
  electricMint: { toolbarBg: '#63FABD', buttonHover: '#FF4D80', codeBg: '#E6FFF5', textColor: '#1A3C34' },
  bubblegumBurst: { toolbarBg: '#FF80BF', buttonHover: '#66FFCC', codeBg: '#FFF0F5', textColor: '#2D1B2A' },
  sunnyLavender: { toolbarBg: '#D4A1FF', buttonHover: '#FFD166', codeBg: '#F9F0FF', textColor: '#3A2E4B' },
  zestyHorizon: { toolbarBg: '#FFCC33', buttonHover: '#63D4FA', codeBg: '#FFFCE6', textColor: '#3D2C0A' },
  aquaFizz: { toolbarBg: '#66E6FF', buttonHover: '#FF6680', codeBg: '#E6F9FF', textColor: '#1C3444' },
  grapeGlow: { toolbarBg: '#A166FF', buttonHover: '#FA63B1', codeBg: '#F0E6FF', textColor: '#2A1C4A' },
};

const gradients = {
  amberGlow: 'linear-gradient(107.7deg, rgba(235,230,44,0.55) 8.4%, rgba(252,152,15,1) 90.3%)',
  crimsonDusk: 'linear-gradient(109.6deg, rgba(204,0,0,1) 11.2%, rgba(68,0,0,1) 100.6%)',
  pastelAurora: 'radial-gradient(circle 297px at 8% 45%, rgba(245,234,176,1) 0%, rgba(133,239,212,1) 100.7%)',
  tealAbyss: 'radial-gradient(circle farthest-corner at 10% 20%, rgba(56,207,191,1) 0%, rgba(10,70,147,1) 90.2%)',
  lavenderWave: 'radial-gradient(circle 341px at 10% 20%, rgba(132,94,194,1) 0%, rgba(196,243,251,1) 90%)',
  bluePrism: 'radial-gradient(circle farthest-corner at 48.4% 47.5%, rgba(122,183,255,1) 0%, rgba(21,83,161,1) 90%)',
  goldenHaze: 'linear-gradient(109.6deg, rgba(255,253,208,1) 11.2%, rgba(153,102,51,1) 91%)',
  midnightFade: 'linear-gradient(0.1deg, rgba(21,13,15,1) 10.2%, rgba(21,13,15,0.70) 99.8%)',
  coralEmber: 'linear-gradient(97.3deg, rgba(25,50,70,0.81) 10.7%, rgba(155,65,25,0.72) 39.5%, rgba(255,192,0,0.81) 69.7%)',
  aquaShadow: 'linear-gradient(113.7deg, rgba(90,173,173,1) 16.4%, rgba(0,0,0,1) 99.7%)',
  blackenedNight: '#000000',
  pureWhite: '#f0f0f0',
};

const codeThemes = {
  a11yDark, prism, coy, dark, funky, okaidia, solarizedlight,
  tomorrow, twilight, atomDark, duotoneDark, duotoneLight,
  ghcolors, hopscotch, pojoaque, vs, vscDarkPlus, xonokai, cb,
};

const languages = {
  JavaScript: 'javascript',
  Bash: 'bash',
  Shell: 'shell',
  CPP: 'cpp',
  CSharp: 'csharp',
  CSS: 'css',
  Java: 'java',
  PHP: 'php',
  Text: 'text',
  Python: 'python',
  Ruby: 'ruby',
  Sass: 'sass',
  SQL: 'sql',
  HTML: 'xml',
};

// --------------------------- COMPONENT ---------------------------
export default function App() {
  // State
  const [userInput, setUserInput] = useState('');
  const [codeTheme, setCodeTheme] = useState('atomDark');
  const [gradientBg, setGradientBg] = useState(gradients.pastelAurora);
  const [uiTheme, setUiTheme] = useState('googiePop');
  const [fontSize, setFontSize] = useState(14);
  const [language, setLanguage] = useState('javascript');
  const [bgToggle, setBgToggle] = useState(true);
  const [gradientToggle, setGradientToggle] = useState(true);
  const [url, setUrl] = useState(null);
  const [image, setImage] = useState('');
  const [cross, setCross] = useState(true);
  const [themeMode, setThemeMode] = useState('light');
  const exportRef = useRef(null);

  const placeholderCode = `function greet() {
  const name = prompt("What's your name?");
  alert(\`Welcome to Clipe, \${name}!\`);
}`;

  // Theme mode
  const lightTheme = () => setThemeMode('light');
  const darkTheme = () => setThemeMode('dark');

  // Clipboard
  const handleCopy = () => navigator.clipboard.writeText(userInput || placeholderCode);
  const handleCopyLink = () => navigator.clipboard.writeText(url);
  const handleClear = () => setUserInput('');
  const handleLinkToggle = () => setUrl(null);

  // Apply theme mode class to root
  useEffect(() => {
    const root = document.documentElement;
    root?.classList.remove('light', 'dark');
    root?.classList.add(themeMode);
  }, [themeMode]);

  // Props for Footer
  const gradientProps = {
    gradients, setGradientBg, uiThemes, setUiTheme,
    codeThemes, setCodeTheme, fontSize, setFontSize,
    languages, setLanguage, setBgToggle, setGradientToggle,
    exportRef, url, setUrl, image, setImage,
  };

  const uiColors = Object.fromEntries(Object.entries(uiThemes));
  const [headerColor, setHeaderColor] = useState(uiColors[uiTheme].toolbarBg)
  useEffect(() => {
    setHeaderColor(uiColors[uiTheme].toolbarBg)
  }, [uiTheme, uiColors])
  console.log(gradientBg)


  // --------------------------- RENDER ---------------------------
  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      <Header headerColor={headerColor} />
      <main
        className={`flex font flex-col mt-15 items-center justify-start space-y-12 min-h-svh w-full transition duration-500 text-black dark:text-white`}
        style={{ backgroundColor: themeMode === 'dark' ? '#121212' : uiColors[uiTheme].codeBg, color: uiColors[uiTheme].textColor }}
      >
        <div className="mt-10 flex sm:w-[30rem] w-[21rem] flex-col items-center justify-center space-y-6">
          <CodeArea userInput={userInput} setUserInput={setUserInput} />
        </div>



        <div id="hero" className="flex justify-center">
          {bgToggle && gradientToggle ? (
            <div
              ref={exportRef}
              className="max-w-6xl min-w-[30rem] overflow-hidden rounded-lg border border-black shadow-lg transition hover:shadow-md"
            >
              <div
                className="flex h-10 justify-end border-b border-black"
                style={{ backgroundColor: uiColors[uiTheme].toolbarBg }}
              >
                {[
                  { Icon: Minus, label: 'Minimize', onClick: () => { } },
                  { Icon: Copy, label: 'Copy', onClick: handleCopy },
                  { Icon: X, label: 'Clear', onClick: handleClear },
                ].map(({ Icon, label, onClick }, index) => (
                  <button
                    key={index}
                    aria-label={label}
                    title={label}
                    onClick={onClick}
                    className="flex w-10 items-center justify-center border-l border-black transition"
                    style={{ backgroundColor: 'transparent' }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = uiColors[uiTheme].buttonHover)
                    }
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <Icon />
                  </button>
                ))}
              </div>
              <div className="w-full p-8" style={{ background: gradientBg }}>
                <div className="relative rounded-lg overflow-auto">
                  <div
                    className={`flex z-1 absolute gap-2 ${fontSize >= 30 ? 'top-10 left-5' : 'top-5 left-3.5'
                      }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <SyntaxHighlighter
                    className="rounded-lg"
                    language={language}
                    style={codeThemes[codeTheme]}
                    showLineNumbers
                    wrapLongLines
                    customStyle={{
                      opacity: '75%',
                      fontSize: `${fontSize}px`,
                      padding: '2.5rem 0.5rem',
                    }}
                  >
                    {userInput || placeholderCode}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
          ) : !bgToggle && gradientToggle ? (
            <div ref={exportRef} className="max-w-7xl" style={{ background: gradientBg }}>
              <div className="relative overflow-auto p-10">
                <div
                  className={`flex z-1 absolute gap-2 ${fontSize >= 30 ? 'top-10 left-5' : 'top-15 left-13'
                    }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <SyntaxHighlighter
                  className="rounded-lg"
                  language={language}
                  style={codeThemes[codeTheme]}
                  showLineNumbers
                  wrapLongLines
                  customStyle={{
                    opacity: '70%',
                    fontSize: `${fontSize}px`,
                    padding: '2.5rem 0.5rem',
                  }}
                >
                  {userInput || placeholderCode}
                </SyntaxHighlighter>
              </div>
            </div>
          ) : bgToggle && !gradientToggle ? (
            <div
              ref={exportRef}
              style={{ backgroundColor: uiColors[uiTheme].codeBg }}
              className="max-w-7xl overflow-hidden rounded-xl border border-black shadow-lg transition hover:shadow-md"
            >
              <div
                className="flex h-10 justify-end border-b border-black"
                style={{ backgroundColor: uiColors[uiTheme].toolbarBg }}
              >
                {[
                  { Icon: Minus, label: 'Minimize', onClick: () => { } },
                  { Icon: Copy, label: 'Copy', onClick: handleCopy },
                  { Icon: X, label: 'Clear', onClick: handleClear },
                ].map(({ Icon, label, onClick }, index) => (
                  <button
                    key={index}
                    aria-label={label}
                    onClick={onClick}
                    className="flex w-10 items-center justify-center border-l border-black transition"
                    style={{ backgroundColor: 'transparent' }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = uiColors[uiTheme].buttonHover)
                    }
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <Icon />
                  </button>
                ))}
              </div>
              <div className="relative overflow-auto rounded-lg p-10">
                <div
                  className={`flex z-1 absolute gap-2 ${fontSize >= 30 ? 'top-10 left-5' : 'top-15 left-13'
                    }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <SyntaxHighlighter
                  className="rounded-lg"
                  language={language}
                  style={codeThemes[codeTheme]}
                  showLineNumbers
                  wrapLongLines
                  customStyle={{
                    opacity: '70%',
                    fontSize: `${fontSize}px`,
                    padding: '2.5rem 0.5rem',
                  }}
                >
                  {userInput || placeholderCode}
                </SyntaxHighlighter>
              </div>
            </div>
          ) : (
            <div ref={exportRef} className="rounded-lg">
              <div className="relative max-w-7xl transparent rounded-lg shadow-black shadow-2xl overflow-hidden">
                <div
                  className={`flex z-1 absolute gap-2 ${fontSize >= 30 ? 'top-10 left-5' : 'top-3 left-3'
                    }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <SyntaxHighlighter
                  className="rounded-lg"
                  language={language}
                  style={codeThemes[codeTheme]}
                  showLineNumbers
                  wrapLongLines
                  customStyle={{
                    opacity: '70%',
                    fontSize: `${fontSize}px`,
                    padding: '2.5rem 0.5rem',
                    margin: '0',
                  }}
                >
                  {userInput || placeholderCode}
                </SyntaxHighlighter>
              </div>
            </div>
          )}
        </div>

        {cross && url && (
          <>
            <div className=" inset-0 fixed backdrop-blur-xs z-[9] min-h-screen" />
            <div className="absolute z-[10] top-1/2 h-20 flex gap-6 items-center justify-between p-4 text-white dark:text-black dark:bg-white/50 bg-black/70 backdrop-blur-sm border border-[#f9f327]/20 shadow-2xl">
              <p className=" break-all text-sm">{url}</p>
              <div className=" right-0 space-y-4">
                <X className='cursor-pointer' size={24} onClick={handleLinkToggle} />
                <Copy className='cursor-pointer' size={24} onClick={handleCopyLink} />
              </div>
            </div>
          </>
        )}

        <Footer {...gradientProps} />
      </main>
    </ThemeProvider>
  );
}
