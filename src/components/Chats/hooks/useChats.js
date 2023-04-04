import { useContext, useEffect, useState } from 'react'
import { query, collection, where, getDocs, or, getDoc, doc} from 'firebase/firestore'
import UserAuthContext from '../../../contexts/UserAuthContext'
import { db } from '../../../config/firebase'
function useChats() {
  const [chats, setChats] = useState([])
  const [loading, setLoading] = useState(false)

  const { currentUser } = useContext(UserAuthContext)


  useEffect(()=>{
    const getRooms = async ()=>{
      try{
        setLoading(true)
        const q = query(collection(db, 'rooms'),or(where('senderID', '==', currentUser.uid), where('receiverID', '==', currentUser.uid)))
        const data = await getDocs(q)
        const chatList = []
        data.forEach((doc) => {
          const docData = doc.data()
          // console.log(docData.senderID);
          chatList.push({
            id: doc.id,
            receiverID: currentUser.uid === docData.senderID ? docData.receiverID : docData.senderID
          })
        });
        setChats(chatList)
      }catch(err){
        console.log(err)
      }
      setLoading(false)
    }
    getRooms()
  },[])

  return [chats, loading]
}

export default useChats
