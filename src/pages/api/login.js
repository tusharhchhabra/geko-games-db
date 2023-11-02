import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { getUserByEmail } from "@/db/queries";
import bcrypt from "bcryptjs";

export default async function login(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
  }
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const result = await getUserByEmail(email);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = result.rows[0];
    console.log(user);
    const isValidPassword = bcrypt.compareSync(password, user.password_digest);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.setHeader(
      "Set-Cookie",
      serialize("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 3600,
        sameSite: "Strict",
        path: "/",
      })
    );

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
