import { createContext, useEffect, useState } from "react";
import { auth } from '../../config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
const UserAuthContext = createContext()

const UserAuthProvider = ({children})=>{
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(()=>{
    let currentUserDetails = sessionStorage.getItem('currentUser')

    if(currentUserDetails){
      setCurrentUser(JSON.parse(currentUserDetails)) 
    }
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user)
        sessionStorage.setItem('currentUser', JSON.stringify({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        }))
      }else{
        setCurrentUser(null)
        sessionStorage.setItem('currentUser', null)
      }
    });
  },[])

  return(<>
    <UserAuthContext.Provider value={{currentUser, setCurrentUser}}>
      {children}
    </UserAuthContext.Provider>
  </>)
}

export default UserAuthContext
export { UserAuthProvider }