import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { db,storage} from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc, arrayUnion, Timestamp } from 'firebase/firestore';
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
            await setDoc(doc(db, "chats", data.chatId), {
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
      await setDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuidv4(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    setImg(null);
    setText("");
  };
  return (
    <>
      <div className='input'>
        <input type="text" placeholder='Type something...' onChange={(e) => setText(e.target.value)} />
        <div className="send">
          <img src="" alt="abc" />
          <input type="file" style={{ display: "none" }} id="file" onChange={(e) => setImg(e.target.files[0])} />
          <label htmlFor='file'>
            <img src="" alt="Attachment" />
          </label>
          <button onClick={onSend}>Send</button>
        </div>

      </div>
    </>
  )
}

export default Input;