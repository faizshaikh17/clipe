import { useEffect, useState } from 'react';
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
    crimsonBlossom: 'linear-gradient(to right, #ff758c, #ff7eb3)',
    oceanBreeze: 'linear-gradient(to right, #43cea2, #185a9d)',
    goldenSunset: 'linear-gradient(to top, #f7971e, #ffd200)',
    skyRush: 'linear-gradient(to bottom, #00c6ff, #0072ff)',
    fieryDream: 'linear-gradient(to top right, #ff6a00, #ee0979)',
    royalViolet: 'linear-gradient(to top right, #8e2de2, #4a00e0)',
    cherryFizz: 'linear-gradient(to top left, #ff512f, #dd2476)',
    jungleTwist: 'linear-gradient(to top left, #00b09b, #96c93d)',
    lavaMango: 'linear-gradient(to top left, #fc4a1a, #f7b733)',
    candyCloud: 'linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
    mysticMint: 'linear-gradient(to top, #2E8B57, #CFFFE5)',
    sugarPlum: 'linear-gradient(to top right, #4A148C, #CE93D8)'
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
  const [codeTheme, setCodeTheme] = useState(cb);
  const [gradientBg, setGradientBg] = useState(gradients.jungleTwist);
  const [uiTheme, setUiTheme] = useState("sketchy");
  const [fontSize, setFontSize] = useState(14);
  const [language, setLanguage] = useState('javascript');

  const uiColor = () => {
    const uiColorsKeys = Object.keys(uiThemes).map(item => (item));
    const uiColorsValues = Object.values(uiThemes).map(item => (item));
    const uiColor = Object.fromEntries(
      uiColorsKeys.map((key, i) => [key, uiColorsValues[i]])
    );
    return uiColor;
  };

  const uiColors = uiColor();

  const placeholderCode = `import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(<App />)
`;

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
    setLanguage: setLanguage
  };

  console.log(language);

  return (
    <>
      <Header />
      <main
        className="flex w-full flex-col items-center justify-start space-y-10"
        style={{ backgroundColor: uiColors[uiTheme].codeBg, color: uiColors[uiTheme].textColor }}
      >
        <div className="mt-10 flex w-[30%] flex-col items-center justify-center space-y-8">
          <CodeArea userInput={userInput} setUserInput={setUserInput} />
        </div>
        <div className="flex w-full justify-center">
          <div className="mx-6 max-w-full overflow-hidden rounded-xl border border-black shadow-lg transition hover:shadow-md">
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
            <div style={{ background: `${gradientBg}` }}>
              <div className="overflow-auto p-10">
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
          </div>
        </div>
        <Footer {...gradientProps} />
      </main>
    </>
  );
}