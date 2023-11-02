// import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // const token = req.cookies.auth_token;
  // if (!token) {
  //   console.log("No auth token found");
  //   return new NextResponse(
  //     JSON.stringify({ error: { message: "authentication required" } }),
  //     { status: 401 }
  //   );
  // }

  // console.log("Auth token found");

  // try {
  // if (jwt.verify(token, process.env.JWT_SECRET)) {
  return NextResponse.next();
  // } else {
  console.log("Invalid token", error);
  return new NextResponse(
    JSON.stringify({ error: { message: "authentication required" } }),
    { status: 401 }
  );
  // }
  // } catch (error) {
  //   // console.log("Not authenticated", error);
  //   return new NextResponse(
  //     JSON.stringify({ error: { message: "authentication required" } }),
  //     { status: 401 }
  //   );
  // }
}

// export const config = {
//   matcher: ["/api/createFavoriteGame", "/api/removeFavoriteGame"],
// };
