import { serialize } from "cookie";
import { getUserByEmail } from "@/db/queries";
import bcrypt from "bcryptjs";
import generateToken from "@/helpers/generateToken";

export default async function login(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
  }
  const { email, password } = req.body;

  try {
    const result = await getUserByEmail(email);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = result.rows[0];

    const isValidPassword = bcrypt.compareSync(password, user.password_digest);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = await generateToken({
      username: user.username,
      email: user.email,
    });

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
