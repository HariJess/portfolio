import React from "react";
// import Image from "next/image";
import DynamicSvgIcon from "../../svg/DynamicSvgIcon";
// @ts-ignore: MDX module not declared
import BioCode from "./BioCode.mdx";
// import Me from "../../../../public/me.jpg";

// remplace ton ancien `experiences` par celui-ci
const experiences = [
  {
    year: "2023",
    title: "IT Intern — Technical Support & Web Development",
    company: "Quantium Tech — Antananarivo (Soarano)",
    period: "06/2023 – 08/2023",
    details: [
      "Designed and contributed to the development of various websites.",
      "Provided technical support: software installation and hardware maintenance.",
      "Assisted users with hardware and software issues.",
    ],
    icon: "it",
    color: "bg-[#6b7280]",
  },
  {
    year: "2024 - Present",
    title: "Web Developer / Intern — Network & Telecom Administrator",
    company: "EDEN DISTRIBUTION — Antananarivo (Anosizato)",
    period: "07/2024 – Present",
    details: [
      "Analyzed and documented the company’s IT architecture.",
      "Studied the infrastructure diagram (server distribution, switches, access points).",
      "Monitored and maintained the local network (LAN); assisted users with IT issues.",
      "Participated in network security tasks: updates, firewall configuration.",
      "Developed professional websites for various business sectors (e-commerce, hospitality, outsourcing).",
      "Managed relational databases (MySQL, SQL Server, Sage Compta) and NoSQL databases (MongoDB, Firebase).",
      "Performed Linux administration: server configuration (Nginx, PM2), domain/DNS management.",
      "Implemented secure authentication systems (JWT, OAuth).",
      "Built a secure full-stack web application for managing lottery events.",
      "Designed and deployed automation pipelines using n8n (email/SMS notifications, draw orchestration, automatic result publishing via API).",
    ],
    icon: "server",
    color: "bg-[#3178C6]",
  },
];

const Bio = () => {
  const texts = {
    bio: {
      text: `/**
 * Bio
 * Hi! I'm Hari Jess, a passionate full-stack developer specializing in
 * web & mobile development. With 2 years of experience, I am committed
 * to creating modern, elegant, and sustainable solutions, while
 * emphasizing code quality and user experience.
 */`,
    },

    objectives: {
      text: `/**
 * Objectives
 * My goal is to become a developer capable of transforming complex
 * ideas into reliable and intuitive applications. Determined to
 * progress, I am constantly learning new technologies, strengthening
 * my skills, and always looking for new challenges to evolve in the
 * field of web & mobile development.
 */`,
    },
  };

  const currentFavoriteTechStack = [
    { name: "NextJS", icon: "nextjs", color: "fill-secondary" },
    { name: "React.js", icon: "react", color: "fill-[#61dbfb]" },
    { name: "TypeScript", icon: "typescript", color: "fill-[#007ACC]" },
    { name: "JavaScript", icon: "javascript", color: "fill-[#f0db4f]" },
    { name: "TailwindCSS", icon: "tailwind", color: "fill-[#3490dc]" },
    { name: "Node.js", icon: "nodejs", color: "fill-[#3c873a]" },
    { name: "Express.js", icon: "express", color: "fill-[#fff]" },
    { name: "n8n", icon: "n8n", color: "fill-[#fff]" },
    { name: "React Native", icon: "reactNative", color: "fill-[#61dbfb]" },
  ];

  return (
    <div className="grid md:grid-cols-2 h-full">
      <div className="overflow-auto border-r border-line md:block hidden">
        <BioCode />
      </div>
      <div className="px-4 pt-4 pb-8 overflow-auto">
        {/* <Image
          src={Me}
          width={140}
          height={140}
          alt="profile picture"
          className="rounded float-left mr-4 mb-1"
          placeholder="blur"
        /> */}
        <div className="space-y-3">
          {Object.entries(texts).map(([key, { text }]) => (
            <section key={key}>
              {/* Affiche le bloc commentaire tel quel (monospace, préservant les sauts de ligne) */}
              <pre className="rounded-lg p-3 font-mono text-sm bg-gray-50 opacity-50 whitespace-pre-wrap dark:bg-gray-900 dark:text-gray-100">
                {text}
              </pre>
            </section>
          ))}
        </div>
        {/* Experiences */}
        <div className="mt-6">
          <h5 className="text-lg text-accent font-semibold mb-4">
            Experiences
          </h5>
          <div className="relative pl-8">
            {/* Vertical line */}
            <div className="absolute left-2 top-0 w-1 h-full bg-gradient-to-b from-accent to-primary/30 rounded-full z-0" />
            <div className="flex flex-col gap-12">
              {experiences.map((exp, idx) => (
                <div key={idx} className="relative flex items-start group">
                  {/* Timeline node */}
                  <div className="absolute -left-4 top-2 flex flex-col items-center z-10">
                    <div className="w-4 h-4 rounded-full bg-accent border-4 border-primary shadow-lg transition-transform duration-300 group-hover:scale-110" />
                    {/* Line to next node */}
                    {idx < experiences.length - 1 && (
                      <div className="w-1 h-24 bg-gradient-to-b from-accent/80 to-primary/30 mx-auto" />
                    )}
                  </div>
                  {/* Content */}
                  <div className="ml-4 flex-1">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-1">
                      <span className="font-bold text-md text-accent ">
                        {exp.title}
                      </span>
                      <span className="text-secondary text-[10px] flex-1 flex md:justify-end">
                        {exp.period}
                      </span>
                    </div>
                    <div className="mb-2 text-secondary">{exp.company}</div>
                    <ul className="list-disc list-outside text-textiary space-y-1 pl-5">
                      {exp.details.map((detail, i) => (
                        <li
                          key={i}
                          className="text-sm ml-0"
                          dangerouslySetInnerHTML={{ __html: detail }}
                        />
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h5 className="text-lg text-accent font-semibold mb-2">
            Current favorite tech stack
          </h5>
          <div className="flex gap-4 flex-wrap">
            {currentFavoriteTechStack.map((stack) => {
              return (
                <div key={stack.icon} className="relative">
                  <DynamicSvgIcon
                    name={stack.icon}
                    className={`w-8 ${stack.color}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-start mt-10">
          <a
            href="/CV_Hari_Jess_2025.pdf" // Ganti dengan path CV kamu
            download
            className="group inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-accent text-black font-bold shadow-lg hover:ring-2 ring-accent ring-offset-4 active:ring-offset-1 ring-offset-primary transition-all"
          >
            {/* Icon Download */}
            <svg
              className="w-5 h-5 text-black transition-colors duration-200"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"
              />
            </svg>
            Download CV
          </a>
        </div>
      </div>
    </div>
  );
};

export default Bio;
