import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { db,storage} from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {  updateDoc,doc, arrayUnion, Timestamp, serverTimestamp } from 'firebase/firestore';
import { uuidv4 } from '@firebase/util';
const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const onSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuidv4());
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(

        (error) => {
          // setErr(true);
          console.log(error);
        },
        () => {

          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // console.log('File available at', downloadURL);
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuidv4(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,

              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuidv4(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db,"userChats",currentUser.uid),{
      [data.chatId+".lastMessage"]:{
        text
      },
      [data.chatId+".date"]:serverTimestamp(),


    });
    await updateDoc(doc(db,"userChats",data.user.uid),{
      [data.chatId+".lastMessage"]:{
        text
      },
      [data.chatId+".date"]:serverTimestamp(),


    });
    setImg(null);
    setText("");
  };
  return (
    <>
      <div className='input'>
        <input type="text" placeholder='Type something...' onChange={(e) => setText(e.target.value)}
        value={text} />
        <div className="send">
        <i className="fas fa-thin fa-image"></i>
          <input type="file" style={{ display: "none" }} id="file" onChange={(e) => setImg(e.target.files[0])} />
          <label htmlFor='file' style={{cursor:"pointer"}}>
          <i className="fas fa-thin fa-paperclip"></i>
          </label>
          <button onClick={onSend}>Send</button>
        </div>

      </div>
    </>
  )
}

export default Input;