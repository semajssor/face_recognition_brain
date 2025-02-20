import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import cors from "cors";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const saltRounds = 10;
const hashPassword = (plainText) => bcrypt.hashSync(plainText, saltRounds);
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors())

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
					res.json("success");
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

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
