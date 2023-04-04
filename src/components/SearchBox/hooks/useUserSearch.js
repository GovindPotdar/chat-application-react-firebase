import { useContext, useState } from "react"
import { collection, query, where, getDocs, orderBy, or, and} from "firebase/firestore";
import { db } from '../../../config/firebase'
import UserAuthContext from "../../../contexts/UserAuthContext";
function useUserSearch() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const {currentUser} = useContext(UserAuthContext)
  const capitalize = (text)=>{
    let textArr = text.split(" ")
    let newTextArr = textArr.map((txt)=>{
      return txt.charAt(0).toUpperCase() + txt.slice(1);
    })
    return newTextArr.join(" ")
  }

  const lowerize = (text)=>{
    let textArr = text.split(" ")
    let newTextArr = textArr.map((txt)=>{
      return txt.charAt(0).toLowerCase() + txt.slice(1);
    })
    return newTextArr.join(" ")
  }

  const searchUsers = async(inputText)=>{
    setLoading(true)
    try{
      const q = query(collection(db, "users"),or(where("displayName", "==", capitalize(inputText)),where("displayName", "==", lowerize(inputText)), where("displayName", "==", inputText), where("email", "==", inputText)))
      const userData = await getDocs(q);
      const newUserData = []
      userData.forEach((doc) => {
        if(doc.id === currentUser.uid) return 
        newUserData.push({
          uid: doc.id,
          ...doc.data()
        })
      });
      setUsers(newUserData)
    }catch(err){
      setUsers([])
      console.log(err)
    }
    setLoading(false)
  }

  return [users, loading, searchUsers, setUsers]
}

export default useUserSearch
