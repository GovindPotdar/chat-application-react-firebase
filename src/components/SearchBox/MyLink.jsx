import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserAuthContext from '../../contexts/UserAuthContext';
import useChatRoom from '../../hooks/useChatRoom';

function MyLink(props) {
  // receiverID
  const navigate = useNavigate();
  const { currentUser } = useContext(UserAuthContext)
  const [findOrCreateRoom] = useChatRoom()

  const navigateTo = async ()=>{
    const roomID = await findOrCreateRoom(currentUser.uid, props.receiverID)
    if(roomID) navigate(`/chat/${roomID}`)
  }

  return (
    <>
      <button onClick={navigateTo} className={props.className}>{props.children}</button>
    </>
  )
}

export default MyLink