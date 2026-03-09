import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import auth from "../firebase/firebase.config";

const Login = () => {
  const [loginError, setLoginError] = useState("");
  //   state declaration for showing success message
  const [loginSuccess, setLoginSuccess] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    // password validation

    if (password.length < 6) {
      setLoginError("Password must be at least 6 characters long.");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setLoginError("Password must contain at least one uppercase letter.");
      return;
    } else if (!/[a-z]/.test(password)) {
      setLoginError("Password must contain at least one lowercase letter.");
      return;
    } else if (!/\d/.test(password)) {
      setLoginError("Password must contain at least one number.");
      return;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setLoginError("Password must contain at least one special character.");
      return;
    }

    // signInWithEmailAndPassword
    signInWithEmailAndPassword(auth, email, password).then().catch();
  };

  return (
    <div>
      <Helmet>
        <title>Login</title>
      </Helmet>
      {/* form-login  */}

      <form
        onSubmit={handleLogin}
        className="w-1/3 p-4 mx-auto mt-6 border rounded"
      >
        {/* email  */}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="email"
          id="email"
          className="w-full p-2 mt-1 border rounded"
          required
        />

        {/* password  */}
        <label htmlFor="password" className="mt-3">
          Password
        </label>

        <input
          type="password"
          name="password"
          placeholder="password"
          id="password"
          className="w-full p-2 pr-10 mt-1 border rounded"
          required
        />

        <div className="my-4">
          <a className="link link-hover">Forgot password?</a>
        </div>
        <button className="w-full p-2 mt-4 text-white transition bg-gray-600 rounded hover:bg-green-600">
          Login
        </button>
      </form>
      {/* showing error message in form  */}
      {loginError && <p className="text-red-600">{loginError}</p>}

      {/* showing success message in form  */}
      {loginSuccess && <p className="text-green-600">{loginSuccess}</p>}
    </div>
  );
};

export default Login;
