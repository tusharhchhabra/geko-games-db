import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = req.cookies.get("auth_token").value;
  if (!token) {
    return new NextResponse(
      JSON.stringify({ error: { message: "Authentication required" } }),
      { status: 401 }
    );
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return NextResponse.next();
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: { message: "Invalid token" } }),
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ["/games/:id*"],
};
