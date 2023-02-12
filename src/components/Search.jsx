import React,{useState} from 'react';
import { collection,where, query,getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Search = () => {
   
    const [userName,setUserName]=useState("");
    const [user,setUser]=useState(null);
    const [err,setErr]=useState(false);
    const handleSearch=async()=>{
        try {
            const q=query(collection(db,"userdata"),where("displayName","==",userName));
            const querySnapshot=await getDocs(q);
            if(querySnapshot){
                querySnapshot.forEach((doc)=>{
                    setUser(doc.data());
                })
            }else{
                setErr(true);
                
            }
                 
           
        } catch (error) {
           
         
            setErr(true);
        }
       
    }
    const handlekey=(e)=>{
        e.code==="Enter" && handleSearch();
    }
  return (
   <>
    <div className='search'>
    <div className="searchForm">
        <input type="text" placeholder='find a user' onKeyDown={handlekey} onChange={(e)=>setUserName(e.target.value)}/>
    </div>
    {err ===true && <span>User Not Found !</span>}
    {user &&
        <div className="userChat">
        <img src={user.photoURL} alt="img"/>
        <div className="userChatInfo">
            <span>
             {user.displayName}
            </span>
            <p>Hello msg</p>
        </div>
    </div> }
   

    </div>
   </>
  )
}

export default Search;