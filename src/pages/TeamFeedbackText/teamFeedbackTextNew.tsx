import React, { useState, useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import {
  AddQuestionVariables,
  GetFeedbacksByQuestionIdVariables,
  Question,
  SendCommentVariables,
  TexyAnswerByQuestionId,
  User,
} from 'src/apiTypes'
import { AppDispatch, RootState } from 'src/configureStore'
import {
  getFeedbacksByQuestionId,
  getQuestions,
  getTargetHistory,
  likeUnlikeFeedback,
  markRead,
  sendComment,
  switchChartType,
} from 'src/redux/feedback/actions'
import { colorByName, dateFromObjectId } from 'src/utitlity'
import AddNewQuestion from 'src/components/modals/addNewQuestion'

import moment from 'moment'
import { addQuestion, selectFeedbackSettings } from 'src/redux/teams/actions'
import { IMAGE_API_ROOT } from 'src/request'
import { selectUser } from 'src/redux/auth/actions'
import ReactTooltip from 'react-tooltip'
import { useTranslation } from 'react-i18next'

const mapStateToProps = (state: RootState) => ({
  user: state.authReducer.user,
  selectedTeam: state.teamReducer.selectedTeam,
  questions: state.feedbackReducer.questions,
  feedbacks: state.feedbackReducer.feedbackByQuestionId,
  targetHistory: state.feedbackReducer.targetHistory,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getQuestions: (teamId: string, feedbackType: string) =>
    dispatch(getQuestions(teamId, feedbackType)),
  getFeebacks: (data: GetFeedbacksByQuestionIdVariables) =>
    dispatch(getFeedbacksByQuestionId(data)),
  addQuestion: (data: AddQuestionVariables) => dispatch(addQuestion(data)),
  likeUnlikeFeedback: (targetId: string, like: boolean) =>
    dispatch(likeUnlikeFeedback(targetId, like)),
  sendComment: (data: SendCommentVariables) => dispatch(sendComment(data)),
  markRead: (targetId: string, questionId: string) =>
    dispatch(markRead(targetId, questionId)),
  selectUser: (user: User) => dispatch(selectUser(user)),
  getTargetHistory: (targetId: string) => dispatch(getTargetHistory(targetId)),
  switchChartType: () => dispatch(switchChartType('text'))
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
  const { t } = useTranslation(["common", 'textFeedbackPages'])
  const { push } = useHistory()
  const { pathname } = useLocation()
  const {
    selectedTeam,
    getTeamId,
    questions,
    getQuestions,
    addQuestion,
    feedbacks,
    getFeebacks,
    likeUnlikeFeedback,
    sendComment,
    user,
    markRead,
    selectUser,
    targetHistory,
    switchChartType
  } = props
  const [
    selectedFeedback,
    selectFeedback,
  ] = useState<TexyAnswerByQuestionId | null>(null)

  const params = useParams<ParamTypes>()
  useEffect(() => {
    if (params.teamId) {
      getTeamId(params.teamId)
    }
  }, [params])
  useEffect(() => {
    // backgroundCardHeight()
    if (selectedTeam) {
      getQuestions(selectedTeam._id, 'team')
    }
  }, [selectedTeam])

  useEffect(() => {
    const cardTriggers = document.querySelectorAll('.card-trigger')

    cardTriggers.forEach((el) => {
      el.addEventListener('click', openCard)
    })

    function openCard() {
      // @ts-ignore
      const parent = this.parentElement

      if (document.documentElement.clientWidth < 1100 && document.documentElement.clientWidth > 768) {
        if (parent.classList.contains('closed')) {
          cardTriggers.forEach((el) => {
            //   @ts-ignore
            el.parentElement.classList.add('closed')
          })
        } else {
          cardTriggers.forEach((el) => {
            //   @ts-ignore
            el.parentElement.classList.remove('closed')
          })
        }
      }

      parent.classList.toggle('closed')
    }

    function closeProfileOnSmall() {
      if (document.documentElement.clientWidth < 1100) {
        //   @ts-ignore
        document.querySelector('.content-card.profile')?.classList.add('closed')
      } else {
        //   @ts-ignore
        document
          .querySelector('.content-card.profile')
          ?.classList.remove('closed')
        // @ts-ignore
        document
          .querySelector('.content-card.questions')
          ?.classList.remove('closed')
      }
    }

    closeProfileOnSmall()

    window.addEventListener('resize', closeProfileOnSmall)
  }, [])

  const [selectedQuestion, selectQuestion] = useState<Question | null>(null)
  const [typedComment, setTypedComment] = useState('')
  const [liked, setLiked] = useState(false)
  useEffect(() => {
    if (questions && questions.textQuestions[0] && !selectedQuestion) {
      selectQuestion(questions.textQuestions[0])
    }
    if (feedbacks && feedbacks[0]) {
      //    selectFeedback(feedbacks[0])
      //   setLiked(feedbacks[0].like || false)
    }
  }, [questions])

  useEffect(() => {
    if (feedbacks && questions) {
      if (!feedbacks.length) {
        selectFeedback(null)
      }
    }
  }, [feedbacks, questions])

  useEffect(() => {
    if (selectedQuestion && selectedTeam) {
      getFeebacks({
        teamId: selectedTeam._id,
        questionId: selectedQuestion.questionId,
      })
    }
  }, [selectedTeam, selectedQuestion])

  useEffect(() => {
    if (feedbacks && !feedbacks.length) {
      // selectFeedback(null)
    }
  }, [feedbacks])

  useEffect(() => {
    ReactTooltip.rebuild()
    switchChartType()
  }, [])

  useEffect(() => {
    if (selectedFeedback && selectedQuestion) {
      if (!selectedFeedback.read) {
        markRead(selectedFeedback._id, selectedQuestion?.questionId)
      }
      ReactTooltip.rebuild()
    }
  }, [selectedFeedback])

  const [commentButtonClass, setCommentButtonClass] = useState(
    'button-green-primary'
  )
  const [commentButtonCaption, setCommentButtonCaption] = useState('Add')
  useEffect(() => {
    if (commentButtonCaption === 'Sending') {
      setTimeout(() => {
        setCommentButtonClass('sent')
        setCommentButtonCaption(t("common:Sent"))
      }, 1000)
    }
  }, [commentButtonCaption])
  return (
    <>
      <div className="content-wrapper">
        <div className="content">
          <div className="widgets-top">
            <div className="option-buttons">
              <button
                className="button"
                onClick={() => {
                  if (selectedTeam) {
                    //@ts-ignore
                    push('/team/' + selectedTeam._id + '/data/teamFeedback')
                  }
                }}
              >
                {t("common:Charts")}
              </button>
              <button className="button active">{t("common:Text")}</button>
            </div>
          </div>

          <div className="text-feedback-content">
            <div className="content-card questions">
              <i className="icon-chevron-left card-trigger"></i>
              <div className="questions-header">
                <p className="questions-header-title">
                  {t("textFeedbackPages:Selectaquestion")}
                </p>
              </div>
              <div className="questions-main">
                {questions?.textQuestions?.map((item) => (
                  <div
                    className={`question ${selectedQuestion?.questionId === item.questionId
                      ? 'active'
                      : ''
                      }`}
                    onClick={() => selectQuestion(item)}
                  >
                    <p className="question-text">{item.question}</p>
                    <span className="question-amount">
                      {!!item.unread && item.unread}
                    </span>
                  </div>
                ))}
                <button
                  className="add-new-question"
                  onClick={() => {
                    if (selectedTeam) {
                      document
                        .getElementById('newQuestionModal')
                        ?.classList.add('open')
                    }
                  }}
                >
                  +{' '}{t("textFeedbackPages:Addnewquestion")}
                </button>
              </div>
            </div>

            <div className="content-card answers">
              <div className="answers-header">
                <p className="answers-header-title">
                  {selectedQuestion?.question}
                </p>
                <p className="answers-header-amount">
                  {selectedQuestion?.unread
                    ? selectedQuestion.unread + ` ${t('common:newfeedback')}`
                    : t('common:Nonewfeedback')}
                </p>
              </div>

              <div className="answers-main">
                {feedbacks?.length ? (
                  feedbacks?.map((feed) => (
                    <div
                      className={`answer ${selectedFeedback?._id === feed._id ? 'active' : ''
                        }`}
                      onClick={() => selectFeedback(feed)}
                    >
                      {feed.sender.profilePic ? (
                        <img
                          src={
                            IMAGE_API_ROOT +
                            feed.sender.profilePic.replace('resized', 'thumb')
                          }
                          alt="User"
                          className="answer-img"
                          onClick={() => {
                            selectUser(feed.sender)
                            document
                              .getElementById('usersModal')
                              ?.classList.add('open')
                          }}
                        ></img>
                      ) : (
                          <div
                            onClick={() => {
                              selectUser(feed.sender)
                              document
                                .getElementById('usersModal')
                                ?.classList.add('open')
                            }}
                            className="answer-initials"
                            style={{
                              backgroundColor: colorByName(
                                feed.sender.firstname + ' ' + feed.sender.lastname
                              ),
                            }}
                          >
                            {feed.sender.firstname[0] + feed.sender.lastname[0]}
                          </div>
                        )}
                      <div className="answer-set">
                        <div className="answer-set-header">
                          <p className="answer-set-header-name">
                            {feed.sender.firstname + ' ' + feed.sender.lastname}
                          </p>
                          <div className="answer-set-header-info">
                            {!feed.read && (
                              <span className="answer-set-header-info-circle"></span>
                            )}
                            <p className="answer-set-header-info-text">
                              {moment(dateFromObjectId(feed._id)).fromNow()}
                            </p>
                          </div>
                        </div>
                        <p className="answer-set-text">{feed.value}</p>
                      </div>
                    </div>
                  ))
                ) : (
                    <div className="answers-placeholder">
                      <img
                        src="/img/table-placeholder-img-04.png"
                        alt="Clip art"
                        className="answers-placeholder-img"
                      ></img>
                      <p className="answers-placeholder-title">{t('common:Nodatayet')}</p>
                      <p className="answers-placeholder-text" style={{ maxWidth: '30rem' }}>
                        {t("common:Thequestion")}{' '}<span>’{selectedQuestion?.question}’</span>{' '}{t("textFeedbackPages:hasnotyetbeenansweredbyanyteammember")}.
                    </p>
                    </div>
                  )}
              </div>
            </div>

            <div className="content-card profile">
              <i className="icon-chevron-right card-trigger"></i>

              <div className="profile-header">
                <div className="profile-header-set">
                  {!!selectedFeedback ? (
                    <>
                      {selectedFeedback.sender.profilePic ? (
                        <img
                          src={
                            IMAGE_API_ROOT +
                            selectedFeedback.sender.profilePic.replace(
                              'resized',
                              'thumb'
                            )
                          }
                          alt="User"
                          className="profile-header-set-img"
                          onClick={() => {
                            selectUser(selectedFeedback.sender)
                            document
                              .getElementById('usersModal')
                              ?.classList.add('open')
                          }}
                        ></img>
                      ) : (
                          <div
                            onClick={() => {
                              selectUser(selectedFeedback.sender)
                              document
                                .getElementById('usersModal')
                                ?.classList.add('open')
                            }}
                            className="profile-header-set-initials"
                            style={{
                              backgroundColor: colorByName(
                                selectedFeedback.sender.firstname +
                                ' ' +
                                selectedFeedback.sender.lastname
                              ),
                            }}
                          >
                            {selectedFeedback.sender.firstname[0] +
                              selectedFeedback.sender.lastname[0]}
                          </div>
                        )}

                      <p className="profile-header-set-name">
                        {selectedFeedback.sender.firstname +
                          ' ' +
                          selectedFeedback.sender.lastname}
                      </p>
                    </>
                  ) : (
                      <>
                        <div className="profile-header-set-icon"><i className="icon-user"></i></div>
                        <p className="profile-header-set-name">{t("common:Nofeedbackselected")}</p>
                      </>
                    )}
                </div>
              </div>
              {!!selectedFeedback ? (
                <>
                  <div className="profile-info">
                    <div className="profile-info-item position">
                      <i className="icon-feather-briefcase"></i>
                      <p className="profile-info-item-text">
                        {selectedFeedback.sender.jobtitle || t('common:Nojobtitle')}
                      </p>
                    </div>
                    <div className="profile-info-item email">
                      <i className="icon-feather-mail"></i>
                      <p className="profile-info-item-text">
                        {selectedFeedback.sender.email}
                      </p>
                    </div>
                  </div>

                  <div className="profile-feedback open">
                    <div className="profile-feedback-header">
                      <div
                        className="profile-feedback-header-set"
                        onClick={() => {
                          if (user) {
                            likeUnlikeFeedback(
                              selectedFeedback._id,
                              selectedFeedback.like || false
                            )
                            setTimeout(
                              () => getTargetHistory(selectedFeedback._id),
                              500
                            )
                          }

                          setLiked(!liked)
                        }}
                      >
                        <i className={`icon-feather-thumbs-up ${liked && "liked"}`}></i>
                        {/* @ts-ignore */}
                        <p className="profile-feedback-header-set-text" style={{ fontWeight: liked ? "500" : "400" }}>{liked ? t("common:Liked") : t("common:Likethisfeedback")} </p>
                      </div>
                      <div className="profile-feedback-header-set toggle-profile-comment"
                        onClick={(e) => e.currentTarget?.parentElement?.parentElement?.classList.toggle('open')}>
                        <i className="icon-feather-edit"></i>
                        <p className="profile-feedback-header-set-text">Comment</p>
                      </div>
                      <i className="icon-chevron-down"></i>
                    </div>
                    <div className="profile-feedback-main">
                      <i className="icon-feather-edit"></i>
                      <div className="profile-feedback-main-set">
                        <textarea
                          placeholder={`${t('common:Commentthisfeedback')}`}
                          onChange={(e) => setTypedComment(e.target.value)}
                        ></textarea>
                        <div className="profile-feedback-main-set-footer">
                          <button
                            className={`button ${commentButtonClass}`}
                            onClick={() => {
                              if (typedComment && user) {
                                sendComment({
                                  feedbackId: selectedFeedback._id,
                                  comment: typedComment,
                                  sender: user._id,
                                  firstname: user.firstname,
                                  lastname: user.lastname,
                                })
                                setTimeout(
                                  () => getTargetHistory(selectedFeedback._id),
                                  500
                                )
                                setCommentButtonClass('sent')
                                setCommentButtonCaption('Sending')
                              }
                            }}
                          >
                            {commentButtonCaption}
                          </button>
                          <button className="button button-light-gray">
                            {t("common:Cancel")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="profile-footer-wrapper">
                    <div className="profile-footer">
                      <div className="profile-footer-item">
                        <div className="profile-footer-item-main">
                          <div
                            className="profile-footer-item-icon"
                            style={{ backgroundColor: '#ffb100' }}
                          >
                            <i className="icon-feather-chart"></i>
                          </div>
                          <div className="profile-footer-item-set">
                            <p className="profile-footer-item-set-title">
                              {t("common:Feedbackgiven")}
                            </p>
                            <p className="profile-footer-item-set-text">
                              {moment(
                                dateFromObjectId(selectedFeedback._id)
                              ).fromNow()}
                            </p>
                          </div>
                        </div>
                      </div>

                      {targetHistory?.map((item) => (
                        <div className="profile-footer-item" style={{ cursor: 'pointer' }} onClick={(e) => e.currentTarget.classList.toggle('open')}>
                          <div className="profile-footer-item-main">
                            <div
                              className="profile-footer-item-icon"
                              style={{
                                backgroundColor:
                                  item.type === 'like' ? '#12a952' : '#457cb9',
                              }}
                            >
                              <i
                                className={
                                  item.type === 'like'
                                    ? 'icon-feather-thumbs-up'
                                    : 'icon-feather-pencil'
                                }
                                style={{ marginTop: '-2px' }}
                              ></i>
                            </div>
                            <div className="profile-footer-item-set">
                              <p className="profile-footer-item-set-title">
                                {item.type === t("common:like") ? t("common:Liked") : t("common:Commented")} by{' '}
                                {item.sender.firstname +
                                  ' ' +
                                  item.sender.lastname}
                              </p>
                              <p className="profile-footer-item-set-text">
                                {moment(dateFromObjectId(item._id)).fromNow()}
                              </p>
                            </div>
                            <div className="profile-footer-item-comment" id={'comment'} >
                              {!!item.comment && <p className="profile-footer-item-comment-text">
                                {item.comment}
                              </p>}
                            </div>
                          </div>
                        </div>
                      ))}
                      {/* <div className="profile-footer-item active">
                                        <div className="profile-footer-item-icon" style={{ backgroundColor: "#12a952" }}>
                                            <i className="icon-feather-thumbs-up" style={{ marginTop: '-2px' }}></i>
                                        </div>
                                        <div className="profile-footer-item-set">
                                            <p className="profile-footer-item-set-title">Liked by Johan Smith</p>
                                            <p className="profile-footer-item-set-text">2 hours ago</p>
                                        </div>
                                    </div>
                                    <div className="profile-footer-item">
                                        <div className="profile-footer-item-icon" style={{ backgroundColor: "#457cb9" }}>
                                            <i className="icon-feather-pencil"></i>
                                        </div>
                                        <div className="profile-footer-item-set">
                                            <p className="profile-footer-item-set-title">Commented by Viljami Lahtinen</p>
                                            <p className="profile-footer-item-set-text">2 hours ago</p>
                                        </div>
                                    </div> */}
                    </div>
                  </div>
                </>
              ) : (
                  <div className="profile-placeholder">
                    <p className="profile-placeholder-title">
                      {t("common:Nofeedbackselected")}
                    </p>
                    <p className="profile-placeholder-text">
                      {t("textFeedbackPages:Pleaseselectafeedback")}.
                  </p>
                  </div>
                )}
            </div>
          </div>
        </div>
        <AddNewQuestion
          category="team"
          teamName={selectedTeam ? selectedTeam.name : ''}
          addQuestion={(type: 'value' | 'text', question: string) => {
            if (selectedTeam) {
              addQuestion({
                teamId: selectedTeam._id,
                category: 'team',
                type,
                question,
              })
            }
          }}
        />
      </div>
      <ReactTooltip
        globalEventOff="click"
        id="commentTooltip"
        effect="solid"
        place={'left'}
        delayShow={250}
        className="custom-tooltip"
        aria-haspopup="true"
      >
        <p className="comment-tooltip-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          vitae lectus vel lorem sollicitudin fringilla quis eu massa. Mauris
          imperdiet ipsum justo, in sagittis nulla rutrum ac. Quisque at tempus
          dolor, ut varius leo. Suspendisse lobortis lorem ante, quis accumsan
          tellus dictum in.
        </p>
      </ReactTooltip>
    </>
  )
}

export default connector(GeneralSettings)