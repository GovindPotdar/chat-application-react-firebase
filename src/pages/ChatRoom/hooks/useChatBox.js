import { useContext, useEffect, useState } from "react"
import UserAuthContext from "../../../contexts/UserAuthContext"
import useUser from "../../../hooks/useUser"
import { db } from "../../../config/firebase"
import { getDoc, doc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
function useChatBox(chatID) {
  
  const [receiverUser, setReceiverUser] = useState({})
  const [messageID, setMessageID] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { currentUser } = useContext(UserAuthContext)
  const [getUserProfile] = useUser()

  useEffect(()=>{
    setLoading(true)
    const getData = async()=>{
      try{
        const room = await getDoc(doc(db, 'rooms', chatID))
        if(room.exists()){
          const roomData = room.data()
          setMessageID(roomData.messageID)
          const receiverUserData = await getUserProfile(currentUser.uid === roomData.senderID ? roomData.receiverID : roomData.senderID)
          setReceiverUser(receiverUserData)
        }else{
          console.log("room not found")
          navigate('/')
        }
      }catch(err){
        console.log(err)
      }
      setLoading(false)
    }
    getData()
  },[])

  return [currentUser, receiverUser, messageID, loading]
}

export default useChatBox
