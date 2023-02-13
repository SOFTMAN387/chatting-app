import React, { useEffect, useState, useContext } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
const Chats = () => {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [chats, setChats] = useState();
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(Object.entries(doc.data()));
      });
      return () => {
        unsub();
      }
    }
    currentUser.uid && getChats();
  }, [currentUser.uid])
  //    console.log(chats);
  //   console.log(Object.entries(chats))

  const handleSelect = (uInfo) => {
    dispatch({ type: "CHANGE_USER", payload: uInfo })
  }
  return (
    <>
      <div className='chats'>
        {chats?.sort((a,b)=>b[1].date-a[1].date).map((chat) => {
          return (<>
            <div className="userChat" key={chat[0]} onClick={() => handleSelect(chat[1]?.userInfo)}>
              <img src={chat[1]?.userInfo.photoURL} alt="img" />
              <div className="userChatInfo">
                <span>
                  {chat[1]?.userInfo.displayName}
                </span>
                <p>{chat[1].lastMessage?.text}</p>
              </div>
            </div>

          </>)
        })}


      </div>
    </>
  )
}

export default Chats;