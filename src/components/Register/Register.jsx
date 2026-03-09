import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import auth from "../firebase/firebase.config";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  //  state declaration for showing error message
  const [registerError, setRegisterError] = useState("");
  //   state declaration for showing success message
  const [registerSuccess, setRegisterSuccess] = useState("");
  //   state declaration for showing password
  const [showPassword, setShowPassword] = useState(false);

  // handle register
  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const termsChecked = e.target.terms.checked;

    console.log(email, password, termsChecked);

    // password validation
    if (password.length < 6) {
      setRegisterError("Password must be at least 6 characters long.");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError("Password must contain at least one uppercase letter.");
      return;
    } else if (!/[a-z]/.test(password)) {
      setRegisterError("Password must contain at least one lowercase letter.");
      return;
    } else if (!/\d/.test(password)) {
      setRegisterError("Password must contain at least one number.");
      return;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setRegisterError("Password must contain at least one special character.");
      return;
    } else if (!termsChecked) {
      setRegisterError("Please agree to the terms and conditions.");
      return;
    }

    //  createUserWithEmailAndPassword
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setRegisterSuccess("User created successfully.");
        e.target.reset("");
        setRegisterError(""); // hide error message after successful registration
      })
      .catch((error) => {
        console.error(error);
        setRegisterError(error.message);
        setRegisterSuccess(""); // hide success message if there's an error
      });
  };

  return (
    <div>
      <Helmet>
        <title>Register</title>
      </Helmet>
      {/* form layout  */}

      <form
        onSubmit={handleRegister}
        className="w-1/3 p-4 mx-auto mt-6 border rounded"
      >
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="email"
          id="email"
          className="w-full p-2 mt-1 border rounded"
          required
        />

        <label htmlFor="password" className="mt-3">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="password"
            id="password"
            className="w-full p-2 pr-10 mt-1 border rounded"
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute p-2 text-xl text-gray-600 border-none cursor-pointer right-3 top-2 bg-none"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* terms and conditions */}
        <div className="flex flex-row items-center gap-2 py-2 m-2 text-md">
          <input type="checkbox" name="terms" id="terms" />
          <label className="text-gray-600 text-md" htmlFor="terms">
            I agree to the{" "}
            <a className="link link-hover">terms and conditions</a>
          </label>
        </div>

        <input
          type="submit"
          value="Register"
          className="w-full p-2 mt-4 text-white transition bg-green-500 rounded hover:bg-gray-600"
        />
      </form>

      {/* showing error message in form  */}
      {registerError && <p className="text-red-600">{registerError}</p>}

      {/* showing success message in form  */}
      {registerSuccess && <p className="text-green-600">{registerSuccess}</p>}
    </div>
  );
};

export default Register;
