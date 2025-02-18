import { useState } from "react";
import "./App.css";
import "./index.css";
import "tachyons";
import ParticlesBg from "particles-bg";
import Navigation from "./components/Navigation/navigation";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";

const App = () => {
	const [input, setInput] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [box, setBox] = useState({});
	const [route, setRoute] = useState("signin");
	const [isSignedIn, setIsSignedIn] = useState(false);
	const [user, setUser] = useState({
		id: "",
		name: "",
		email: "",
		entries: 0,
		joined: "",
	});

	const onInputChange = (event) => {
		setInput(event.target.value);
	};

	const calculateFaceLocation = (data) => {
		const regions = data.outputs[0]?.data?.regions;
		if (!regions) return [];

		const image = document.getElementById("inputImage");
		const width = image?.width || 0;
		const height = image?.height || 0;

		return regions.map((region) => {
			const clarifaiFace = region.region_info.bounding_box;

			return {
				leftCol: clarifaiFace.left_col * width,
				topRow: clarifaiFace.top_row * height,
				rightCol: clarifaiFace.right_col * width,
				bottomRow: clarifaiFace.bottom_row * height,
			};
		});
	};

	const displayFaceBox = (box) => {
		// console.log(box);
		setBox(box);
	};

	const onButtonSubmit = () => {
		if (!input.trim()) return;

		setImageUrl(input);
		setInput("");

		fetch("http://localhost:5001/api/clarifai", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ imageUrl: input }),
		})
			.then((response) => response.json())
			.then((result) => {
				if (result.outputs) {
					displayFaceBox(calculateFaceLocation(result));
				}
			})
			.catch((error) => console.log("error", error));
	};

	const onRouteChange = (route) => {
		if (route === "signout") {
			setIsSignedIn(false);
			setUser({
				id: "",
				name: "",
				email: "",
				entries: 0,
				joined: "",
			});
		} else if (route === "home") {
			setIsSignedIn(true);
		}
		setRoute(route);
	};

	return (
		<div className="App">
			<ParticlesBg type="cobweb" bg={true} color="#efefef" className="particules" />
			<Navigation onRouteChange={onRouteChange} isSignIn={isSignedIn}/>
			{route === "home" ? (
				<div className="mt5">
					<Rank name={user.name} entries={user.entries} />
					<ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
					<FaceRecognition box={box} imageUrl={imageUrl} />
				</div>
			) : route === "signin" ? (
				<Signin onRouteChange={onRouteChange} />
			) : (
				<Register onRouteChange={onRouteChange} />
			)}
		</div>
	);
};

export default App;
