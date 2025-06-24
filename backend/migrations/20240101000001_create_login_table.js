exports.up = function (knex) {
	return knex.schema.createTable("login", (table) => {
		table.increments("id").primary();
		table.string("hash", 100).notNullable();
		table.string("email", 255).unique().notNullable(); 
	});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists("login");
};
