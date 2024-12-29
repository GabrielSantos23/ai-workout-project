import { NextResponse } from "next/server";
import { getUserIdFromToken } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const userId = await getUserIdFromToken(req);
    // If getUserIdFromToken doesn't throw, the user is authenticated
    return NextResponse.json({ isAuthenticated: true });
  } catch (error) {
    // If getUserIdFromToken throws, the user is not authenticated
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }
}
