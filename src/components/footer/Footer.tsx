"use client";
import { useRef, useState, useEffect } from "react";
import DynamicSvgIcon from "../svg/DynamicSvgIcon";
import ButtonEnableDisable from "../ButtonEnableDisable";
import { useAppContext } from "@/context/AppContext";

const Footer = () => {
  const context = useAppContext();
  const [showSettings, setShowSettings] = useState(false);
  const [showTheme, setShowTheme] = useState(false);

  const themeSection = useRef<any>();
  const settingSection = useRef<any>();

  useEffect(() => {
    themeSection.current?.addEventListener("click", (e: any) => {
      if (e.target === themeSection.current) return setShowTheme(false);
    });

    settingSection.current?.addEventListener("click", (e: any) => {
      if (e.target === settingSection.current) return setShowSettings(false);
    });
  }, []);

  function themeHandler(currentTheme: any) {
    if (context.theme.name === currentTheme.name) return;
    const root = document.querySelector<any>(":root");
    const html = document.querySelector<any>("html");
    if (currentTheme.type === "dark") {
      html.className = "dark";
    } else {
      html.className = "light";
    }
    root.style.setProperty("--bg-outside", currentTheme.bg_outside);
    root.style.setProperty("--primary", currentTheme.primary);
    root.style.setProperty("--secondary", currentTheme.secondary);
    root.style.setProperty("--tertiary", currentTheme.tertiary);
    root.style.setProperty("--accent", currentTheme.accent);
    root.style.setProperty("--button-hover", currentTheme.button_hover);
    root.style.setProperty("--button-active", currentTheme.button_active);
    root.style.setProperty("--line", currentTheme.line);
    localStorage.setItem("theme", JSON.stringify(currentTheme));
    context.setTheme(currentTheme);
  }

  return (
    <>
      <footer className="border-t border-line h-[7%] w-full flex sm:justify-between z-10 bg-primary relative">
        <div className="flex">
          <div
            onClick={() => setShowSettings(!showSettings)}
            className="px-4 py-2 cursor-link flex-1 border-r border-line button-hover h-full cursor-pointer hover:opacity-80 transition-opacity"
          >
            <DynamicSvgIcon name="settings" className="w-6" />
          </div>
          <h4 className="px-6 h-auto flex text-xs items-center border-r border-line">
            find me in:{" "}
          </h4>

          <div className="flex justify-center items-center flex-1">
            <a
              href="https://www.linkedin.com/in/harijesy-rakotoarisoa-5301872b6"
              target="_blank"
              className={`px-4 py-2 cursor-link flex-1 border-r border-line button-hover h-full`}
            >
              <DynamicSvgIcon name="linkedin" className="w-5" />
            </a>
          </div>
        </div>
        <a
          href="https://github.com/HariJess"
          target="_blank"
          className="px-4 cursor-link border-l border-line button-hover items-center gap-2 sm:flex hidden"
        >
          <p>@HariJess</p>
          <DynamicSvgIcon name="github" className="w-5" />
        </a>
      </footer>

      {/* theme modal */}
      <div
        ref={themeSection}
        className={`fixed z-[100] left-0 right-0 bottom-0 top-0 transition-opacity duration-300 ${
          showTheme ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        } flex backdrop-blur-sm bg-black/20 justify-center items-center`}
      >
        <div
          className={`max-w-[350px] h-[400px] p-4 ${
            showTheme ? "opacity-100" : "opacity-0"
          } transition-all bg-primary border border-line w-full rounded-lg flex flex-col relative overflow-hidden`}
        >
          <div className="flex justify-end pb-2">
            <button onClick={() => setShowTheme(false)}>
              <DynamicSvgIcon name="xmark" className="w-3" />
            </button>
          </div>
          <h3 className="text-center text-secondary font-semibold text-base mb-4">
            Select Theme
          </h3>
          <div className="overflow-auto">
            {context.themeList.map((theme: any) => {
              return (
                <button
                  key={theme.name}
                  onClick={() => themeHandler(theme)}
                  className={`flex w-full gap-2 py-2 px-4 button-hover rounded ${
                    theme.name === context.theme.name &&
                    "bg-button-active text-secondary"
                  } items-center justify-between`}
                >
                  <p>{theme.name}</p>
                  <div
                    className="w-4 h-4"
                    style={{
                      background: `linear-gradient(200deg, ${theme.primary} 20%, ${theme.accent} 100%)`,
                    }}
                  ></div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* settings modal */}
      <div
        ref={settingSection}
        className={`fixed z-[100] left-0 right-0 bottom-0 top-0 transition-opacity duration-300 ${
          showSettings
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0"
        } flex backdrop-blur-sm bg-black/20 justify-center items-center`}
      >
        <div
          className={`max-w-[350px] max-h-[500px] ${
            showSettings ? "opacity-100" : "opacity-0"
          } transition-all bg-primary border border-line w-full rounded-lg flex flex-col p-4 relative overflow-y-auto`}
        >
          <div className="flex justify-end pb-2">
            <button onClick={() => setShowSettings(false)}>
              <DynamicSvgIcon name="xmark" className="w-3" />
            </button>
          </div>
          <h3 className="text-center text-secondary font-semibold text-base mb-4">
            Settings
          </h3>
          <div className="flex flex-col gap-6 flex-1 ">
            {/* Theme Setting */}
            <div
              onClick={() => {
                setShowTheme(!showTheme);
                setShowSettings(false);
              }}
              className="flex gap-2 items-center justify-between cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="flex gap-2 items-center">
                <DynamicSvgIcon name="moon" className="w-6 fill-accent" />
                <p>Change Theme</p>
              </div>
              <span className="font-bold text-lg">{">"}</span>
            </div>

            {/* Music Setting */}
            <div className="flex gap-2 items-center justify-between">
              <div className="flex gap-2 items-center">
                <DynamicSvgIcon name="sound" className="w-6" />
                <p>Enable Music Background</p>
              </div>
              <div
                onClick={() => context.setEnabledMusic(!context.enabledMusic)}
              >
                <ButtonEnableDisable
                  enabled={context.enabledMusic}
                  name="music"
                />
              </div>
            </div>

            {/* 3D Games Setting */}
            <div
              onClick={() =>
                context.setEnabled3dSpline(
                  !context.enabled3dSpline && !context.smallDevices
                )
              }
            >
              <div className="flex gap-2 items-center justify-between">
                <div className="flex gap-2 items-center">
                  <DynamicSvgIcon name="_3d" className="w-6" />
                  <p>Enable 3D Games</p>
                </div>
                <ButtonEnableDisable
                  enabled={context.enabled3dSpline}
                  name="3d"
                />
              </div>
              <p className="text-[12px] mt-2 [word-spacing:-2px]">
                Note: Enable 3d Games may cause lagging.
              </p>
              <p
                className={`text-[12px] mt-2 [word-spacing:-2px] text-accent ${
                  !context.enabled3dSpline && "hidden"
                }`}
              >
                Hint: Go to Home page to play the games, enjoy!
              </p>
            </div>
          </div>
          <p className="items-end text-center text-xs mt-4">
            Created by <span className="text-accent">hari-jess</span> and the
            design inspired by{" "}
            <a
              href="https://www.behance.net/darelova"
              target="_blank"
              className="text-accent underline"
            >
              yanka
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
