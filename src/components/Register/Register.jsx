import { useState, useMemo, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Eye, EyeOff } from "lucide-react";
import { debounce } from "lodash";
import "../Signin/Signin.css";

const Register = ({ onRouteChange }) => {
   const [formState, setFormState] = useState({
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

   const InputField = ({ label, type, id, name, required = false }) => (
      <div className="mt3">
         <label className="db fw6 lh-copy f6" htmlFor={id}>{label}</label>
         <input
            className="pa2 ba bg-light-gray o-80 hover-o-100 w-100 br3 pointer"
            type={type}
            name={name}
            id={id}
            required={required}
         />
      </div>
   );

   return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
         <main className="pa4 black-80">
            <form className="measure" onSubmit={(e) => e.preventDefault()}>
               <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                  <legend className="f3 fw6 ph0 mh0">Register</legend>
                  <InputField label="First Name" type="text" id="fname" name="first-name" />
                  <InputField label="Last Name" type="text" id="lname" name="last-name" />
                  <InputField label="Email" type="email" id="email" name="email" />
                  <div className="mv3 relative">
                     <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                     <div className="relative password-container">
                        <input
                           className="password-input pa2 ba bg-light-gray o-80 hover-o-100 w-100 br3 pr4 pointer"
                           type={formState.showPassword ? "text" : "password"}
                           name="password"
                           id="password"
                           value={formState.password}
                           onChange={(e) => {
                              setFormState((prev) => ({ ...prev, password: e.target.value }));
                              debouncedValidatePassword(e.target.value);
                           }}
                        />
                        <span
                           className="eye-icon"
                           onClick={togglePassword}
                           aria-label={formState.showPassword ? "Hide password" : "Show password"}
                           role="button"
                           tabIndex={0}
                        >
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
                  <input
                     onClick={() => onRouteChange("home")}
                     className="b ph3 pv2 ba b--black bg-transparent grow pointer f6 dib br3"
                     type="submit"
                     value="Register"
                     disabled={!formState.passwordValid}
                  />
               </div>
            </form>
         </main>
      </article>
   );
};

Register.propTypes = {
   onRouteChange: PropTypes.func.isRequired,
   label: PropTypes.string.isRequired,
   type: PropTypes.string.isRequired,
   id: PropTypes.string.isRequired,
   name: PropTypes.string.isRequired,
   required: PropTypes.bool,
};

export default Register;