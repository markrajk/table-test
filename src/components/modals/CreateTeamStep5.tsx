import React, { useEffect, useState } from 'react'
import { CreateTeamVariables, Team } from 'src/apiTypes'

import { validateEmail } from 'src/utitlity'
import Toaster from '../common/toaster'


interface Props {
    createTeam(data: CreateTeamVariables): void
    createdTeam: Team | null
    inviteUser(email: string): void
    handleClose(): void
}   

const CreateTeamStep5 = (props: Props) => {
    const [ name, setName] = useState('')
    const [ emails, setEmails ] = useState<string[]>([])
    const [newEmail, setNewEmail ] = useState('')
    const [ validations, setValidations ] = useState<boolean[]>([])
    const { createTeam, createdTeam, inviteUser, handleClose } = props
    const [ error, setError ] = useState('')

    const [ nameValidation, setNameValidation ] = useState(false)
    useEffect(() => {
        if (createdTeam) {
            emails.forEach(item => {
                inviteUser(item)
            })
            setTimeout(() => handleClose())
        }

    }, [createdTeam])
    return(
        <>
        <div className="custom-modal-body-main">
                <p className="custom-modal-body-title">Create yout first team</p>
                <p className="custom-modal-body-text">Basic features free of charge</p>
    
    
                <p className="custom-modal-body-label">Name of the team</p>
                <div className="input-container check">
                  <input type="text" placeholder="Enter name" onChange={(e) => {
                      setName(e.target.value)
                      if (!e.target.value) {
                          setNameValidation(false)
                      }
                  }} onBlur={() => {
                      if (name) {
                          setNameValidation(true)
                      }
                  }} />
                  {nameValidation && <i className="icon-check-circle"></i>}
                </div>
    
                <p className="custom-modal-body-label">Invite team members</p>
                <div className="members-input">
                    {emails.map((item, i) => 
                        <div className="input-container">
                        <input type="email" placeholder="Enter email" value={item} onChange={(e) => {
                            const oldEmails = [...emails]
                            oldEmails[i] = e.target.value
                            setEmails(oldEmails)
                        }} />
                       {validations[i] && <i className="icon-check-circle"></i>}
                    </div>
                        )}
 
                  <div className="input-container">
                    <input type="email" placeholder="Enter email" value={newEmail}
                    onBlur={() => {
                        if (newEmail && validateEmail(newEmail)) {
                            setEmails([...emails, newEmail])
                            setNewEmail('')
                            setValidations([...validations, true])
                        }
                    }}
                    onChange={(e) => {
                        setNewEmail(e.target.value)
                    } } />
                    <i className="icon-check-circle"></i>
                  </div>
                  <div className="input-container">
                    <input type="email" placeholder="Enter email"
                        disabled
                     />
                    <i className="icon-check-circle"></i>
                  </div>
                </div>
    
                <button className="button button-green-primary" style={{
                    opacity: name ? 1 : .5
                }} onClick={() => {
                    if (name) {
                        createTeam({
                            name
                        })
                    } else {
                        setError('Please give your team a name to continue.')
                    }
                } } >Continue <i className="icon-arrow-right"></i></button>
    
              </div>
    
              <div className="custom-modal-body-right">
                <img src="/img/table-img.png" alt="Clip art" className="custom-modal-body-right-img" />
                <p className="custom-modal-body-right-text">
                  Invite your people and let’s
                  start developing your teams,
                  <span>even remotely</span>
                </p>
              </div>
              <Toaster type='error' instance={!!error} clear={() => setError('')} text={error} />
              </>
    )
}

export default CreateTeamStep5