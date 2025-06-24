export async function up(knex) {
	return knex.schema.createTable("users", (table) => {
		table.increments("id").primary();
		table.string("fname", 255).notNullable();
		table.string("lname", 255).notNullable();
		table.string("email", 255).unique().notNullable();
		table.integer("entries").defaultTo(0);
		table.timestamp("joined").notNullable().defaultTo(knex.fn.now());
	});
}

export async function down(knex) {
	return knex.schema.dropTableIfExists("users");
}
