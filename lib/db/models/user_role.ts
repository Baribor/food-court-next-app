import { Model } from "objection";

class UserRole extends Model {
  static get tableName() {
    return "user_role";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["userId", "role"],

      properties: {
        id: { type: "integer" },
        role: { type: "string" },
        userId: { type: "integer" },
      },
    };
  }
}

export default UserRole;
