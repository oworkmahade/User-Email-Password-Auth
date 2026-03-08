import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import auth from "../firebase/firebase.config";

const Register = () => {
  //  state declaration for showing error message
  const [registerError, setRegisterError] = useState("");
  //   state declaration for showing success message
  const [registerSuccess, setRegisterSuccess] = useState("");

  // handle register
  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // password validation

    if (password.length < 6) {
      setRegisterError("Password must be at least 6 characters long.");
      return;
    }

    // create user with email and password
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
        <label>Email</label>
        <input
          type="email"
          name="email"
          className="w-full p-2 mt-1 border rounded"
          required
        />

        <label className="mt-3">Password</label>
        <input
          type="password"
          name="password"
          className="w-full p-2 mt-1 border rounded"
        />

        <input
          type="submit"
          value="Register"
          className="w-full p-2 mt-4 text-white transition bg-green-500 rounded hover:bg-green-600"
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
