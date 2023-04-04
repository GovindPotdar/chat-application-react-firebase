import React from 'react'
import useChats from './hooks/useChats'
import Chat from './Chat'

function Chats() {

  const [chats, loading] = useChats()

  if(loading){
    return <h3>Loading...</h3>
  }

  return (
    <div className='mt-5 container'>
      {
        chats.length === 0 && <h4>No chat found click `See Suggested Users` to find users.</h4>
      }
      { chats.length !== 0 &&
        chats.map((chat)=>{
          return <Chat roomID={chat.id} receiverID={chat.receiverID} key={chat.id} />
        })
      }
    </div>
  )
}

export default Chats
