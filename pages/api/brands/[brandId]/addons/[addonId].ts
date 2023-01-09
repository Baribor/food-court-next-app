import type { NextApiRequest, NextApiResponse } from "next";

import AddOn from "../../../../../lib/db/models/addon";
import Category from "../../../../../lib/db/models/category";
import withRole from "../../../../../lib/middlewares/withRole";
import authenticated from "../../../../../lib/middlewares/authenticated";
import { roles } from "../../../../../lib/utils/constants";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    body: { price, category, name, description },
  } = req;
  const { addonId, brandId } = req.query;

  try {
    switch (method) {
      case "PATCH":
        const data = req.body;
        if (price) data.price = parseFloat(price!);

        if (category) {
          const cat = await Category.query().findOne({ name: category });
          if (!cat)
            return res.status(401).json({ message: "Category not found" });
        }

        const addonDb = await AddOn.query().findOne({ id: addonId, brandId });

        if (!addonDb)
          return res.status(401).json({ message: "addon does not exist" });

        const updatedAddon = await AddOn.query()
          .patch(data)
          .where({ id: addonId, brandId })
          .returning("*");

        if (!updatedAddon)
          return res.status(401).json({ message: "Addon not found" });

        return res
          .status(200)
          .json({ message: "Addon updated", addon: updatedAddon });

      case "GET":
        const addon = await AddOn.query().findOne({ id: addonId, brandId });

        if (!addon) return res.status(401).json({ message: "Addon not found" });

        return res.status(200).json({ message: "Addon retrieved", addon });

      case "DELETE":
        const removedAddon = await AddOn.query()
          .delete()
          .where({ id: addonId, brandId })
          .returning("*");

        if (!removedAddon)
          return res.status(401).json({ message: "Addon not found" });

        return res
          .status(200)
          .json({ message: "Addon deleted", addon: removedAddon });

      default:
        res.status(401).json({ message: "Unknown request method." });
    }
  } catch (err) {
    res.status(500).json({ message: "An error occurred try again later" });
  }
}

export default authenticated(withRole(handler, roles.ADMIN));
