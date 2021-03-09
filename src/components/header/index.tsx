import React, { useState } from 'react'
import { AppDispatch, RootState } from 'src/configureStore'

import { connect, ConnectedProps } from 'react-redux'
import { clearDatabase, clearSingnUp, logout, sendSupportEmail, updateProfile } from 'src/redux/auth/actions'
import { getCompanyByUser } from 'src/redux/company/actions'
import { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import CreateCompany from 'src/components/modals/createCompany'
import Invite from './invite'
import {
  acceptCompanyInvite,
  acceptInvite,
  getAllMyInvites,
  getCompanyInvites,
} from 'src/redux/invites/actions'
import CompanyInvite from './companyInvite'
import { capitalize } from 'src/utitlity'
import { getPendingRequest, quitTeam } from 'src/redux/teams/actions'
import { UpdateProfileVariables } from 'src/apiTypes'
import { IMAGE_API_ROOT } from 'src/request'
import { themeChangeScript } from 'src/main'
import ReactTooltip from 'react-tooltip'
import { useTranslation } from 'react-i18next'
import HeaderDropdown from './headerDropdown'
import ContactSupport from 'src/components/modals/contactSupport'
import CreateJoinCompany from 'src/components/modals/createJoinCompany'
import { getMyToDo } from 'src/redux/feedback/actions'
import Toaster from '../common/toaster'



const mapStateToProps = (state: RootState) => ({
  user: state.authReducer.user,
  sessionRestored: state.authReducer.sessionRestored,
  companyCreated: state.companyReducer.companyCreated,
  company: state.companyReducer.company,
  companyInvites: state.invitesReducer.companyInvites,
  selectedTeam: state.teamReducer.selectedTeam,
  myTeams: state.teamReducer.myTeams,
  invites: state.invitesReducer.invites,
  pendingRequest: state.teamReducer.pendingRequest,
  todo: state.feedbackReducer.todo,
  showWelcome: state.authReducer.showWelcome,
  createdTeam: state.teamReducer.createdTeam
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  logout: () => dispatch(logout()),
  getCompanyByUser: () => dispatch(getCompanyByUser()),
  getCompanyInvites: () => dispatch(getCompanyInvites()),
  acceptCompayInvite: (inviteId: string, companyId: string) => dispatch(acceptCompanyInvite(inviteId, companyId)),
  acceptInvite: (inviteId: string) => dispatch(acceptInvite(inviteId)),
  getMyInvites: (email: string) => dispatch(getAllMyInvites(email)),
  getPendingRequest: () => dispatch(getPendingRequest()),
  updateProfile: (data: UpdateProfileVariables) =>
    dispatch(updateProfile(data)),
  clearDatabase: () => dispatch(clearDatabase()),
  quitTeam: (teamId: string) => dispatch(quitTeam(teamId)),
  sendSupportEmail: (message: string, subject: string) => dispatch(sendSupportEmail(message, subject)),
  getTodo: () => dispatch(getMyToDo()),
  clearSignup: () => dispatch(clearSingnUp())
})
const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  children?: React.ReactChild | React.ReactChild[]
  type?: string
}

