import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import auth from "../firebase/firebase.config";

const Login = () => {
  // state declaration for login error message
  const [loginError, setLoginError] = useState("");
  //   state declaration for showing success message
  const [loginSuccess, setLoginSuccess] = useState("");
  // emailReference for holding email
  const emailRef = useRef(null);

  // login functionality starts here
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    // password validation starts here
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
    // password validation starts here

    // login firebase section starts here
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        const user = result.user;
        // email verification check section starts here
        if (!user.emailVerified) {
          alert("Please Verify your email address");
          return;
        }
        // email verification check section ends here
        setLoginSuccess("User logged in successfully.");
        e.target.reset();
        setLoginError(" "); // hide error message after successful login
      })
      .catch((error) => {
        console.error(error);
        setLoginError(error.message);
        setLoginSuccess(""); // hide success message if there's an error
      });
  };
  // login firebase section ends here
  // login functionality ends here

  /******************************************************************************** */

  // reset password section starts here
  /******************************************************************************* */
  // no use of event (e)
  // out of form control so validation must done newly, catch email value using emailRef.current.value
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handlePasswordReset = () => {
    const email = emailRef.current.value;

    if (!email) {
      setLoginError("Please enter an email address.");
      return;
    } else if (!emailRegex.test(email)) {
      setLoginError("Please enter a valid email address.");
      return;
    }

    // for direct testing
    // else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    //   setLoginError("Please enter a valid email address.");
    //   return;
    // }

    //  send reset password email link section starts here
    /**************************************************************************** */
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("please check your email.");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /**************************************************************************** */
  // reset password section ends here

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
          ref={emailRef} // reference email
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
          <button
            type="button"
            onClick={handlePasswordReset}
            className="p-0 m-0 bg-transparent border-none cursor-pointer link link-hover"
            style={{ background: "none", border: "none" }}
          >
            Forgot password?
          </button>
        </div>
        <button className="w-full p-2 mt-4 text-white transition bg-green-500 rounded hover:bg-gray-600">
          Login
        </button>

        {/* Register  */}
        <div className="my-4">
          Register if you don't have an account. {/* Register  */}
          <a className="link link-hover" href="/register">
            Register
          </a>
        </div>
      </form>
      {/* showing error message in form  */}
      {loginError && <p className="text-red-600">{loginError}</p>}
      {/* showing success message in form  */}
      {loginSuccess && <p className="text-green-600">{loginSuccess}</p>}
    </div>
  );
};

export default Login;
