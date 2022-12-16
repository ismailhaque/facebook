import React from "react";

const Login = () => {

  return (
    <>
      <form action="">
        <div className="auth-form">
          <input type="text" placeholder="Email address or phone number" />
        </div>
        <div className="auth-form">
          <input type="password" placeholder="Password" />
        </div>
        <div className="auth-form">
          <button type="submit">Log In</button>
        </div>
      </form>
    </>
  );
};

export default Login;
