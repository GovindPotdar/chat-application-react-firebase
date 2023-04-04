import { useEffect, useState } from "react"
import { db } from "../../../config/firebase"
import { doc, onSnapshot} from "firebase/firestore"
import useUser from "../../../hooks/useUser"

function useChat(roomID, receiverID) {
  const [lastMessage, setLastMessage] = useState({})
  const [chatProfile, setChatProfile] = useState({})
  const [loading, setLoading] = useState(false)

  const [getUserProfile] = useUser()

  useEffect(()=>{
    let unsub = null
    setLoading(true)
    const setChatStates = async()=>{
      try{
        const data = await getUserProfile(receiverID)
        setChatProfile(data)
        unsub = onSnapshot(doc(db, 'rooms', roomID),(roomData)=>{
          if(roomData.exists()){
            setLastMessage({
              text: roomData.data().lastMessage,
              lastMessageType: roomData.data().lastMessageType
            })
          }
        })
      }catch(err){
        console.log(err)
      }
      setLoading(false)
    }
    setChatStates()
    return ()=>{
      if(unsub !== null) unsub()
    }
  },[])

  return [chatProfile, lastMessage, loading]
}

export default useChat
