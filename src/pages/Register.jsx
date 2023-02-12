import React,{useState} from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth,storage,db } from '../firebase';
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc,doc } from 'firebase/firestore';
import { useNavigate,Link } from 'react-router-dom';

const Register = () => {
  const navigate=useNavigate();
  const [err,setErr]=useState(false);
  const submitForm =async(e)=>{
    e.preventDefault();
    const displayName=e.target[0].value;
    const email=e.target[1].value;
    const password=e.target[2].value;
    const file=e.target[3].files[0];
  //  console.log(e.target[0].value);
  try {
    const res= await createUserWithEmailAndPassword(auth, email, password);
  

    const storageRef = ref(storage, displayName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
  (snapshot) => {
 
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    setErr(true);
  }, 
  () => {
    
    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
      // console.log('File available at', downloadURL);
      await updateProfile(res.user,{
        displayName,
        photoURL:downloadURL
      })
      await setDoc(doc(db,"userdata",res.user.uid),{
        uid:res.user.uid,
        displayName,
        email,
        photoURL:downloadURL,
      })
      await setDoc(doc(db,"userChats",res.user.uid),{ });
      navigate("/login");
    });
  }
);
  } catch (err) {
    setErr(true);
  }
    
 
  
  }


  return (
    <>
    <div className='formContainer'>
        <div className='formWrapper'>
        <span className='logo'>SoftMan Chat</span>
        <span className='logo-title'>Register</span>
            <form onSubmit={submitForm}>
                <input type="text" placeholder='display name'/>
                <input type="email" placeholder='email'/>
                <input type="password" placeholder='password'/>
                <input type="file" id="file-id" style={{display:'none'}}/>
                <label htmlFor='file-id'>Open File</label>
                <button type='submit'>Sin Up</button>
                {err && <span style={{color:'red'}}>Something Went Wrong...</span>}
            </form>
                <p> You have an accout ?<Link to="/login">Login here..</Link></p>
        </div>

    </div>
    </>
  )
}

export default Register;