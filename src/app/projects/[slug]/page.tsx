// app/projects/[slug]/page.tsx
import ProjectDetailClient from "./ProjectDetailClient";
import { projects as rawProjects } from "@/constant/projects";
import { notFound } from "next/navigation";

async function getAllProjects(): Promise<any[]> {
  return Array.isArray(rawProjects) ? rawProjects : [];
}

async function getProjectBySlug(slug: string): Promise<any | undefined> {
  const list = await getAllProjects();
  return list.find((p: any) => p.slug === slug);
}

const ProjectDetailPage = async ({ params }: { params: { slug: string } }) => {
  const projects = await getAllProjects();
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    // renvoie un 404 côté serveur (Next.js App Router)
    notFound();
  }

  return (
    <div className="bg-gradient-to-br from-primary to-accent/30 h-full">
      <ProjectDetailClient project={project} allProjects={projects} />
    </div>
  );
};

export default ProjectDetailPage;
