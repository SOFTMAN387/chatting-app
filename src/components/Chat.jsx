import React from 'react'
import Messages from './Messages';
import Input from './Input';
const Chat = () => {
  return (
   <>
    <div className='chat'>
       <div className="chatInfo">
        <span>
            Manish
        </span>
        <div className="chatIcons">
            <img src="" alt="camer" />
            <img src="" alt="Add" />
            <img src="" alt="More" />
        </div>
      
       </div>
       <Messages />
       <Input />
    </div>
   </>
  )
}

export default Chat;