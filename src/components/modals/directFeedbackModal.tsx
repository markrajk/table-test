import React, { useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { User } from 'src/apiTypes'
import { AppDispatch, RootState } from 'src/configureStore'
import { getDirectFeedback } from 'src/redux/feedback/actions'
import { IMAGE_API_ROOT } from 'src/request'
import SingleFeedbackCard from './singleFeedbackCard'
import SeeUsersModal from './seeUsersModal'


const mapStateToProps = (state: RootState) => ({
  directFeedbacks: state.feedbackReducer.directFeedbacks,
  
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getDirectFeedback: (sender: string, receiver: string) => dispatch(getDirectFeedback(sender, receiver))
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  senderId: string
  sender?: User
  receiver?: User
  receiverId: string
}

const DirectFeedback = (props: Props) => {
  const { senderId, receiverId, getDirectFeedback, directFeedbacks, sender, receiver } = props


  
  const [ switchStatus, setSwitch ] = useState(0)
  useEffect(() => {
    const isEven = switchStatus % 2 === 0
    if (senderId && receiverId) {
      if (isEven) {
        getDirectFeedback(senderId, receiverId)
      } else {
        getDirectFeedback(receiverId, senderId)
      }
      
    }
    
  }, [senderId, receiverId, switchStatus])
  const senderVar = switchStatus % 2 === 0 ? 'sender' : 'receiver'
  const receiverVar =  switchStatus % 2 === 0 ? 'receiver' : 'sender'
  const isEven = switchStatus % 2
  const [ senderName, setSenderName ] = useState({
    firstname: '',
    lastname: '',
    profilePic: '',
    jobtitle: ''
  })
  const [ receiverName, setReceiverName ] = useState({
    firstname: '',
    lastname: '',
    profilePic: '',
    jobtitle: ''
  })

  useEffect(() => {
    if (sender) {
      setSenderName({
        firstname: sender.firstname,
        lastname: sender.lastname,
        profilePic: sender.profilePic || '',
        jobtitle: sender.jobtitle
      })
    }
    if (receiver) {
      setReceiverName({
        firstname: receiver.firstname,
        lastname: receiver.lastname,
        profilePic: receiver.profilePic || '',
        jobtitle: receiver.jobtitle
      })
    }
  }, [sender, receiver])

  const [ selectedProfile, selectProfile ] = useState<User | null>(null)
    return(
<div className="custom-modal-wrapper" id="feedbackTransferModal">
          <div className="custom-modal">
            <div className="custom-modal-header">
              <div className="person-info" onClick={() => selectProfile(senderName as User)}>
                {senderName.profilePic ? 
                <img src={IMAGE_API_ROOT + senderName.profilePic} alt="User's profile image" className="person-info-img" /> 
                :<div className="person-info-initials" style={{backgroundColor: "#fea42a"}}>{senderName.firstname ? senderName.firstname[0] + senderName.lastname[0] :  directFeedbacks  && directFeedbacks[0] && (directFeedbacks[0][senderVar].firstname[0]  + directFeedbacks[0][senderVar].lastname[0])}</div>}
                <div className="person-info-set">
                  <p className="person-info-set-name">{senderName.firstname ? senderName.firstname + ' ' + senderName.lastname  : directFeedbacks  && directFeedbacks[0] && (directFeedbacks[0][senderVar].firstname +  ' ' + directFeedbacks[0][senderVar].lastname)}</p>
                  <p className="person-info-set-position">{ senderName.firstname ? senderName.firstname + ' ' + senderName.lastname : directFeedbacks && directFeedbacks[0]  && directFeedbacks[0][senderVar].jobtitle}</p>
                </div>
              </div>

              <div className="person-divider" onClick={() => {
                setSwitch(switchStatus + 1)
              }
              }>
                <p className="person-divider-text">Sent to</p>
                <svg xmlns="http://www.w3.org/2000/svg" style={{
                transform: `rotate(${isEven ? 0 : 180}deg)`,
                transition: `transform 1s`
              }} width="84.712" height="17.175" viewBox="0 0 84.712 17.175">
                  <g transform="translate(-673.875 -137.913)">
                    <line x2="69" transform="translate(675 146.5)" fill="none" stroke="#8790a3" stroke-linecap="round"
                      stroke-width="2.25" />
                    <g transform="translate(-30.5)">
                      <line x2="8" y2="7" transform="translate(779.5 139.5)" fill="none" stroke="#8790a3"
                        stroke-linecap="round" stroke-width="2.25" />
                      <line x1="8" y2="7" transform="translate(779.5 146.5)" fill="none" stroke="#8790a3"
                        stroke-linecap="round" stroke-width="2.25" />
                    </g>
                  </g>
                </svg>
                <div className="person-divider-icon"><i className="icon-compare"></i></div>
              </div>

              <div className="person-info" onClick={() => selectProfile(receiverName as User)}>
              {receiverName.profilePic ? 
                <img src={IMAGE_API_ROOT + receiverName.profilePic} alt="User's profile image" className="person-info-img" /> 
                :
                <div className="person-info-initials" style={{backgroundColor: "#fea42a"}}>{receiverName?.firstname ? receiverName?.firstname [0] + receiverName?.lastname[0]  : directFeedbacks && directFeedbacks[0] &&  (directFeedbacks[0][receiverVar]?.firstname[0]  + directFeedbacks[0][receiverVar]?.lastname[0])}</div>}
                <div className="person-info-set">
                  <p className="person-info-set-name">{receiverName?.firstname ? receiverName?.firstname + ' ' + receiverName?.lastname  : directFeedbacks && directFeedbacks[0] &&  (directFeedbacks[0][receiverVar]?.firstname +  ' ' + directFeedbacks[0][receiverVar]?.lastname)}</p>
                  <p className="person-info-set-position">{receiverName?.firstname ? receiverName?.firstname + ' ' + receiverName?.lastname  : directFeedbacks && directFeedbacks[0] &&  directFeedbacks[0][receiverVar]?.jobtitle}</p>
                </div>
              </div>
            </div>
            <div className="custom-modal-body">
              {directFeedbacks?.map(item => <SingleFeedbackCard key={item._id} data={item} /> )}
              
              

              

            

            </div>

            <div className="custom-modal-footer" onClick={() => document.getElementById('feedbackTransferModal')?.classList.remove('open')}>
              <button className="button button-white" close-modal="feedbackTransferModal">Close window</button>
            </div>

          </div>
          <div className="custom-modal-backdrop"></div>
          <SeeUsersModal profile={selectedProfile} onClose={() => selectProfile(null)} />
        </div>
    )
}


export default connector(DirectFeedback)