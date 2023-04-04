import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { db, auth } from '../config/firebase'
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore"; 

function useAuthentication() {

  const navigate = useNavigate()

  const loginUser = async ()=>{
    try{
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider)
      const user = result.user;
      // checking if the user is already exists or not 
      const isUser = await getDoc(doc(db, "users", user.uid))
      if(!isUser.exists()){
        await setDoc(doc(db, "users", user.uid), {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          loginCount: 1
        });
      }else{
        await updateDoc(doc(db, 'users', user.uid), {
          loginCount: increment(1)
        });
      }
      navigate('/')
    }
    catch(err){
      console.log(err)
    }
  }

  const logOutUser = async ()=>{
    try{
      await signOut(auth)
      navigate('/login')
    }catch(err){
      console.log(err)
    }
  }
  return {loginUser, logOutUser}
}

export default useAuthentication
