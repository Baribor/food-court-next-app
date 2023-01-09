import type { NextApiRequest, NextApiResponse } from "next";

import Category from "../../../../lib/db/models/category";
import Brand from "../../../../lib/db/models/brand";
import authenticated from "../../../../lib/middlewares/authenticated";
import withRole from "../../../../lib/middlewares/withRole";
import { roles } from "../../../../lib/utils/constants";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { name },
    query: { brandId },
  } = req;

  try {
      
    if(!name) return res.status(401).json({message: "Name not provided"});
    
    const brand = await Brand.query().findById(brandId!);

    if (!brand)
      return res.status(401).json({ message: "brand does not exist" });

    if (req.method == "POST") {
      let cat = await Category.query().findOne({ name, brandId });

      if (cat)
        return res
          .status(401)
          .json({ message: "The category already exist for the brand" });

      cat = await Category.query().insert({
        name,
        brandId: parseInt(brandId as string),
      });

      return res
        .status(200)
        .json({ message: "Category created successfully.", category: cat });
    }

    res.status(401).json({ message: "Method not applicable." });
  } catch (err) {
    return res.status(500).json(err);
  }
}

export default authenticated(withRole(handler, roles.ADMIN));
