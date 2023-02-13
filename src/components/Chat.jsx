import React,{useContext} from 'react'
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../context/ChatContext';
const Chat = () => {
  const {data}=useContext(ChatContext);
  return (
   <>
    <div className='chat'>
       <div className="chatInfo">
        <span>
           {data.user?.displayName}
        </span>
        <div className="chatIcons">
        <i className="fas fa-light fa-camera"></i>
        <i className="fas fa-user-plus"></i>
        <i className="fa-solid fa-ellipsis-vertical"></i>
        </div>
      
       </div>
       <Messages />
       <Input />
    </div>
   </>
  )
}

export default Chat;