import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import cors from "cors";
import fetch from "node-fetch";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const saltRounds = 10;
const hashPassword = (plainText) => bcrypt.hashSync(plainText, saltRounds);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

const database = {
	users: [
		{
			id: "123",
			name: "John",
			email: "john@email.com",
			password: hashPassword("cookies"),
			entries: 0,
			joined: new Date(),
		},
		{
			id: "124",
			name: "Sally",
			email: "sally@email.com",
			password: hashPassword("bananas"),
			entries: 0,
			joined: new Date(),
		},
	],
};

app.get("/", (req, res) => {
	res.send(database.users);
});

app.post("/signin", (req, res) => {
	const { email, password } = req.body;
	const user = database.users.find(user => user.email === email);
	if (user) {
		 bcrypt.compare(password, user.password, function(err, result) {
			  if (result) {
					res.json(database.users[0]);
			  } else {
					res.status(400).json("error logging in");
			  }
		 });
	} else {
		 res.status(400).json("error logging in");
	}
});

app.post("/register", (req, res) => {
	const { email, name, password } = req.body;
	bcrypt.hash(password, saltRounds, function(err, hash) {
		 if (err) {
			  return res.status(500).json("error registering user");
		 }
		 database.users.push({
			  id: "125",
			  name: name,
			  email: email,
			  password: hash,
			  entries: 0,
			  joined: new Date(),
		 });
		 res.json(database.users[database.users.length - 1]);
	});
});

app.get("/profile/:id", (req, res) => {
   const { id } = req.params;
   const user = database.users.find(user => user.id === id);
   user ? res.json(user) : res.status(404).json("not found");
});

app.put("/image", (req, res) => {
   const { id } = req.body;
   const user = database.users.find(user => user.id === id);
   user ? (user.entries++, res.json(user.entries)) : res.status(404).json("not found");
});

// Proxy endpoint for Clarifai API
app.post("/api/clarifai", async (req, res) => {
	const { imageUrl } = req.body;

	const PAT = "f9aa68c5abf54110aacecc743c0c49c8";
	const USER_ID = "zzi6dnpqvj7j";
	const APP_ID = "Smart-brain";
	const MODEL_ID = "face-detection";
	const MODEL_VERSION_ID = "6dc7e46bc9124c5c8824be4822abe105";

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