import { NextRequest, NextResponse } from "next/server";

const ALLOWED_DOMAINS = [
  "www.fcbarcelona.com",
  "fcbarcelona.com",
  "fcbarcelona-static-files.s3.us-east-1.amazonaws.com",
];

export async function GET(request: NextRequest) {
  try {
    const imageUrl = request.nextUrl.searchParams.get("url");

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Missing url parameter" },
        { status: 400 }
      );
    }

    // Validate domain for security
    const parsed = new URL(imageUrl);
    if (!ALLOWED_DOMAINS.includes(parsed.hostname)) {
      return NextResponse.json(
        { error: "Domain not allowed" },
        { status: 403 }
      );
    }

    const response = await fetch(imageUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        Referer: "https://www.fcbarcelona.com/",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch image" },
        { status: response.status }
      );
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const buffer = await response.arrayBuffer();

    // Extract filename from URL
    const pathParts = parsed.pathname.split("/");
    const filename =
      pathParts[pathParts.length - 1] || `fcb-photo-${Date.now()}.jpg`;

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("Download proxy error:", error);
    return NextResponse.json(
      { error: "Failed to download image" },
      { status: 500 }
    );
  }
}
