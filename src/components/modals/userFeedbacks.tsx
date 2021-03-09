import React, { useState, useRef, useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { User, RelationalDataVariables, RelationData, RelationDataContainer } from 'src/apiTypes'
import { AppDispatch, RootState } from 'src/configureStore'
import { getRelationalData } from 'src/redux/teams/actions'
import { accordion } from 'src/tables'
import FeedbackSummary from './feeebacksummaryBox'
import FeedbackDirect from './feedbackDirectBox'
import { useTranslation } from 'react-i18next'
import DevelopmentCharts from '../../pages/feedbackCharts/developmentCharts'
import { getDirectFeedback, getMyWidgets } from 'src/redux/feedback/actions'
import { IMAGE_API_ROOT } from 'src/request'
import { colorByName } from 'src/utitlity'
import SelfFeedback from './selfFeedbackForUserFeedbackModal'
import GiveFeedbackmodal from './givefeedback'
import DirectFeedback from './directFeedbackModal'
import SeeUsersModal from './seeUsersModal'
import { selectUser } from 'src/redux/auth/actions'
import Masonry from 'react-masonry-component'
import TeamDirect from './teamDirectHolder'

const mapStateToProps = (state: RootState) => ({
  selectedTeam: state.teamReducer.selectedTeam,
  relationalData: state.teamReducer.relationalData,
  relationalSenderData: state.teamReducer.relationalSenderData,
  myWidgets: state.feedbackReducer.myWidgets,
  loggedInUser: state.authReducer.user,
  directFeedbacks: state.feedbackReducer.directFeedbacks,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getRelationalData: (data: RelationalDataVariables) =>
    dispatch(getRelationalData(data)),
  getMyWidgets: (teamId: string, userId: string) =>
    dispatch(getMyWidgets(teamId, 'userSentFeedback', userId)),
  selectUser: (user: User | null) => dispatch(selectUser(user)),
   getDirectFeedback: (senderId: string, receiverId: string, team?: boolean) => dispatch(getDirectFeedback(senderId, receiverId, team)) 
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  user: User | null
  customId?: string
  activeValue?: string
  open?: boolean
  closeUserFeedback?(): void
}

const UserFeedbacks = (props: Props) => {
  const { t } = useTranslation(['userFeedbackModal', 'common'])
  const {
    user,
    getRelationalData,
    selectedTeam,
    relationalData,
    customId,
    getMyWidgets,
    myWidgets,
    relationalSenderData,
    open,
    loggedInUser,
    selectUser,
    directFeedbacks,
    getDirectFeedback,
    closeUserFeedback
  } = props



  const [selectedCategory, setSelectedCategory] = useState<
    'p2p' | 'subordinate' | 'supervisor'
  >('p2p')
  const [activeLink, setActiveLink] = useState('')
  const [ chartHack, setChartHack ] = useState(false)
  useEffect(() => {
      setTimeout(() => {
        setChartHack(true)
      }, 500)
      
  
  }, [])

  // function showCharts(string: string) {
  //   setActiveLink(string)
  // }

  useEffect(() => {
    if (user && selectedTeam) {
      getMyWidgets(selectedTeam._id, user._id)




    }
    accordion()
  }, [user, getRelationalData, selectedCategory])

  const pageHeaderRefs = useRef(new Array())
  pageHeaderRefs.current = []

  function handleClick(e: any) {
    let activeValueCurr = e.currentTarget.getAttribute('activeValue')

    // pageHeaderRefs.current.forEach((el) => {
    //   if (el === e.currentTarget) {
    //     el.classList.add('active')
    //   } else {
    //     el.classList.remove('active')
    //   }
    // })

    setActiveLink(activeValueCurr)
    
  }

  function addToRefs(el: any, ref: any) {
    if (el && !pageHeaderRefs.current.includes(el)) {
      pageHeaderRefs.current.push(el)
    }
    
  }

  const feedbackRefs = useRef(new Array())
  feedbackRefs.current = []

  function addToFeedbackRefs(el: any, ref: any) {
    if (el && !feedbackRefs.current.includes(el)) {
      feedbackRefs.current.push(el)
    }
    
  }

  useEffect(() => {
    setActiveLink('Development charts')
  }, [])




  useEffect(() => {
    if (user && selectedTeam) {

      getRelationalData({
        receiver: user._id,
        category: 'p2p',
        teamId: selectedTeam._id,
        type: 'receiver'
      })
      setTimeout(() => {
        getRelationalData({
          receiver: user._id,
          category: 'p2p',
          teamId: selectedTeam._id,
          type: 'sender'
        })
      }, 500)






    }
  }, [user, selectedTeam])

  const modalRef = useRef<HTMLDivElement>(null)

  const [relData, setRelData] = useState<RelationDataContainer | null>(null)
  useEffect(() => {
    if (activeLink === 'Received feedback') {
      setRelData(relationalData)
    } else {
      setRelData(relationalSenderData)
    }
  }, [activeLink])


  const calculateRelation = () => {
    if (selectedTeam && loggedInUser && user) {
      if (user?._id === loggedInUser?._id) {
        return 'self'
      }
      if (selectedTeam?.teamLeaders.includes(user?._id || '')) {
        return 'supervisor'
      }
      if (selectedTeam?.teamLeaders.includes(loggedInUser?._id || '')) {
        return 'subordinate'
      }
    }
    return 'p2p'
  }


  const [selectedFeedback, selectFeedback] = useState<RelationData | null>(null)

  
  const [selectedProfile, selectProfile] = useState<User | null>(null)


  function masonryLayout() {
    let elem = document.querySelectorAll('.grid');
    if (elem.length) {
      elem.forEach(e => {
        new Masonry(e, {
          // options
          itemSelector: '.grid-item',
          transitionDuration: '0.2s',
          stagger: '0s'
        });
      })
    }
  }



  function checkForReadMore(arr: any) {
    setTimeout(() => {

      let commentItems = document.querySelectorAll(".feedback-main-item");
      
      arr.forEach((e: any) => {
        // @ts-ignore
        let commentText = e.querySelector(".feedback-main-item-text");
        // @ts-ignore
        let textHeigh = commentText.clientHeight;
        


        // @ts-ignore
        if (0 > textHeigh - commentText.scrollHeight) {
          let readMore = e.querySelector(".read-more");
          // @ts-ignore
          let close = e.parentElement.querySelector(".close");
          // @ts-ignore
          readMore.style.display = "block";

          // @ts-ignore
          readMore.addEventListener("focus", function () {
            // @ts-ignore
            this.parentElement.classList.add("open");
            // @ts-ignore
            this.style.opacity = "0";
            // @ts-ignore
            this.parentElement.classList.remove("trunc");
            // @ts-ignore
 ;
            // @ts-ignore
            masonryLayout();
          });

          // @ts-ignore
          readMore.addEventListener("blur", function () {
            // @ts-ignore
            this.parentElement.classList.remove("open");
            // @ts-ignore
            this.style.opacity = "1";
            // @ts-ignore
            this.parentElement.classList.add("trunc");
          
            masonryLayout();
          });
        }
      });
    }, 500)
  }

  useEffect(() => {
    let commentItems = document.querySelectorAll(".feedback-main-item");
    checkForReadMore(commentItems);
  })

/*   useEffect(() => {
    if (activeLink === 'Given feedbacks' && user && selectedTeam) {
      getDirectFeedback(user._id, selectedTeam._id, true)
    }
  }, [activeLink])

   */

   const [ p2pSelection, setP2pSelection ] = useState('three')
   const [ supervisorSelection, setSupervisorSelection ] = useState('three')
   const [ teamSelection, setTeamSelection ] = useState('three')
   const [ subordinateSelection, setSubordinateSelection ] = useState('three')
  return (
    <>
      <div
        className="custom-modal-wrapper"
        id={customId || 'modalCard'}
        ref={modalRef}
      >
        <div className="custom-modal">
          <div
            className="custom-modal-close"
            close-modal="modalCard"
            onClick={() => {
              document
                .getElementById(customId || 'modalCard')
                ?.classList.toggle('open')
              selectUser(null)
              if (closeUserFeedback) closeUserFeedback()
              
            }

            }
          >
            <i className="icon-close"></i>
          </div>
          <div className="page-header">
            <div className="page-header-info" onClick={() => selectProfile(user)}>
              {user?.profilePic ? (
                <img
                  className="page-header-info-img"
                  src={IMAGE_API_ROOT + user.profilePic}
                  alt="userProfilePic"
                />
              ) : (
                  <div
                    className="page-header-info-initials"
                    style={{
                      backgroundColor: colorByName(
                        user?.firstname + ' ' + user?.lastname
                      ),
                    }}
                  >
                    {user?.firstname[0]}
                    {user?.lastname[0]}
                  </div>
                )}

              <div>
                <p className="page-header-info-name">
                  <span className="page-header-info-name-strong">
                    {user?.firstname + ' ' + user?.lastname}
                  </span>
                </p>
                <p className="page-header-info-position">
                  <span className="page-header-info-position-strong">
                    {t('common:Jobtitle')}:
                </span>
                  {" " + user?.jobtitle || t('common:Jobtitlemissing')}
                </p>
              </div>
            </div>

            <ul className="page-header-list">
              <li className="page-header-list-item">
                {/* @ts-ignore */}
                <button
                  className={`page-header-list-item-link ${activeLink === 'Development charts' ? 'active' : ''}`}
                  //@ts-ignore
                  ref={addToRefs}
                  activeValue="Development charts"
                  text={`${t('common:Developmentcharts')}`}
                  onClick={handleClick}
                >
                  {t('common:Developmentcharts')}
                </button>
              </li>
              <li className="page-header-list-item">

                <button
                  className={`page-header-list-item-link ${activeLink === 'Received feedback' ? 'active' : ''}`}
                  //@ts-ignore
                  ref={addToRefs}
                  activeValue="Received feedback"
                  text={`${t('common:Receivedfeedback')}`}
                  onClick={handleClick}
                >
                  {t('common:Receivedfeedback')}
                  <div
                    className="page-header-list-item-notification"
                    style={{ display: 'none' }}
                  >
                    9
                </div>
                </button>
              </li>
              <li className="page-header-list-item">
                <button
                  className={`page-header-list-item-link ${activeLink === 'Given feedback' ? 'active' : ''}`}
                  //@ts-ignore
                  ref={addToRefs}
                  activeValue="Given feedback"
                  text={`${t('common:Givenfeedback')}`}
                  onClick={handleClick}
                >
                  {t('common:Givenfeedback')}
                  <div
                    className="page-header-list-item-notification"
                    style={{ display: 'none' }}
                  >
                    9
                </div>
                </button>
              </li>
              <li className="page-header-list-item">
                {/* @ts-ignore */}
                <button
                  className={`page-header-list-item-link ${activeLink === 'Self evaluations' ? 'active' : ''}`}
                  //@ts-ignore
                  ref={addToRefs}
                  activeValue="Self evaluations"
                  text={`${t('common:selfEvaluations')}`}
                  onClick={handleClick}
                >
                  {t('common:selfEvaluations')}
                  <div
                    className="page-header-list-item-notification"
                    style={{ display: 'none' }}
                  >
                    9
                </div>
                </button>
              </li>
              <li className="give-feedback-button" onClick={() => document.getElementById('peerToPeerFeedbackModal')?.classList.add('open')}>
                <button className="button button-primary-outlined">
                  {t('common:Givefeedback')}
                </button>
              </li>
            </ul>
          </div>
          <div className="custom-modal-body">
            {/* || activeLink === 'Given feedback' || activeLink === 'Self evaluations' */}
            {/*           {(activeLink === 'Received feedback' &&  !relData?.p2p?.length) && ( */}

            <>
              {/* @ts-ignore */}
              {activeLink === 'Received feedback' && !relData?.p2p?.length && !relData?.supervisor?.length && !relData?.subordinate?.length &&
                (
                  <div
                    className="modal-card-placeholder"
                  >
                    <img
                      src="/img/feedback-placeholder-img.png"
                      alt="Clip art"
                      className="modal-card-placeholder-img "
                    />
                    <p className="modal-card-placeholder-title">
                      {t('userFeedbackModal:Nofeedbackdata')}
                    </p>
                    <p className="modal-card-placeholder-text">
                      <button>{user?.firstname + ' ' + user?.lastname}</button>{' '} hasn’t receive any feedback yet
                  </p>
                  </div>
                )
              }

              {activeLink === 'Given feedback' && !relData?.supervisor?.length && !relData?.p2p?.length && !relData?.subordinate?.length && !relData?.team?.length &&
                (
                  <div
                    className="modal-card-placeholder"
                  >
                    <img
                      src="/img/feedback-placeholder-img.png"
                      alt="Clip art"
                      className="modal-card-placeholder-img "
                    />
                    <p className="modal-card-placeholder-title">
                      {t('userFeedbackModal:Nofeedbackdata')}
                    </p>
                    <p className="modal-card-placeholder-text">
                      <button>{user?.firstname + ' ' + user?.lastname}</button>{' '}
                    hasn’t given any feedback yet
                  </p>
                  </div>
                )
              }

              {activeLink === 'Self evaluations' && !relationalData?.self?.length &&
                (
                  <div
                    className="modal-card-placeholder"
                  >
                    <img
                      src="/img/feedback-placeholder-img.png"
                      alt="Clip art"
                      className="modal-card-placeholder-img "
                    />
                    <p className="modal-card-placeholder-title">
                      {t('userFeedbackModal:Nofeedbackdata')}
                    </p>
                    <p className="modal-card-placeholder-text">
                      <button>{user?.firstname + ' ' + user?.lastname}</button>{' '}
                    hasn’t given any selfevaluation yet
                  </p>
                  </div>
                )
              }
              {(activeLink === 'Given feedback' || activeLink === 'Received feedback') &&
                <div className="custom-accordion">
                  {!!relData?.p2p?.length && (
                    <div className="custom-accordion-card open card-01" id="acc1">
                      <div
                        className="custom-accordion-card-header"
                        onClick={() => {
                          document.getElementById('acc1')?.classList.add('open')
                          document
                            .getElementById('acc2')
                            ?.classList.remove('open')
                          document
                            .getElementById('acc3')
                            ?.classList.remove('open')
                          if (selectedCategory !== 'p2p') {
                            setSelectedCategory('p2p')
                          }
                        }}
                      >
                        <div className="section-header">
                          <p className="section-header-text">
                            {activeLink === 'Given feedback' ? 'Sent to colleagues' : t('userFeedbackModal:Feedbackfromcolleagues')}

                          </p>
                          <button
                            className="section-header-toggle accordion-card-trigger"
                            accordion-trigger-target="card-01"
                          >
                            {t('common:Closesection')}{' '}
                            <i className="icon-arrow-down"></i>
                          </button>
                          <div className="custom-dropdown default">
                            <button
                              className="custom-dropdown-trigger"
                              tabIndex={-1}
                              onClick={(e) => e.currentTarget.focus()}
                            >
                              {t('userFeedbackModal:Summaryboxeslastmonths')}{' '}
                              {p2pSelection}
                              <i className="icon-caret-down"></i>
                            </button>

                            <div className="custom-dropdown-menu">
                              <div className="custom-dropdown-menu-item">
                                <button className="custom-dropdown-menu-item-link" onClick={() => setP2pSelection('one')}>
                                  {t('common:Lastmonth')}
                                </button>
                              </div>
                              <div className="custom-dropdown-menu-item selected">
                                <button className="custom-dropdown-menu-item-link" onClick={() => setP2pSelection('three')}>
                                  {t('common:Last3month')}
                                </button>
                              </div>
                              <div className="custom-dropdown-menu-item">
                                <button className="custom-dropdown-menu-item-link" onClick={() => setP2pSelection('six')}>
                                  {t('common:Last6month')}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>


                      <div className="custom-accordion-card-body">
                        <div className="feedback-wrapper grid">
                          {relData?.p2p?.map((item) => (
                            <FeedbackSummary
                              type={activeLink === 'Given feedback' ? 'receiver' : undefined}
                              data={item} onExpand={() => {
                                selectFeedback(item)
                                document.getElementById('feedbackTransferModal')?.classList.add('open')
                              }} />
                          ))}
                        </div>

                      </div>
                    </div>

                  )}
                  {activeLink === 'Given feedback' && !!relData?.supervisor?.length && (
                    <div className="custom-accordion-card card-02" id="acc2">
                      <div
                        className="custom-accordion-card-header"
                        onClick={() => {
                          document
                            .getElementById('acc1')
                            ?.classList.remove('open')
                          document.getElementById('acc2')?.classList.add('open')
                          document
                            .getElementById('acc3')
                            ?.classList.remove('open')
                          if (selectedCategory !== 'subordinate') {
                            setSelectedCategory('subordinate')
                          }
                        }}
                      >
                        <div className="section-header">
                          <p className="section-header-text">
                            {activeLink === 'Given feedback' ? 'Sent to supervisors' : 'Feedback from supervisors'}
                          </p>
                          <button
                            className="section-header-toggle accordion-card-trigger"
                            accordion-trigger-target="card-02"
                          >
                            {t('common:Closesection')}{' '}
                            <i className="icon-arrow-down"></i>
                          </button>
                          <div className="custom-dropdown default">
                            <button
                              className="custom-dropdown-trigger"
                              tabIndex={-1}
                              onClick={(e) => e.currentTarget.focus()}
                            >
                              {supervisorSelection}
                              {/*t('userFeedbackModal:Summaryboxeslastmonths')*/}{' '}
                              <i className="icon-caret-down"></i>
                            </button>

                            <div className="custom-dropdown-menu">
                              <div className="custom-dropdown-menu-item">
                                <button className="custom-dropdown-menu-item-link" onClick={() => setSupervisorSelection('one')}>
                                  {t('common:Lastmonth')}
                                </button>
                              </div>
                              <div className="custom-dropdown-menu-item selected">
                                <button className="custom-dropdown-menu-item-link" onClick={() => setSupervisorSelection('three')}>
                                  {t('common:Last3month')}
                                </button>
                              </div>
                              <div className="custom-dropdown-menu-item">
                                <button className="custom-dropdown-menu-item-link" onClick={() => setSupervisorSelection('six')}>
                                  {t('common:Last6month')}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>


                      <div className="custom-accordion-card-body">
                        <div className="feedback-wrapper grid">
                          {relData?.supervisor?.map((item) => (
                            <FeedbackSummary data={item}
                              type={activeLink === 'Given feedback' ? 'receiver' : undefined}
                              onExpand={() => {
                                selectFeedback(item)
                                document.getElementById('feedbackTransferModal')?.classList.add('open')
                              }} />
                          ))}
                        </div>

                      </div>
                    </div>

                  )}
                  {!!relData?.subordinate?.length && (
                    <div className="custom-accordion-card card-03" id="acc3">
                      <div
                        className="custom-accordion-card-header"
                        onClick={() => {
                          document
                            .getElementById('acc1')
                            ?.classList.remove('open')
                          document
                            .getElementById('acc2')
                            ?.classList.remove('open')
                          document.getElementById('acc3')?.classList.add('open')
                          if (selectedCategory !== 'supervisor') {
                            setSelectedCategory('supervisor')
                          }
                        }}
                      >
                        <div className="section-header">
                          <p className="section-header-text">
                            {activeLink === 'Given feedback' ? 'Sent to subordinates' : 'Feedback from subordinates'}
                          </p>
                          <button
                            className="section-header-toggle accordion-card-trigger"
                            accordion-trigger-target="card-03"
                          >
                            {t('common:Closesection')}{' '}
                            <i className="icon-arrow-down"></i>
                          </button>
                          <div className="custom-dropdown default">
                            <button
                              className="custom-dropdown-trigger"
                              tabIndex={-1}
                              onClick={(e) => e.currentTarget.focus()}
                            >
                              {subordinateSelection}
                              {/* t('userFeedbackModal:Summaryboxeslastmonths') */}{' '}
                              <i className="icon-caret-down"></i>
                            </button>

                            <div className="custom-dropdown-menu">
                              <div className="custom-dropdown-menu-item">
                                <button className="custom-dropdown-menu-item-link" onClick={() => setSubordinateSelection('one')}>
                                  {t('common:Lastmonth')}
                                </button>
                              </div>
                              <div className="custom-dropdown-menu-item selected">
                                <button className="custom-dropdown-menu-item-link" onClick={() => setSubordinateSelection('three')}>
                                  {t('common:Last3month')}
                                </button>
                              </div>
                              <div className="custom-dropdown-menu-item">
                                <button className="custom-dropdown-menu-item-link" onClick={() => setSubordinateSelection('six')}>
                                  {t('common:Last6month')}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>


                      <div className="custom-accordion-card-body">
                        <div className="feedback-wrapper grid">
                          {relData?.subordinate?.map((item) => (
                            <FeedbackSummary
                              type={activeLink === 'Given feedback' ? 'receiver' : undefined}
                              data={item} onExpand={() => {
                                selectFeedback(item)
                                document.getElementById('feedbackTransferModal')?.classList.add('open')
                              }} />
                          ))}
                        </div>

                      </div>
                    </div>
                  )}
                  {activeLink === 'Given feedback' && !!relData?.team?.length && (
                    <div className="custom-accordion-card card-03" id="acc2">
                      <div
                        className="custom-accordion-card-header"
                        onClick={() => {
                          document
                            .getElementById('acc1')
                            ?.classList.remove('open')
                          document
                            .getElementById('acc3')
                            ?.classList.remove('open')
                          document.getElementById('acc2')?.classList.add('open')
                          if (selectedCategory !== 'supervisor') {
                            setSelectedCategory('supervisor')
                          }
                        }}
                      >
                        <div className="section-header">
                          <p className="section-header-text">
                            Team feedback
                      </p>
                          <button
                            className="section-header-toggle accordion-card-trigger"
                            accordion-trigger-target="card-03"
                          >
                            {t('common:Closesection')}{' '}
                            <i className="icon-arrow-down"></i>
                          </button>
                          <div className="custom-dropdown default">
                            <button
                              className="custom-dropdown-trigger"
                              tabIndex={-1}
                              onClick={(e) => e.currentTarget.focus()}
                            >
                              {teamSelection}
                              {/* t('userFeedbackModal:Summaryboxeslastmonths') */}{' '}
                              <i className="icon-caret-down"></i>
                            </button>

                            <div className="custom-dropdown-menu">
                              <div className="custom-dropdown-menu-item">
                                <button className="custom-dropdown-menu-item-link" onClick={() => setTeamSelection('one')}>
                                  {t('common:Lastmonth')}
                                </button>
                              </div>
                              <div className="custom-dropdown-menu-item selected">
                                <button className="custom-dropdown-menu-item-link" onClick={() => setTeamSelection('three')}>
                                  {t('common:Last3month')}
                                </button>
                              </div>
                              <div className="custom-dropdown-menu-item">
                                <button className="custom-dropdown-menu-item-link" onClick={() => setTeamSelection('six')}>
                                  {t('common:Last6month')}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {<TeamDirect getFeedbacks={() => {
                        if (user) {
                          //@ts-ignore
                          getDirectFeedback(selectedTeam._id, user._id, true)
                        }
                      }} />}

                      <div className="custom-accordion-card-body">
                        <div className="feedback-wrapper grid">
                          {directFeedbacks?.filter(feed => !feed.receiver)?.map((item) => (
                            <FeedbackDirect
                              
                              ref={addToFeedbackRefs}
                              type={activeLink === 'Given feedback' ? 'receiver' : undefined}
                              data={item} onExpand={() => {
                                //selectFeedback(item)
                             //   document.getElementById('feedbackTransferModal')?.classList.add('open')
                              }} />
                          ))}
                        </div>

                      </div>
                    </div>
                  )}
                </div>}
            </>

            {activeLink === 'Development charts' && chartHack && <DevelopmentCharts />}
            {activeLink === 'Self evaluations' && <SelfFeedback data={directFeedbacks || []} getFeedbacks ={() => {
              if (user) {
                getDirectFeedback(user?._id, user?._id)
              }
              
            }}  />}
          </div>
        </div >
        <div className="custom-modal-backdrop"></div>
        {
          user && <GiveFeedbackmodal
            data={user}
            team={selectedTeam ? {
              _id: selectedTeam._id,
              name: selectedTeam.name,
              category: calculateRelation(),
              description: selectedTeam.description
            } : null}
            clear={() => {

            }}
          />
        }
        {/* {activeLink === 'Received feedback' && <DirectFeedback receiverId={activeLink === 'Received feedback' ? (selectedFeedback?.sender._id || '') : (user?._id || '')} receiver={user || undefined} sender={selectedFeedback?.sender} senderId={activeLink === 'Received feedback' ? (user?._id || '') : (selectedFeedback?.sender._id || '')} />}
      {activeLink === 'Given feedback' && <DirectFeedback senderId={(user?._id || '')} sender={user || undefined} receiver={selectedFeedback?.receiver} receiverId={(selectedFeedback?.receiver._id || '')} />} */}
        <SeeUsersModal profile={selectedProfile} onClose={() => selectProfile(null)} />
      </div >
      {activeLink === 'Received feedback' && <DirectFeedback receiverId={activeLink === 'Received feedback' ? (selectedFeedback?.sender._id || '') : (user?._id || '')} receiver={user || undefined} sender={selectedFeedback?.sender} senderId={activeLink === 'Received feedback' ? (user?._id || '') : (selectedFeedback?.sender._id || '')} />}
      {activeLink === 'Given feedback' && <DirectFeedback senderId={(user?._id || '')} sender={user || undefined} receiver={selectedFeedback?.receiver} receiverId={(selectedFeedback?.receiver._id || '')} />}
    </>
  )
}

export default connector(UserFeedbacks)
