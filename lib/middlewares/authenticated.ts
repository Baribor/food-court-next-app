import type { NextApiResponse, NextApiRequest } from "next";
import { NextResponse } from "next/server";
import Token from "../db/models/token";
import User from "../db/models/user";
import { dbConn } from "../db/db-setup";
import type { Handler, AuthNextApiRequest } from "../utils/types";

export default function authenticated(handler: Handler) {
  return async (req: AuthNextApiRequest, res: NextApiResponse) => {
    try {
      dbConn();
      if (!req.headers?.authorization)
        return res
          .status(401)
          .json({ message: "no authorization token provided" });

      const token = await Token.query()
        .findOne({ token: req.headers.authorization.split(" ")[1] })
        .withGraphFetched("user");

      if (!token)
        return res.status(401).json({ message: "Invalid token provided" });

      req.user = token.user;
      return handler(req, res);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  };
}
