import React from 'react'

const Login = () => {
  return (
    <>
    <div className='formContainer'>
        <div className='formWrapper'>
        <span className='logo'>SoftMan Chat</span>
        <span className='logo-title'>Login</span>
            <form>
               
                <input type="email" placeholder='email'/>
                <input type="password" placeholder='password'/>
                <button>Sin In</button>
            </form>
                <p> Don't have an accout ? Register here..</p>
        </div>

    </div>
    </>
  )
}

export default Login;