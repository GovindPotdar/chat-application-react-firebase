import fileImage from '../../assets/images/file-image.png'
// import sendIcon from '../../assets/images/send-icon.png'
import useFrom from './hooks/useFrom'

function Form({chatID, setMeasureProgress, messageID}) {

  const [text, image, setText, setImage, sendMessageHandler] = useFrom(messageID, setMeasureProgress, chatID)
  
  const sendMessageOnEnter = (e)=>{
    if(e.code === "Enter"){
      sendMessageHandler()
    }
  }

  return (
    <div className="flex-grow-0 py-2 border-top footer container fixed-bottom">
      <div className="input-group">
        <input onKeyDown={sendMessageOnEnter} value={text} type="text" onChange={(e)=>setText(e.target.value)} className="form-control" placeholder="Type your message..." />
        <input accept='image/*' onChange={(e)=>setImage(e.target.files[0])} type="file" id='fileInput' className="form-control d-none" />
          <label htmlFor="fileInput" className='fileInput ' type='button'>
            <img src={image !== null ? window.URL.createObjectURL(image) : fileImage} height='38' />
          </label>
        <button className="btn btn-primary" onClick={sendMessageHandler}>Send</button>
      </div>
    </div>
  )
}

export default Form
