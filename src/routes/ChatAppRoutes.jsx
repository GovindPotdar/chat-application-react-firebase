import ProtectedRoutes from './ProtectedRoutes'
import { lazy } from 'react'
import { Routes, Route } from "react-router-dom"


const Home = lazy(()=>import('../pages/Home'))
const Authentication = lazy(()=>import('../pages/Authentication'))
const ChatRoom = lazy(()=>import('../pages/ChatRoom'))


function ChatAppRoutes() {
  return (
    <Routes>
      <Route
        index
        element={
        <ProtectedRoutes>
          <Home/>
        </ProtectedRoutes>
        }
        exact
      />
      <Route
        path="chat/:chatID"
        element={
        <ProtectedRoutes>
          <ChatRoom/>
        </ProtectedRoutes>
        }
        exact
      />
      <Route
        path='/login'
        element={<Authentication/>}
        exact
      />
    </Routes>
  )
}

export default ChatAppRoutes
