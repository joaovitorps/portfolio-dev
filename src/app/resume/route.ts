import { getPortfolioData } from "@/lib/portfolio";
import { redirect } from "next/navigation";

export async function GET() {
  const data = await getPortfolioData();

  if (!data.profile.resumeUrl) {
    return new Response("Resume URL not found", { status: 404 });
  }

  redirect(data.profile.resumeUrl);
}
