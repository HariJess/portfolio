import ProjectsClient from "./ProjectsClient";

// TESTING

const fetchProjectsApi = async () => {
  // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`/api/projects`, { cache: "no-store" });
  if (!res.ok) {
    // Untuk debugging, log error response
    const text = await res.text();
    throw new Error(`Failed to fetch projects: ${res.status} - ${text}`);
  }
  return await res.json();
};

const Projects = async () => {
  const { projects } = await fetchProjectsApi();

  // Deduplicate projects by id
  const uniqueProjects = Array.from(
    new Map(projects.map((item: any) => [item.id, item])).values()
  );

  // Build categories from tags
  const allTags = Array.from(
    new Set(uniqueProjects.flatMap((p: any) => p.tags))
  );
  const projectsCategoriesApi = allTags.map((tag, i) => ({
    id: i,
    query: tag,
    // Optionally add icon mapping here
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
