import { Model } from "objection";
import User from "./user";
import BaseModel from "./base";

class Token extends BaseModel {
  user!: User;

  static get tableName() {
    return "token";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["token", "userId"],

      properties: {
        token: { type: "string" },
        userId: { type: "integer" },
      },
    };
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "token.userId",
          to: "user.id",
        },
      },
    };
  }
}

export default Token;
