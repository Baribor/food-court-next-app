import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../lib/db/models/user";
import Token from "../../../lib/db/models/token";
import { generateToken } from "../../../lib/utils/hashing";
import { dbConn } from "../../../lib/db/db-setup";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password, username } = req.body;

  try {
    dbConn();

    if (!email || !password || !username) {
      return res
        .status(401)
        .json({ message: "username, email and password required" });
    }

    let user = await User.query().findOne({ email });
    if (user)
      return res
        .status(401)
        .json({ message: "user with the email already exist" });

    user = await User.query().insert({ email, username, password });

    const token = await Token.query().insert({
      token: generateToken(),
      userId: user.id,
    });

    res
      .status(200)
      .json({ message: "sign up successfully", token: token.token });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}
