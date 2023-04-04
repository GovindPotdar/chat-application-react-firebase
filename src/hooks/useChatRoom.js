import { db } from "../config/firebase"
import { doc, setDoc, query, collection, getDocs, or, and, where } from "firebase/firestore"
import { v4 } from "uuid"

function useChatRoom() {
  
  const findRoomBySenderidReceiverid = async(senderID, receiverID)=>{
    let roomID = null
    try{
      const q = query(collection(db, 'rooms'),
        or(
          and(
            where('senderID', '==', senderID),
            where('receiverID', '==', receiverID)
          ),
          and(
            where('receiverID', '==', senderID),
            where('senderID', '==', receiverID)
          )
        )    
      )
      const dataSnapShot = await getDocs(q)
      dataSnapShot.forEach((doc) => {
        roomID = doc.id
      });
    }catch(err){
      console.log(err)
    }
    return roomID
  }

  const createMessage = async()=>{
    try{
      const messageID = v4()
      await setDoc(doc(db, 'message', messageID),{
        messages: []
      })
      return messageID
    }catch(err){
      console.log(err)
    }
    return null
  }

  const createRoom = async(senderID, receiverID)=>{
    try{
      const messageID = await createMessage()
      if(messageID){
        const roomID = v4()
        await setDoc(doc(db, 'rooms', roomID),{
          lastMessage: '',
          lastMessageType: '',
          messageID: messageID,
          receiverID: receiverID,
          senderID: senderID
        })
        return roomID
      }
    }catch(err){
      console.log(err)
    }
    return null
  }

  const findOrCreateRoom = async (senderID, receiverID)=>{
    let roomID = await findRoomBySenderidReceiverid(senderID, receiverID)
    if(roomID) return roomID
    const createdRoomID = await createRoom(senderID, receiverID)
    return createdRoomID
  }

  return [findOrCreateRoom]
}

export default useChatRoom
