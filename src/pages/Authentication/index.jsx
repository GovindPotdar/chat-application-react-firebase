import {useContext} from 'react'
import google from '../../assets/images/google.png'
import { Navigate } from 'react-router-dom';
import UserAuthContext from '../../contexts/UserAuthContext'
import useAuthentication from '../../hooks/useAuthentication';

function Authentication() {
  const {currentUser} = useContext(UserAuthContext)

  const {loginUser} = useAuthentication()

  if(currentUser){
    return <Navigate to='/'/>
  }

  return (
    <div className='d-flex bg-dark' style={{"minHeight" : "100vh"}}>
      <button onClick={loginUser} type="button" className="btn btn-sm btn-light p-15 border border-2 mx-auto my-auto">
        <img src={google} alt='google-image' style={{height: '20px'}} className='mx-1' />Login with Google
      </button>
    </div>
  )
}

export default Authentication
