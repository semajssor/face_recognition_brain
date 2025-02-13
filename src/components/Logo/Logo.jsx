import Tilt from "react-parallax-tilt";
import brainIcon from "./brain-icon.svg";
import "./Logo.css";

const Logo = () => {
	return (
		<div className="ma4 mt0">
			<Tilt className="Tilt" options={{ max: 55 }} style={{ width: "75px", height: "75px" }}>
				<div className="Tilt-inner">
					<img style={{paddingTop: "16px"}} src={brainIcon} alt="Brain Icon" />
				</div>
			</Tilt>
		</div>
	);
};

export default Logo;