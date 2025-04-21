import { useEffect, useRef, useState } from 'react';
import './App.css';
import { Header, Footer, CodeArea } from './components/index';
import { Minus, Copy, X } from '@phosphor-icons/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  prism,
  coy,
  dark,
  funky,
  okaidia,
  solarizedlight,
  tomorrow,
  twilight,
  atomDark,
  base16AteliersulphurpoolLight,
  duotoneDark,
  duotoneLight,
  ghcolors,
  hopscotch,
  pojoaque,
  vs,
  vscDarkPlus,
  xonokai,
  a11yDark,
  cb
} from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function App() {
  const uiThemes = {
    googiePop: {
      toolbarBg: '#2DD4BF',
      buttonHover: '#FF6B6B',
      codeBg: '#F0FFF4',
      textColor: '#4A4A4A',
    },
    miamiSunset: {
      toolbarBg: '#FF6B81',
      buttonHover: '#FFD93D',
      codeBg: '#FFF5E1',
      textColor: '#1E1E24',
    },
    auroraBloom: {
      toolbarBg: '#FF2E7E',
      buttonHover: '#00F5A0',
      codeBg: '#FFF0F6',
      textColor: '#2D132C',
    },
    sketchy: {
      toolbarBg: '#EDEDED',
      buttonHover: '#B0B0B0',
      codeBg: '#F8F8F8',
      textColor: '#212121',
    },
    neonNight: {
      toolbarBg: '#3A0CA3',
      buttonHover: '#F72585',
      codeBg: '#F3E8FF',
      textColor: '#240046',
    },
    citrusGlow: {
      toolbarBg: '#FFB703',
      buttonHover: '#FB8500',
      codeBg: '#FFF8E1',
      textColor: '#3D3D3D',
    },
    mintCream: {
      toolbarBg: '#A7F3D0',
      buttonHover: '#34D399',
      codeBg: '#ECFDF5',
      textColor: '#065F46',
    },
    duskDream: {
      toolbarBg: '#8ECAE6',
      buttonHover: '#FFB4A2',
      codeBg: '#FAF9F6',
      textColor: '#1D3557',
    },
    lavaLamp: {
      toolbarBg: '#FF6F61',
      buttonHover: '#6A0572',
      codeBg: '#FFF0EB',
      textColor: '#2E1A47',
    },
    moonlightFade: {
      toolbarBg: '#ADB5BD',
      buttonHover: '#748CAB',
      codeBg: '#F1F3F5',
      textColor: '#343A40',
    },
  };

  const gradients = {
    emeraldNightfall: 'linear-gradient(109.6deg, rgba(204,0,0,1) 11.2%, rgba(68,0,0,1) 100.6%)',
    blushBlossom: 'linear-gradient(177.5deg, rgba(255,200,42,1) 28.3%, rgba(202,32,132,1) 79.8%)',
    celestialSpectrum: 'radial-gradient(circle 297px at 8% 45%, rgba(245,234,176,1) 0%, rgba(133,239,212,1) 100.7%)',
    greenMist: 'radial-gradient(circle farthest-corner at 10% 20%, rgba(56,207,191,1) 0%, rgba(10,70,147,1) 90.2%)',
    lavenderDream: 'radial-gradient(circle farthest-corner at 96.1% 7.2%, rgba(9,178,62,1) 0%, rgba(19,19,19,1) 100.2%)',
    prismaticBloom: 'radial-gradient(circle farthest-corner at 10% 20%, rgba(240,139,139,1) 0%, rgba(243,252,166,1) 90%)',
    oceansEmbrace: 'radial-gradient(circle 341px at 10% 20%, rgba(132,94,194,1) 0%, rgba(196,243,251,1) 90%)',
    sunsetOverdrive: 'linear-gradient(91.7deg, rgba(135,206,235,1) 7.3%, rgba(255,154,139,1) 40.3%, rgba(255,195,160,1) 57.9%, rgba(255,215,0,1) 93.5%)',
    iridescentWaves: 'linear-gradient(109.6deg, rgba(112,246,255,0.33) 11.2%, rgba(221,108,241,0.26) 42%, rgba(229,106,253,0.71) 71.5%, rgba(123,183,253,1) 100.2%)',
    peachBliss: 'linear-gradient(68.1deg, rgba(196,69,69,1) 9.2%, rgba(255,167,73,0.82) 25%, rgba(253,217,82,0.82) 43.4%, rgba(107,225,108,0.82) 58.2%, rgba(107,169,225,0.82) 75.1%, rgba(153,41,243,0.82) 87.3%)',
    sunsetSerenade: 'linear-gradient(64.3deg, rgba(254,122,152,0.81) 17.7%, rgba(255,206,134,1) 64.7%, rgba(172,253,163,0.64) 112.1%)',
    goldenOasis: 'linear-gradient(107.7deg, rgba(235,230,44,0.55) 8.4%, rgba(252,152,15,1) 90.3%)',
    prismaticlight: 'radial-gradient(circle farthest-corner at 48.4% 47.5%, rgba(122,183,255,1) 0%, rgba(21,83,161,1) 90%)',
    oceanGlow: 'linear-gradient(226.4deg, rgba(255,26,1,1) 28.9%, rgba(254,155,1,1) 33%, rgba(255,241,0,1) 48.6%, rgba(34,218,1,1) 65.3%, rgba(0,141,254,1) 80.6%, rgba(113,63,254,1) 100.1%)',
    goldenSunset: 'linear-gradient(180.3deg, rgba(221,221,221,1) 5.5%, rgba(110,136,161,1) 90.2%)',
    sunsetGolden: 'linear-gradient(109.6deg, rgba(255,253,208,1) 11.2%, rgba(153,102,51,1) 91%)',
    horizonBlue: 'linear-gradient(0.1deg, rgba(21,13,15,1) 10.2%, rgba(21,13,15,0.70) 99.8%, rgba(21,13,15,0.29) 121.2%)',
    crimsonTwilight: 'linear-gradient(97.3deg, rgba(25,50,70,0.81) 10.7%, rgba(155,65,25,0.72) 39.5%, rgba(255,192,0,0.81) 69.7%)',
    roseGold: 'radial-gradient(circle farthest-corner at 10% 20%, rgba(235,131,130,1) 0%, rgba(235,131,130,0.75) 38.6%, rgba(211,177,125,0.52) 72.1%, rgba(211,177,125,0.24) 94.7%)',
    sunsetRed: 'radial-gradient(circle 1224px at 10.6% 8.8%, rgba(255,255,255,1) 0%, rgba(153,202,251,1) 100.2%)',
    aquamarine: 'linear-gradient(113.7deg, rgba(90,173,173,1) 16.4%, rgba(0,0,0,1) 99.7%)',
    blackenedNight: '#000000',
    white: '#ffffff'
  };


  const codeThemes = {
    prism,
    coy,
    dark,
    funky,
    okaidia,
    solarizedlight,
    tomorrow,
    twilight,
    atomDark,
    duotoneDark,
    duotoneLight,
    ghcolors,
    hopscotch,
    pojoaque,
    vs,
    vscDarkPlus,
    xonokai,
    a11yDark,
    cb
  };

  const languages = {
    Bash: 'bash',
    Shell: 'shell',
    CPP: 'cpp',
    CSharp: 'csharp',
    CSS: 'css',
    JavaScript: 'javascript',
    Java: 'java',
    PHP: 'php',
    Text: 'text',
    Python: 'python',
    Ruby: 'ruby',
    Sass: 'sass',
    SQL: 'sql',
    HTML: 'xml',
  };

  const [userInput, setUserInput] = useState('');
  const [codeTheme, setCodeTheme] = useState("prism");
  const [gradientBg, setGradientBg] = useState(gradients.crimsonBlossom);
  const [uiTheme, setUiTheme] = useState("sketchy");
  const [fontSize, setFontSize] = useState(14);
  const [language, setLanguage] = useState('javascript');
  const [bgToggle, setBgToggle] = useState(true);
  const [gradientToggle, setGradientToggle] = useState(true);
  const exportRef = useRef(null);

  const uiColor = () => {
    const uiColorsKeys = Object.keys(uiThemes).map(item => (item));
    const uiColorsValues = Object.values(uiThemes).map(item => (item));
    const uiColor = Object.fromEntries(
      uiColorsKeys.map((key, i) => [key, uiColorsValues[i]])
    );
    return uiColor;
  };

  const uiColors = uiColor();

  const placeholderCode = `function greet() {
    const name = prompt("What's your name?");
    alert(\`Welcome to Clip, \${name}!\`);
  }`;


  const handleCopy = () => {
    navigator.clipboard.writeText(userInput || placeholderCode);
  };

  const handleClear = () => {
    setUserInput('');
  };

  const gradientProps = {
    gradients: gradients,
    setGradientBg: setGradientBg,
    uiThemes: uiThemes,
    setUiTheme: setUiTheme,
    codeThemes: codeThemes,
    setCodeTheme: setCodeTheme,
    fontSize: fontSize,
    setFontSize: setFontSize,
    languages: languages,
    setLanguage: setLanguage,
    setBgToggle: setBgToggle,
    setGradientToggle: setGradientToggle,
    exportRef: exportRef
  };

  return (
    <>
      <Header />
      <main
        className="flex w-full min-h-[91svh] flex-col items-center justify-start space-y-10"
        style={{ backgroundColor: uiColors[uiTheme].codeBg, color: uiColors[uiTheme].textColor }}
      >
        <div className="mt-10 flex w-[32%] flex-col items-center justify-center space-y-6">
          <CodeArea userInput={userInput} setUserInput={setUserInput} />
        </div>
        <div id='hero' className="flex justify-center">
          {bgToggle && gradientToggle ? (
            <div ref={exportRef} className="max-w-full overflow-hidden border border-black shadow-lg transition hover:shadow-md">
              {/* Toolbar */}
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
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = 'transparent')
                    }
                  >
                    <Icon />
                  </button>
                ))}
              </div>

              <div className='w-full p-8' style={{ background: `${gradientBg}` }}>
                <div className="overflow-auto">
                  <div className='flex absolute z-10 py-5.5 mx-3.5 gap-2'>
                    <span className='w-2.5 h-2.5  z-50 rounded-full bg-red-400' />
                    <span className='w-2.5 h-2.5  z-50 rounded-full bg-yellow-400' />
                    <span className='w-2.5 h-2.5  z-50 rounded-full bg-green-400' />
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
            <div style={{ background: `${gradientBg}` }}>
              <div className="overflow-auto p-10">
                <div className='flex absolute z-10 py-5.5 mx-3.5 gap-2'>
                  <span className='w-2.5 h-2.5  z-50 rounded-full bg-red-400' />
                  <span className='w-2.5 h-2.5  z-50 rounded-full bg-yellow-400' />
                  <span className='w-2.5 h-2.5  z-50 rounded-full bg-green-400' />
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
            <div style={{ backgroundColor: uiColors[uiTheme].codeBg }} className=" max-w-full overflow-hidden border border-black shadow-lg transition hover:shadow-md">
              {/* Toolbar */}
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
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = 'transparent')
                    }
                  >
                    <Icon />
                  </button>
                ))}
              </div>
              <div className="overflow-auto shadow-2xl p-10">
                <div className='flex absolute z-10 py-5.5 mx-3.5 gap-2'>
                  <span className='w-2.5 h-2.5  z-50 rounded-full bg-red-400' />
                  <span className='w-2.5 h-2.5  z-50 rounded-full bg-yellow-400' />
                  <span className='w-2.5 h-2.5  z-50 rounded-full bg-green-400' />
                </div>
                <SyntaxHighlighter
                  className="rounded-lg shadow-2xl"
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
            <div className="overflow-auto">
              <div className='flex absolute z-10 py-5.5 mx-3.5 gap-2'>
                <span className='w-2.5 h-2.5  z-50 rounded-full bg-red-400' />
                <span className='w-2.5 h-2.5  z-50 rounded-full bg-yellow-400' />
                <span className='w-2.5 h-2.5  z-50 rounded-full bg-green-400' />
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
                  padding: '2.7rem 0.8rem',
                  margin: "0"
                }}
              >
                {userInput || placeholderCode}

              </SyntaxHighlighter>
            </div>
          )}
        </div>
        <Footer {...gradientProps} />
      </main>
    </>
  );
}