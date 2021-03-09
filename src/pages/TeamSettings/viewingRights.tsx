import React, { useRef, useState } from 'react'
import Header from 'src/components/header'
import HeaderTeamSubNav from 'src/components/header/teamSubNavNew'
import { AppDispatch, RootState } from 'src/configureStore'
import { connect, ConnectedProps } from 'react-redux'
import { useEffect } from 'react'
import {
  getActiveTeamUsers,
  getPendingInvites,
  removeMember,
  updateTeamProfile,
  getUserSuggestion,
  addToTeam,
  inviteUser,
  updateJobTitle,
} from 'src/redux/teams/actions'
import { deleteInvite } from 'src/redux/invites/actions'
import TeamMemberRow from './teamMemberRow'
import InviteRow from './inviteRow'
import { backgroundCardHeight } from 'src/tables'
import { Invite, InviteUserVariables, User } from 'src/apiTypes'
import TopNav from 'src/components/header/topSubNav'
import UserFeedbacks from 'src/components/modals/userFeedbacks'
import { useHistory, useParams } from 'react-router-dom'
import { validateEmail } from 'src/utitlity'
import Toaster from 'src/components/common/toaster'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'

const mapStateToProps = (state: RootState) => ({
  user: state.authReducer.user,
  selectedTeam: state.teamReducer.selectedTeam,
  selectedTeamData: state.teamReducer.selectedTeamData,
  sessionRestored: state.authReducer.sessionRestored,
  userSuggestions: state.teamReducer.userSuggestions,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
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
  getActiveUsers: (teamId: string, memberType: string) =>
    dispatch(getActiveTeamUsers(teamId, memberType)),
  deleteInvite: (data: { inviteId: string; inviteType: string }) =>
    dispatch(deleteInvite(data)),
  removeMember: (data: { teamId: string; userId: string; type: string }) =>
    dispatch(removeMember(data)),
  getPendingInvites: (
    teamId: string,
    memberType:
      | 'Viewing rights'
      | 'Viewing rights'
      | 'Admin rights'
      | 'Team leader'
  ) => dispatch(getPendingInvites(teamId, memberType)),
  inviteUser: (data: InviteUserVariables) => dispatch(inviteUser(data)),
  updateJobTitle: (userId: string, jobtitle: string) =>
    dispatch(updateJobTitle(userId, jobtitle)),
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
  const { t } = useTranslation(['teamSettingsViewPage', 'common'])
  const params = useParams<ParamTypes>()
  const {
    selectedTeam,
    selectedTeamData,
    getActiveUsers,
    getPendingInvites,
    removeMember,
    deleteInvite,
    sessionRestored,
    userSuggestions,
    getUserSuggestion,
    addToTeam,
    inviteUser,
    updateJobTitle,
    getTeamId,
  } = props
  useEffect(() => {
    if (selectedTeam) {
      getActiveUsers(selectedTeam._id, 'viewingRightss')
      getPendingInvites(selectedTeam._id, 'Viewing rights')
    }
  }, [getActiveUsers, getPendingInvites])
  const { push } = useHistory()

  useEffect(() => {
    backgroundCardHeight()
  })
  const [filteredAdmins, setFiltereredAdmins] = useState<User[]>([])
  const [selectedMember, selectMember] = useState<User | null>(null)

  const [filteredInvites, setFilteredInvites] = useState<Invite[]>([])
  const [selectedFilter, setSelectedFilter] = useState<
    'firstname' | 'jobtitle' | 'email'
  >('firstname')

  const [sortType, setSortType] = useState<1 | -1>(1)
  const [toasterError, setToasterError] = useState('')

  useEffect(() => {
    if (selectedTeamData && selectedTeamData.viewingRights) {
      sortMembers('firstname', 1)
    }
    window.addEventListener('resize', function () {
      //console.log(tableWrapperBodyCustomTable.clientHeight);
      backgroundCardHeight()
    })
  }, [selectedTeamData])

  const sortMembers = (
    what: 'firstname' | 'jobtitle' | 'email',
    type: 1 | -1
  ) => {
    const members = selectedTeamData ? [...selectedTeamData.viewingRights] : []
    const filtered = members.sort((a, b) => {
      if (a[what] < b[what]) {
        return 1 * type
      } else {
        return -1 * type
      }
    })

    if (what === 'firstname' || what === 'email') {
      const invites =
        selectedTeamData && selectedTeamData['Viewing rights']
          ? [...selectedTeamData['Viewing rights']]
          : []
      const filteredInvite = invites.sort((a, b) => {
        if (a.invitedUser < b.invitedUser) {
          return 1 * type
        } else {
          return -1 * type
        }
      })
      setFilteredInvites(invites)
    }

    setFiltereredAdmins(filtered)
  }
  const [keyword, setKeyword] = useState('')
  const [debouncekeyword, setDebounceKey] = useState('')
  const delayedQuery = useRef(
    _.debounce((teamId: string, keyword: string) => {
      setTimeout(() => setDebounceKey(keyword), 500)
      if (selectedTeam) {
        getUserSuggestion({ teamId, keyword })
      }
    }, 500)
  ).current

  const [inputOpen, setInputOpen] = useState(false)
  const checkIfUserIsLeader = (userId: string) => {
    if (selectedTeam) {
      if (
        selectedTeam.teamLeaders
          .map((leader) => leader.toString())
          .includes(userId.toString())
      ) {
        return true
      }
    }
    return false
  }

  const [ addOpen, setAddOpen] = useState(false)
  const backgroundCardHeight = () => {
    let height  = 196
    if (selectedTeamData && !selectedTeamData?.viewingRights?.length && (!selectedTeamData['Viewing rights'] || !selectedTeamData['Viewing rights'].length)) {
      return 402
    }
    if (selectedTeamData?.viewingRights?.length) {
      height = height +  (selectedTeamData.viewingRights.length * 46)
    }
    if (selectedTeamData && selectedTeamData['Viewing rights'] && selectedTeamData['Viewing rights'].length) {
      height = height  + (selectedTeamData['Viewing rights'].length * 46)
    }
    if (addOpen) {
      height = height + 60
    }
    return height
  }

  useEffect(() => {
    if (params.teamId) {
      getTeamId(params.teamId)
    }
  }, [params])

  return (
    <div
      className="content-wrapper"
      onClick={() =>
        document.getElementById('mainDrawer')?.classList.remove('open')
      }
    >
      <div className="content">
        <div className="content-card">
          <div className="fake-card fake-card-team-settings-members" style={{
            height: backgroundCardHeight()
          }}></div>
          <div className="content-card-header">
            <div className="content-card-header-bottom">
              <div className="content-card-header-caption">
                <p className="content-card-header-caption-title">
                  {t('common:Viewingrights')}
                </p>
                <p className="content-card-header-caption-text">
                  {t('teamSettingsViewPage:pageHeaderSubtitle')}
                </p>
              </div>
              <button
                className="button button-light-gray toggle-input-row"
                onClick={() => {
                  setInputOpen(!inputOpen)
                  document
                    .getElementById('toggle-input')
                    ?.classList.toggle('open')
                    setAddOpen(!addOpen)
                }}
              >
                {t('common:Addnew')}
              </button>
            </div>
          </div>
          <div className="content-card-main">
            <div className="custom-table-wrapper">
              <div className="custom-table-wrapper-head">
                <table className="custom-table head">
                  <thead className="custom-table-head">
                    <tr className="custom-table-row">
                      <th
                        className={`column-01 ${
                          selectedFilter === 'firstname' ? ' active' : ''
                        } ${
                          selectedFilter === 'firstname' && sortType === -1
                            ? ' up'
                            : ''
                        }`}
                        onClick={() => {
                          setSortType(sortType === 1 ? -1 : 1)
                          sortMembers('firstname', sortType === 1 ? -1 : 1)
                          setSelectedFilter('firstname')
                        }}
                      >
                        <p>{t('common:Name')}</p>
                        <i className="icon-caret-down"></i>
                      </th>
                      <th
                        className={`column-02 ${
                          selectedFilter === 'email' ? ' active' : ''
                        } ${
                          selectedFilter === 'email' && sortType === -1
                            ? ' up'
                            : ''
                        }`}
                        onClick={() => {
                          setSortType(sortType === 1 ? -1 : 1)
                          sortMembers('email', sortType === 1 ? -1 : 1)
                          setSelectedFilter('email')
                        }}
                      >
                        <p>{t('common:Email')}</p>
                        <i className="icon-caret-down"></i>
                      </th>
                      <th
                        className={`column-03 ${
                          selectedFilter === 'jobtitle' ? ' active' : ''
                        } ${
                          selectedFilter === 'jobtitle' && sortType === -1
                            ? ' up'
                            : ''
                        }`}
                        onClick={() => {
                          setSortType(sortType === 1 ? -1 : 1)
                          sortMembers('jobtitle', sortType === 1 ? -1 : 1)
                          setSelectedFilter('jobtitle')
                        }}
                      >
                        <p>{t('common:Jobtitle')}</p>
                        <i className="icon-caret-down"></i>
                      </th>
                      <th className="column-04">
                        <p>{t('common:Status')}</p>
                        <i className="icon-caret-down"></i>
                      </th>
                      <th className="column-05"></th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div className="custom-table-wrapper-body">
                <table className="custom-table with-border">
                  <tbody className="custom-table-body">
                    <tr
                      className="table-placeholder"
                      style={
                        inputOpen ||
                        (selectedTeamData?.viewingRights &&
                          selectedTeamData.viewingRights.length)
                          ? { display: 'none' }
                          : {}
                      }
                    >
                      <td colSpan={100}>
                        <img
                          src="/img/table-placeholder-img-03.png"
                          alt="Clip art"
                          className="table-placeholder-img"
                        />
                        <p className="table-placeholder-title">
                          {t('teamSettingsViewPage:placeholderTitle')}
                        </p>
                        <p className="table-placeholder-text">
                          {t('common:Click')}{' '}
                          <button
                            onClick={() => {
                              setInputOpen(!inputOpen)
                              document
                                .getElementById('toggle-input')
                                ?.classList.toggle('open')
                                setAddOpen(false)
                            }}
                          >
                            {t('common:here')}
                          </button>{' '}
                          {t('teamSettingsViewPage:toaddviewingrights')}.
                        </p>
                      </td>
                    </tr>
                    <tr className="custom-table-input-row" id="toggle-input">
                      <td className="column-01">
                        <div className="input-container search">
                          <input
                            type="text"
                            placeholder={`${t('common:Enternameoremail')}`}
                            id="inputEMail"
                            value={keyword}
                            onChange={(e) => {
                              setKeyword(e.target.value)
                              if (selectedTeam) {
                                delayedQuery(selectedTeam._id, e.target.value)
                              }
                            }}
                          />
                          <div className="search-menu">
                            <div
                              className="search-menu-placeholder"
                              style={
                                debouncekeyword &&
                                userSuggestions &&
                                !userSuggestions.length
                                  ? {}
                                  : { display: 'none' }
                              }
                            >
                              <img
                                src="/img/table-placeholder-img-no-results.png"
                                alt="Clip art"
                                className="search-menu-placeholder-img"
                              />
                              <p className="search-menu-placeholder-title">
                                {t('common:Usernotfound')}
                              </p>
                              <p className="search-menu-placeholder-text">
                                {t('common:Pleaseentertheemailaddress')}
                              </p>
                            </div>
                            {userSuggestions?.map((user) => (
                              <div
                                key={user._id}
                                className="search-menu-item"
                                onClick={() => {
                                  if (selectedTeam) {
                                    addToTeam(
                                      {
                                        userId: user._id,
                                        teamId: selectedTeam._id,
                                        type: 'viewingRights',
                                      },
                                      user
                                    )
                                  }
                                  setKeyword('')
                                  setInputOpen(!inputOpen)
                                  document
                                    .getElementById('toggle-input')
                                    ?.classList.toggle('open')
                                    setAddOpen(false)
                                }}
                              >
                                <div className="search-menu-item-initials">
                                  {user.firstname[0] + user.lastname[0]}
                                </div>
                                <div className="search-menu-item-set">
                                  <p className="search-menu-item-set-name">
                                    {user.firstname + ' ' + user.lastname}
                                  </p>
                                  <p className="search-menu-item-set-position">
                                    {user.jobtitle || 'Job title missing'}
                                  </p>
                                </div>
                                <button className="search-menu-item-button">
                                  {t('common:Select')}
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="column-02">
                        <button
                          className="button button-primary"
                          onClick={() => {
                            if (
                              selectedTeam &&
                              keyword &&
                              validateEmail(keyword)
                            ) {
                              let oldInvites = []
                              if (
                                selectedTeamData &&
                                selectedTeamData['Viewing rights']
                              ) {
                                let oldInvites =
                                  selectedTeamData['Viewing rights']
                                const check = oldInvites.find(
                                  (invite) =>
                                    invite.invitedUser === keyword.toLowerCase()
                                )
                                if (!check) {
                                  inviteUser({
                                    teamId: selectedTeam._id,
                                    type: 'Viewing rights',
                                    invitedUser: keyword.toLowerCase(),
                                  })
                                  setInputOpen(!inputOpen)
                                  document
                                    .getElementById('toggle-input')
                                    ?.classList.toggle('open')
                                  backgroundCardHeight()
                                } else {
                                  setToasterError('Email already invited')
                                }
                              }

                              setKeyword('')
                              setDebounceKey('')
                            }
                            if (!validateEmail(keyword)) {
                              setToasterError('Invalid email id')
                            }
                          }}
                        >
                          {t('common:Add')}
                        </button>
                        <button
                          className="button button-light-gray"
                          onClick={() => {
                            setInputOpen(!inputOpen)
                            document
                              .getElementById('toggle-input')
                              ?.classList.toggle('open')
                            backgroundCardHeight()
                          }}
                        >
                          {t('common:Cancel')}
                        </button>
                      </td>
                    </tr>

                    {filteredAdmins.map((member) => (
                      <tr
                        className="custom-table-row"
                        key={member._id}
                        onClick={() => {
                          backgroundCardHeight()
                          selectMember(member)
                        }}
                      >
                        <TeamMemberRow
                          isAdmin={!checkIfUserIsLeader(member._id)}
                          data={member}
                          onJobtitleChange={(text) =>
                            updateJobTitle(member._id, text)
                          }
                          onDelete={() => {
                            if (selectedTeam) {
                              removeMember({
                                userId: member._id,
                                teamId: selectedTeam?._id,
                                type: 'viewingRights',
                              })
                            }
                          }}
                        />
                      </tr>
                    ))}

                    {filteredInvites.map((member) => (
                      <tr className="custom-table-row" key={member._id}>
                        <InviteRow
                          data={member}
                          onDelete={() =>
                            deleteInvite({
                              inviteId: member._id,
                              inviteType: 'Viewing rights',
                            })
                          }
                        />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster
        type="error"
        instance={!!toasterError}
        clear={() => setToasterError('')}
        text={toasterError}
      />
      <UserFeedbacks user={selectedMember} />
    </div>
  )
}

export default connector(GeneralSettings)
