import { db } from "../config/firebase"
import { getDoc, doc} from "firebase/firestore"

function useUser() {
  const getUserProfile = async(userID)=>{
    try{
      const userData = await getDoc(doc(db, 'users', userID))
      if(userData.exists()){
        return userData.data()
      }
    }catch(err){
      console.log(err)
    }
    return {}
  }
  return [getUserProfile]
}

export default useUser
