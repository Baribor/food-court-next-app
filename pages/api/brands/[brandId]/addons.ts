import type { NextApiRequest, NextApiResponse } from "next";

import AddOn from "../../../../lib/db/models/addon";
import Brand from "../../../../lib/db/models/brand";
import Category from "../../../../lib/db/models/category";
import authenticated from "../../../../lib/middlewares/authenticated";
import withRole from "../../../../lib/middlewares/withRole";
import { roles } from "../../../../lib/utils/constants";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { brandId },
    body: { name, price, description, category },
    method,
  } = req;

  try {
    switch (method) {
      case "POST":
        if (!name || !price)
          return res
            .status(401)
            .json({ message: "name and price are required" });

        const brandDb = await Brand.query().findOne({ id: brandId });
        if (!brandDb)
          return res.status(401).json({ message: "Brand not found" });

        const cat = await Category.query().findOne({ name: category });
        if (!cat)
          return res.status(401).json({ message: "Category not found" });

        const addon = await AddOn.query()
          .insert({
            ...req.body,
            price: parseFloat(price as string),
            brandId: parseInt(brandId as string),
          })
          .returning("*");

        return res
          .status(200)
          .json({ message: "Addon created successfully.", addon });

      case "GET":
        const brand = await Brand.query()
          .findOne({ id: brandId })
          .withGraphFetched("addons");

        if (!brand) {
          return res.status(401).json({ message: "Brand not found" });
        }

        return res.status(200).json({
          message: "Addons retrieved successfully",
          addons: brand.addons,
        });

      default:
        res.status(401).json({ message: "Unknown method." });
    }
  } catch (err) {
    res.status(500).json({ message: "An error occurred, try again later" });
  }
}

export default authenticated(withRole(handler, roles.ADMIN));
