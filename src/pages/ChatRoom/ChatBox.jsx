import './chatBox.css'
import Messages from './Messages'
import { useParams } from 'react-router-dom'
import useChatBox from './hooks/useChatBox'
import Form from './Form'
import ReceiverProfile from './ReceiverProfile'
import { useState } from 'react'


function ChatBox() {

  const { chatID } = useParams()

  const [currentUser, receiverUser, messageID, loading] = useChatBox(chatID)
  const [measureProgress, setMeasureProgress] = useState('')

  if (loading) {
    return <h3>Loading...</h3>
  }

  return (
    <>
      <div className='container '>
        <div className="card chatBox">
          <div className="row g-0">
            <div className="col-12 col-lg-12 col-xl-12">
              <ReceiverProfile measureProgress={measureProgress} receiverUser={receiverUser} />
              <Messages currentUser={currentUser} receiverUser={receiverUser} messageID={messageID} />
              <Form chatID={chatID} setMeasureProgress={setMeasureProgress} messageID={messageID} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatBox
