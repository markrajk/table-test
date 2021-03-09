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

const CreateTeamModal = (props: Props) => {
  const { t } = useTranslation(['createTeamModal', 'common'])
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
  } = props
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [keyword, setKeyword] = useState('')
  const [selectedUsers, selectUser] = useState<User[]>([])
  const [emails, setEmails] = useState<string[]>([])
  const { push } = useHistory()
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
      setEmails([])
      setKeyword('')
      setDescription('')
    }
  }, [createdTeam])
  const [nameValidation, validateName] = useState(false)
  

  return (
    <div className="custom-modal-wrapper" id="createNewTeamModal">
      <div className="custom-modal">
        <div className="custom-modal-header">
          <div
            className="custom-modal-close"
            close-modal="createNewTeamModal"
            onClick={() =>
              document
                .getElementById('createNewTeamModal')
                ?.classList.remove('open')
            }
          >
            <i className="icon-close"></i>
          </div>
          <p className="custom-modal-header-title">
            {t('common:Createanewteam')}
          </p>
        </div>

        <div className="custom-modal-body">
          <p className="custom-modal-body-label">
            {t('createTeamModal:Addteamname')}
          </p>
          <div
            className={`input-container team-name ${
              nameValidation ? 'check' : ''
            }`}
          >
            <input
              type="text"
              placeholder="Enter here"
              value={name}
              onChange={(e) => setName(capitalize(e.target.value))}
              onBlur={() => {
                if (name) {
                  validateName(true)
                }
              }}
            />
            <i className="icon-check"></i>
          </div>

          <p className="custom-modal-body-label check">
            {t('createTeamModal:Addteamdescription')}
          </p>
          <div className="input-container team-desc">
            <input
              type="text"
              placeholder={`${t('common:Enterhere')}`}
              onChange={(e) => setDescription(e.target.value)}
            />
            <i className="icon-check"></i>
          </div>

          <p className="custom-modal-body-label">{t('common:Addteammember')}</p>
          <div className="members">
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

            <div className="search-dropdown">
              <div className="search-dropdown-input-container">
                <input
                  type="text"
                  placeholder={`${t('common:Enternameoremail')}`}
                  value={keyword}
                  onChange={(e) => {
                    if (selectedTeam) {
                      setKeyword(e.target.value)
                      getUserSuggestion({
                        teamId: selectedTeam._id,
                        keyword: e.target.value,
                      })
                    }
                  }}
                />
                <i className="icon-search"></i>
                {validateEmail(keyword) && (
                  <button
                    className="button button-primary"
                    onClick={() => {
                      const oldEmails = [...emails]
                      oldEmails.push(keyword)
                      setEmails(oldEmails)
                      setKeyword('')
                    }}
                  >
                    {t('common:Add')}
                  </button>
                )}
              </div>
              <div
                className="search-dropdown-menu"
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                {!!keyword &&
                  userSuggestions?.map((member) => (
                    <div
                      className="member"
                      key={member._id}
                      onClick={() => {
                        const oldUsers = [...selectedUsers]
                        oldUsers.push(member)
                        selectUser(oldUsers)
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
          </div>
        </div>

        <div className="custom-modal-footer">
          <button
            className="button button-primary"
            onClick={() => {
              if (name) {
                createTeam({
                  name,
                  description,
                })
                setName('')
                setDescription('')
              } else {
                window.alert('Please give a name')
              }
            }}
          >
            {t('common:CreateTeam')}
          </button>
        </div>
      </div>
      <div className="custom-modal-backdrop"></div>
    </div>
  )
}

export default connector(CreateTeamModal)
