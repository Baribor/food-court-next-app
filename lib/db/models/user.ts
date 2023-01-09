import { Model } from "objection";
import { roles } from "../../utils/constants";
import { generateHash } from "../../utils/hashing";
import bcrypt from "bcryptjs";
import UserRole from "./user_role";
import Token from "./token";
import type { StaticHookArguments } from "objection";
import BaseModel from "./base";

class User extends BaseModel {
  static get tableName() {
    return "user";
  }

  static async beforeInsert(args: StaticHookArguments<any, any>) {
    const user = args.inputItems[0];
    user.password = await generateHash(user.password);
  }

  static async afterInsert(args: StaticHookArguments<any, any>) {
    const user = args.inputItems[0];
    await UserRole.query().insert({
      userId: user.id,
      role: roles.USER,
    });
  }

  static get virtualAttributes() {
    return ["isAdmin"];
  }

  async isAdmin() {
    const r = await this.$relatedQuery("roles").where("role", "=", roles.ADMIN);

    return r.length > 0;
  }

  async comparePassword(password: string) {
    const correctPassword = await bcrypt.compare(password, this.password);
    return correctPassword;
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["username", "email", "password"],

      properties: {
        id: { type: "integer" },
        username: { type: "string" },
        password: { type: "string" },
        email: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    return {
      roles: {
        relation: Model.HasManyRelation,
        modelClass: UserRole,
        join: {
          from: "user.id",
          to: "user_role.userId",
        },
      },

      token: {
        relation: Model.BelongsToOneRelation,
        modelClass: Token,
        join: {
          from: "user.id",
          to: "token.userId",
        },
      },
    };
  }
}

export default User;
