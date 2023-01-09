import { Model } from "objection";
import AddOn from "./addon";
import Category from "./category";

class Brand extends Model {
  addons!: AddOn[];

  static get tableName() {
    return "brand";
  }

  async getAddons() {
    const AddOn = require("/lib/db/models/addon");
    const addons = await AddOn.query().where("id", "=");
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],

      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 100 },
      },
    };
  }

  static get relationMappings() {
    return {
      addons: {
        relation: Model.HasManyRelation,
        modelClass: AddOn,
        join: {
          from: "brand.id",
          to: "addon.brandId",
        },
      },

      categories: {
        relation: Model.HasManyRelation,
        modelClass: Category,
        join: {
          from: "brand.id",
          to: "category.brandId",
        },
      },
    };
  }
}

export default Brand;
