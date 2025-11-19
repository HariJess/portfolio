"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DynamicSvgIcon from "../svg/DynamicSvgIcon";
import ButtonEnableDisable from "../ButtonEnableDisable";
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import useAudio from "@/hooks/useAudio";

const Navbar = () => {
  const pathname = usePathname();
  const subPath = pathname.split("/");
  const audio = useAudio("/music/background.mp3", {
    volume: 1,
    playbackRate: 1,
    loop: true,
  });

  const context = useAppContext();

  const [showSettings, setShowSettings] = useState(false);
  const [showTheme, setShowTheme] = useState(false);
  const [showNavMobile, setShowNavMobile] = useState(false);

  const themeSection = useRef<any>();
  const settingSection = useRef<any>();

  useEffect(() => {
    themeSection.current.addEventListener("click", (e: any) => {
      if (e.target === themeSection.current) return setShowTheme(false);
    });

    settingSection.current.addEventListener("click", (e: any) => {
      if (e.target === settingSection.current) return setShowSettings(false);
    });
  }, []);

  useEffect(() => {
    if (context.enabledMusic) {
      audio?.play();
    } else {
      audio?.pause();
    }
  }, [context.enabledMusic]);

  // HIDE BLOG
  const navLinks = [
    { text: "_hello", href: "/" },
    { text: "_about", href: "/about" },
    { text: "_projects", href: "/projects" },
    // { text: "_blog", href: "/blog" },
    { text: "_contact", href: "/contact" },
  ];

  const active = "text-secondary border-b-2 border-b-accent";

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
    <header className="h-[7%]">
      <nav className="border-b h-full border-line flex justify-between w-full items-center relative z-[100] bg-primary">
        <Link
          href="/"
          className="lg:max-w-[275px] flex items-center lg:w-full h-full flex-grow-0 flex-shrink-0 lg:border-r border-line hover:opacity-80 button-hover px-6 relative z-50"
        >
          <h4>hari-jess</h4>
        </Link>
        {/* Navbar-left  */}
        <ul className="hidden lg:flex flex-1 h-full">
          {navLinks.map((nav) => {
            return (
              <Link
                key={nav.href}
                href={nav.href}
                className={`${
                  nav.href === pathname ||
                  (subPath.length > 2 && "/" + subPath[1] === nav.href)
                    ? active
                    : ""
                } 
                ${
                  pathname.includes("/blog") && nav.href === "/blog"
                    ? active
                    : ""
                } cursor-link px-6 border-r h-full border-line text-center button-hover flex items-center`}
              >
                {nav.text}
              </Link>
            );
          })}
        </ul>
        {/* Navbar-right  */}
        <div className="hidden lg:flex items-center max-w-[150px] h-full w-full border-l border-line pl-4 pr-6 gap-4 justify-end">
          <div onClick={() => setShowTheme(!showTheme)}>
            <DynamicSvgIcon
              name="moon"
              className="w-6 cursor-pointer hover:opacity-80 fill-accent"
            />
          </div>
          <div onClick={() => setShowSettings(!showSettings)}>
            <DynamicSvgIcon
              name="settings"
              className="w-6 cursor-pointer hover:opacity-80"
            />
          </div>
        </div>
        {/* Navbar-mobile toggle */}
        <div
          onClick={() => setShowNavMobile(!showNavMobile)}
          className={`mr-6 p-3 lg:hidden w-[50px] flex flex-col gap-2 relative z-50 cursor-pointer`}
        >
          <div
            className={`h-[2px] ${
              showNavMobile ? "w-full rotate-45 translate-y-[10px]" : "w-[90%]"
            } bg-tertiary duration-300 transition-all`}
          ></div>
          <div
            className={`h-[2px] w-full bg-tertiary ${
              showNavMobile ? "-translate-x-full opacity-0" : ""
            } duration-300 transition-all`}
          ></div>
          <div
            className={`h-[2px] ${
              showNavMobile
                ? "w-full -rotate-45 -translate-y-[10px]"
                : "w-[60%]"
            } bg-tertiary duration-300 transition-all`}
          ></div>
        </div>

        {/* nav mobile */}
        <div
          className={`fixed left-0 right-0 bottom-0 top-0 ${
            showNavMobile ? "translate-y-0 z-30" : "-translate-y-full z-0"
          } transition-transform duration-[500ms] ease-[cubic-bezier(.51,.92,.24,1.15)] h-full bg-primary overflow-auto`}
        >
          <ul className="flex flex-col h-full overflow-auto pt-20">
            {navLinks.map((nav) => {
              return (
                <Link
                  key={nav.href}
                  href={nav.href}
                  onClick={() => setShowNavMobile(false)}
                  className={`${nav.href === pathname ? active : ""} 
                  ${
                    pathname.includes("/blog") && nav.href === "/blog"
                      ? active
                      : ""
                  } px-6 border-b border-line py-8 text-center button-hover flex items-center`}
                >
                  {nav.text}
                </Link>
              );
            })}
            <div
              onClick={() => setShowTheme(!showTheme)}
              className="flex items-center w-full border-b border-line cursor-pointer py-8 px-6 button-hover"
            >
              <p className="w-full">Theme</p>
              <span className="font-bold text-lg">{">"}</span>
            </div>
            <div
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center w-full border-b border-line cursor-pointer py-8 px-6 button-hover"
            >
              <p className="w-full">Settings</p>
              <span className="font-bold text-lg">{">"}</span>
            </div>
          </ul>
        </div>

        {/* theme */}
        <div
          ref={themeSection}
          className={`fixed z-[100] left-0 right-0 bottom-0 top-0 transition-opacity duration-300   ${
            showTheme
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
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

        {/* settings */}
        <div
          ref={settingSection}
          className={`fixed z-[100] left-0 right-0 bottom-0 top-0 transition-opacity duration-300   ${
            showSettings
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
          } flex backdrop-blur-sm bg-black/20 justify-center items-center`}
        >
          <div
            className={`max-w-[350px] h-[400px] ${
              showSettings ? "opacity-100" : "opacity-0"
            } transition-all bg-primary border border-line w-full rounded-lg flex flex-col p-4 relative`}
          >
            <div className="flex justify-end pb-2">
              <button onClick={() => setShowSettings(false)}>
                <DynamicSvgIcon name="xmark" className="w-3" />
              </button>
            </div>
            <h3 className="text-center text-secondary font-semibold text-base mb-4">
              Settings
            </h3>
            <div className="flex flex-col gap-6 flex-1">
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
            <p className="items-end text-center">
              Created by <span className="text-accent">raj-alam</span> and the
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
      </nav>
    </header>
  );
};

export default Navbar;
