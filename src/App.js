import Register from "./pages/Register";
import {Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useContext } from "react";
import './styles.scss';
import { AuthContext } from "./context/AuthContext";

function App() {
  const {currentUser}=useContext(AuthContext);
  console.log(currentUser);
  return (
   <>
    {/* <Home /> */}
    {/* <Login /> */}
    {/* <Register /> */}
    <Routes>
      <Route  exact path="/" element={<Home />}/>
      <Route  exact path="/login" element={<Login />}/>
      <Route  exact path="/register" element={<Register />}/>
      <Route  exact path="/" element={<Home />}/>
    </Routes>
      </>
  );
}

export default App;
