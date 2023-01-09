import type { NextApiResponse, NextApiRequest } from "next";
import { dbConn } from "../db/db-setup";
import type { Handler, AuthNextApiRequest } from "../utils/types";

export default function withRole(handler: Handler, role: string) {
  /*
    This middlerware should be used after the authenticated middleware has ran since it requires a user. 
    */

  return async (req: AuthNextApiRequest, res: NextApiResponse) => {
    const user = req.user;
    const targetRole = await user.$relatedQuery("roles").findOne({ role });

    if (!targetRole) {
      return res.status(401).json({
        message: "You are not authorized to carry out this operation.",
      });
    }

    return handler(req, res);
  };
}
