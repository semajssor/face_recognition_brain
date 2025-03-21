import { Component } from "react";
import "./Signin.css";
import PropTypes from "prop-types";
import { Eye, EyeOff } from "lucide-react";

// I used contructor for learning purposes
class Signin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail: "",
			signInPwd: "",
			showPassword: false,
			passwordValid: false,
		};
	}

	onEmailChange = (event) => {
		this.setState({ signInEmail: event.target.value });
	};

	onPwdChange = (event) => {
		this.setState({ signInPwd: event.target.value });
	};

	onSubmitSignIn = (event) => {
		event.preventDefault();
		fetch("https://face-recognition-brain-5qgr.onrender.com/signin", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPwd,
			}),
		})
			.then((response) => response.json())
			// .then((data) => {
			// 	data === "success" ? this.props.onRouteChange("home") : null;
		// });
			.then(user => {
				if (user.id) {
					this.props.loadUser(user);
					this.props.onRouteChange("home");
			}
		})
	};

	togglePassword = () => {
		this.setState((prevState) => ({
			showPassword: !prevState.showPassword,
		}));
	};

	render(props) {
		return (
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
				<main className="pa4 black-80">
					<form className="measure">
						<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
							<legend className="f3 fw6 ph0 mh0">Sign In</legend>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="email-address">
									Email
								</label>
								<input
									className="pa2 ba bg-light-gray o-80 hover-o-100 w-100 br3 pointer"
									type="email"
									name="email-address"
									id="email-address"
									onChange={this.onEmailChange}
								/>
							</div>
							<div className="mv3">
								<label className="db fw6 lh-copy f6" htmlFor="password">
									Password
								</label>
								<div className="relative password-container">
								<input
									className="pa2 ba bg-light-gray o-80 hover-o-100 w-100 br3 pointer"
									type={this.state.showPassword ? "text" : "password"} 
									name="password"
									id="password"
									onChange={this.onPwdChange}
								/>
								<span
									className="eye-icon"
									onClick={this.togglePassword}
									aria-label={this.state.showPassword ? "Hide password" : "Show password"}
									role="button"
									tabIndex={0}>
									{this.state.showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
									</span>
									</div>
							</div>
						</fieldset>
						<div className="">
							<input
								onClick={this.onSubmitSignIn}
								className="b ph3 pv2 ba b--black bg-transparent grow pointer f6 dib br3"
								type="submit"
								value="Sign in"
							/>
						</div>
						<div className="lh-copy mt3">
							<p
								onClick={() => props.onRouteChange("register")}
								href="#0"
								className="f6 link dim black db pointer">
								Register
							</p>
						</div>
					</form>
				</main>
			</article>
		);
	}
}

Signin.propTypes = {
	onRouteChange: PropTypes.func.isRequired,
	loadUser: PropTypes.func.isRequired,
};

export default Signin;
