import { useState, useMemo, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Eye, EyeOff } from "lucide-react";
import { debounce } from "lodash";
import "../Signin/Signin.css";

const Register = ({ onRouteChange, loadUser }) => {
   const [formState, setFormState] = useState({
      fname: "",
      lname: "",
      email: "",
      password: "",
      showPassword: false,
      passwordValid: false,
   });

   const passwordRegex = useMemo(() => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, []);

   const validatePassword = useCallback((pwd) => {
      setFormState((prev) => ({ ...prev, passwordValid: passwordRegex.test(pwd) }));
   }, [passwordRegex]);

   const debouncedValidatePassword = useMemo(() => debounce(validatePassword, 300), [validatePassword]);

   useEffect(() => {
      return () => debouncedValidatePassword.cancel();
   }, [debouncedValidatePassword]);

   const togglePassword = useCallback(() => {
      setFormState((prev) => ({ ...prev, showPassword: !prev.showPassword }));
   }, []);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormState((prev) => ({ ...prev, [name]: value }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const { fname, lname, email, password } = formState;
   
      if (!fname || !lname || !email || !password) {
         console.error("Please fill in all fields");
         return; 
      }
   
      try {
         const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fname, lname, email, password }),
         });
   
         const data = await response.json();
   
         if (response.ok) {
            // console.log("User registered:", data);
   
            if (data.id) {
               loadUser(data);
               onRouteChange("home");
            }
         } else {
            console.error("Registration failed:", data);
            alert(data);
         }
      } catch (error) {
         console.error("Error during registration:", error);
         alert("Something went wrong. Please try again later.");
      }
   };

   return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
         <main className="pa4 black-80">
            <form className="measure" onSubmit={handleSubmit}>
               <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                  <legend className="f3 fw6 ph0 mh0">Register</legend>
                  <div className="mt3">
                     <label className="db fw6 lh-copy f6" htmlFor="fname">First Name</label>
                     <input className="pa2 ba bg-light-gray o-80 hover-o-100 w-100 br3 pointer"
                        type="text" name="fname" id="fname" value={formState.fname} onChange={handleChange} required />
                  </div>
                  <div className="mt3">
                     <label className="db fw6 lh-copy f6" htmlFor="lname">Last Name</label>
                     <input className="pa2 ba bg-light-gray o-80 hover-o-100 w-100 br3 pointer"
                        type="text" name="lname" id="lname" value={formState.lname} onChange={handleChange} required />
                  </div>
                  <div className="mt3">
                     <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
                     <input className="pa2 ba bg-light-gray o-80 hover-o-100 w-100 br3 pointer"
                        type="email" name="email" id="email" value={formState.email} onChange={handleChange} required />
                  </div>
                  <div className="mv3 relative">
                     <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                     <div className="relative password-container">
                        <input className="password-input pa2 ba bg-light-gray o-80 hover-o-100 w-100 br3 pr4 pointer"
                           type={formState.showPassword ? "text" : "password"}
                           name="password" id="password"
                           value={formState.password} onChange={(e) => {
                              handleChange(e);
                              debouncedValidatePassword(e.target.value);
                           }}
                           required />
                        <span className="eye-icon" onClick={togglePassword} role="button" tabIndex={0}>
                           {formState.showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </span>
                     </div>
                     <p className={`f7 mt2 ${formState.passwordValid ? "green" : "red"}`}>
                        {formState.password
                           ? formState.passwordValid
                              ? "✔ Password is strong"
                              : "❌ Must be 8+ chars, include uppercase, lowercase, number & symbol"
                           : ""}
                     </p>
                  </div>
               </fieldset>
               <div className="">
                  <button type="submit" className="b ph3 pv2 ba b--black bg-transparent grow pointer f6 dib br3">
                     Register
                  </button>
               </div>
            </form>
         </main>
      </article>
   );
};

Register.propTypes = {
   onRouteChange: PropTypes.func.isRequired,
   loadUser: PropTypes.func.isRequired,
};

export default Register;
