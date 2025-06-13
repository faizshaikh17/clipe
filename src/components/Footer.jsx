'use client';
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function Footer({
  gradients,
  setGradientBg,
  uiThemes,
  setUiTheme,
  codeThemes,
  setCodeTheme,
  fontSize,
  setFontSize,
  languages,
  setLanguage,
  setBgToggle,
  setGradientToggle,
  exportRef,
  setUrl,
  setImage,
}) {
  const setGradientValue = (option) => setGradientBg(option);
  const setUiThemeValue = (id) => setUiTheme(id);
  const setLanguageValue = (option) => setLanguage(option);
  const incFontSize = () => fontSize < 100 && setFontSize((prev) => prev + 1);
  const decFontSize = () => fontSize > 1 && setFontSize((prev) => prev - 1);
  const setToggleValue = () => setBgToggle((prev) => !prev);
  const setGradientToggleValue = () => setGradientToggle((prev) => !prev);

  const exportImage = async (option) => {
    const node = exportRef.current;
    if (!node) return;
    try {
      const dataUrl = await toPng(node, { quality: 0.99 });
      setImage(dataUrl);
      if (option === 'download') {
        const link = document.createElement('a');
        link.download = 'code.png';
        link.href = dataUrl;
        link.click();
      } else if (option === 'link') {
        const blob = await fetch(dataUrl).then((res) => res.blob());
        const formData = new FormData();
        formData.append('file', blob);
        formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESET);
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
          { method: 'POST', body: formData }
        );
        const url = await res.json();
        if (res.ok) setUrl(url.secure_url);
      }
    } catch (err) {
      console.error('Could not export as image', err);
    }
  };

  return (
    <div className="w-full sm:w-[55rem] sm:h-25 h-auto fixed bottom-4 mx-1 border border-gray-400 rounded-md hover:shadow-[4px_4px_0px_0px_black] transition shadow-none overflow-hidden">
      <div className="flex flex-wrap gap-4 items-center justify-between px-4 py-5 sm:flex-row">
        <div className="flex flex-col items-start space-y-1">
          <label className="px-0.5 text-xs font-semibold dark:text-white text-black">Gradient</label>
          <select
            className="h-8 w-26 rounded-md border bg-gray-100 px-2 text-sm font-semibold text-black text-[0.8rem] focus:border-black focus:outline-none"
            onChange={(e) => setGradientValue(e.target.value)}
          >
            {Object.entries(gradients).map(([id, value]) => (
              <option key={id} value={value}>{id}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col items-start space-y-1">
          <label className="px-0.5 text-xs font-semibold dark:text-white text-black">Ui Theme</label>
          <select
            className="h-8 w-26 rounded-md border bg-gray-100 px-2 text-sm font-semibold text-black text-[0.8rem] focus:border-black focus:outline-none"
            onChange={(e) => setUiThemeValue(e.target.value)}
          >
            {Object.entries(uiThemes).map(([id]) => (
              <option key={id}>{id}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col items-start space-y-1">
          <label className="px-0.5 text-xs font-semibold dark:text-white text-black">Code</label>
          <select
            className="h-8 w-23 rounded-md border bg-gray-100 px-2 text-sm font-semibold text-black text-[0.8rem] focus:border-black focus:outline-none"
            onChange={(e) => setCodeTheme(e.target.value)}
          >
            {Object.keys(codeThemes).map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col items-start space-y-1">
          <label className="px-0.5 text-xs font-semibold dark:text-white text-black">Language</label>
          <select
            className="h-8 w-25 rounded-md border bg-gray-100 px-2 text-sm font-semibold text-black text-[0.8rem] focus:border-black focus:outline-none"
            onChange={(e) => setLanguageValue(e.target.value)}
          >
            {Object.entries(languages).map(([id, value]) => (
              <option key={id} value={value}>{id}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col items-start space-y-1">
          <label className="px-0.5 text-xs font-semibold dark:text-white text-black">Fontsize</label>
          <span className="flex h-8 w-15 items-center justify-between gap-1 rounded-md border bg-gray-100 px-2 text-sm font-semibold text-black text-[0.8rem]">
            <span>{fontSize}</span>
            <div className="flex flex-col space-y-0.5">
              <button className="bg-gray-200 w-5 h-2.5 flex justify-center items-center" onClick={incFontSize}>
                <ChevronUp size={14} />
              </button>
              <button className="bg-gray-200 w-5 h-2.5 flex justify-center items-center" onClick={decFontSize}>
                <ChevronDown size={14} />
              </button>
            </div>
          </span>
        </div>

        <div className="flex flex-col items-start space-y-1">
          <label className="px-0.5 text-xs font-semibold dark:text-white text-black">Download</label>
          <select
            className="h-8 w-24 rounded-md border bg-gray-100 text-black px-2 text-sm font-semibold text-[0.8rem] focus:border-black focus:outline-none"
            onChange={(e) => exportImage(e.target.value)}
          >
            <option value="download">Download</option>
            <option value="link">Get Link</option>
          </select>
        </div>

        <div className="flex flex-col items-start space-y-1">
          <label className="px-0.5 text-xs font-semibold dark:text-white text-black">Window</label>
          <label className="toggle">
            <input type="checkbox" onChange={setToggleValue} />
            <span className="slider"></span>
          </label>
        </div>

        <div className="flex flex-col items-start space-y-1">
          <label className="px-0.5 text-xs font-semibold dark:text-white text-black">Background</label>
          <label className="toggle">
            <input type="checkbox" onChange={setGradientToggleValue} />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );
}
