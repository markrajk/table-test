import React, { FC } from 'react'
import { User } from 'src/apiTypes'
import { IMAGE_API_ROOT } from 'src/request'

interface Props {
    profile: User | null
    onClose(): void
}

const SeeUsersModal: FC<Props> = (props: Props) => {
    const { profile, onClose } = props
    console.log(process.env.REACT_APP_API, 'process here');

    return (
        <div className={`custom-modal-wrapper ${!!profile ? 'open' : ''}`} id="seeUsersModal" >
            <div className="custom-modal">
                <div className="custom-modal-body">
                    <div className="custom-modal-close" close-modal="seeUsersModal" onClick={onClose} >
                        <i className="icon-close"></i>
                    </div>

                    {profile?.profilePic ? <img src={IMAGE_API_ROOT + profile.profilePic} alt="User's profile image" className="custom-modal-body-img"></img>
                        : <div className="custom-modal-body-initials">{(profile?.firstname ? profile.firstname[0] : '') + (profile?.lastname ? profile.lastname[0] : '')}</div>}

                    <div className="custom-modal-body-set">
                        <p className="custom-modal-body-set-subtitle">{profile?.jobtitle || 'Jobtitle missing'}</p>
                        <p className="custom-modal-body-set-title">{profile?.firstname + ' ' + profile?.lastname}</p>
                    </div>


                    <div className="custom-modal-body-buttons" onClick={onClose} >
                        <button className="button button-light-gradient" close-modal="seeUsersModal">Cancel</button>
                    </div>
                </div>
            </div>
            <div className="custom-modal-backdrop"></div>
        </div>
    )
}

export default SeeUsersModal
