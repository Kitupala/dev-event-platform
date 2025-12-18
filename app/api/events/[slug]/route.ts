import { NextResponse, type NextRequest } from "next/server";

import Event from "@/database/event.model";
import { isNonEmptyString, isValidSlug } from "@/lib/model-helpers";
import { dbConnect } from "@/lib/mongodb";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(
  _req: NextRequest,
  { params }: RouteContext,
): Promise<NextResponse> {
  try {
    const { slug } = await params;

    // ---- Validation ----
    if (!isNonEmptyString(slug)) {
      return NextResponse.json(
        { message: "Missing required route parameter: slug." },
        { status: 400 },
      );
    }

    const normalizedSlug = slug.trim().toLowerCase();

    if (!isValidSlug(normalizedSlug)) {
      return NextResponse.json(
        {
          message:
            "Invalid slug format. Expected lowercase letters/numbers and hyphens.",
        },
        { status: 400 },
      );
    }

    await dbConnect();

    const event = await Event.findOne({ slug: normalizedSlug }).lean();

    if (!event) {
      return NextResponse.json(
        { message: "Event not found." },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "Event fetched successfully.",
        event,
      },
      { status: 200 },
    );
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      {
        message: "Failed to fetch event.",
        error: e instanceof Error ? e.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
