export async function up(knex) {
	return knex.schema.createTable("login", (table) => {
		table.increments("id").primary();
		table.string("hash", 100).notNullable();
		table.string("email", 255).unique().notNullable();
	});
}

export async function down(knex) {
	return knex.schema.dropTableIfExists("login");
}
