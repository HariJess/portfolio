import { NextResponse } from "next/server";
import { projects } from "@/constant/projects";
// GET PROJECTS
export async function GET() {
  return NextResponse.json({ projects });
}
