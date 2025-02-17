import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 5001;

app.use(express.json());

app.use(cors());

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

app.listen(PORT, () => {
	console.log(`Proxy server is running on http://localhost:${PORT}`);
});
