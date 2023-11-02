import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.auth_token;
  if (!token) {
    console.log("No auth token found");
    return new NextResponse(
      JSON.stringify({ error: { message: "authentication required" } }),
      { status: 401 }
    );
  }

  console.log("Auth token found");

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return user;
  } catch (error) {
    console.log("Not authenticated", error);
    return new NextResponse(
      JSON.stringify({ error: { message: "authentication required" } }),
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ["/api/createFavoriteGame", "/api/removeFavoriteGame"],
};
