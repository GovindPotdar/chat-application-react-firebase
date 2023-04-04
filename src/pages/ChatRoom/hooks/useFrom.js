import { useContext, useState } from 'react'
import { db, storage } from '../../../config/firebase'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import UserAuthContext from '../../../contexts/UserAuthContext'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {v4} from 'uuid'

function useFrom(messageID, setMeasureProgress, chatID) {
  const [text, setText] = useState('')
  const [image, setImage] = useState(null)
  

  const {currentUser} = useContext(UserAuthContext)

  const sendMessageHandler = ()=>{
    const addMessage = async()=>{
      setMeasureProgress("sending...")
      let imageUrl = null
      if(image !== null){
        setMeasureProgress('uploading image...')
        const timeInNumber = new Date().getTime()
        const imageRef = ref(storage, messageID+currentUser.displayName+timeInNumber)
        await uploadBytesResumable(imageRef, image)
        imageUrl = await getDownloadURL(imageRef)
        setMeasureProgress('uploading done')
      }
      await updateDoc(doc(db, 'message', messageID),{
        messages: arrayUnion({
          id: v4(),
          messageSenderID: currentUser.uid,
          imageURL: imageUrl,
          text: text
        })
      })
      updateDoc(doc(db, 'rooms', chatID),{
        lastMessage: text,
        lastMessageType: text.length !== 0 ? "text" : "image"
      })
      setText('')
      setImage(null)
      setMeasureProgress("")
    }
    if(messageID && (text.length !== 0 || image !== null)) addMessage()
  }

  return [text, image, setText, setImage, sendMessageHandler]
}

export default useFrom
