import React, { useEffect, useRef, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import {
  InviteEmployeesVariables,
  InviteUserVariables,
  User,
} from 'src/apiTypes'
import { AppDispatch, RootState } from 'src/configureStore'
import { inviteEmployees } from 'src/redux/company/actions'
import {
  addToTeam,
  getActiveTeamUsers,
  getUserSuggestion,
  inviteUser,
} from 'src/redux/teams/actions'
import { IMAGE_API_ROOT } from 'src/request'
import { useTranslation } from 'react-i18next'
import { validateEmail } from 'src/utitlity'
import Toaster from '../common/toaster'

const mapStateToProps = (state: RootState) => ({
  user: state.authReducer.user,
  company: state.companyReducer.company,
  userSuggestions: state.teamReducer.userSuggestions,
  selectedTeam: state.teamReducer.selectedTeam,
  selectedTeamData: state.teamReducer.selectedTeamData,
  inviteModalType: state.teamReducer.inviteModalType
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  inviteEmployees: (data: InviteEmployeesVariables) =>
    dispatch(inviteEmployees(data)),
  inviteUser: (data: InviteUserVariables) => dispatch(inviteUser(data)),
  getUserSuggestion: (data: { teamId: string; keyword: string }) =>
    dispatch(getUserSuggestion(data)),
  addToTeam: (
    data: {
      teamId: string
      userId: string
      type: string
    },
    user: User
  ) => dispatch(addToTeam(data, user)),
  getActiveUsers: (teamId: string, type: 'teamMembers' | 'teamLeaders') =>
    dispatch(getActiveTeamUsers(teamId, type)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {

}

type SingleCellProps = {
  selectedUsers: User[]
  keyword: string
  setKeyword(text: string): void
  selectUser(users: User[]): void
  selectedUser: User | null,
  emails: string[],
  setEmail(text: string[]): void
  disabled?: boolean
  teamMembers: User[]
  index?: number
}

const SingleCell = (props: Props & SingleCellProps) => {
  const { t } = useTranslation(["common"])
  const {
    userSuggestions,
    getUserSuggestion,
    selectedTeam,
    addToTeam,
    inviteUser,
    selectedUsers,
    keyword,
    setKeyword,
    selectUser,
    selectedUser,
    emails,
    setEmail,
    disabled,
    teamMembers,
    inviteModalType
  } = props
  const [email, setValidEmail] = useState('')
  return (
    <>
      <div className="custom-input-container check">
        {(!!email || !!selectedUser) && <i className={validateEmail(email) && keyword ? "icon-check-circle" : selectedUser ? "icon-close" : ''} onClick={() => {
          if (emails) {
            setEmail(emails.filter(item => item !== selectedUser?.firstname))
          }


          selectUser(selectedUsers.filter(item => item._id !== selectedUser?._id))
        }}></i>}


        <input type="text" disabled={disabled || !!selectedUser}
          /*             onBlur={() => {
                          if (email) {
                              const oldEmails = [...emails]
                              oldEmails.push(keyword)
                              setEmail(oldEmails)
                              setKeyword('')
                              setValidEmail('')
                          }
          
                      }
                      
                      } */
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (email) {
                const oldEmails = [...emails]
                oldEmails.push(keyword)
                setEmail(oldEmails)
                setKeyword('')
                setValidEmail('')
              }
            }
          }}
          onBlur={(e) => {
            if (validateEmail(email)) {
              console.log(e);
              const oldEmails = [...emails]
              oldEmails.push(keyword)
              setEmail(oldEmails)
              setKeyword('')
              setValidEmail('')
              e.currentTarget.dispatchEvent(new KeyboardEvent('keypress', { 'key': 'Enter' }))
            }
          }}
          placeholder={`${t('common:Enteremail')}`} value={selectedUser ? selectedUser.firstname + ' ' + selectedUser.lastname : keyword} onChange={(e) => {
            if (selectedTeam) {
              setKeyword(e.target.value)
              getUserSuggestion({
                teamId: selectedTeam._id,
                keyword: e.target.value,
              })
            }

            setValidEmail(e.target.value)


          }} />


        <div className="dropdown-menu">
          {!!keyword &&
            userSuggestions?.filter(member => {
              return !teamMembers.some(team => team._id === member._id)
            }).map((member) => (
              <div className="dropdown-menu-item" key={member._id}>

                {member.profilePic ? (
                  <img
                    src={IMAGE_API_ROOT + member.profilePic}
                    alt="User's profile image"
                    className="dropdown-menu-item-img"
                  />
                ) : (
                    <div className="person-item-initials">
                      {member.firstname[0] + member.lastname[0]}
                    </div>
                  )}

                <div className="dropdown-menu-item-set">
                  <p className="dropdown-menu-item-set-title">{member.firstname + ' ' + member.lastname}</p>
                  <p className="dropdown-menu-item-set-text">{member.jobtitle || 'Job title missing'}</p>
                </div>
                <button
                  className="button link"
                  onClick={() => {
                    const checkIfTeamMember = teamMembers.some(team => team._id === member._id)
                    if (!checkIfTeamMember) {
                      const oldUsers = [...selectedUsers]
                      oldUsers.push(member)
                      selectUser(oldUsers)
                      setKeyword('')
                    }

                  }}
                >
                  {teamMembers.some(team => team._id === member._id) ? t('common:Added') : t("common:Select")}
                </button>
              </div>
            ))}
        </div>


      </div>


    </>
  )
}

const InviteTeamMember = (props: Props) => {
  const {
    userSuggestions,
    getUserSuggestion,
    selectedTeam,
    addToTeam,
    inviteUser,
    getActiveUsers,
    selectedTeamData,
    inviteModalType
  } = props

  const [keyword, setKeyword] = useState('')
  const [selectedUsers, selectUser] = useState<User[]>([])
  const [emails, setEmails] = useState<string[]>([])
  const { t } = useTranslation(['inviteMembersModal', 'common'])

  useEffect(() => {
    if (selectedTeam) {
      getActiveUsers(selectedTeam._id, inviteModalType)
    }
  }, [selectedTeam])
  const [confirmClicked, setConfirmClicked] = useState(false)

  return (
    <div className="custom-modal-wrapper" id="inviteMemberNew">
      <div className="custom-modal">

        <div className="custom-modal-body">
          <div className="custom-modal-close" close-modal="inviteMemberNew" onClick={() => {
            setEmails([])
            selectUser([])
            setKeyword('')
            document
              .getElementById('inviteMemberNew')
              ?.classList.remove('open')
          }}>
            <i className="icon-close"></i>
          </div>
          <p className="custom-modal-body-title">{t("common:Addnew")} {inviteModalType === 'teamMembers' ? t("common:teammember") : t("common:teamlead")} !</p>

          <p className="custom-modal-body-label">{t("common:Enteremails")}</p>

          {/* <div className="custom-input-container check">
            <i className="icon-check-circle"></i>

            <input type="text" placeholder="Enter email" value={selectedUsers && selectedUsers[0] ? selectedUsers[0].firstname + ' ' + selectedUsers[0].lastname : undefined} onChange={(e) => {
                  if (selectedTeam) {
                    setKeyword(e.target.value)
                    getUserSuggestion({
                      teamId: selectedTeam._id,
                      keyword: e.target.value,
                    })
                  }
                }}/>

            <div className="dropdown-menu">
            {!!keyword &&
                  userSuggestions?.map((member) => (
                    <div className="dropdown-menu-item" key={member._id}>
                    
                      {member.profilePic ? (
                        <img
                          src={IMAGE_API_ROOT+member.profilePic}
                          alt="User's profile image"
                          className="dropdown-menu-item-img"
                        />
                      ) : (
                        <div className="person-item-initials">
                          {member.firstname[0] + member.lastname[0]}
                        </div>
                      )}

                <div className="dropdown-menu-item-set">
                  <p className="dropdown-menu-item-set-title">{member.firstname + ' ' + member.lastname}</p>
                  <p className="dropdown-menu-item-set-text">{member.jobtitle || 'Job title missing'}</p>
                </div>
                <button 
                    className="button link"
                        onClick={() => {
                          const oldUsers = [...selectedUsers]
                          oldUsers.push(member)
                          selectUser(oldUsers)
                          setKeyword('')
                        }}
                      >
                        {t('common:Select')}
                      </button>
                    </div>
                  ))}
                </div>

            
          </div> */}
          {selectedUsers?.map((item, i) =>

            <SingleCell index={i} {...props} teamMembers={(selectedTeamData && selectedTeamData[inviteModalType]) || []} selectedUsers={(selectedUsers) || null} keyword={keyword} setKeyword={(text) => setKeyword(text)} selectUser={user => selectUser(user)} selectedUser={selectedUsers[i] || null} setEmail={(emails) => setEmails(emails)} emails={emails} />
          )}
          {emails.map((item, i) => <SingleCell
            teamMembers={(selectedTeamData && selectedTeamData[inviteModalType]) || []}
            {...props} selectedUsers={(selectedUsers) || null} keyword={keyword} setKeyword={(text) => setKeyword(text)} selectUser={user => selectUser(user)} emails={emails} setEmail={(emails) => setEmails(emails)}
            //@ts-ignore
            selectedUser={{
              _id: item + i,
              firstname: item,
              lastname: ''
            }} />)}
          <SingleCell teamMembers={(selectedTeamData && selectedTeamData[inviteModalType]) || []} {...props} selectedUsers={(selectedUsers) || null} keyword={keyword} setKeyword={(text) => setKeyword(text)} selectUser={user => selectUser(user)} selectedUser={null} setEmail={(emails) => setEmails(emails)} emails={emails} />
          <SingleCell teamMembers={(selectedTeamData && selectedTeamData[inviteModalType]) || []} {...props} selectedUsers={(selectedUsers) || null} disabled={true} keyword={''} setKeyword={(text) => setKeyword(text)} selectUser={user => selectUser(user)} selectedUser={null} setEmail={(emails) => setEmails(emails)} emails={emails} />


          <div className="custom-modal-body-buttons">
            <button
              className="button button-green-primary"
              style={(!!selectedUsers && !selectedUsers.length) || (emails && !emails.length) ? {
                opacity: .5
              } : {}}
              onClick={() => {
                if ((!!selectedUsers && !selectedUsers.length) || (emails && !emails.length)) {
                  return
                }
                selectedUsers.forEach((member) => {
                  if (selectedTeam) {
                    addToTeam(
                      {
                        teamId: selectedTeam?._id,
                        userId: member._id,
                        type: inviteModalType,
                      },
                      member
                    )
                  }
                })
                if (selectedTeam) {
                  emails.forEach((email) => {
                    inviteUser({
                      teamId: selectedTeam._id,
                      invitedUser: email,
                      type: inviteModalType === 'teamMembers' ? 'Team member' : 'Team leader',
                    })
                  })
                }
                setEmails([])
                selectUser([])
                setKeyword('')
                document
                  .getElementById('inviteMemberNew')
                  ?.classList.remove('open')
                setConfirmClicked(true)
              }}>{t("common:Confirm")}</button>
            <button className="button button-light-gradient" onClick={() => {
              setEmails([])
              selectUser([])
              setKeyword('')
              document
                .getElementById('inviteMemberNew')
                ?.classList.remove('open')
            }}>{t("common:Cancel")}</button>
          </div>

        </div>
      </div>
      <div className="custom-modal-backdrop"></div>
      <Toaster
        type="success"
        instance={confirmClicked}
        text={inviteModalType === 'teamMembers' ? 'New team members added/invited.' : 'New team leaders added/invited.'}
        clear={() => setConfirmClicked(false)}
      />
    </div>
  )
}

export default connector(InviteTeamMember)