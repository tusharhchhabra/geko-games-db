import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.auth_token;
  if (!token) {
    console.log("No auth token found");
    return new Response(null, { status: 401, message: "Not authenticated" });
  }

  console.log("Auth token found");

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return user;
  } catch (error) {
    console.log("Not authenticated", error);
    return new Response(null, { status: 401, message: "Not authenticated" });
  }
}

export const config = {
  matcher: [
    "/api/createFavoriteGame",
    "/api/removeFavoriteGame",
    "/games/:id*",
  ],
};
