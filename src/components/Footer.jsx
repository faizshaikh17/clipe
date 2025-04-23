import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import html2canvas from 'html2canvas-pro';
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
  url,
  setUrl,
  image,
  setImage,
}) {
  // Event Handlers
  const setGradientValue = (option) => {
    setGradientBg(option.value);
  };

  const setUiThemeValue = (id) => {
    setUiTheme(id);
  };

  const setLanguageValue = (option) => {
    setLanguage(option);
  };

  const incFontSize = () => {
    if (fontSize < 100) {
      setFontSize((prev) => prev + 1);
    }
  };

  const decFontSize = () => {
    if (fontSize > 1) {
      setFontSize((prev) => prev - 1);
    }
  };

  const setToggleValue = () => {
    setBgToggle((prev) => !prev);
  };

  const setGradientToggleValue = () => {
    setGradientToggle((prev) => !prev);
  };

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
          {
            method: 'POST',
            body: formData,
          }
        );

        const url = await res.json();
        if (res.ok) {
          setUrl(url.secure_url);
        }
      }
    } catch (err) {
      console.error('Could not export as image', err);
    }
  };

  // Render
  return (
    <div className="fixed bottom-4 w-[60%] mx-1 border rounded-md border-gray-400 shadow-[4px_4px_0px_0px_black] transition focus:shadow-xs focus:outline-none hover:shadow-none overflow-hidden">
      <div className="flex inset-0 backdrop-blur-lg items-center justify-between px-5 py-5">
        <div className="flex flex-col items-start space-y-2">
          <label className="px-1 text-xs font-semibold text-black" htmlFor="Gradients">
            Gradient
          </label>
          <select
            className="h-8 w-26 rounded-md border bg-gray-100 px-2 text-sm font-semibold text-black text-[0.8rem] focus:border-black focus:outline-none"
            name="Gradients"
          >
            {Object.entries(gradients)
              .map(([Key, value]) => ({ id: Key, value }))
              .map((item) => (
                <option
                  onClick={() => setGradientValue(item)}
                  key={item.id}
                  id={item.id}
                  value={item.value}
                >
                  {item.id}
                </option>
              ))}
          </select>
        </div>

        <div className="flex flex-col items-start space-y-2">
          <label className="px-1 text-xs font-semibold text-black" htmlFor="UiThemes">
            Ui Theme
          </label>
          <select
            className="h-8 w-24 rounded-md border bg-gray-100 px-2 text-sm font-semibold text-black text-[0.8rem] focus:border-black focus:outline-none"
            name="UiThemes"
          >
            {Object.entries(uiThemes)
              .map(([key, { ...value }]) => ({ id: key, value: { ...value } }))
              .map((item) => (
                <option
                  key={item.id}
                  name={item.id}
                  onClick={(e) => setUiThemeValue(e.target.value)}
                >
                  {item.id}
                </option>
              ))}
          </select>
        </div>

        <div className="flex flex-col items-start space-y-2">
          <label className="px-1 text-xs font-semibold text-black" htmlFor="themeSelect">
            Code
          </label>
          <select
            className="h-8 w-21 rounded-md border bg-gray-100 px-2 text-sm font-semibold text-black text-[0.8rem] focus:border-black focus:outline-none"
            id="themeSelect"
          >
            {Object.keys(codeThemes).map((item) => (
              <option
                onClick={(e) => setCodeTheme(e.target.value)}
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col items-start space-y-2">
          <label className="px-1 text-xs font-semibold text-black" htmlFor="themeSelect">
            Language
          </label>
          <select
            className="h-8 w-23 rounded-md border bg-gray-100 px-2 text-sm font-semibold text-black text-[0.8rem] focus:border-black focus:outline-none"
            id="themeSelect"
          >
            {Object.entries(languages)
              .map(([key, value]) => ({ id: key, value }))
              .map((item) => (
                <option
                  key={item.id}
                  value={item.value}
                  onClick={() => setLanguageValue(item.value)}
                >
                  {item.id}
                </option>
              ))}
          </select>
        </div>

        <div className="flex flex-col items-start space-y-2">
          <label className="px-1 text-xs font-semibold text-black" htmlFor="fontSize">
            Fontsize
          </label>
          <span className="flex h-8 w-15 items-center justify-between gap-1 rounded-md border bg-gray-100 px-2 text-sm font-semibold text-black text-[0.8rem] focus:border-black focus:outline-none">
            <span>{fontSize}</span>
            <div className="flex flex-col space-y-0.5">
              <button
                className="bg-gray-200 w-5 h-2.5 flex justify-center items-center"
                onClick={incFontSize}
              >
                <ChevronUp size={14} />
              </button>
              <button
                className="bg-gray-200 w-5 h-2.5 flex justify-center items-center"
                onClick={decFontSize}
              >
                <ChevronDown size={14} />
              </button>
            </div>
          </span>
        </div>

        <div className="flex flex-col items-start space-y-2">
          <label className="px-1 text-xs font-semibold text-black" htmlFor="fontSize">
            Download
          </label>
          <select
            className="h-8 w-20 rounded-md border bg-gray-100 text-black px-2 text-sm font-semibold text-[0.8rem] focus:border-black focus:outline-none"
          >
            <option onClick={(e) => exportImage(e.target.value)} value="download">
              Download
            </option>
            <option onClick={(e) => exportImage(e.target.value)} value="link">
              Get Link
 façon
            </option>
          </select>
        </div>

        <div className="flex flex-col items-start space-y-2">
          <label className="px-1 text-xs font-semibold text-black" htmlFor="fontSize">
            Window
          </label>
          <label className="toggle">
            <input type="checkbox" onChange={setToggleValue} id="toggleButton" />
            <span className="slider"></span>
          </label>
        </div>

        <div className="flex flex-col items-start space-y-2">
          <label className="px-1 text-xs font-semibold text-black" htmlFor="fontSize">
            Background
          </label>
          <label className="toggle">
            <input
              type="checkbox"
              onChange={setGradientToggleValue}
              id="toggleButton"
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );
}