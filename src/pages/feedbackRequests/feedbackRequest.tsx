import React, { useState } from 'react'
import Header from 'src/components/header'

import { AppDispatch, RootState } from 'src/configureStore'
import { connect, ConnectedProps } from 'react-redux'
import { useEffect } from 'react'
import {
  getActiveTeamUsers,
  addFeedbackRequest,
  getFeedbackRequest,
  deleteFeedbackRequest,
  changeFrequency,
} from 'src/redux/teams/actions'

import {
  AddFeedbackRequestVariables,
  ChangeFrequencyVariables,
  GetFeedbackRequestVariables,
  User,
} from 'src/apiTypes'
import TopNav from 'src/components/header/topSubNav'

import MemberCard from './memberCard'
import SelectUserModal from './selectUserModal'
import { colorByName } from 'src/utitlity'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { IMAGE_API_ROOT } from 'src/request'

const mapStateToProps = (state: RootState) => ({
  user: state.authReducer.user,
  selectedTeam: state.teamReducer.selectedTeam,
  selectedTeamData: state.teamReducer.selectedTeamData,
  feedbackRequests: state.teamReducer.feedbackRequests,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getActiveUsers: (teamId: string, memberType: string) =>
    dispatch(getActiveTeamUsers(teamId, memberType, 'true')),
  addFeedbackRequest: (data: AddFeedbackRequestVariables, user: User) =>
    dispatch(addFeedbackRequest(data, user)),
  getFeedbackRequest: (data: GetFeedbackRequestVariables) =>
    dispatch(getFeedbackRequest(data)),
  deleteFeedbackRequest: (data: {
    requestId: string
    teamId: string
    userId: string
  }) => dispatch(deleteFeedbackRequest(data)),
  changeFrequency: (data: ChangeFrequencyVariables) =>
    dispatch(changeFrequency(data)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  getTeamId(teamId: string): void
}

interface ParamTypes {
  teamId?: string
}
const GeneralSettings = (props: Props) => {
  const { t } = useTranslation(['feedbackRequestPage', 'common'])
  const params = useParams<ParamTypes>()
  const {
    selectedTeamData,
    getActiveUsers,
    selectedTeam,
    addFeedbackRequest,
    getFeedbackRequest,
    feedbackRequests,
    deleteFeedbackRequest,
    changeFrequency,
    getTeamId,
  } = props
  useEffect(() => {
    if (selectedTeam) {
      getActiveUsers(selectedTeam._id, 'teamMembers')
    }
  }, [selectedTeam])
  const [selectedUser, selectUser] = useState<
    | (User & {
        request?: number
      })
    | null
  >(null)

  const requestUsers = document.querySelector('.users') as HTMLElement
  const requestCard = document.querySelector('.request-card') as HTMLElement
  useEffect(() => {
    if (params.teamId) {
      getTeamId(params.teamId)
    }
  }, [params])

  useEffect(() => {
    if (selectedUser && selectedTeam) {
      getFeedbackRequest({
        userId: selectedUser._id,
        teamId: selectedTeam._id,
      })
    }

    if (requestUsers && requestCard) {
      requestCard.style.height = `calc(100% - ${
        requestUsers.clientHeight + 25
      }px)`
    }
  }, [selectedUser, selectedTeam, requestUsers, requestCard])

  return (
    <div className="content-wrapper">
      <div className="content">
        <div className="content-card">
          <div className="content-card-header">
            <p className="content-card-header-title">
              {t('common:Feedbackrequests')}
            </p>
            <p className="content-card-header-text">
              {t('feedbackRequestPage:pageHeaderSubtitle')}
            </p>
          </div>

          <div className="content-card-body">
            <div className="users">
              {selectedTeamData?.teamMembers?.map((member) => (
                <MemberCard
                  active={selectedUser?._id === member._id}
                  data={member}
                  onClick={() => selectUser(member)}
                  key={member._id}
                />
              ))}
            </div>

            <div className="request-card">
              <div className="request-card-header">
                <p className="request-card-header-text">
                  <span className="strong">
                    {selectedUser
                      ? `${selectedUser.firstname}  ${selectedUser.lastname} -` +
                        ' '
                      : t('feedbackRequestPage:Noteammembersselected')}
                  </span>
                  {selectedUser ? selectedUser.jobtitle : ''}
                </p>
                <div className="custom-dropdown">
                  <button
                    style={{ cursor: 'default' }}
                    className="custom-dropdown-trigger"
                  >
                    {selectedUser
                      ? selectedUser.request + ' Feedback Requests'
                      : ''}
                  </button>
                </div>
              </div>
              {!selectedUser && (
                <div className="request-card-placeholder">
                  <p className="request-card-placeholder-title">
                    {t('feedbackRequestPage:Noteammembersselected')}
                  </p>
                  <p className="request-card-placeholder-text">
                    {t('feedbackRequestPage:pleaseSelect')}.
                  </p>
                </div>
              )}
              {!!selectedUser && (
                <div className="request-card-body">
                  <div className="struct">
                    <div className="struct-left">
                      <div className="struct-item">
                        <div className="user left">
                        {selectedUser.profilePic ? (
                            <img
                              src={IMAGE_API_ROOT + selectedUser.profilePic}
                              alt="User's profile image"
                              className="user-initials"
                            ></img>
                          ) : (
                          <div
                            className="user-initials"
                            style={{
                              backgroundColor: colorByName(
                                selectedUser?.firstname +
                                  ' ' +
                                  selectedUser?.lastname
                              ),
                            }}
                          >
                            {' '}
                            {!!selectedUser && selectedUser.firstname[0]}
                            {!!selectedUser && selectedUser.lastname[0]}
                          </div>)}
                          <div className="user-set">
                            <p className="user-set-name">
                              {selectedUser?.firstname +
                                ' ' +
                                selectedUser?.lastname}
                            </p>
                            <p className="user-set-requests">
                              {selectedUser?.jobtitle}
                            </p>
                          </div>
                        </div>
                        <div className="line left"></div>
                      </div>
                    </div>
                    <div className="struct-right">
                      {feedbackRequests?.targets.map((mem) => (
                        <>
                          <div
                            className={`struct-item`}
                            style={
                              selectedUser && !selectedUser.request
                                ? { display: 'none' }
                                : {}
                            }
                          >
                            <div className="struct-divider">
                              <div className="custom-dropdown divider-dropdown">
                                <button
                                  className="custom-dropdown-trigger"
                                  tabIndex={-1}
                                  onClick={(e) => e.currentTarget.focus()}
                                >
                                  <div className="struct-divider-symbol">
                                    <i className="struct-divider-symbol-icon icon-calendar"></i>
                                    <div className="struct-divider-symbol-line"></div>
                                    <p className="struct-divider-symbol-text">
                                      {mem.frequency}W
                                    </p>
                                  </div>
                                </button>
                                <div className="custom-dropdown-menu">
                                  <div className="custom-dropdown-menu-item title">
                                    <i className="icon-clock"></i>
                                    <span className="custom-dropdown-menu-item-link">
                                      {t('common:Selecttimeperiod')}
                                    </span>
                                  </div>

                                  <div
                                    className="custom-dropdown-menu-item"
                                    onClick={() => {
                                      if (selectedTeam && selectedUser) {
                                        changeFrequency({
                                          frequency: 1,
                                          requestId: mem._id,
                                          teamId: selectedTeam._id,
                                          userId: selectedUser._id,
                                        })
                                      }
                                    }}
                                  >
                                    <div className="pretty p-default p-curve">
                                      <input
                                        type="radio"
                                        checked={!mem.frequency || mem.frequency ===1}
                                        name={mem && `${mem._id}`}
                                      />
                                      <div className="state p-primary-o">
                                        <label>&nbsp;</label>
                                      </div>
                                    </div>
                                    <label
                                      htmlFor=""
                                      className="custom-dropdown-menu-item-link"
                                    >
                                      {t('common:Weekly')}
                                    </label>
                                  </div>

                                  <div
                                    className="custom-dropdown-menu-item"
                                    onClick={() => {
                                      console.log('clicked')

                                      if (selectedTeam && selectedUser) {
                                        changeFrequency({
                                          frequency: 2,
                                          requestId: mem._id,
                                          teamId: selectedTeam._id,
                                          userId: selectedUser._id,
                                        })
                                      }
                                    }}
                                  >
                                    <div className="pretty p-default p-curve">
                                      <input
                                      checked={mem.frequency ===2}
                                        type="radio"
                                        name={mem && `${mem._id}`}
                                      />
                                      <div className="state p-primary-o">
                                        <label>&nbsp;</label>
                                      </div>
                                    </div>
                                    <label
                                      htmlFor=""
                                      className="custom-dropdown-menu-item-link"
                                    >
                                      {t('common:Everysecondweek')}
                                    </label>
                                  </div>

                                  <div
                                    className="custom-dropdown-menu-item"
                                    onClick={() => {
                                      console.log('clicked')

                                      if (selectedTeam && selectedUser) {
                                        changeFrequency({
                                          frequency: 4,
                                          requestId: mem._id,
                                          teamId: selectedTeam._id,
                                          userId: selectedUser._id,
                                        })
                                      }
                                    }}
                                  >
                                    <div className="pretty p-default p-curve">
                                      <input
                                      checked={mem.frequency ===4}
                                        type="radio"
                                        name={mem && `${mem._id}`}
                                      />
                                      <div className="state p-primary-o">
                                        <label>&nbsp;</label>
                                      </div>
                                    </div>
                                    <label
                                      htmlFor=""
                                      className="custom-dropdown-menu-item-link"
                                    >
                                      {t('common:Monthly')}
                                    </label>
                                  </div>

                                  <div
                                    className="custom-dropdown-menu-item"
                                    onClick={() => {
                                      console.log('clicked')
                                      
                                      if (selectedTeam && selectedUser) {
                                        changeFrequency({
                                          frequency: 8,
                                          requestId: mem._id,
                                          teamId: selectedTeam._id,
                                          userId: selectedUser._id,
                                        })
                                      }
                                    }}
                                  >
                                    <div className="pretty p-default p-curve">
                                      <input
                                        type="radio"
                                        checked={mem.frequency ===8}
                                        name={mem && `${mem._id}`}
                                      />
                                      <div className="state p-primary-o">
                                        <label>&nbsp;</label>
                                      </div>
                                    </div>
                                    <label
                                      htmlFor=""
                                      className="custom-dropdown-menu-item-link"
                                    >
                                      {t('common:Everysecondmonth')}
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="line right">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="13.531"
                                height="20.522"
                                viewBox="0 0 13.531 20.522"
                              >
                                <g transform="translate(1.765 1.757)">
                                  <line
                                    x2="10"
                                    y2="8"
                                    fill="none"
                                    stroke="#d9dbde"
                                    stroke-linecap="round"
                                    stroke-width="2.5"
                                  />
                                  <line
                                    x1="10"
                                    y2="9"
                                    transform="translate(0 8)"
                                    fill="none"
                                    stroke="#d9dbde"
                                    stroke-linecap="round"
                                    stroke-width="2.5"
                                  />
                                </g>
                              </svg>
                            </div>
                            <div className="user right">
                            {mem.target.profilePic ? (
                            <img
                              src={IMAGE_API_ROOT + mem.target.profilePic}
                              alt="User's profile image"
                              className="user-initials"
                            ></img>
                          ) : (
                              <div
                                className="user-initials"
                                style={{
                                  backgroundColor: colorByName(
                                    mem.target.firstname +
                                      ' ' +
                                      mem.target.lastname
                                  ),
                                }}
                              >
                                {mem.target.firstname[0]}
                                {mem.target.lastname[0]}
                              </div>)}
                              <div className="user-set">
                                <p className="user-set-name">
                                  {mem.target.firstname +
                                    ' ' +
                                    mem.target.lastname}
                                </p>
                                <p className="user-set-requests">
                                  {mem.target.jobtitle}
                                </p>
                              </div>
                              <div
                                className="user-icon"
                                onClick={() => {
                                  if (selectedUser && selectedTeam) {
                                    deleteFeedbackRequest({
                                      requestId: mem._id,
                                      teamId: selectedTeam._id,
                                      userId: selectedUser._id,
                                    })
                                  }
                                }}
                              >
                                <i className="icon-bin"></i>
                              </div>
                            </div>
                          </div>
                        </>
                      ))}
                      <button
                        className="add-button modal-trigger"
                        target-modal="addUsersModal"
                        onClick={() =>
                          document
                            .getElementById('addUsersModal')
                            ?.classList.add('open')
                        }
                      >
                        <div className="add-button-icon">
                          <i className="icon-add-user"></i>
                        </div>
                        <p className="add-button-text">{t('common:Add')}</p>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <SelectUserModal
        data={selectedTeamData?.teamMembers?.filter((member) => {
          if (selectedUser?._id === member._id) {
            return false
          }
          if (feedbackRequests) {
            const userCh = feedbackRequests.targets.find((use) => {
              if (String(use.target._id) === String(member._id)) {
                return true
              }
            })
            if (userCh) {
              return false
            }
            return true
          }
          return true
        })}
        onSelect={(target) => {
          if (selectedTeam && selectedUser) {
            addFeedbackRequest(
              {
                target,
                frequency: 2,
                teamId: selectedTeam._id,
                level: 'team',
                type: 'p2p',
                userId: selectedUser?._id,
              },
              selectedUser
            )
            document.getElementById('addUsersModal')?.classList.remove('open')
          }
        }}
      />
    </div>
  )
}

export default connector(GeneralSettings)
