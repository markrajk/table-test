import React, { useEffect, useState } from 'react'
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
  getUserSuggestion,
  inviteUser,
} from 'src/redux/teams/actions'
import { IMAGE_API_ROOT } from 'src/request'
import { useTranslation } from 'react-i18next'

const mapStateToProps = (state: RootState) => ({
  user: state.authReducer.user,
  company: state.companyReducer.company,
  userSuggestions: state.teamReducer.userSuggestions,
  selectedTeam: state.teamReducer.selectedTeam,
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
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  type?: 'admin' | 'employee'
  open?: 'open' | 'close'
}

const InviteMembers = (props: Props) => {
  const { t } = useTranslation(['inviteMembersModal', 'common'])
  const {
    userSuggestions,
    getUserSuggestion,
    selectedTeam,
    addToTeam,
    inviteUser,
  } = props

  const [keyword, setKeyword] = useState('')
  const [selectedUsers, selectUser] = useState<User[]>([])
  const [emails, setEmails] = useState<string[]>([])


  return (
    <div className={`custom-modal-wrapper`} id="inviteMembersModal">
      <div className="custom-modal">
        <div className="custom-modal-body">
          <div
            className="custom-modal-close"
            close-modal="inviteMembersModal"
            onClick={() =>
              document
                .getElementById('inviteMembersModal')
                ?.classList.remove('open')
            }
          >
            <i className="icon-close"></i>
          </div>

          <p className="custom-modal-body-title">
            {t('common:Addnewteammembers')}
          </p>

          <p className="custom-modal-body-label">
            {t('common:Searchbynameoremail')}
          </p>

          <div
            className={`search-dropdown ${
              !!keyword && !!userSuggestions ? 'open' : ''
            } `}
          >
            <div className="input-container show-button">
              <input
                type="text"
                placeholder="Search"
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
              <button
                className="button button-add"
                onClick={() => {
                  const oldEmails = [...emails]
                  oldEmails.push(keyword)
                  setEmails(oldEmails)
                  setKeyword('')
                }}
              >
                {t('common:Add')}
              </button>
            </div>
            {!!userSuggestions && (
              <div className="search-dropdown-list">
                {!userSuggestions.length && (
                  <div className="search-dropdown-placeholder">
                    <img
                      src="/img/table-placeholder-img-no-results.png"
                      alt="Clip art"
                      className="search-dropdown-placeholder-img"
                    />
                    <p className="search-dropdown-placeholder-title">
                      {t('common:Usernotfound')}
                    </p>
                    <p className="search-dropdown-placeholder-text">
                      {t('common:Pleaseentertheemailaddress')}.
                    </p>
                  </div>
                )}

                {!!keyword &&
                  userSuggestions?.map((member) => (
                    <div className="person-item" key={member._id}>
                      {member.profilePic ? (
                        <img
                          src="../public/img/p-07.png"
                          alt="User's profile image"
                          className="person-item-img"
                        />
                      ) : (
                        <div className="person-item-initials">
                          {member.firstname[0] + member.lastname[0]}
                        </div>
                      )}

                      <div className="person-item-set">
                        <p className="person-item-set-name">
                          {member.firstname + ' ' + member.lastname}
                        </p>
                        <p className="person-item-set-position">
                          {member.jobtitle || 'Job title missing'}
                        </p>
                      </div>
                      <button
                        className="person-item-button"
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
            )}
          </div>
          {((!!selectedUsers && !!selectedUsers.length) ||
            (!!emails && !!emails.length)) && (
            <>
              <p
                className="custom-modal-body-label"
                style={{ marginBottom: 0 }}
              >
                {t('inviteMembersModal:SelectedPeople')}
              </p>
              <div className="selected-people">
                {selectedUsers?.map((member) => (
                  <div className="person-item" key={member._id}>
                    {member.profilePic ? (
                      <img
                        src={IMAGE_API_ROOT + member.profilePic}
                        alt="User's profile image"
                        className="person-item-img"
                      />
                    ) : (
                      <div className="person-item-initials">
                        {member.firstname[0] + member.lastname[0]}
                      </div>
                    )}

                    <div className="person-item-set">
                      <p className="person-item-set-name">
                        {member.firstname + ' ' + member.lastname}
                      </p>
                      <p className="person-item-set-position">
                        {member.jobtitle || 'Job title missing'}
                      </p>
                    </div>
                    <button
                      className="person-item-button"
                      onClick={() => {
                        const filtered = selectedUsers.filter(
                          (us) => String(us._id) !== String(member._id)
                        )
                        selectUser(filtered)
                      }}
                    >
                      {t('common:Delete')}
                    </button>
                  </div>
                ))}
                {emails?.map((email) => (
                  <div className="person-item" key={email}>
                    <div className="person-item-initials">
                      {email.split('@')[0][0].toUpperCase()}
                    </div>

                    <div className="person-item-set">
                      <p className="person-item-set-name">
                        {email.split('@')[0]}
                      </p>
                      <p className="person-item-set-position">{email}</p>
                    </div>
                    <button
                      className="person-item-button"
                      onClick={() => {
                        const filtered = emails.filter((us) => email !== us)
                        setEmails(filtered)
                      }}
                    >
                      {t('common:Delete')}
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="custom-modal-footer">
          <button
            className="button button-light-gray"
            close-modal="inviteMembersModal"
            onClick={() =>
              document
                .getElementById('inviteMembersModal')
                ?.classList.remove('open')
            }
          >
            {t('common:Cancel')}
          </button>
          <button
            className="button button-primary send-feedback-modal"
            onClick={() => {
              selectedUsers.forEach((member) => {
                if (selectedTeam) {
                  addToTeam(
                    {
                      teamId: selectedTeam?._id,
                      userId: member._id,
                      type: 'teamMembers',
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
                    type: 'Team member',
                  })
                })
              }

              document
                .getElementById('inviteMembersModal')
                ?.classList.remove('open')
            }}
          >
            {t('common:Confirm')}
          </button>
        </div>
      </div>
      <div className="custom-modal-backdrop"></div>
    </div>
  )
}
export default connector(InviteMembers)
