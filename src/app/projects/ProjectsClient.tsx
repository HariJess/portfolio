"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import DynamicSvgIcon from "@/components/svg/DynamicSvgIcon";
import { tagIconColorList } from "@/constant/tagIconColor";
import { formatDate } from "@/utils/formatDate";

interface ProjectsClientProps {
  projectsApi: any[];
  projectsCategoriesApi: any[];
  showFilter?: boolean;
}

const ProjectsClient = ({
  projectsApi,
  projectsCategoriesApi,
  showFilter = false,
}: ProjectsClientProps) => {
  const [projects, setProjects] = useState<any[]>(projectsApi);
  const [queryLanguage, setQueryLanguage] = useState<string[]>([]);
  const [tagsActive, setTagsActive] = useState<boolean>(true);

  function filterCategoryHandler(tag: string) {
    setQueryLanguage((prevQueryLanguage) => {
      if (!prevQueryLanguage.includes(tag)) {
        return [...prevQueryLanguage, tag];
      } else {
        return prevQueryLanguage.filter((q) => q !== tag);
      }
    });
  }

  useEffect(() => {
    if (queryLanguage.length === 0) {
      const sorted = [...projectsApi].sort(
        (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
      );
      setProjects(sorted);
    } else {
      const filtered = projectsApi.filter((project: any) =>
        queryLanguage.every((query) => project.tags.includes(query))
      );
      const sorted = [...filtered].sort(
        (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
      );
      setProjects(sorted);
    }
  }, [queryLanguage, projectsApi]);

  return (
    <div className="flex h-full md:flex-row flex-col">
      {/* Sidebar */}
      <section className="flex max-w-full md:max-w-[275px] w-full">
        <div className="px-4 py-4 border-r border-line md:block hidden bg-primary/20">
          <DynamicSvgIcon name="file" className="w-6" />
        </div>

        {/* Tags section */}
        <div className="flex flex-col flex-1 border-r border-line w-full h-full">
          <h4
            onClick={() => setTagsActive(!tagsActive)}
            className="sticky top-0 z-10 bg-primary cursor-pointer text-secondary flex gap-2 px-6 py-2 border-b border-line"
          >
            <DynamicSvgIcon
              name="trianglePrimary"
              className={`w-[10px] ${
                tagsActive ? "" : "-rotate-90"
              } transition-all`}
            />
            languages & tools
          </h4>

          {/* Ici : la zone qui s'ouvre devient scrollable lorsque active */}
          <div
            className={`transition-all duration-300 ${
              tagsActive
                ? "max-h-[60vh] overflow-auto"
                : "max-h-0 overflow-hidden"
            }`}
          >
            {projectsCategoriesApi.map((cat: any) => {
              const isActive = queryLanguage.includes(cat.query);
              const found = tagIconColorList.find(
                (item) => item.tag === cat.query
              );
              const iconName = found?.icon || "file";
              const iconStyle =
                !isActive && found?.color ? { color: found.color } : {};

              const baseBtn =
                "w-full flex gap-2 items-center px-6 py-2 transition-all text-secondary text-left";
              const activeBtn = "bg-accent text-black";
              const inactiveBtn = "hover:bg-primary/30";

              return (
                <button
                  key={cat.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={(e) => {
                    e.stopPropagation();
                    filterCategoryHandler(cat.query);
                  }}
                  className={`${baseBtn} ${isActive ? activeBtn : inactiveBtn}`}
                >
                  <DynamicSvgIcon
                    name={iconName}
                    className="w-4 h-4"
                    style={iconStyle}
                  />
                  <span className="text-sm">{cat.query}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main content section */}
      <section className="flex-1 flex flex-col max-w-full overflow-hidden">
        {/* Projects Grid */}
        <div className="flex-1 min-h-0 px-6 overflow-auto">
          {projects.length === 0 && (
            <div className="flex justify-center items-center h-full">
              <p className="text-xl text-center font-semibold">
                OOPS! THE PROJECT DOESN&apos;T YET EXIST, IT&apos;S COMING
                SOON...
              </p>
            </div>
          )}

          {projects.length > 0 && (
            <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-6 py-8">
              {projects.map((project: any) => (
                <Link
                  href={`/projects/${project.slug}`}
                  key={project.id}
                  className="relative border border-line p-0 rounded-2xl overflow-hidden group min-h-[260px] flex flex-col justify-end shadow-2xl bg-black/60 transition-transform duration-300 hover:scale-[1.03] hover:shadow-accent/30 hover:shadow-2xl"
                >
                  <div className="absolute inset-0 w-full h-full z-0 transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 group-hover:from-black/90 transition-colors duration-300" />
                    <div className="absolute inset-0 bg-black/80 transition-all duration-300 group-hover:bg-transparent"></div>
                  </div>
                  <div className="relative z-10 p-6 flex flex-col gap-3 h-full">
                    <h4 className="text-accent text-xl font-bold drop-shadow-md mb-1">
                      {project.title}
                    </h4>
                    <p className="text-xs text-gray-400 mb-1">
                      Created at: {formatDate(project.created)}
                    </p>
                    <p className="line-clamp-3 text-secondary drop-shadow-md mb-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.tags.map((tag: string, idx: number) => (
                        <span
                          key={idx}
                          className="bg-[#1c2a3a] text-accent text-xs px-3 py-1 rounded-full font-semibold shadow hover:bg-accent/70 transition-all duration-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="text-accent mt-auto font-semibold underline underline-offset-2 hover:text-white transition-colors duration-200">
                      {"view project →"}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProjectsClient;