const Header = (props: Props) => {
  const { t } = useTranslation(['navigation', 'common'])
  const {
    user,
    logout,
    sessionRestored,
    children,
    company,
    getCompanyByUser,
    getCompanyInvites,
    companyInvites,
    acceptCompayInvite,
    selectedTeam,
    type,
    invites,
    // pendingRequest,
    getMyInvites,
    acceptInvite,
    updateProfile,
    clearDatabase,
    quitTeam,
    myTeams,
    sendSupportEmail,
    todo,
    getTodo,
    clearSignup,
    showWelcome,
    createdTeam
  } = props
  const { push, goBack } = useHistory()

  useEffect(() => {
    if (user && !selectedTeam) {
      if (myTeams && myTeams[0]) {
        push('/team/' + myTeams[0]._id + '/data/teamFeedback')
      }
    }
  }, [selectedTeam])
  const [selectedImage, selectImage] = useState<any>(null)
  useEffect(() => {
    if (user) {
      getTodo()
    }
  }, [user])
  useEffect(() => {
    getCompanyByUser()
    getCompanyInvites()
  }, [])
  useEffect(() => {
    if (sessionRestored) {
      if (!user) {
        if (pathname !== '/createAccount')
          push('/')
      }
    }
    if (user) {
      getMyInvites(user.email)
      getPendingRequest()
    }
  }, [sessionRestored, user])

  const getBadge = () => {
    let number = 0
    if (invites) {
      number = number + invites.length
    }
    if (companyInvites) {
      number = number + companyInvites.length
    }
    return number
  }

  const badgeNumber = getBadge()
  const { pathname } = useLocation()

  useEffect(() => {
    themeChangeScript()
  }, [])
  const titleLogic = () => {
    if (pathname === '/user/generalSettings') {
      return 'User settings'
    }
    if (pathname === '/user/teamSettings') {
      return 'User settings'
    }
    if (pathname.includes('/company/')) {
      return 'Company admin area'
    }

    return capitalize(selectedTeam?.name)
  }
  const title = titleLogic()
  const [showExplode, setShowexplode] = useState(false)

  useEffect(() => {
    if (showExplode) {
      setTimeout(() => setShowexplode(false), 1500)
    }
  }, [showExplode])

  useEffect(() => {
    let fullScreenToggle = document.querySelectorAll(".fullscreen-toggle");

    let enterFs = document.fullscreenElement ? "requestFullscreen" : null;

    

    function getFullscreenElement() {
      return (
        // @ts-ignore
        document.fullscreenElement ||
        // @ts-ignore
        document.webkitFullscreenElement ||
        // @ts-ignore
        document.mozFullscreenElement ||
        // @ts-ignore
        document.msFullscreenElement
      );
    }

    function toggleFullscreen() {
      if (getFullscreenElement()) {
        document.exitFullscreen =
          // @ts-ignore
          document.exitFullscreen ||
          // @ts-ignore
          document.mozExitFullscreen ||
          // @ts-ignore
          document.webkitExitFullscreen ||
          // @ts-ignore
          document.msExitFullscreen;

        document.exitFullscreen();
      } else {
        document.documentElement.requestFullscreen =
          // @ts-ignore
          document.documentElement.requestFullscreen ||
          // @ts-ignore
          document.documentElement.mozRequestFullScreen ||
          // @ts-ignore
          document.documentElement.webkitRequestFullscreen ||
          // @ts-ignore
          document.documentElement.msRequestFullscreen;

        document.documentElement.requestFullscreen();
      }
    }

    fullScreenToggle.forEach((e) => {
      e.addEventListener("dblclick", () => {
        e.classList.toggle("active");
        toggleFullscreen();
      });
    });
  }, [])

  const [ openCreateCompany, handlOpenCreateCompany ] = useState(false)
  useEffect(() => {
    if (showWelcome) {
      handlOpenCreateCompany(true)
    }
  }, [showWelcome])
  return (
    <>
      <div className="header small fullscreen-toggle">
        {/*<div className={'header-main ' + (type || '')}>*/}
        <div className="header-main white-logo">
          <div className="header-main-info">
            <div
              className="header-main-info-icon side-toggle"
              style={{
                position: 'relative'
              }}
              onClick={() =>
                //document.getElementById('mainDrawer')?.classList.toggle('open')
                push(
                  `/team/${selectedTeam ? selectedTeam._id : 'null'
                  }/giveFeedback`
                )
              }
              data-tip={`${t('common:Givefeedback')}`}
            >
              <div
                className={`logo-container ${pathname.includes('giveFeedback') ? 'active' : ''
                  }`}
              >
                <img
                  src="/img/logo-only.png"
                  alt="Team feedback logo"
                  className="logo"
                ></img>
                
              </div>
              {todo && todo.length && <div style={{position: 'absolute', zIndex: 999999, bottom: -4, right: 10, backgroundColor: 'grey', borderRadius: 7, textAlign: 'center', padding: 4}}>{todo && todo.length}</div>}
            </div>
            {/* <h1 className="header-main-info-title">
              {title}
            </h1> */}
            <HeaderDropdown
              companyId={company?._id}
              selectedTeam={selectedTeam}
              teams={myTeams || []}
              onQuit={(teamId) => {
                quitTeam(teamId)
              }}
            />
          </div>

          <div
            className="header-buttons"
            onClick={() =>
              document.getElementById('mainDrawer')?.classList.remove('open')
            }
          >
            <div className="custom-dropdown settings-dropdown">
              <button className="custom-dropdown-trigger"
                data-tip={`${t('common:Settings')}`}
                onClick={(e) => e.currentTarget.focus()}
              >
                <i className="icon-cog"></i>
              </button>
              <div className="custom-dropdown-menu settings-dropdown-menu">
                <div className="settings-dropdown-menu-header">
                  <p className="settings-dropdown-menu-header-text">{t('common:Settings')}</p>
                </div>
                <div className="settings-dropdown-menu-section">
                  <div className="settings-dropdown-menu-section-header">
                    <p className="settings-dropdown-menu-section-header-text">{t('common:Fullscreenmode')}</p>
                  </div>
                  <div className="settings-dropdown-menu-section-main">
                    <div className="section-fullscreen">
                      <div className="pretty p-default p-round">
                        <input type="checkbox" />
                        <div className="state p-success">
                          <label>&nbsp;</label>
                        </div>
                      </div>

                      <div className="section-fullscreen-set">
                        <p className="section-fullscreen-set-title">{t('common:Doubleclickheader')}</p>
                        <p className="section-fullscreen-set-text">{t('common:Togoandexitfullscreen')}</p>
                      </div>

                      <img src="/img/settings-fullscreen.png" alt="Clip art" className="section-fullscreen-img"></img>
                    </div>
                  </div>
                </div>
                <div className="settings-dropdown-menu-section">
                  <div className="settings-dropdown-menu-section-header">
                    <p className="settings-dropdown-menu-section-header-text">{t('common:Contentsize')}</p>
                  </div>
                  <div className="settings-dropdown-menu-section-main">
                    <div className="section-size">
                      <p className="section-size-text">{t('common:Noadjustment')}</p>
                      <div className="section-size-buttons">
                        <button>
                          <i className="icon-minus-outlined"></i>
                        </button>
                        <button>
                          <i className="icon-plus-outlined"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="settings-dropdown-menu-section">
                  <div className="settings-dropdown-menu-section-header">
                    <p className="settings-dropdown-menu-section-header-text">{t('common:Appearance')}</p>
                  </div>
                  <div className="settings-dropdown-menu-section-main">
                    <div className="section-appearance">
                      <p className="section-appearance-text">{t('common:Automatic')}{' '}<span>-{' '}{t('common:Recomended')}</span></p>

                      <div className="section-appearance-buttons">
                        <div className="section-appearance-buttons-item"><img src="/img/arangment-01.png"
                          alt="Clip art"></img></div>
                        <div className="section-appearance-buttons-item active"><img src="/img/arangment-02.png"
                          alt="Clip art"></img></div>
                        <div className="section-appearance-buttons-item"><img src="/img/arangment-03.png"
                          alt="Clip art"></img></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="settings-dropdown-menu-section">
                  <div className="settings-dropdown-menu-section-header">
                    <p className="settings-dropdown-menu-section-header-text">{t('common:Othersettings')}</p>
                  </div>
                  <div className="settings-dropdown-menu-section-main">
                    <div className="section-other">
                      <div className="section-other-item">
                        <p className="section-other-item-text">{t('common:Keepmesignedin')}</p>

                        <div className="pretty p-switch p-fill">
                          <input type="checkbox" />
                          <div className="state p-success">
                            <label>&nbsp;</label>
                          </div>
                        </div>
                      </div>
                      <div className="section-other-item">
                        <p className="section-other-item-text">{t('common:Browsernotifications')}</p>

                        <div className="pretty p-switch p-fill">
                          <input type="checkbox" />
                          <div className="state p-success">
                            <label>&nbsp;</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="header-buttons-help" data-tip={`${t('common:Givefeedback')}`}>
              <i className="icon-question"></i>
            </div>

            <div className="custom-dropdown notification-dropdown">
              <div
                className="custom-dropdown-trigger"
                tabIndex={-1}
                onClick={(e) => e.currentTarget.focus()}
                data-tip={`${t('common:Notifications')}`}
              >
                <i className="icon-bell"></i>
                {!!badgeNumber && (
                  <span className="notification-dropdown-trigger-amount">
                    {badgeNumber || ''}
                  </span>
                )}
              </div>

              <ul className="custom-dropdown-menu">
                <li className="custom-dropdown-menu-title-big">
                  <p className="custom-dropdown-menu-title-big-text">
                    {t('common:Notifications')} ({badgeNumber})
                  </p>
                </li>
                {!badgeNumber && (
                  <div className="placeholder">
                    <div className="placeholder-icon">
                      <i className="icon-bell"></i>
                    </div>
                    <p className="placeholder-text">
                      {t('navigation:notificationPlaceholderText')}.
                    </p>
                  </div>
                )}
                {!!badgeNumber && (
                  <li className="custom-dropdown-menu-title-small">
                    <p className="custom-dropdown-menu-title-small-text">
                      {t('common:Invitations')} / {t('common:Rights')}
                    </p>
                  </li>
                )}
                <li className="custom-dropdown-menu-notifications">
                  {companyInvites?.map((invite) => (
                    <CompanyInvite
                      key={invite._id}
                      invite={invite}
                      onAccept={() => acceptCompayInvite(invite._id, invite.company._id)}
                    />
                  ))}

                  {invites?.map((invite) => (
                    <Invite
                      key={invite._id}
                      invite={invite}
                      onAccept={() => acceptInvite(invite._id)}
                    />
                  ))}
                </li>
              </ul>
            </div>
            <div className="custom-dropdown user-dropdown">
              <button
                className="custom-dropdown-trigger"
                tabIndex={-1}
                onClick={(e) => e.currentTarget.focus()}
              >
                {user?.profilePic ? (
                  <img
                    src={IMAGE_API_ROOT + user.profilePic}
                    className="user-img"
                    alt="user profile pic"
                  />
                ) : (
                    <div className="initials">{user?.firstname[0]}</div>
                  )}
              </button>
              <ul className="custom-dropdown-menu">
                <li className="user-dropdown-menu-header">
                  <div className="user-dropdown-menu-header-set">
                    {user?.profilePic ? (
                      <img
                        src={IMAGE_API_ROOT + user.profilePic}
                        alt="user profile pic"
                        className="user-dropdown-menu-header-set-initials"
                      />
                    ) : (
                        <div className="user-dropdown-menu-header-set-initials">
                          {user?.firstname[0]}
                        </div>
                      )}

                    <div
                      className="user-dropdown-menu-header-set-upload"
                      onClick={() =>
                        document.getElementById('cameraUploadImage')?.click()
                      }
                    >
                      <i className="icon-camera"></i>
                      <input
                        type="file"
                        name="cameraUploadImage"
                        id="cameraUploadImage"
                        hidden
                        onChange={(e) => {
                          if (
                            selectedTeam &&
                            e.target.files &&
                            e.target.files[0]
                          ) {
                            selectImage(e.target.files[0])
                            updateProfile({
                              image: e.target.files[0],
                            })
                          }
                        }}
                      />
                    </div>
                  </div>

                  <p className="user-dropdown-menu-header-title">
                    {capitalize(user?.firstname + ' ' + user?.lastname)}
                  </p>
                  <input
                    className="user-dropdown-menu-header-desc"
                    placeholder={`${t('common:Clickheretoaddjobtitle')}`}
                    defaultValue={capitalize(user?.jobtitle)}
                    onChange={(e) => updateProfile({
                      jobtitle: capitalize(e.target.value)
                    })}
                  ></input>
                </li>
                <li
                  className="user-dropdown-menu-item"
                  onClick={() => push('/user/generalSettings')}
                >
                  {t('navigation:Openusersettings')}
                </li>
                {company ? (
                  <li
                    className="user-dropdown-menu-item modal-trigger"
                    onClick={() => {
                      push('/company/overview')
                    }}
                  >
                    {t('common:Opencompany')}
                  </li>
                ) : (
                    <li
                      className="user-dropdown-menu-item modal-trigger"
                      onClick={() => {
                        document
                          .getElementById('regCoStep02')
                          ?.classList.add('open')
                      }}
                    >
                      {t('common:Createcompany')}
                    </li>
                  )}

                <li className="user-dropdown-menu-item" onClick={logout}>
                  {t('common:Signout')}
                </li>
                <li
                  className="user-dropdown-menu-item"
                  onClick={() => {
                    setShowexplode(true)
                    clearDatabase()
                  }}
                >
                  {t('navigation:Cleardatabase')}
                </li>
                <li
                  className="user-dropdown-menu-item"
                  onClick={() => {
                    setShowexplode(true)
                    document.getElementById('contactSupportModal')?.classList.add('open')
                  }}
                >
                  {t('navigation:Contactsupport')}
                </li>
                <li
                  className="user-dropdown-menu-item"
                  onClick={() => {
                    handlOpenCreateCompany(true)
                  }}
                >
                  Create/Join company
                </li>
              </ul>
            </div>
          </div>
        </div>

        {children}
        {/*showExplode && <img src='/img/explode.gif' style={{
            position: 'absolute',
            top: '20%',
            left: '20%'
          }} />*/}
        <CreateCompany />
      </div>

      <ReactTooltip
        effect="float"
        place={'bottom'}
        delayShow={250}
        className="custom-tooltip"
      />
      <ContactSupport send={(message, subject) => sendSupportEmail(message, subject)} />
      {open && <CreateJoinCompany open={openCreateCompany} handleClose={() =>  {
        clearSingnUp()
        handlOpenCreateCompany(false)
      } } />}
      <Toaster type='success' instance={!!createdTeam} text='New team created successfully.' clear={() => null} />
    </>
  )
}

export default connector(Header)
