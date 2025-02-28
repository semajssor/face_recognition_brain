import Logo from "../Logo/Logo";
import PropTypes from "prop-types";

const Navigation = ({ onRouteChange, isSignIn }) => {
	if (isSignIn) {
		return (
			<nav style={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				padding: "0 20px",
			}}>
				<Logo />
				<p
					onClick={() => onRouteChange("signout")}
					className="f5 link dim black underline pa3 pointer">
					Sign Out
				</p>
			</nav>
		);
	} else {
		return (
			<nav
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					padding: "0 20px",
				}}>
				<Logo />
				<div style={{ display: "flex", gap: "10px" }}>
					<p
						onClick={() => onRouteChange("signin")}
						className="f5 link dim black underline pa3 pointer">
						Sign In
					</p>
					<p
						onClick={() => onRouteChange("register")}
						className="f5 link dim black underline pa3 pointer">
						Register
					</p>
				</div>
			</nav>
		);
	}
};

Navigation.propTypes = {
	onRouteChange: PropTypes.func.isRequired,
	isSignIn: PropTypes.bool.isRequired,
};

export default Navigation;
