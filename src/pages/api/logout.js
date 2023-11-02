import { serialize } from "cookie";

export default function logout(req, res) {
  res.setHeader(
    "Set-Cookie",
    serialize("auth_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: -1,
      sameSite: "Strict",
      path: "/",
    })
  );

  res.status(200).json({ message: "Logout successful" });
}
