import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { getPortfolioData } from "@/lib/portfolio";

export async function GET(request: NextRequest) {
  const data = await getPortfolioData();
  const resumeUrl = data?.profile?.resumeUrl;

  if (!resumeUrl) {
    return new Response("Resume URL not found", { status: 404 });
  }

  const action = request.nextUrl.searchParams.get("action");

  let targetUrl: string | undefined;

  if (typeof resumeUrl === "string") {
    targetUrl = resumeUrl;
  } else {
    targetUrl =
      action === "preview"
        ? resumeUrl.preview || resumeUrl.download
        : resumeUrl.download || resumeUrl.preview;
  }

  if (!targetUrl) {
    return new Response("Target resume URL not configured", { status: 404 });
  }

  redirect(targetUrl);
}
