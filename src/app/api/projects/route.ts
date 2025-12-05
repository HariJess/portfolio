import { NextResponse } from "next/server";

// GET PROJECTS
export async function GET() {
  try {
    // import dynamique pour attraper les erreurs d'import au runtime
    const mod = await import("@/utils/projects");
    const projects = mod.projects ?? null;

    // vérification que c'est sérialisable JSON
    let safe;
    try {
      safe = JSON.parse(JSON.stringify(projects));
    } catch (e) {
      console.error("projects n'est pas sérialisable JSON :", e);
      // convertir manuellement si besoin (ex: Dates -> toISOString)
      // safe = projects.map(p => ({ ...p, date: p.date?.toISOString?.() ?? p.date }));
      return NextResponse.json(
        { error: "projects n'est pas sérialisable JSON" },
        { status: 500 }
      );
    }

    return NextResponse.json({ projects: safe });
  } catch (err) {
    // log complet dans la console (visible dans les logs serveur)
    console.error("GET /projects ERROR:", err);
    // renvoyer un message d'erreur (utile pour debug ; retirer en prod)
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
