import React, { useContext, useState, useEffect } from 'react'
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../firebase';
import Message from './Message';
import { ChatContext } from '../context/ChatContext';
const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    })
    return () => {
      unsub();
    };
  }, [data.chatId])

  return (
    <>
      <div className='messages'>
        {messages?.map((msg) => {
          return (<>
            <Message message={msg} key={msg.id} />
          </>)
        })}

      </div>

    </>
  )
}

export default Messages;