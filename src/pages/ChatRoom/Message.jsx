import React, { memo, useRef, useEffect } from 'react'
import profileLoading from '../../assets/images/profile-loading.png'

function Message({ data, receiverUser, currentUser }) {

  const ref = useRef()

  // console.log("message here")
  const getProfilePic = () => {
    if (data) {
      if (data.messageSenderID === currentUser.uid) return currentUser.photoURL
      return receiverUser.photoURL
    }
    return profileLoading
  }

  const getName = () => {
    if (data) {
      if (data.messageSenderID === currentUser.uid) return currentUser.displayName
      return receiverUser.displayName
    }
    return 'Not Found'
  }

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  return (
    <>
      <div ref={ref} className="chat-message-left mt-2 pb-1">
        <div className='d-flex'>
          <img src={getProfilePic()} className="mr-1" alt="" width="40" height="40" />
          {/* <div className="text-muted small text-nowrap mt-2">2:37 am</div> */}
          <div className="ms-1"><b>{getName()}</b><br />
            {data.text && <><span>{data.text}</span><br /></>}
            <span>{data.imageURL && <img src={data.imageURL} width='80' />}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(Message)
