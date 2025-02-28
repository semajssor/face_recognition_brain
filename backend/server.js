import dotenv from "dotenv";
dotenv.config();
import process from "process";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import cors from "cors";
import knex from "knex";
import handleSignin from "./controllers/signin.js";
import handleRegister from "./controllers/register.js";
import handleHome from "./controllers/home.js";
import handleProfileGet from "./controllers/profile.js";
import handleImage from "./controllers/image.js";
import handleClarifaiApiCall from "./controllers/clarifai.js";

// Update the database connection to include SSL/TLS
const database = knex({
	client: "pg",
	connection: {
	  connectionString: process.env.DATABASE_URL,
	  ssl: { rejectUnauthorized: false }, // Enable SSL/TLS
	},
 });

// Test the database connection
database
  .select("*")
  .from("users")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors()
  // Add this in cors when in production
  // {origin: 'https://your-frontend-domain.com'}
);

app.get("/", (req, res) => handleHome(req, res, database));

app.post("/signin", (req, res) => {
  handleSignin(req, res, database, bcrypt);
});

app.post("/register", (req, res) => {
  handleRegister(req, res, database, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  handleProfileGet(req, res, database);
});

app.put("/image", (req, res) => {
  handleImage(req, res, database);
});

app.post("/api/clarifai", handleClarifaiApiCall);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});