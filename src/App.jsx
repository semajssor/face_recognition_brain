// import { useState, Component } from 'react'
import "./App.css";
import "./index.css";
import "tachyons";
import ParticlesBg from 'particles-bg'
import Navigation from "./components/Navigation/navigation";

import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";

const App = () => {
	return (
    <div>
      <ParticlesBg type="cobweb" bg={true} color="#efefef" className="particules"/>
			<Navigation />
      <Rank />
      <ImageLinkForm />
      {/* <FaceRecognition /> */}
		</div>
	);
};

export default App;
