import jwt from "jsonwebtoken";

export default function handler(req, res) {
  const token = req.cookies.auth_token;
  console.log(req.cookies);
  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    res.status(200).json({ user: decoded });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}
