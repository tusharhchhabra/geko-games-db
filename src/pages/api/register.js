import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { createUser } from "@/db/queries";
import bcrypt from "bcryptjs";

export default async function register(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
  }
  const { username, email, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const passwordDigest = bcrypt.hashSync(password, salt);

  try {
    await createUser(username, email, passwordDigest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }

  const userTokenContent = { username, email };

  const token = jwt.sign(userTokenContent, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.setHeader(
    "Set-Cookie",
    serialize("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60,
      sameSite: "Strict",
      path: "/",
    })
  );

  res.status(200).json({ message: "Registration successful - logged in!" });
}
