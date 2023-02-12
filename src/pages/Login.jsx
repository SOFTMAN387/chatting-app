import React,{useState} from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate,Link } from 'react-router-dom';

const Login = () => {
  const navigate=useNavigate();
  const [err,setErr]=useState(false);
  const onLogin=async(e)=>{
    e.preventDefault();
    const email=e.target[0].value;
    const password=e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth,email,password);
      navigate("/");
    } catch (error) {
      setErr(true);
      navigate("/login");
    }
  }
  return (
    <>
    <div className='formContainer'>
        <div className='formWrapper'>
        <span className='logo'>SoftMan Chat</span>
        <span className='logo-title'>Login</span>
            <form onSubmit={onLogin}>
               
                <input type="email" placeholder='email'/>
                <input type="password" placeholder='password'/>
                <button>Sin In</button>
            </form>
            {err && <span style={{color:'red'}}>Wrong Credential..</span>}
                <p> Don't have an accout ? <Link to="/register">Register here..</Link></p>
        </div>

    </div>
    </>
  )
}

export default Login;