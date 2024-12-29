import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function getUserIdFromToken(req: NextRequest): Promise<string> {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    throw new Error("No token found");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return decoded.userId;
  } catch (error) {
    throw new Error("Invalid token");
  }
}
