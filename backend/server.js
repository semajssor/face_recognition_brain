import dotenv from "dotenv";
dotenv.config();
import process from "process";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import cors from "cors";
import fetch from "node-fetch";
import knex from "knex";
import handleSignin from "./controllers/signin.js";
import handleRegister from "./controllers/register.js";

const database = knex({
	client: "pg",
	connection: {
		host: process.env.DATABASE_URL,
		port: Number(process.env.DATABASE_PORT) || 5432,
		user: process.env.DATABASE_USER,
		password: process.env.DATABASE_PWD,
		database: process.env.DATABASE_NAME,
	},
});

database
	.select("*")
	.from("users")
	.then((data) => {
		console.log(data);
	});

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
	cors()
	// {
	// origin: 'https://your-frontend-domain.com' when in production
	// }
);

app.get("/", async (req, res) => {
	try {
		const users = await database.select("*").from("users");
		res.json(users);
	} catch (err) {
		console.error("Database error:", err);
		res.status(500).json({ error: "Internal server error" });
	}
});

app.post("/signin", (req, res) => {
	handleSignin(req, res, database, bcrypt);
});

app.post("/register", (req, res) => {
	handleRegister(req, res, database, bcrypt);
});

app.get("/profile/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const user = await database("users").where({ id }).first();

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		res.json(user);
	} catch (err) {
		console.error("Database error:", err);
		res.status(500).json({ error: "Internal server error" });
	}
});

app.put("/image", async (req, res) => {
	const { id } = req.body;

	try {
		const updatedUser = await database("users")
			.where({ id })
			.increment("entries", 1)
			.returning("*");

		if (updatedUser.length > 0) {
			res.json(updatedUser[0].entries);
		} else {
			res.status(404).json("User not found");
		}
	} catch (err) {
		console.error("Database error:", err);
		res.status(500).json("Server error");
	}
});

// Proxy endpoint for Clarifai API
app.post("/api/clarifai", async (req, res) => {
	const { imageUrl } = req.body;

	const PAT = process.env.CLARIFAI_PAT;
	const USER_ID = process.env.CLARIFAI_USER_ID;
	const APP_ID = process.env.CLARIFAI_APP_ID;
	const MODEL_ID = process.env.CLARIFAI_MODEL_ID;
	const MODEL_VERSION_ID = process.env.CLARIFAI_MODEL_VERSION_ID;

	const raw = JSON.stringify({
		user_app_id: {
			user_id: USER_ID,
			app_id: APP_ID,
		},
		inputs: [
			{
				data: {
					image: {
						url: imageUrl,
					},
				},
			},
		],
	});

	const requestOptions = {
		method: "POST",
		headers: {
			Accept: "application/json",
			Authorization: "Key " + PAT,
		},
		body: raw,
	};

	try {
		const response = await fetch(
			`https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`,
			requestOptions
		);

		const data = await response.json();

		res.json(data);
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ error: "An error occurred while processing the request" });
	}
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
