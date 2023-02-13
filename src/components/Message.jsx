import React from 'react'

const Message = ({message}) => {
  console.log(message);
  return (
   <>
    <div className='message owner'>
    <div className="messageInfo">
        <img src="" alt="imdg" />
        <span>Just now</span>
    </div>
    <div className="messageContent">
        <p>Hello,manish</p>
        {/* <img src="" alt="fgd" /> */}
        </div>
    </div>
   </>
  )
}

export default Message;