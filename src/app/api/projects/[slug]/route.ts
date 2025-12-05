import { NextResponse } from "next/server";
import { projects } from "@/utils/projects";

// GET PROJECT BY ID
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(project);
}
