import { NextResponse } from "next/server";
import { projects } from "@/utils/projects";
// GET PROJECTS
export async function GET() {
  return NextResponse.json({ projects });
}
