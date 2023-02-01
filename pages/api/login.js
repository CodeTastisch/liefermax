import cookie from "cookie";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { user, password } = req.body;
    if (
      user === process.env.ADMIN_USER &&
      password === process.env.ADMIN_PASSWORD
    ) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", process.env.TOKEN, {
          maxAge: 60 * 60,
          sameSite: "strict",
          path: "/",
        })
      );
      res.status(200).json("Erfolgreicher login");
    } else {
      res.status(400).json("Erfolgreicher fehlgeschlagen");
    }
  }
}
