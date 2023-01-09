import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../lib/db/models/user";
import Token from "../../../lib/db/models/token";
import authenticated from "../../../lib/middlewares/authenticated";
import type { AuthNextApiRequest } from "../../../lib/utils/types";

async function handler(req: AuthNextApiRequest, res: NextApiResponse) {
  try {
    await Token.query().delete().where("userId", "=", req.user.id);

    res.status(200).json({ message: "successfully logout" });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}

export default authenticated(handler);
