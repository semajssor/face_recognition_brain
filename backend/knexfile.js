import dotenv from "dotenv";
dotenv.config(); 

const config = {
	development: {
		client: "pg",
		connection: {
			host: process.env.DATABASE_HOST || "127.0.0.1", // Use actual host or default for local
			port: process.env.DATABASE_PORT || 5432,
			user: process.env.DATABASE_USER || "your_local_db_user",
			password: process.env.DATABASE_PWD || "your_local_db_password",
			database: process.env.DATABASE_NAME || "your_local_db_name",
		},
		migrations: {
			directory: "./migrations",
		},
		seeds: {
			directory: "./seeds", 
		},
	},

	production: {
		client: "pg",
		connection: {
			connectionString: process.env.DATABASE_URL,
			ssl: { rejectUnauthorized: false }, 
		},
		migrations: {
			directory: "./migrations",
		},
		seeds: {
			directory: "./seeds", 
		},
	},
};

export default config; 
