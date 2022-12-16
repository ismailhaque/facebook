import { Route, Routes} from "react-router-dom";
import Auth from "./Pages/Auth/Auth";
import "./assets/css/style.css";
import Home from "./Pages/Home/Home";

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Auth/>}/>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </>
  );
}

export default App;
