import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import AuthenticateUser from "./middlewares/AuthenticateUser";
import AuthRidirectUser from "./middlewares/AuthRidirectUser";
import Cookies from "js-cookie";
import { useContext, useEffect } from "react";
import LoadingBar from 'react-top-loading-bar'
import LoaderContext from "./Context/LoaderContext";
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import AuthContext from "./Context/AuthContext";

function App() {
  // useContext
  const { loader_state, loader_dispatch } = useContext(LoaderContext);
  const { isUserLoggedin } = useContext(AuthContext)
  return (
    <>

      <LoadingBar
        color='#f11946'
        progress={loader_state}
        onLoaderFinished={() => loader_dispatch({ type: "LOADER_END" })}
      />

      <Routes>

        <Route path="/" element={isUserLoggedin ? <Home /> : <Login />} />

      </Routes>
    </>
  );
}

export default App;
