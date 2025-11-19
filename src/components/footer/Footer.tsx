"use client";

import DynamicSvgIcon from "../svg/DynamicSvgIcon";

const Footer = () => {
  const findMeInLinks = [
    {
      name: "linkedin",
      href: "https://linkedin.com/in/harijesy-rakotoarisoa-5301872b6",
    },
    // {
    //   name: "instagram",
    //   href: "#",
    // },
    // {
    //   name: "spotify",
    //   href: "#",
    // },
  ];

  return (
    <footer className="border-t border-line h-[7%] w-full flex sm:justify-between z-10 bg-primary relative">
      <div className="flex">
        <h4 className="px-6 h-auto flex text-xs items-center border-r border-line">
          find me in:{" "}
        </h4>
        <div className="flex justify-center items-center flex-1">
          {findMeInLinks.map((link) => {
            return (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                className={`px-4 cursor-link flex-1 border-r border-line button-hover h-full`}
              >
                <DynamicSvgIcon name={link.name} className={`w-4 h-full`} />
              </a>
            );
          })}
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
  );
};

export default Footer;
