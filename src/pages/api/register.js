import { serialize } from "cookie";
import { createUser } from "@/db/queries";
import bcrypt from "bcryptjs";
import generateToken from "@/helpers/generateToken";

export default async function register(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
  }
  const { username, email, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const passwordDigest = bcrypt.hashSync(password, salt);

  try {
    const createdUser = await createUser(username, email, passwordDigest);
    const userTokenContent = { id: createdUser.id, username, email };

    const token = await generateToken(userTokenContent);

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
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
