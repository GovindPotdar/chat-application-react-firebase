import { useEffect, useState } from 'react'
import { db } from '../../../config/firebase'
import { doc, onSnapshot } from 'firebase/firestore'

function useMessages(messageID) {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    if(messageID){
      setLoading(true)
      const unsub = onSnapshot(doc(db, 'message', messageID),(snapshot)=>{
        if(snapshot.exists()){
          setMessages(snapshot.data().messages)
          setLoading(false)
        }
      })
      return ()=>{
        unsub()
      }
    }
  },[])

  return [messages, loading]
}

export default useMessages
