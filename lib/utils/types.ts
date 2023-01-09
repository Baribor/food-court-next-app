import { NextApiRequest, NextApiResponse } from "next";
import { Model } from "objection";
import User from "../db/models/user";

interface AuthNextApiRequest extends NextApiRequest {
  user: User;
}

type Handler = (req: AuthNextApiRequest, res: NextApiResponse) => any;

export type { AuthNextApiRequest, Handler };
