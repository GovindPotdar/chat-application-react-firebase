import { useContext, useEffect, useState } from 'react'
import { db } from '../../../config/firebase'
import { getDocs, query, collection, limit, orderBy } from 'firebase/firestore'
import UserAuthContext from '../../../contexts/UserAuthContext'
function useSuggestedUsers() {
  const [suggestedUsers, setSuggestedUsers] = useState([])
  const [loading, setLoaing] = useState(false)

  const {currentUser} = useContext(UserAuthContext)

  useEffect(()=>{
    setLoaing(true)
    const getSuggestedUsersData = async()=>{
      try{
        const q = query(collection(db, 'users'), orderBy("loginCount"), limit(10))
        const snapShots = await getDocs(q)
        const suggestedUsers = []
        snapShots.forEach((doc)=>{
          if(doc.id === currentUser.uid) return 
          suggestedUsers.push({
            uid: doc.id,
            ...doc.data()
          })
        })
        setSuggestedUsers(suggestedUsers)
      }catch(err){
        console.log(err)
      }
      setLoaing(false)
    }
    getSuggestedUsersData()
  },[])

  return [currentUser, suggestedUsers, loading]
}

export default useSuggestedUsers
