import { useState } from "react";
import PropTypes from "prop-types";
import { Eye, EyeOff } from "lucide-react";
import "../Signin/Signin.css";

const Register = ({ onRouteChange }) => {
   const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);
   const [passwordValid, setPasswordValid] = useState(false);

   const togglePassword = () => setShowPassword(!showPassword);

   const validatePassword = (pwd) => {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      setPasswordValid(regex.test(pwd));
   };

   return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
         <main className="pa4 black-80">
            <form className="measure" onSubmit={(e) => e.preventDefault()}>
               <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                  <legend className="f3 fw6 ph0 mh0">Register</legend>
                  <div className="mt3">
                     <label
                        className="db fw6 lh-copy f6"
                        htmlFor="fname">First Name</label>
                     <input
                        className="pa2 ba bg-light-gray o-80 hover-o-100 w-100 br3 pointer"
                        type="text"
                        name="first-name"
                        id="fname"
                        // required
                     />
                  </div>
                  <div className="mt3">
                     <label
                        className="db fw6 lh-copy f6"
                        htmlFor="lname">Last Name</label>
                     <input
                        className="pa2 ba bg-light-gray o-80 hover-o-100 w-100 br3 pointer"
                        type="text"
                        name="last-name"
                        id="lname"
                        // required
                     />
                  </div>
                  <div className="mt3">
                     <label
                        className="db fw6 lh-copy f6"
                        htmlFor="email">Email</label>
                     <input
                        className="pa2 ba bg-light-gray o-80 hover-o-100 w-100 br3 pointer"
                        type="email"
                        name="email"
                        id="email"
                        // required
                     />
                  </div>
                  <div className="mv3 relative">
                     <label
                        className="db fw6 lh-copy f6"
                        htmlFor="password">Password</label>
                     <div className="relative password-container">
                        <input
                           className=" password-input pa2 ba bg-light-gray o-80 hover-o-100 w-100 br3 pr4 pointer"
                           type={showPassword ? "text" : "password"}
                           name="password"
                           id="password"
                           value={password}
                           onChange={(e) => {
                              setPassword(e.target.value);
                              validatePassword(e.target.value);
                           }}
                           // required
                        />
                        <span className="eye-icon" onClick={togglePassword}>
                           {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </span>
                     </div>
                     <p className={`f7 mt2 ${passwordValid ? "green" : "red"}`}>
                        {password
                           ? passwordValid
                              ? "✔ Password is strong"
                              : "❌ Must be 8+ chars, include uppercase, lowercase, number & symbol"
                           : ""}
                     </p>
                  </div>
               </fieldset>
               <div className="">
                  <input
                     onClick={() => passwordValid && onRouteChange("home")}
                     className="b ph3 pv2 ba b--black bg-transparent grow pointer f6 dib br3"
                     type="submit"
                     value="Register"
                     // disabled={!passwordValid}
                  />
               </div>
            </form>
         </main>
      </article>
   );
};

Register.propTypes = {
   onRouteChange: PropTypes.func.isRequired,
};

export default Register;