import React, { useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { CreateTeamVariables, InviteUserVariables, User } from 'src/apiTypes'
import { AppDispatch, RootState } from 'src/configureStore'
import {
  addToTeam,
  clearTeamData,
  createTeam,
  getMyTeams,
  getTeamById,
  getUserSuggestion,
  inviteUser,
} from 'src/redux/teams/actions'
import { IMAGE_API_ROOT } from 'src/request'
import { capitalize, colorByName, validateEmail } from 'src/utitlity'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'



const mapStateToProps = (state: RootState) => ({
    createdTeam: state.teamReducer.createdTeam,
    loading: state.teamReducer.loading,
    userSuggestions: state.teamReducer.userSuggestions,
    selectedTeam: state.teamReducer.selectedTeam,
    user: state.authReducer.user
  })

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    createTeam: (data: CreateTeamVariables) => dispatch(createTeam(data)),
    getMyTeams: () => dispatch(getMyTeams()),
    clearTeamData: (what: string) => dispatch(clearTeamData(what)),
    addToTeam: (
      data: {
        teamId: string
        userId: string
        type: string
      },
      user: User
    ) => dispatch(addToTeam(data, user)),
    getUserSuggestion: (data: { teamId: string; keyword: string }) =>
      dispatch(getUserSuggestion(data)),
    getTeamById: (teamId: string) => dispatch(getTeamById(teamId)),
    inviteUser: (data: InviteUserVariables) => dispatch(inviteUser(data)),
  })
  
  const connector = connect(mapStateToProps, mapDispatchToProps)
  
  type PropsFromRedux = ConnectedProps<typeof connector>
  
  type Props = PropsFromRedux & {}


