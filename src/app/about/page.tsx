"use client";
// import { Metadata } from "next";
// import Image from "next/image";
import DynamicSvgIcon from "../../components/svg/DynamicSvgIcon";
import { useEffect, useRef, useState } from "react";
// import Footer from "../../components/footer/Footer";
import Bio from "../../components/about/bio/Bio";
// import Content from "../../components/about/skills/Skills";
import Skills from "../../components/about/skills/Skills";
import {
  backend,
  database,
  frontend,
  others,
} from "../../components/about/skills/skillIcons";
import useSWR from "swr";
import Music from "../../components/about/music/Music";
// import SpotifyNowPlayingSkeleton from "@/components/loading-skeleton/SpotifyNowPlayingSkeleton";
import { useAppContext } from "@/context/AppContext";

// export const metadata: Metadata = {
//   title: "Hari Jess | About",
//   description: "About page portofolio",
//   icons: {
//     icon: "/favicon.ico",
//   },
// }

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const About = () => {
  const [personalInfoActive, setPersonalInfoActive] = useState(true);
  const [contactActive, setContactActive] = useState(true);
  // const { data, error, isLoading } = useSWR(`/api/now-playing`, fetcher);
  const context = useAppContext();

  useEffect(() => {
    if (context.smallDevices) {
      setContactActive(false);
      setPersonalInfoActive(false);
    }
  }, []);

  // Folder and files state
  const [folders, setFolders] = useState([
    {
      folderName: "bio",
      files: [{ fileName: "Bio.tsx", component: <Bio /> }],
      isActiveFolder: true,
    },
    {
      folderName: "skills",
      files: [
        {
          fileName: "Frontend.tsx",
          component: <Skills skills={frontend} title="front-end" />,
        },
        {
          fileName: "Backend.tsx",
          component: <Skills skills={backend} title="back-end" />,
        },
        {
          fileName: "Database.tsx",
          component: <Skills skills={database} title="database" />,
        },
        {
          fileName: "Others.tsx",
          component: <Skills skills={others} title="others" />,
        },
      ],
      isActiveFolder: false,
    },
    {
      folderName: "interest",
      files: [{ fileName: "Music.tsx", component: <Music /> }],
      isActiveFolder: true,
    },
  ]);

  const contactList = [
    {
      icon: "mail",
      href: "https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=rakotoarisoaharijesy@gmail.com&subject=MISSED%20CALL%20EZTRADER&body=Just%20wanted%20to%20say%20hi%20:D",
      name: "rakotoarisoaharijesy@gmail.com",
    },
    // {
    // icon: "instagram",
    //   href: "https://instagram.com/hjess3725",
    //   name: "hjess3725",
    // },
  ];

  const [activeFiles, setActiveFiles] = useState<any>({
    folderName: "bio",
    fileName: "Bio.tsx",
    component: <Bio />,
  });

  const [tabActive, setTabActive] = useState([
    { folder: "bio", fileName: "Bio.tsx" },
  ]);

  function activeFolderHanlder(current: any) {
    const folderFindIndex = folders.findIndex(
      (folder) => folder.folderName === current.folderName
    );
    const editedFolder = (folders[folderFindIndex] = {
      ...folders[folderFindIndex],
      isActiveFolder: folders[folderFindIndex].isActiveFolder ? false : true,
    });

    const updatedFolder = [...folders];
    updatedFolder[folderFindIndex] = editedFolder;
    setFolders(updatedFolder);
  }

  function activeFilesHanlder(folder: any, file: any) {
    if (activeFiles.fileName === file.fileName) return;
    setActiveFiles({
      folder,
      fileName: file.fileName,
      component: file.component,
    });

    if (tabActive.every((tab) => tab.fileName != file.fileName)) {
      setTabActive([...tabActive, { folder, fileName: file.fileName }]);
    }
  }

  function removeTabHandler(currentTab: any) {
    if (currentTab.fileName === activeFiles.fileName) {
      setActiveFiles({});
    }

    const filteredTabActive = tabActive.filter(
      (tab) => tab.fileName !== currentTab.fileName
    );
    setTabActive(filteredTabActive);
  }

  function switchTabHandler(e: any, tab: any) {
    if (e.target.id === "switch-tab") {
      const filteredFolder = folders.filter(
        (folder) => folder.folderName === tab.folder
      );
      const filteredFiles = filteredFolder[0].files.filter(
        (file) => file.fileName === tab.fileName
      );
      setActiveFiles(filteredFiles[0]);
    }
  }

  useEffect(() => {
    if (tabActive.length === 0) setActiveFiles({});
  }, [tabActive]);

  return (
    <div className="flex h-full md:flex-row flex-col ">
      <section className="flex max-w-full md:max-w-[275px] w-full">
        <div className="px-4 py-4 border-r border-line md:block hidden">
          <DynamicSvgIcon name="file" className="w-6" />
        </div>
        <div className="flex flex-col flex-1 border-r border-line">
          <div className="max-h-60 overflow-auto">
            <h4
              onClick={() => setPersonalInfoActive(!personalInfoActive)}
              className="sticky top-0 z-10 bg-primary cursor-pointer text-secondary flex gap-2 px-6 p-2 md:p-2 border-b border-line"
            >
              <DynamicSvgIcon
                name="trianglePrimary"
                className={`w-[10px] ${
                  personalInfoActive ? "" : "-rotate-90"
                } transition-all`}
              />{" "}
              personal-info
            </h4>
            <div
              className={`transition-maxHeight ${
                personalInfoActive ? "max-h-[512px]" : "max-h-0"
              } overflow-hidden`}
            >
              {folders.map((folder) => {
                return (
                  <div key={folder.folderName}>
                    <div className="flex flex-col">
                      <button
                        onClick={() => activeFolderHanlder(folder)}
                        className={`hover:text-secondary flex gap-2 items-baseline hover:button-hover py-2 px-6 md:px-2 md:py-2`}
                      >
                        <DynamicSvgIcon
                          name="triangleSecondary"
                          className={`w-2 ${
                            folder.isActiveFolder ? "rotate-90" : ""
                          } transition-all`}
                        />
                        <DynamicSvgIcon
                          name="folder"
                          className="w-4 fill-accent"
                        />
                        <h5>{folder.folderName}</h5>
                      </button>
                      <div
                        className={`${
                          folder.isActiveFolder ? "max-h-56" : "max-h-0"
                        } transition-maxHeight overflow-hidden `}
                      >
                        {folder.files.map((file) => {
                          return (
                            <button
                              onClick={() =>
                                activeFilesHanlder(folder.folderName, file)
                              }
                              key={file.fileName}
                              className={`flex button-hover ${
                                file.fileName === activeFiles.fileName
                                  ? "bg-button-active text-secondary"
                                  : ""
                              } gap-2 w-full px-6 py-2`}
                            >
                              <DynamicSvgIcon
                                name="react"
                                className="w-4 fill-blue-400"
                              />
                              <h6>{file.fileName}</h6>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h4
              onClick={() => setContactActive(!contactActive)}
              className="text-secondary flex gap-2 py-2 px-6 md:px-2 md:py-2 border-y border-line cursor-pointer"
            >
              <DynamicSvgIcon
                name="trianglePrimary"
                className={`w-[10px] ${
                  contactActive ? "" : "-rotate-[90deg]"
                } transition-all`}
              />{" "}
              contact
            </h4>
            <div
              className={`px-6 md:px-2 space-y-3 ${
                contactActive ? "max-h-24" : "max-h-0"
              } transition-maxHeight overflow-hidden`}
            >
              {contactList.map((contact) => {
                return (
                  <a
                    key={contact.icon}
                    href={contact.href}
                    target="_blank"
                    className={` ${
                      contact.icon === "mail" ? "mt-3" : "pb-3"
                    } flex gap-2 w-max cursor-link hover:underline`}
                  >
                    <DynamicSvgIcon name={contact.icon} className="w-4" />
                    <p
                      style={{
                        width: "175px",
                        overflowWrap: "anywhere",
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                      }}
                    >
                      {contact.name}
                    </p>
                  </a>
                );
              })}
            </div>
          </div>
          {/* Spotify section */}
          {/* <div>
            <h4 className="text-secondary flex gap-2 py-2 px-6 md:px-2 md:py-2 border-y border-line cursor-not-allowed">
              <DynamicSvgIcon name="trianglePrimary" className={`w-[10px]`} />
              spotify now playing
            </h4>
            {isLoading && <SpotifyNowPlayingSkeleton />}
            {!data?.isPlaying && !isLoading && (
              <div className="flex gap-2 py-2 px-6 md:px-2 md:py-2 items-center cursor-help">
                <DynamicSvgIcon
                  name="spotify"
                  width={50}
                  height={50}
                  alt="spotify"
                  className="self-start text-accent fill-accent"
                />
                <div>
                  <h4 className="text-[12px] [word-spacing:-2px] text-secondary">
                    Not listening to anything
                  </h4>
                  <p className="text-[10px] [word-spacing:-2px]">
                    Spotify is paused or inactive
                  </p>
                  <div className="flex gap-[3px] opacity-40">
                    <span className="bg-accent w-1 h-2 inline-block rounded-full"></span>
                    <span className="bg-accent w-1 h-2 inline-block rounded-full"></span>
                    <span className="bg-accent w-1 h-2 inline-block rounded-full"></span>
                    <span className="bg-accent w-1 h-2 inline-block rounded-full"></span>
                    <span className="bg-accent w-1 h-2 inline-block rounded-full"></span>
                  </div>
                </div>
              </div>
            )}
            {data?.isPlaying && !isLoading && (
              <a
                href={data?.songUrl}
                target="_blank"
                className="flex cursor-link gap-2 py-2 px-6 md:px-2 md:py-2 items-center"
              >
                <Image
                  src={data?.albumImageUrl}
                  width={50}
                  height={50}
                  alt="spotify album"
                  className="self-start"
                  placeholder="blur"
                  blurDataURL={data?.hashImage}
                />
                <div>
                  <h4 className="text-[12px] [word-spacing:-2px] text-secondary">
                    {data?.title}
                  </h4>
                  <p className="text-[10px] [word-spacing:-2px]">
                    {data?.artist}
                  </p>
                  <div className="flex gap-[3px]">
                    <span className="bg-accent w-1 h-3 inline-block rounded-full animate-quiet-sound-wave"></span>
                    <span className="bg-accent w-1 h-3 inline-block rounded-full animate-normal-sound-wave"></span>
                    <span className="bg-accent w-1 h-3 inline-block rounded-full animate-quiet-sound-wave"></span>
                    <span className="bg-accent w-1 h-3 inline-block rounded-full animate-loud-sound-wave"></span>
                    <span className="bg-accent w-1 h-3 inline-block rounded-full animate-quiet-sound-wave"></span>
                  </div>
                </div>
              </a>
            )}
          </div> */}
        </div>
      </section>
      <section className="flex-1 flex flex-col max-w-full overflow-hidden">
        <div className="flex border-b border-line overflow-auto">
          <div className="overflow-auto md:flex hidden">
            {tabActive?.map((tab: any) => (
              <p
                key={tab.fileName}
                id="switch-tab"
                onClick={(e) => switchTabHandler(e, tab)}
                className={`w-max border-line cursor-pointer px-3 py-2 border-r flex gap-4 ${
                  activeFiles?.fileName === tab.fileName ? "text-secondary" : ""
                }`}
              >
                {tab.fileName}
                <button onClick={() => removeTabHandler(tab)} className="p-1">
                  <DynamicSvgIcon name="xmark" className="w-[10px]" />
                </button>
              </p>
            ))}
          </div>
        </div>
        <div className="h-[93%] flex-1">
          {Object.keys(activeFiles).length !== 0 && activeFiles.component}
        </div>
      </section>
    </div>
  );
};

export default About;
