import { useState } from "react";
import "./App.css";
import "./index.css";
import "tachyons";
import ParticlesBg from "particles-bg";
import Navigation from "./components/Navigation/navigation";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

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
		const regions = data.outputs[0]?.data?.regions || [];
		const boundingBoxes = regions.map((region) => {
			const boundingBox = region.region_info.bounding_box;
			return {
				topRow: boundingBox.top_row.toFixed(3),
				leftCol: boundingBox.left_col.toFixed(3),
				bottomRow: boundingBox.bottom_row.toFixed(3),
				rightCol: boundingBox.right_col.toFixed(3),
			};
		});
		return boundingBoxes[0];
	};

	const onButtonSubmit = () => {
    if (!input.trim()) return;
  
    setInput(""); // Clear the input field immediately
    setImageUrl(input); // Set the image URL
  
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
          const faceBox = calculateFaceLocation(result);
          setBox(faceBox);
        }
      })
      .catch((error) => console.log("error", error));
  };

	return (
		<div className="App">
			<ParticlesBg type="cobweb" bg={true} color="#efefef" className="particules" />
			<Navigation />
			<div className="mt5">
				<Rank name={user.name} entries={user.entries} />
				<ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
				<FaceRecognition box={box} imageUrl={imageUrl} />
			</div>
		</div>
	);
};

export default App;
