import React, { useRef, useState } from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import Dashboard from "../pages/Dashboard";

const SignInpages = () => {
  const usernameRef = useRef("");
  const passwordRef = useRef("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();

    if (usernameRef.current.value && passwordRef.current.value) {
      setErrorMessage("");
      // Redirect to the dashboard page
      window.location.href = "/";
    } else {
      setErrorMessage("Tolong Masukkan Username dan Password");
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1 className="text-center mb-4">SILAHKAN MASUK</h1>
        {errorMessage && <p className="text-center text-danger">{errorMessage}</p>}
        <form>
          <div className="mb-3">
            <label className="form-label">User ID</label>
            <input
              className="form-control"
              name="Username"
              ref={usernameRef}
              type="text"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              className="form-control"
              name="Password"
              ref={passwordRef}
              type="password"
              required
            />
          </div>
          <button className="btn btn-primary" onClick={handleSignIn}>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInpages;
