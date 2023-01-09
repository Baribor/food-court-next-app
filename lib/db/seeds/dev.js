import { roles } from "../../utils/constants.ts";
import bcrypt from "bcryptjs";

const generateHash = async (data) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(data, salt);
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  //truncate all existing tables
  await knex.raw('TRUNCATE TABLE "brand" CASCADE');
  await knex.raw('TRUNCATE TABLE "category" CASCADE');
  await knex.raw('TRUNCATE TABLE "addon" CASCADE');
  await knex.raw('TRUNCATE TABLE "role" CASCADE');
  await knex.raw('TRUNCATE TABLE "user_role" CASCADE');
  await knex.raw('TRUNCATE TABLE "token" CASCADE');
  await knex.raw('TRUNCATE TABLE "user" CASCADE');

  for (let role in roles) {
    await knex("role").insert({
      name: roles[role],
    });
  }

  const admin = await knex("user").insert(
    {
      username: "testUser",
      email: "testUser@example.com",
      password: await generateHash("password1234"),
    },
    ["id"]
  );

  await knex("user_role").insert([
    {
      userId: admin[0].id,
      role: roles.ADMIN,
    },
    {
      userId: admin[0].id,
      role: roles.EDITOR,
    },
  ]);

  const brands = await knex("brand").insert(
    [
      {
        name: "golden",
      },
      {
        name: "moles",
      },
    ],
    ["id"]
  );

  await knex("category").insert([
    {
      name: "Hardies",
      brandId: brands[1].id,
    },
    {
      name: "Softies",
      brandId: brands[1].id,
    },
    {
      name: "Brownies",
      brandId: brands[0].id,
    },
    {
      name: "Hardies",
      brandId: brands[0].id,
    },
  ]);

  await knex("addon").insert([
    {
      name: "chocolate",
      price: 740.5,
      brandId: brands[1].id,
      category: "Sweety",
    },
    {
      name: "cream",
      price: 300.1,
      brandId: brands[0].id,
    },
    {
      name: "berry",
      price: 140.5,
      brandId: brands[1].id,
    },
    {
      name: "apple",
      price: 940.5,
      brandId: brands[1].id,
    },
    {
      name: "jelly",
      price: 40.5,
      brandId: brands[0].id,
    },
    {
      name: "sauce",
      price: 240.5,
      brandId: brands[0].id,
    },
  ]);
};
