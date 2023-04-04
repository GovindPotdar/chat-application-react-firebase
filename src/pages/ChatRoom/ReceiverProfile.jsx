import arrow from '../../assets/images/arrow.png'
import { Link } from 'react-router-dom'
function ReceiverProfile({measureProgress, receiverUser}) {
  return (
    <div className="px-3 border-bottom header sticky-top border border-1">
      <div className="d-flex align-items-center py-1">
        <div className="position-relative mb-1 ">
          <Link to='/'>
            <img src={arrow} className="ms-0" alt="Sharon Lessman" width="20" height="20" />
          </Link>
          <img src={receiverUser.photoURL} className=" ms-1" alt="Sharon Lessman" width="40" height="40" />
        </div>
          <div className="flex-grow-1 pl-3 ms-2 text-white">
            <strong>{receiverUser.displayName}</strong>
            <div className="small text-white">{measureProgress}</div>
          </div>
      </div>
    </div>
  )
}

export default ReceiverProfile
