import { NextResponse, type NextRequest } from "next/server";
import { resolveBareBlogPostRoute } from "@/cms/blog";

type BareBlogPostRouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(request: NextRequest, { params }: BareBlogPostRouteContext) {
  const { slug } = await params;
  const postRoute = await resolveBareBlogPostRoute(slug);

  if (!postRoute) {
    return new Response(null, { status: 404 });
  }

  return NextResponse.redirect(
    new URL(`/${postRoute.locale}/blog/${postRoute.slug}`, request.url),
    308,
  );
}
