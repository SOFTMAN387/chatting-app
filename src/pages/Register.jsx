import React from 'react'

const Register = () => {
  return (
    <>
    <div className='formContainer'>
        <div className='formWrapper'>
        <span className='logo'>SoftMan Chat</span>
        <span className='logo-title'>Register</span>
            <form>
                <input type="text" placeholder='display name'/>
                <input type="email" placeholder='email'/>
                <input type="password" placeholder='password'/>
                <input type="file" id="file-id" style={{display:'none'}}/>
                <label htmlFor='file-id'>Open File</label>
                <button>Sin Up</button>
            </form>
                <p> You have an accout ? Login here..</p>
        </div>

    </div>
    </>
  )
}

export default Register;