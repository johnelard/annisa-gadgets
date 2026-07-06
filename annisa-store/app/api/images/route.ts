import { NextRequest, NextResponse } from "next/server";

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || "demo";
const IMAGE_CACHE: Record<string, string> = {};

// Placeholder SVG for when image is not found
const PLACEHOLDER_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23f3f4f6' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='18' fill='%239ca3af' text-anchor='middle' dy='.3em'%3EProduct Image%3C/text%3E%3C/svg%3E`;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const productName = searchParams.get("product");
    const withColor = searchParams.get("color");

    if (!productName) {
      return NextResponse.json(
        { error: "Product name is required" },
        { status: 400 },
      );
    }

    const cacheKey = `${productName}-${withColor || ""}`;

    // Check cache first
    if (IMAGE_CACHE[cacheKey]) {
      return NextResponse.json({ imageUrl: IMAGE_CACHE[cacheKey] });
    }

    // Build search query
    const searchQuery = withColor ? `${productName} ${withColor}` : productName;

    // If no API key, return placeholder
    if (UNSPLASH_ACCESS_KEY === "demo") {
      IMAGE_CACHE[cacheKey] = PLACEHOLDER_SVG;
      return NextResponse.json({ imageUrl: PLACEHOLDER_SVG });
    }

    // Fetch from Unsplash
    const unsplashResponse = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchQuery)}&per_page=1&orientation=portrait`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      },
    );

    if (!unsplashResponse.ok) {
      throw new Error("Failed to fetch from Unsplash");
    }

    const data = await unsplashResponse.json();
    const imageUrl =
      data.results?.[0]?.urls?.regular || PLACEHOLDER_SVG;

    // Cache the result
    IMAGE_CACHE[cacheKey] = imageUrl;

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error("Image fetch error:", error);
    return NextResponse.json({ imageUrl: PLACEHOLDER_SVG });
  }
}
