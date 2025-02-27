import dotenv from "dotenv";
dotenv.config();
import fetch from "node-fetch";

const handleClarifaiApiCall = async (req, res) => {
	const { imageUrl } = req.body;

	const PAT = globalThis.process?.env?.CLARIFAI_PAT;
	const USER_ID = globalThis.process?.env?.CLARIFAI_USER_ID;
	const APP_ID = globalThis.process?.env?.CLARIFAI_APP_ID;
	const MODEL_ID = globalThis.process?.env?.CLARIFAI_MODEL_ID;
	const MODEL_VERSION_ID = globalThis.process?.env?.CLARIFAI_MODEL_VERSION_ID;

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
			Authorization: `Key ${PAT}`,
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
};

export default handleClarifaiApiCall;