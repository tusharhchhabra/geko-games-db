import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = req.cookies.auth_token;
  if (!token) {
    console.log("No auth token found");
    return new NextResponse(
      JSON.stringify({ error: { message: "Authentication required" } }),
      { status: 401 }
    );
  }

  console.log("Auth token found");

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return NextResponse.next();
  } catch (error) {
    console.log("Invalid token or verification failed", error);
    return new NextResponse(
      JSON.stringify({ error: { message: "Authentication required" } }),
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ["/games/:id*"],
};
