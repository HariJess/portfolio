"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DynamicSvgIcon from "../svg/DynamicSvgIcon";
import { useEffect, useState } from "react";
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
  const [showNavMobile, setShowNavMobile] = useState(false);

  useEffect(() => {
    if (context.enabledMusic) {
      audio?.play();
    } else {
      audio?.pause();
    }
  }, [context.enabledMusic]);

  const navLinks = [
    { text: "_hello", href: "/" },
    { text: "_about", href: "/about" },
    { text: "_projects", href: "/projects" },
    // { text: "_contact", href: "/contact" },
  ];

  const active = "text-secondary border-b-2 border-b-accent";

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

        {/* Navbar-right - Contact Link */}
        <div
          className={`hidden lg:flex items-center h-full border-l border-line px-6 
             button-hover  
              ${
                pathname === "/contact" ||
                (subPath.length > 2 && "/" + subPath[1] === "/contact")
                  ? active
                  : ""
              } `}
        >
          <Link href="/contact" className="cursor-link" title="_contact">
            _contact
          </Link>
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
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
