import { SignJWT } from "jose";

export default async function generateToken(payload) {
  const secret = process.env.JWT_SECRET;
  const encoder = new TextEncoder();

  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(encoder.encode(secret));

  return jwt;
}
