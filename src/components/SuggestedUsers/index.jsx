import React from 'react'
import useSuggestedUsers from './hooks/useSuggestedUsers'
import css from './style.module.css'
import useChatRoom from '../../hooks/useChatRoom';
import { useNavigate } from 'react-router-dom';

function SuggestedUsers({onClickHandler}) {

  const [currentUser, suggestedUsers, loading] = useSuggestedUsers()
  const [findOrCreateRoom] = useChatRoom()
  const navigate = useNavigate()
  
  const onUserClickHandler = async (receiverID)=>{
    const roomID = await findOrCreateRoom(currentUser.uid, receiverID)
    if(roomID) navigate(`/chat/${roomID}`)
  }

  return (
    <div className="offcanvas offcanvas-start show d-block" tabIndex="-1" >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasExampleLabel">Suggested Users</h5>
        <button type="button" onClick={onClickHandler} className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        {loading && <h3>Loading users...</h3>}
        { !loading &&
          suggestedUsers.map((user)=>{
            return <div onClick={()=>onUserClickHandler(user.uid)} key={user.uid} className={`d-flex flex-row p-0 mt-2 border-bottom border-1 ${css.suggestedUser}`}>
                    <img src={user.photoURL} className='my-auto ms-1' alt="user photo" height="40"/>
                    <div className='d-flex flex-column ms-2'>
                      <b>{user.displayName}</b>
                      <span>{user.email}</span>
                    </div>
                  </div>
          })
        }
        
      </div>
    </div>
  )
}

export default SuggestedUsers
