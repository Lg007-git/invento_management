import React, { useState } from "react";
import LoginForm from "../components/LoginForm.js";
import RegisterForm from "../components/RegisterForm.js";
import "../index.css";

export default function LoginPage() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      <div className="background" style={{backgroundImage: `url(${showLogin? "/photos/max-kleinen-0ou4CVSoINY-unsplash.jpg": "/photos/bg_reg.jpg"})`}}></div>

      <div className="upperdiv">
        <div className="upperdivcont" >
          {showLogin ? (
            <>
              Welcome back!<br />
              <h6>Sign in to continue.</h6>
            </>
          ) : (
            <>
              Create Account<br />
              <h6>Sign up to get started.</h6>
            </>
          )}
        </div>
        <div className="upperimage">
    <img
      src={showLogin ? "/photos/w_bg1.png" : "/photos/w_bg2.png"}
      alt={showLogin ? "Login Illustration" : "Register Illustration"}
    />
  </div>
      </div>

      <div className="bottomdiv">
        <div className="w-full max-w-sm bg-white p-6 rounded shadow-md">
          {showLogin ? (
            <LoginForm switchToRegister={() => setShowLogin(false)} />
          ) : (
            <RegisterForm switchToLogin={() => setShowLogin(true)} />
          )}
        </div>
      </div>
    </>
  );
}
