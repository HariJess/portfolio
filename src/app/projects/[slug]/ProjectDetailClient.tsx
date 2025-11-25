"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DynamicSvgIcon from "@/components/svg/DynamicSvgIcon";
import { tagIconColorList } from "@/constant/tagIconColor";

// TESTING

const ProjectDetailClient = ({
  project,
  allProjects,
}: {
  project: any;
  allProjects: any[];
}) => {
  // Related projects: hanya berdasarkan category yang sama
  const relatedProjects = allProjects
    .filter((p) => p.category === project.category && p.id !== project.id)
    .slice(0, 3);
  // Jika kurang dari 3, tambahkan project lain (yang belum masuk dan slug beda)
  if (relatedProjects.length < 3) {
    const additional = allProjects
      .filter((p) => p.slug !== project.slug && !relatedProjects.includes(p))
      .slice(0, 3 - relatedProjects.length);
    relatedProjects.push(...additional);
  }

  // Fullscreen modal state
  const [fullscreenImg, setFullscreenImg] = useState<string | null>(null);

  // Features (dummy, or use project.features if available)
  const features = [
    "Modern responsive design",
    "Built with Next.js, React, and Tailwind CSS",
    "Showcases portfolio projects with filtering",
    "Interactive UI and smooth animations",
    "Optimized for performance and SEO",
  ];

  function formatDate(dateString: string) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  return (
    <div className="w-full h-full overflow-hidden flex">
      <div className="hidden md:flex w-[275px] border-r border-line bg-primary flex-col items-center gap-6 py-8 px-4 relative">
        {/* Decorative SVG */}
        <svg
          className="absolute -top-10 -left-10 w-48 h-48 opacity-20 z-0"
          viewBox="0 0 1114 1030"
          fill="none"
        >
          <g opacity="0.4">
            <path
              d="M723.946 855.519L510.032 804.132L420.663 739.469L447.226 568.957L622.649 549.391L621.041 427.647L823.309 373.392L953.602 404.691L871.165 670.797L743.892 703.987L723.946 855.519Z"
              fill="#43d9ad"
            />
          </g>
        </svg>
        {/* Author */}
        {/* <div className="flex flex-col items-center gap-2 z-10">
          <Image
            src="/me.jpg"
            alt="Raj Alam"
            width={64}
            height={64}
            className="rounded-full border-2 border-accent shadow-lg"
          />
          <span className="text-accent font-bold text-lg">Raj Alam</span>
          <span className="text-xs text-secondary">Ordinary Developer</span>
        </div> */}
        {/* Project Progress Bar */}
        <div className="w-full mt-2 z-10">
          <div className="flex justify-between text-xs text-secondary mb-1">
            <span>Progress</span>
            <span className="text-accent font-semibold">
              {project.progress}%
            </span>
          </div>
          <div className="w-full h-2 bg-line rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>
        {/* Project Quick Info */}
        <div className="w-full mt-2 space-y-2 text-xs z-10">
          <div className="flex justify-between">
            <span className="text-secondary">Status:</span>
            <span className="text-accent font-semibold">{project.status}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">Created:</span>
            <span>{formatDate(project.created)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">Updated:</span>
            <span>{formatDate(project.updated)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">Contributors:</span>
            <span>{project.contributors}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">Views:</span>
            <span>-</span>
          </div>
        </div>
        {/* Fun Fact with Icon */}
        <div className="w-full mt-2 flex items-center gap-2 bg-accent/10 border border-accent rounded-lg p-3 text-[10px] text-accent shadow z-10">
          {/* <DynamicSvgIcon name="eye" alt="Fun Fact" width={18} height={18} /> */}
          <span>{project.funFact}</span>
        </div>
        {/* CTA Button */}
        <Link
          href={"/contact"}
          className="mt-2 w-full py-2 px-4 text-center hover:ring-2 ring-accent ring-offset-4 active:ring-offset-1 ring-offset-primary transition-all rounded-lg font-bold shadow
            bg-accent text-black hover:bg-primary hover:text-white
            dark:bg-accent dark:text-black dark:hover:bg-primary dark:hover:text-white
            "
          style={{
            backgroundColor: "var(--accent)",
            color: "#111",
          }}
        >
          Contact Me
        </Link>
      </div>
      {/* Main card */}
      <main className="flex-1 w-full mx-auto border border-line px-2 md:px-8 py-4 md:py-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 h-full overflow-auto">
        {/* Sidebar Mobile */}
        <div className="flex md:hidden flex-col order-4  gap-6 py-6 px-4 bg-primary rounded-xl mb-6">
          {/* Author */}
          {/* <div className="flex flex-col it order-1ems-center gap-2 z-10">
            <Image
              src="/me.jpg"
              alt="Raj Alam"
              width={64}
              height={64}
              className="rounded-full border-2 border-accent shadow-lg"
            />
            <span className="text-accent font-bold text-lg">Raj Alam</span>
            <span className="text-xs text-secondary">Ordinary Developer</span>
          </div> */}
          {/* Project Progress Bar */}
          <div className="w-full mt-2 z-10">
            <div className="flex justify-between text-xs text-secondary mb-1">
              <span>Progress</span>
              <span className="text-accent font-semibold">
                {project.progress}%
              </span>
            </div>
            <div className="w-full h-2 bg-line rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
          {/* Project Quick Info */}
          <div className="w-full mt-2 space-y-2 text-xs z-10">
            <div className="flex justify-between">
              <span className="text-secondary">Status:</span>
              <span className="text-accent font-semibold">
                {project.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">Created:</span>
              <span>{formatDate(project.created)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">Updated:</span>
              <span>{formatDate(project.updated)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">Contributors:</span>
              <span>{project.contributors}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">Views:</span>
              <span>-</span>
            </div>
          </div>
          {/* Fun Fact with Icon */}
          <div className="w-full mt-4 flex items-center gap-2 bg-accent/10 border border-accent rounded-lg p-3 text-xs text-accent shadow z-10">
            <DynamicSvgIcon name="eye" alt="Fun Fact" width={18} height={18} />
            <span>{project.funFact}</span>
          </div>
          {/* CTA Button */}
          <Link
            href={"/contact"}
            className="mt-6 w-full text-center py-2 rounded-lg font-bold shadow transition
              bg-accent text-black hover:bg-primary hover:text-white
              dark:bg-accent dark:text-black dark:hover:bg-primary dark:hover:text-white
              "
            style={{
              backgroundColor: "var(--accent)",
              color: "#111",
            }}
          >
            Contact Me
          </Link>
        </div>
        {/* Info Section */}
        <div className="flex flex-col gap-6 min-w-0 order-1 md:order-2 px-4">
          <h1 className="text-2xl md:text-4xl font-extrabold text-accent drop-shadow">
            {project.title}
          </h1>
          <p className="text-base md:text-lg text-secondary leading-relaxed drop-shadow-md">
            {project.description}
          </p>
          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-2 md:gap-3">
            {project.tags.map((tag: string, idx: number) => {
              const found = tagIconColorList.find((item) => item.tag === tag);
              const iconName = found?.icon || "file";
              const iconStyle = found?.color ? { color: found.color } : {};
              return (
                <span
                  key={idx}
                  className="bg-[#1c2a3a] text-secondary px-3 md:px-5 py-1 rounded-full font-medium text-sm md:text-base transition-colors duration-200 flex items-center gap-2"
                >
                  <DynamicSvgIcon
                    name={iconName}
                    width={16}
                    height={18}
                    style={iconStyle}
                  />
                  {tag}
                </span>
              );
            })}
          </div>
          {/* Features */}
          <div>
            <h2 className="text-accent font-semibold mb-2 text-base md:text-lg">
              Features
            </h2>
            <ul className="list-disc list-inside text-secondary space-y-1">
              {project.features.map((feature: string, idx: number) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
          {/* Screenshot & Gallery (mobile only, hidden on desktop) */}
          <div className="block md:hidden">
            <div
              className="relative w-full hover:ring-2 transition-all ring-accent ring-offset-2 ring-offset-primary  aspect-video rounded-xl overflow-hidden shadow-lg border border-line cursor-zoom-in group"
              onClick={() => setFullscreenImg(project.thumbnail)}
            >
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-200" />
            </div>
            {project.screenshots && project.screenshots.length > 0 && (
              <div className="grid grid-cols-2 gap-2 w-full mt-2 pb-8">
                {project.screenshots.map((src: string, idx: number) => (
                  <div
                    key={idx}
                    className="relative hover:ring-2 transition-all ring-accent ring-offset-2 ring-offset-primary aspect-video rounded-xl border border-line overflow-hidden cursor-zoom-in group"
                    onClick={() => setFullscreenImg(src)}
                  >
                    <Image
                      src={src}
                      alt={`Screenshot ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-200" />
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Button View Project */}
          <Link
            href={`${project.link}`}
            className="text-center inline-block mt-2 px-5 md:px-7 py-2 rounded-md font-semibold shadow
              bg-accent text-black
              hover:ring-2 ring-accent ring-offset-4 active:ring-offset-1 ring-offset-primary transition-all
            "
            target="_blank"
          >
            View Project 🚀
          </Link>
          {/* Related Projects */}
          <div className="pb-8">
            <h2 className="text-accent font-semibold mb-4 text-lg">
              Related Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedProjects.map((proj) => (
                <Link
                  href={`/projects/${proj.slug}`}
                  key={proj.slug}
                  className="flex items-center gap-4 bg-[#101a24] overflow-hidden relative border border-line rounded-xl p-4 hover:bg-accent/10 transition"
                >
                  <div className="bg-black/20 hover:bg-transparent transition-all duration-300 absolute inset-0"></div>
                  <div className="relative w-16 h-10">
                    <Image
                      src={proj.thumbnail}
                      alt={proj.title}
                      fill
                      className="rounded object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-secondary mb-1">
                      {proj.title}
                    </div>
                    <div className="text-xs text-tertiary">
                      {proj.description.slice(0, 50)}...
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* Screenshot & Gallery (desktop only, hidden on mobile) */}
        <div className="hidden md:flex flex-col space-y-4 min-w-0 order-2 md:order-1">
          <div
            className="relative w-full transition-all duration-300 ring-offset-primary hover:ring-2 ring-accent ring-offset-4 aspect-video rounded-xl overflow-hidden shadow-lg border border-line cursor-zoom-in group"
            onClick={() => setFullscreenImg(project.thumbnail)}
          >
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-200" />
          </div>
          {project.screenshots && project.screenshots.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full mt-2 pb-8">
              {project.screenshots.map((src: string, idx: number) => (
                <div
                  key={idx}
                  className="relative transition-all duration-300 ring-offset-primary hover:ring-2 ring-accent ring-offset-2 aspect-video rounded-xl border border-line overflow-hidden cursor-zoom-in group"
                  onClick={() => setFullscreenImg(src)}
                >
                  <Image
                    src={src}
                    alt={`Screenshot ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-200" />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      {/* Fullscreen Modal */}
      {fullscreenImg && (
        <div
          className="fixed inset-0 z-[500] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setFullscreenImg(null)}
        >
          <div className="relative max-w-3xl w-full h-[80vh] flex items-center justify-center animate-zoomIn">
            <Image
              src={fullscreenImg}
              alt="Fullscreen"
              fill
              className="object-contain rounded-xl shadow-2xl"
            />
            <button
              className="absolute top-4 right-0 bg-accent text-black rounded-lg py-2 px-4 shadow-lg hover:bg-primary hover:text-white transition"
              onClick={(e) => {
                e.stopPropagation();
                setFullscreenImg(null);
              }}
            >
              ✕
            </button>
          </div>
          <style jsx global>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
            .animate-fadeIn {
              animation: fadeIn 0.3s;
            }
            @keyframes zoomIn {
              from {
                transform: scale(0.8);
                opacity: 0;
              }
              to {
                transform: scale(1);
                opacity: 1;
              }
            }
            .animate-zoomIn {
              animation: zoomIn 0.3s;
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailClient;
