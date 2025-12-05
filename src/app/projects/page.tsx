// app/components/Projects.tsx
import ProjectsClient from "./ProjectsClient";
import { projects as rawProjects } from "@/constant/projects";

// helper pour résoudre la source de projets (tableau | fonction sync | fonction async)
type ProjectsSource = any[] | (() => any[] | Promise<any[]>);

async function resolveProjects(source: ProjectsSource): Promise<any[]> {
  if (typeof source === "function") {
    // cast en any pour autoriser l'appel indépendamment des annotations TS
    const result = (source as any)();
    return await Promise.resolve(result);
  }
  return source ?? [];
}

const Projects = async () => {
  const projectsData = await resolveProjects(rawProjects as ProjectsSource);

  const projectsArray = Array.isArray(projectsData) ? projectsData : [];

  // Déduplication par id
  const uniqueProjects = Array.from(
    new Map(projectsArray.map((item: any) => [item.id, item])).values()
  );

  // Construire les catégories à partir des tags (sécurisation si tags absent)
  const allTags = Array.from(
    new Set(
      uniqueProjects.flatMap((p: any) => (Array.isArray(p.tags) ? p.tags : []))
    )
  );

  const projectsCategoriesApi = allTags.map((tag, i) => ({
    id: i,
    query: tag,
  }));

  return (
    <div className="relative w-full h-full overflow-auto">
      <ProjectsClient
        projectsApi={uniqueProjects}
        projectsCategoriesApi={projectsCategoriesApi}
      />
    </div>
  );
};

export default Projects;
