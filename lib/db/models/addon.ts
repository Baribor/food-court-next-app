import { Model } from "objection";

class AddOn extends Model {
  static get tableName() {
    return "addon";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "price", "brandId"],

      properties: {
        id: { type: "integer" },
        price: { type: "number" },
        brandId: { type: "number" },
        name: { type: "string", minLength: 1, maxLength: 100 },
        category: { type: "string", minLength: 1, maxLength: 50 },
        description: { type: "string", minLength: 10, maxLength: 255 },
      },
    };
  }
}

export default AddOn;
