import React from 'react'
import css from './chat.module.css'
import useChat from './hooks/useChat'
import profileLoading from '../../assets/images/profile-loading.png'
import { useNavigate } from 'react-router-dom'

function Chat({ roomID, receiverID}) {

  const [chatProfile, lastMessage, loading] = useChat(roomID, receiverID)
  const navigate = useNavigate()

  return (
    <>
      <div onClick={()=>(navigate(`/chat/${roomID}`))} className={css.chatList}>
        <div className="d-flex">
          <img src={loading ? profileLoading : chatProfile.photoURL} className='mt-2' alt="user photo" height="40"/>
          <div className='d-flex flex-column ms-2 mt-1'>
            <b>{loading ? 'Loading...' : chatProfile.displayName}</b>
            <span>{loading ? 'Loading...' : (lastMessage.lastMessageType === 'image' ? '**image**' : lastMessage.text)}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Chat
