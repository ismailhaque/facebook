import React, { useState } from "react";
import Login from "../../Components/Login";
import facebook from "../../assets/icons/facebook.svg";
import Footer from "../../Components/Footer";
import Register from "../../Components/Register";
const Auth = () => {
  // register useState
  const [ register, setRegister ] = useState(false);

  return (
    <>
      <div className="fb-auth">
        <div className="auth-wraper">
          <div className="auth-left">
            <img src={facebook} alt="" />
            <h2>
              Facebook helps you connect and share with the people in your life.
            </h2>
          </div>
          <div className="auth-right">
            <div className="auth-box">
              <Login />
              <a href="#">Forgotten password?</a>

              <div className="divider"></div>

              <button onClick={() => setRegister(true)}>Create New Account</button>
            </div>
            <p>
              <a href="#">Create a Page</a> for a celebrity, brand or business.
            </p>
          </div>
        </div>
      </div>

      <div className="fb-footer">
        <Footer />
      </div>

      {register && <Register setRegister={setRegister}/>}
    </>
  );
};

export default Auth;
