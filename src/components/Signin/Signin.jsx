import "./Signin.css";
import PropTypes from "prop-types";

const Signin = ({ onRouteChange }) => {
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
							/>
						</div>
						<div className="mv3">
							<label className="db fw6 lh-copy f6" htmlFor="password">
								Password
							</label>
							<input
								className="pa2 ba bg-light-gray o-80 hover-o-100 w-100 br3 pointer"
								type="password"
								name="password"
								id="password"
							/>
						</div>
					</fieldset>
					<div className="">
						<input
							onClick={() => onRouteChange('home')}
							className="b ph3 pv2 ba b--black bg-transparent grow pointer f6 dib br3"
							type="submit"
							value="Sign in"
						/>
					</div>
					<div className="lh-copy mt3">
						<p onClick={() => onRouteChange('register')} href="#0" className="f6 link dim black db pointer">
							Register
						</p>
					</div>
				</form>
			</main>
		</article>
	);
};

Signin.propTypes = {
	onRouteChange: PropTypes.func.isRequired,
};

export default Signin;
