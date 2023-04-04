import useMessages from "./hooks/useMessages"
import Message from "./Message"

function Messages({ currentUser, receiverUser, messageID }) {
  const [messages, loading] = useMessages(messageID)

  return (
    <div className="position-relative" style={{ backgroundColor: 'white' }}>
      <div className="chat-messages p-4">
        {
          loading && 'Loading messages...'
        }
        {!loading && messages.map((message) => {
          return <Message key={message.id} currentUser={currentUser} receiverUser={receiverUser} data={message} />
        })}
      </div>
    </div>
  )
}

export default Messages
