"use client";
import Mini3dGame from "../components/mini3dGame/Mini3dGame";
import { useAppContext } from "@/context/AppContext";
// import Vercel from "../../public/vercel.svg"
import Background from "../../public/background.svg";

export default function Home() {
  const context = useAppContext();

  return (
    <div className="w-full h-full relative">
      <section className="w-full m:w-max relative z-10 h-full flex flex-col text-sm sm:text-base lg:pl-32 lg:pt-24 gap-12 justify-center lg:justify-start px-6">
        <div className="space-y-4 w-full">
          <div className="flex items-center justify-center w-max gap-4">
            <p className="font-body-lg font-[number:var(--body-lg-font-weight)] text-[#90a1b9] text-[length:var(--body-lg-font-size)] tracking-[var(--body-lg-letter-spacing)] leading-[var(--body-lg-line-height)] [font-style:var(--body-lg-font-style)]">
              Hi all. I am
            </p>
            {/* <button onClick={() => audio?.play()}>sdfsdf</button> */}
          </div>
          <h1 className="[word-spacing:-7px] text-secondary font-semibold text-4xl">
            Harijesy
          </h1>
          <h2>&gt; A Full Stack Developer</h2>
        </div>
        <div className="w-full space-y-1">
          <div className="sm:hidden space-y-1">
            <p className="italic">// Based in Antananarivo,</p>
            <p className="italic flex gap-2 items-center">
              // Madagascar
              <span className="flex flex-col">
                <span className="bg-red-500 block w-6 h-[6px]"></span>
                <span className="bg-white block w-6 h-[6px]"></span>
              </span>
            </p>
          </div>
          <p className="italic hidden sm:flex gap-2 items-center">
            // Based in Antananarivo, Madagascar
            <span className="flex">
              <span className="bg-white block w-2 h-4"></span>
              <span className="flex flex-col">
                <span className="bg-red-500 block w-5 h-2"></span>
                <span className="bg-green-500 block w-5 h-2"></span>
              </span>
            </span>
          </p>
          <p>
            <span className="text-[#c678dd]">const </span>
            <span className="text-secondary">github </span>
            <span className="text-[#61afef]">= </span>
            <a
              href="https://github.com/HariJess"
              target="_blank"
              className="cursor-link"
            >
              <span className="text-[#98c379]">
                {'"https://github.com/HariJess"'}
              </span>
            </a>
          </p>
        </div>
      </section>
      <section>
        {!context.smallDevices && !context.enabled3dSpline && (
          <Background className="absolute -right-36 scale-50 -top-64 fill-accent animate-pulse" />
        )}
        {/* <Vercel className="fill-slate-200 text-red-500 w-8 h-8" /> */}
        {!context.smallDevices && context.enabled3dSpline && <Mini3dGame />}
      </section>
    </div>
  );
}
