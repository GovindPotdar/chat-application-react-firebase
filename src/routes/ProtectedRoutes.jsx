import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import UserAuthContext from '../contexts/UserAuthContext'

function ProtectedRoutes({children}) {

  const {currentUser} = useContext(UserAuthContext)

  if(!currentUser){
    return <Navigate to={'/login'}/>
  }

  return(<>
    {children}
  </>)
}

export default ProtectedRoutes
