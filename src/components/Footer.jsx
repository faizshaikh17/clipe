import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function Footer({ gradients, setGradientBg, uiThemes, setUiTheme, codeThemes, setCodeTheme, fontSize, setFontSize, languages, setLanguage }) {
  const setGradientValue = (option) => {
    return setGradientBg(option.value);
  };
  const setUiThemeValue = (id) => {
    return setUiTheme(id);
  };
  const setLanguageValue = (option) => {
    return setLanguage(option);
  };

  const incFontSize = () => {
    if (fontSize >= 1 && fontSize <= 100) {
      return setFontSize(prev => prev + 1);
    }
  };

  const decFontSize = () => {
    if (fontSize >= 2 && fontSize < 100) {
      return setFontSize(prev => prev - 1);
    }
  };

  console.log(Object.entries(languages).map(([key, value]) => ({ id: key, value: value })));

  return (
    <div className="fixed bottom-2 h-25 w-[55%] border border-gray-400 shadow-[4px_4px_0px_0px_black] transition focus:shadow-xs focus:outline-none hover:shadow-none">
      <div className="flex items-center justify-between gap-3 px-5 py-5">
        <div className="flex flex-col items-start space-y-2">
          <label className="px-1 text-xs font-semibold text-black" htmlFor="Gradients">Background</label>
          <select className="h-9 w-35 rounded-md border bg-gray-100 px-2 py-2 text-sm font-semibold text-black text-[0.8rem] focus:border-black focus:outline-none" name="Gradients">
            {Object.entries(gradients).map(([Key, value]) => ({ id: Key, value: value })).map((item) => (
              <option onClick={() => setGradientValue(item)} key={item.id} id={item.id} value={item.value}>{item.id}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col items-start space-y-2">
          <label className="px-1 text-xs font-semibold text-black" htmlFor="UiThemes">Ui Theme</label>
          <select className="h-9 w-25 rounded-md border bg-gray-100 px-2 py-2 text-sm font-semibold text-black text-[0.8rem] focus:border-black focus:outline-none" name="UiThemes">
            {Object.entries(uiThemes).map(([key, { ...value }]) => ({ id: key, value: { ...value } })).map(item => (
              <option key={item.id} name={item.id} onClick={(e) => setUiThemeValue(e.target.value)}>{item.id}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col items-start space-y-2">
          <label className="px-1 text-xs font-semibold text-black" htmlFor="themeSelect">Code Theme</label>
          <select className="h-9 w-23 rounded-md border bg-gray-100 px-2 py-2 text-sm font-semibold text-[0.8rem] focus:border-black focus:outline-none" id="themeSelect">
            {Object.keys(codeThemes).map((item) => (
              <option onClick={(e) => setCodeTheme(e.target.value)} key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col items-start space-y-2">
          <label className="px-1 text-xs font-semibold text-black" htmlFor="themeSelect">Language</label>
          <select className="h-9 w-23 rounded-md border bg-gray-100 px-2 py-2 text-sm font-semibold text-[0.8rem] focus:border-black focus:outline-none" id="themeSelect">
            {Object.entries(languages).map(([key, value]) => ({ id: key, value: value })).map((item) => (
              <option key={item.id} value={item.value} onClick={() => setLanguageValue(item.value)}>{item.id}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col items-start space-y-2">
          <label className="px-1 text-xs font-semibold text-black" htmlFor="fontSize">Font size</label>
          <span className="flex h-9 w-12 items-center justify-between rounded-md border bg-gray-100 px-2 py-2 text-sm font-semibold text-black text-[0.8rem] focus:border-black focus:outline-none">
            <span>{fontSize}</span>
            <div className="flex flex-col">
              <button onClick={incFontSize}><ChevronUp size={14} /></button>
              <button onClick={decFontSize}><ChevronDown size={14} /></button>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}