import { jwtVerify } from "jose";

export default async function getUser(req, res) {
  const token = req.cookies.auth_token;
  if (!token) {
    return res.status(200).json({ authStatus: "Not logged in." });
  }

  try {
    const tokenResponse = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    res.status(200).json({ user: tokenResponse.payload });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}
