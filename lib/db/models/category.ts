import { Model } from "objection";
import AddOn from "./addon";

class Category extends Model {
  static get tableName() {
    return "category";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "brandId"],

      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 100 },
        brandId: { type: "integer" },
      },
    };
  }

  static get relationMappings() {
    return {
      addons: {
        relation: Model.HasManyRelation,
        modelClass: AddOn,
        join: {
          from: "category.name",
          to: "addon.category",
        },
      },
    };
  }
}

export default Category;
