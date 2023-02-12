import Register from "./pages/Register";
import {Routes,Route,Navigate} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useContext } from "react";
import './styles.scss';
import { AuthContext } from "./context/AuthContext";

function App() {
  const {currentUser}=useContext(AuthContext);
  console.log(currentUser);
  const AuthenticatedRoot=({children})=>{
    if(!currentUser){
      return <Navigate to="/login" />
    }
    return children;
  }
  return (
   <>
    {/* <Home /> */}
    {/* <Login /> */}
    {/* <Register /> */}
    <Routes>
      <Route  exact path="/" element={<AuthenticatedRoot>
        <Home />
      </AuthenticatedRoot>}/>
      <Route  exact path="/login" element={<Login />}/>
      <Route  exact path="/register" element={<Register />}/>
      <Route  exact path="/" element={<Home />}/>
    </Routes>
      </>
  );
}

export default App;
