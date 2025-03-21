import { useState } from "react";
import "./App.css";
import "./index.css";
import "tachyons";
import ParticlesBg from "particles-bg";
import Navigation from "./components/Navigation/Navigation.jsx";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.jsx";
import Rank from "./components/Rank/Rank.jsx";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition.jsx";
import Signin from "./components/Signin/Signin.jsx";
import Register from "./components/Register/Register.jsx";

const App = () => {
	const [input, setInput] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [box, setBox] = useState({});
	const [route, setRoute] = useState("signin");
	const [isSignedIn, setIsSignedIn] = useState(false);
	const [user, setUser] = useState({
		id: "",
		fname: "",
		lname: "",
		email: "",
		entries: 0,
		joined: "",
	});

	const loadUser = (data) => {
		setUser({
			id: data.id,
			fname: data.fname,
			lname: data.lname,
			email: data.email,
			entries: data.entries,
			joined: data.joined,
		});
	};

	const onInputChange = (event) => {
		setInput(event.target.value);
	};

	const updateEntries = () => {
		if (!user.id) return; 
  
		fetch("https://face-recognition-brain-5qgr.onrender.com/image", {
			 method: "PUT",
			 headers: { "Content-Type": "application/json" },
			 body: JSON.stringify({ id: user.id }), 
		})
		.then(response => response.json())
		.then(count => {
			 if (!isNaN(count)) {
				  setUser(prevUser => ({
						...prevUser,
						entries: count, 
				  }));
			 }
		})
		.catch(console.log);
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

	const displayFaceBox = (boxes) => {
		setBox(boxes);
	};

	const onButtonSubmit = () => {
		if (!input.trim()) return;
		setImageUrl(input);

		// Make the API request
		fetch("https://face-recognition-brain-5qgr.onrender.com/api/clarifai", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ imageUrl: input, id: user.id }),
		})
			.then((response) => response.json())
			.then((data) => {
				setUser((prevUser) => ({
					...prevUser,
					entries: prevUser.entries + 1,
				}));

				if (data.outputs) {
					displayFaceBox(calculateFaceLocation(data));
					updateEntries();
				}

				setInput("");
			})
			.catch((error) => console.log("error", error));
	};

	const onRouteChange = (route) => {
		if (route === "signout") {
			setIsSignedIn(false);
			setUser({
				id: "",
				fname: "",
				lname: "",
				email: "",
				entries: 0,
				joined: "",
			});
			setImageUrl("");
		} else if (route === "home") {
			setIsSignedIn(true);
		}
		setRoute(route);
	};

	return (
		<div className="App">
			<ParticlesBg type="cobweb" bg={true} color="#efefef" className="particules" />
			<Navigation onRouteChange={onRouteChange} isSignIn={isSignedIn} />
			{route === "home" ? (
				<div className="mt5">
					<Rank fname={user.fname} entries={user.entries} />
					<ImageLinkForm
						onInputChange={onInputChange}
						onButtonSubmit={onButtonSubmit}
						inputValue={input}
					/>
					<FaceRecognition box={box} imageUrl={imageUrl} />
				</div>
			) : route === "signin" ? (
				<Signin loadUser={loadUser} onRouteChange={onRouteChange} />
			) : (
				<Register loadUser={loadUser} onRouteChange={onRouteChange} />
			)}
		</div>
	);
};

export default App;