import React, { useState, useContext } from 'react';
import { collection, where, query, getDocs, getDoc, doc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';

const Search = () => {
    const { currentUser } = useContext(AuthContext);
    const [userName, setUserName] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);
    const handleSearch = async () => {
        try {
            const q = query(collection(db, "userdata"), where("displayName", "==", userName));
            const querySnapshot = await getDocs(q);
            if (querySnapshot) {
                querySnapshot.forEach((doc) => {
                    setUser(doc.data());
                })
            } else {
                setErr(true);

            }


        } catch (error) {


            setErr(true);
        }

    }
    const handlekey = (e) => {
        e.code === "Enter" && handleSearch();
    }
    const handleSelect = async () => {
        //checking group exists or not || if not then create new group....
        const combinedId = currentUser.uid > user.uid
            ? currentUser.uid + user.uid
            : user.uid + currentUser.uid;

        try {
            const res = await getDoc(doc(db, "chats", combinedId));
            if (!res.exists()) {
                //create chat in the chat collection....
                await setDoc(doc(db, "chats", combinedId), {
                    messages: []
                });
                //Update  user chats...
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    },
                    [combinedId + ".date"]: serverTimestamp()
                });
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    },
                    [combinedId + ".date"]: serverTimestamp()
                });

            }
        } catch (error) {
            console.log(error);
        }

        setUser(null);
        setUserName("")
        //Creating user Chats.....

    }
    return (
        <>
            <div className='search'>
                <div className="searchForm">
                    <input type="text" placeholder='find a user' onKeyDown={handlekey} onChange={(e) => setUserName(e.target.value)}
                    value={userName} />
                </div>
                {err === true && <span>User Not Found !</span>}
                {user &&
                    <div className="userChat" onClick={handleSelect}>
                        <img src={user.photoURL} alt="img" />
                        <div className="userChatInfo">
                            <span>
                                {user.displayName}
                            </span>
                            <p>Hello msg</p>
                        </div>
                    </div>}


            </div>
        </>
    )
}

export default Search;