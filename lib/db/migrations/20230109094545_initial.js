export async function up(knex) {
  return knex.schema
    .createTable("brand", (table) => {
      table.increments("id");
      table.string("name", 50);
      table.timestamps(true, true);
    })

    .createTable("category", (table) => {
      table.increments("id");
      table.string("name", 50).notNullable();
      table.integer("brandId").references("brand.id").notNullable();
      table.unique(["name", "brandId"]);
      table.foreign("brandId").onDelete("CASCADE");
      table.timestamps(true, true);
    })

    .createTable("addon", (table) => {
      table.increments("id");
      table.string("name", 50).notNullable();
      table.string("description");
      table.decimal("price", null).notNullable();
      table.string("category");
      table.integer("brandId").references("brand.id").notNullable();

      table.foreign("brandId").onDelete("CASCADE");
      table.timestamps(true, true);
    })

    .createTable("user", (table) => {
      table.increments("id");
      table.string("username", 20).notNullable();
      table.string("email").unique().notNullable();
      table.string("password").notNullable();
      table.timestamps(true, true);
    })

    .createTable("role", (table) => {
      table.string("name").primary();
    })

    .createTable("token", (table) => {
      table.increments("id");
      table.string("token").notNullable();
      table.integer("userId").notNullable();
    })

    .createTable("user_role", (table) => {
      table.increments("id");
      table.integer("userId").references("user.id").notNullable();
      table.string("role").references("role.name").notNullable();

      table.foreign("userId").onDelete("CASCADE");
      table.foreign("role").onDelete("CASCADE");
    });
}

export async function down(knex) {
  return knex.schema
    .dropTableIfExists("addon")
    .dropTableIfExists("category")
    .dropTableIfExists("brand")
    .dropTableIfExists("user_role")
    .dropTableIfExists("role")
    .dropTableIfExists("token")
    .dropTableIfExists("user");
}
