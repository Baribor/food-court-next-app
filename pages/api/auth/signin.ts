import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../lib/db/models/user";
import Token from "../../../lib/db/models/token";
import { dbConn } from "../../../lib/db/db-setup";
import { generateToken } from "../../../lib/utils/hashing";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;
  try {
    dbConn();
    if (!email || !password) {
      return res.status(401).json({ message: "email and password required" });
    }

    const user = await User.query().findOne({ email }).returning("*");
    const correctPassword = await user?.comparePassword(password);

    if (!(user && correctPassword))
      return res
        .status(401)
        .json({ message: "Incorrect credentials provided" });

    let token = await Token.query().findOne({ userId: user.id });

    const newToken = generateToken();

    token
      ? await Token.query()
          .patch({
            token: newToken,
          })
          .findById(token.id)
      : await Token.query().insert({
          userId: user.id,
          token: newToken,
        });

    res
      .status(200)
      .json({ message: "successfully logged in", token: newToken });
  } catch (err) {
    res.status(500).json({ message: "An error occurred, try again later" });
  }
}
