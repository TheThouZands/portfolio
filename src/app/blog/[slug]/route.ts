import { NextResponse, type NextRequest } from "next/server";
import { resolveBareBlogPostRoute } from "@/cms/blog";
import { getCookieLocale } from "@/i18n/locale";

type BareBlogPostRouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(request: NextRequest, { params }: BareBlogPostRouteContext) {
  const { slug } = await params;
  const postRoute = await resolveBareBlogPostRoute(slug);

  if (!postRoute) {
    const locale = getCookieLocale(request);

    return NextResponse.redirect(new URL(`/${locale}/blog/${slug}`, request.url), 307);
  }

  return NextResponse.redirect(
    new URL(`/${postRoute.locale}/blog/${postRoute.slug}`, request.url),
    308,
  );
}