const CreateTeam = (props: Props) => {
    const [ step, changeStep ] = useState<'step-01' | 'step-02'>('step-01')
    const {
        createTeam,
        getUserSuggestion,
        addToTeam,
        userSuggestions,
        selectedTeam,
        createdTeam,
        getMyTeams,
        getTeamById,
        inviteUser,
        user
      } = props
      const [name, setName] = useState('')
      const [description, setDescription] = useState('')
      const [keyword, setKeyword] = useState('')
      const [selectedUsers, selectUser] = useState<User[]>([])
      const [emails, setEmails] = useState<string[]>([])
      const [leadrEmails, setLeaderEmails] = useState<string[]>([])
      const [selectedLeaders, selectLeaders] = useState<User[]>([])
      const { push } = useHistory()

      const [ error, setError ] = useState('')

      useEffect(() => {
        if (createdTeam) {
          if (selectedUsers.length) {
            selectedUsers.forEach((member) => {
              addToTeam(
                {
                  teamId: createdTeam._id,
                  userId: member._id,
                  type: 'teamMembers',
                },
                member
              )
            })
            document.getElementById('createNewTeamModal')?.classList.remove('open')
            selectUser([])
          }
          if (selectedLeaders.length) {
            selectedUsers.forEach((member) => {
              addToTeam(
                {
                  teamId: createdTeam._id,
                  userId: member._id,
                  type: 'teamLeaders',
                },
                member
              )
            })
            document.getElementById('createNewTeamModal')?.classList.remove('open')
            selectLeaders([])
          }
          if (!selectedUsers.length) {
            document.getElementById('createNewTeamModal')?.classList.remove('open')
          }
          getMyTeams()
          setTimeout(
            () => push('/team/' + createdTeam._id + '/data/teamFeedback'),
            1000
          )
          emails.forEach((email) => {
            inviteUser({
              teamId: createdTeam._id,
              invitedUser: email,
              type: 'Team member',
            })
          })
          leadrEmails.forEach((email) => {
            inviteUser({
              teamId: createdTeam._id,
              invitedUser: email,
              type: 'Team leader',
            })
          })
          setEmails([])
          setLeaderEmails([])
          setKeyword('')
          setDescription('')
        }
      }, [createdTeam])
      const [nameValidation, validateName] = useState(false)
      const { t } = useTranslation(['createTeamModal', 'common'])
      const [ focus, setFocus ] = useState<'leader' | 'member'>('leader')

      useEffect(() => {
        if (user) {
          selectLeaders([user])
        }
      }, [user])

      const [ memberKeyword, setMemberKeyword ] = useState('')

    return(
        <div className="custom-modal-wrapper" id="createNewTeamModal">
          <div className="custom-modal">
    
            <div className="custom-modal-header">
              <div className="custom-modal-close" close-modal="createNewTeamModal" onClick={() => document.getElementById('createNewTeamModal')?.classList.remove('open')} >
                <i className="icon-close"></i>
              </div>
              <p className="custom-modal-header-subtitle">{name}</p>
              <p className="custom-modal-header-title">Create a new team</p>
            </div>
            <div className={`custom-modal-body ${step}`}>

              <div className="custom-breadcrumbs-container">
                <div className="custom-breadcrumbs step-01">
                  <div className="custom-breadcrumbs-item active">
                    <i className="icon-check"></i>
                    <p className="custom-breadcrumbs-item-text">Name Your Team</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="10.055" height="31.519" viewBox="0 0 10.055 31.519">
                    <path d="M3658.419,167.295l9.046,17.626-7.115,13.431" transform="translate(-3657.975 -167.066)"
                      fill="none" stroke="#e8e9e9" stroke-width="1" />
                  </svg>
                  <div className="custom-breadcrumbs-item">
                    <i className="icon-check"></i>
                    <p className="custom-breadcrumbs-item-text">Add Members</p>
                  </div>
                </div>

                <div className="custom-breadcrumbs step-02">
                  <div className="custom-breadcrumbs-item checked">
                    <i className="icon-check"></i>
                    <p className="custom-breadcrumbs-item-text">Name Your Team</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="10.055" height="31.519" viewBox="0 0 10.055 31.519">
                    <path d="M3658.419,167.295l9.046,17.626-7.115,13.431" transform="translate(-3657.975 -167.066)"
                      fill="none" stroke="#e8e9e9" stroke-width="1" />
                  </svg>
                  <div className="custom-breadcrumbs-item active">
                    <i className="icon-check"></i>
                    <p className="custom-breadcrumbs-item-text">Add Members</p>
                  </div>
                </div>

                <button className="button button-green-primary step-01" onClick={() => changeStep('step-02')} >Next</button>
                <button className="button button-link step-02" onClick={() => changeStep('step-01')} >&#8592; Go Back</button>
                <button className="button button-primary step-02" style={{marginLeft: 0}} onClick={() => {
              if (name) {
                createTeam({
                  name,
                  description,
                  autoAddDisabled: true
                })
                setName('')
                setDescription('')
              } else {
                window.alert('Please give a name')
              }
            }}>Create team</button>
              </div>

              <p className="custom-modal-body-title step-01">Team name and short description</p>
              <p className="custom-modal-body-text step-01">The team name should be compact for examples 'Sales' or
                'Marketing'.
                Then add a short description to specify the team.</p>

              <p className="custom-modal-body-title step-02">Add team members</p>
              <p className="custom-modal-body-text step-02">You can add people who are already registered by search them
                with their name.
                If you want to add people who are not yet registered you have to enter their emails.</p>

              <p className={`custom-modal-body-label  step-01`}>Team name</p>
              <div className={`input-container team-name ${nameValidation ? 'check' : ''} step-01`}>
                <input type="text" placeholder="Team name" value={name} onChange={(e) => setName(capitalize(e.target.value))}
              onBlur={() => {
                if (name) {
                  validateName(true)
                }
              }} />
                <i className="icon-check"></i>
              </div>

              <p className={`custom-modal-body-label  step-01`}>Short description</p>
              <div className="input-container team-desc step-01">
                <input type="text" placeholder="Team description" onChange={(e) => setDescription(e.target.value)} />
                <i className="icon-check"></i>
              </div>

              <p className="custom-modal-body-label step-02">Team leader</p>

              <div className="search-dropdown step-02" onClick={(e) => e.currentTarget.scrollIntoView(true)}>
                <div className="search-dropdown-input-container show-button">
                <input
                  onFocus={() => setFocus('leader')}
                  type="text"
                  placeholder={`${t('common:Enternameoremail')}`}
                  value={keyword}
                  onChange={(e) => {
                    if (selectedTeam) {
                      
                      getUserSuggestion({
                        teamId: selectedTeam._id,
                        keyword: e.target.value,
                      })
                    }
                    setKeyword(e.target.value)
                  }}
                />
                  <i className="icon-search"></i>
                </div>
                {validateEmail(keyword) && (
                  <button
                    className="button button-primary"
                    onClick={() => {
                      const oldEmails = [...leadrEmails]
                      oldEmails.push(keyword)
                      setLeaderEmails(oldEmails)
                      setKeyword('')
                    }}
                  >
                    {t('common:Add')}
                  </button>
                )}
                <div className="search-dropdown-menu" style={{ display: 'flex', flexDirection: 'column' }}>
                {!!keyword &&  focus ==='leader' &&
                  userSuggestions?.filter(item => {
                    const leaderAdded = selectedLeaders.find(lead => lead._id === item._id) 
                    if (!leaderAdded) {
                      return true
                    }
                  }).map((member) => (
                    <div
                      className="member"
                      key={member._id}
                      onClick={() => {
                        const oldUsers = [...selectedLeaders]
                        oldUsers.push(member)
                        selectLeaders(oldUsers)
                        setKeyword('')
                      }}
                    >
                      {member.profilePic ? (
                        <img
                          src={IMAGE_API_ROOT + member.profilePic}
                          alt="User's profile image"
                          className="member-img"
                        />
                      ) : (
                        <div
                          className="member-initials"
                          style={{
                            backgroundColor: colorByName(
                              member.firstname + ' ' + member.lastname
                            ),
                          }}
                        >
                          {member.firstname[0] + member.lastname[0]}
                        </div>
                      )}

                      <div className="member-set">
                        <p className="member-set-name">
                          {member.firstname + ' ' + member.lastname}
                        </p>
                        <p className="member-set-position">
                          {member.jobtitle || 'Job title missing'}
                        </p>
                      </div>
                      <button className="button select">
                        {t('common:Select')}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="members step-02">
              {user && selectedLeaders
              ? selectedLeaders.map((user) => (
                  <div className="member" key={user._id + 'mem'}>
                    {/* <img src="/img/p-01.png" alt="User's profile image" className="member-img" />*/}
                    {user.profilePic ? (
                      <img
                        src={IMAGE_API_ROOT + user.profilePic}
                        alt="User's profile image"
                        className="member-img"
                      />
                    ) : (
                      <div
                        className="member-initials"
                        style={{
                          backgroundColor: colorByName(
                            user.firstname + ' ' + user.lastname
                          ),
                        }}
                      >
                        {user && (user.firstname[0] + user.lastname[0])}
                      </div>
                    )}

                    <div className="member-set">
                      <p className="member-set-name">
                        {user.firstname + ' ' + user.lastname}
                      </p>
                      <p className="member-set-position">
                        {user.jobtitle || 'Job title missing'}
                      </p>
                    </div>
                    <button
                      className="button delete"
                      onClick={() => {
                        const oldUsers = [...selectedUsers].filter(
                          (item) => String(item._id) !== String(user._id)
                        )

                        selectUser(oldUsers)
                      }}
                    >
                      {t('common:Delete')}
                    </button>
                  </div>
                ))
              : null}
{leadrEmails.map((email, i) => (
              <div className="member" key={email + i}>
                {/* <img src="/img/p-01.png" alt="User's profile image" className="member-img" />*/}

                <div
                  className="member-initials"
                  style={{
                    backgroundColor: colorByName(email),
                  }}
                >
                  {email[0]}
                </div>

                <div className="member-set">
                  <p className="member-set-name">
                    {capitalize(email.split('@')[0])}
                  </p>
                  <p className="member-set-position">{email}</p>
                </div>
                <button
                  className="button delete"
                  onClick={() => {
                    const oldEmails = [...emails].filter(
                      (item) => item !== email
                    )

                    setEmails(oldEmails)
                  }}
                >
                  {t('common:Delete')}
                </button>
              </div>
            ))}
              </div>

              <p className="custom-modal-body-label step-02">Team members</p>
              <div className="search-dropdown step-02" onClick={(e) => e.currentTarget.scrollIntoView(true)}>
                <div className="search-dropdown-input-container show-button">
                <input
                  onFocus={() => setFocus('member')}
                  type="text"
                  placeholder={`${t('common:Enternameoremail')}`}
                  value={memberKeyword}
                  onChange={(e) => {
                    if (selectedTeam) {
                      
                      getUserSuggestion({
                        teamId: selectedTeam._id,
                        keyword: e.target.value,
                      })  
                    }
                    setMemberKeyword(e.target.value)
                    
                  }}
                />
                  <i className="icon-search"></i>
                </div>
                {validateEmail(keyword) && (
                  <button
                    className="button button-primary"
                    onClick={() => {
                      const oldEmails = [...emails]
                      oldEmails.push(keyword)
                      setEmails(oldEmails)
                      setMemberKeyword('')
                    }}
                  >
                    {t('common:Add')}
                  </button>
                )}
                <div className="search-dropdown-menu" style={{ display: 'flex', flexDirection: 'column' }}>
                {!!memberKeyword && focus ==='member' &&
                  userSuggestions?.filter(item => {
                    const leaderAdded = selectedUsers.find(lead => lead._id === item._id) 
                    if (!leaderAdded) {
                      return true
                    }
                  }).map((member) => (
                    <div
                      className="member"
                      key={member._id}
                      onClick={() => {
                        const oldUsers = [...selectedUsers]
                        oldUsers.push(member)
                        selectUser(oldUsers)
                        setMemberKeyword('')
                      }}
                    >
                      {member.profilePic ? (
                        <img
                          src={IMAGE_API_ROOT + member.profilePic}
                          alt="User's profile image"
                          className="member-img"
                        />
                      ) : (
                        <div
                          className="member-initials"
                          style={{
                            backgroundColor: colorByName(
                              member.firstname + ' ' + member.lastname
                            ),
                          }}
                        >
                          {member.firstname[0] + member.lastname[0]}
                        </div>
                      )}

                      <div className="member-set">
                        <p className="member-set-name">
                          {member.firstname + ' ' + member.lastname}
                        </p>
                        <p className="member-set-position">
                          {member.jobtitle || 'Job title missing'}
                        </p>
                      </div>
                      <button className="button select">
                        {t('common:Select')}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="members step-02">
              {selectedUsers
              ? selectedUsers.map((user) => (
                  <div className="member" key={user._id + 'mem'}>
                    {/* <img src="/img/p-01.png" alt="User's profile image" className="member-img" />*/}
                    {user.profilePic ? (
                      <img
                        src={IMAGE_API_ROOT + user.profilePic}
                        alt="User's profile image"
                        className="member-img"
                      />
                    ) : (
                      <div
                        className="member-initials"
                        style={{
                          backgroundColor: colorByName(
                            user.firstname + ' ' + user.lastname
                          ),
                        }}
                      >
                        {user.firstname[0] + user.lastname[0]}
                      </div>
                    )}

                    <div className="member-set">
                      <p className="member-set-name">
                        {user.firstname + ' ' + user.lastname}
                      </p>
                      <p className="member-set-position">
                        {user.jobtitle || 'Job title missing'}
                      </p>
                    </div>
                    <button
                      className="button delete"
                      onClick={() => {
                        const oldUsers = [...selectedUsers].filter(
                          (item) => String(item._id) !== String(user._id)
                        )

                        selectUser(oldUsers)
                      }}
                    >
                      {t('common:Delete')}
                    </button>
                  </div>
                ))
              : null}
{emails.map((email, i) => (
              <div className="member" key={email + i}>
                {/* <img src="/img/p-01.png" alt="User's profile image" className="member-img" />*/}

                <div
                  className="member-initials"
                  style={{
                    backgroundColor: colorByName(email),
                  }}
                >
                  {email[0]}
                </div>

                <div className="member-set">
                  <p className="member-set-name">
                    {capitalize(email.split('@')[0])}
                  </p>
                  <p className="member-set-position">{email}</p>
                </div>
                <button
                  className="button delete"
                  onClick={() => {
                    const oldEmails = [...emails].filter(
                      (item) => item !== email
                    )

                    setEmails(oldEmails)
                  }}
                >
                  {t('common:Delete')}
                </button>
              </div>
            ))}
              </div>
              <div className="custom-modal-body-buttons">
                <button className="button button-light-gradient step-01" onClick={() => document.getElementById('createNewTeamModal')?.classList.remove('open')} >Cancel</button>
                <button className="button button-primary step-01" onClick={() => changeStep('step-02')}>Next</button>

                <button className="button button-link step-02" onClick={() => changeStep('step-01')}>&#8592; Go Back</button>
                <button className="button button-primary step-02"  onClick={() => {
              if (name) {
                createTeam({
                  name,
                  description,
                  autoAddDisabled: true
                })
                setName('')
                setDescription('')
              } else {
                window.alert('Please give a name')
              }
            }}>Create team</button>
              </div>
            </div>

          </div>
          <div className="custom-modal-backdrop"></div>
        </div>
    )
}

export default connector(CreateTeam)