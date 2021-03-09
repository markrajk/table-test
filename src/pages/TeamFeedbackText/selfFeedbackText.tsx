import React, { useState, useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import {
  AddQuestionVariables,
  GetFeedbacksByQuestionIdVariables,
  Question,
  RelationalDataVariables,
  SendCommentVariables,
  TexyAnswerByQuestionId,
  User,
  UserRecievedTextFeedback,
} from 'src/apiTypes'
import { AppDispatch, RootState } from 'src/configureStore'
import {
  clearUserTextFeedback,
  getFeedbacksByQuestionId,
  getQuestions,
  getTargetHistory,
  getUserTextFeedback,
  likeUnlikeFeedback,
  markRead,
  sendComment,
  switchChartType,
} from 'src/redux/feedback/actions'
import { colorByName, dateFromObjectId } from 'src/utitlity'
import AddNewQuestion from 'src/components/modals/addNewQuestion'

import moment from 'moment'
import {
  addQuestion,
  getActiveTeamUsers,
  getRelationalData,
  selectFeedbackSettings,
} from 'src/redux/teams/actions'
import { IMAGE_API_ROOT } from 'src/request'
import { selectUser } from 'src/redux/auth/actions'
const mapStateToProps = (state: RootState) => ({
  user: state.authReducer.user,
  selectedTeam: state.teamReducer.selectedTeam,
  questions: state.feedbackReducer.questions,
  feedbacks: state.feedbackReducer.feedbackByQuestionId,
  selectedTeamData: state.teamReducer.selectedTeamData,
  relationalData: state.teamReducer.relationalData,
  userTextFeedback: state.feedbackReducer.userTextFeedback,
  targetHistory: state.feedbackReducer.targetHistory,
})
import { useTranslation } from "react-i18next"

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getQuestions: (teamId: string, feedbackType: string) =>
    dispatch(getQuestions(teamId, feedbackType)),
  getFeebacks: (data: GetFeedbacksByQuestionIdVariables) =>
    dispatch(getFeedbacksByQuestionId(data)),
  addQuestion: (data: AddQuestionVariables) => dispatch(addQuestion(data)),
  likeUnlikeFeedback: (
    targetId: string,
    like: boolean,
    userData: {
      _id: string
      firstname: string
      lastname: string
    }
  ) => dispatch(likeUnlikeFeedback(targetId, like, userData)),
  sendComment: (data: SendCommentVariables) => dispatch(sendComment(data)),
  markRead: (targetId: string, questionId: string) =>
    dispatch(markRead(targetId, questionId)),
  selectUser: (user: User) => dispatch(selectUser(user)),
  getActiveUsers: (teamId: string, memberType: string) =>
    dispatch(getActiveTeamUsers(teamId, memberType)),
  getRelationalData: (data: RelationalDataVariables) =>
    dispatch(getRelationalData(data)),
  getUserTextFeedback: (userId: string) =>
    dispatch(getUserTextFeedback(userId, 'self')),
  clear: () => dispatch(clearUserTextFeedback()),
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
  const { t } = useTranslation(["common", "textFeedbackPages"])
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
    selectedTeamData,
    getActiveUsers,
    relationalData,
    getRelationalData,
    getUserTextFeedback,
    userTextFeedback,
    targetHistory,
    getTargetHistory,
    switchChartType
  } = props
  const [
    selectedFeedback,
    selectFeedback,
  ] = useState<UserRecievedTextFeedback | null>(null)

  const [selectedUser, selectUserState] = useState<User | null>(null)
  useEffect(() => {
    if (selectedTeam) {
      getActiveUsers(selectedTeam._id, 'teamMembers')
    }
  }, [selectedTeam])
  const params = useParams<ParamTypes>()
  useEffect(() => {
    if (params.teamId) {
      getTeamId(params.teamId)
    }
  }, [params])

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

  console.log(targetHistory, 'targetHistory')

  useEffect(() => {
    if (selectedUser && selectedTeam) {
      getUserTextFeedback(selectedUser._id)
    }
  }, [selectedUser])

  useEffect(() => {
    if (
      selectedTeamData?.teamMembers &&
      selectedTeamData?.teamMembers[0] &&
      !selectedUser
    ) {
      selectUserState(selectedTeamData?.teamMembers[0])
    }
  }, [selectedTeamData?.teamMembers && selectedTeamData?.teamMembers[0]])

  useEffect(() => {
    if (userTextFeedback && !userTextFeedback.length) {
      selectFeedback(null)
    }
    switchChartType()
  }, [userTextFeedback])

  useEffect(() => {
    if (selectedFeedback) {
      getTargetHistory(selectedFeedback._id)
      markRead(selectedFeedback._id, selectedFeedback._id)
    }
  }, [selectedFeedback])

  const [commentButtonClass, setCommentButtonClass] = useState(
    'button-green-primary'
  )
  const [commentButtonCaption, setCommentButtonCaption] = useState('Add')
  useEffect(() => {
    if (commentButtonCaption === 'Sending') {
      setTimeout(() => {
        //       setCommentButtonClass('sent')
        setCommentButtonCaption(t("common:Sent"))
      }, 1000)
    }
  }, [commentButtonCaption])

  return (
    <div className="content-wrapper">
      <div className="content">
        <div className="widgets-top">
          <div className="option-buttons">
            <button
              className="button"
              onClick={() => {
                if (selectedTeam) {
                  //@ts-ignore
                  push('/team/' + selectedTeam._id + '/data/self')
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
              <p className="questions-header-title">{t("common:Selectteammembers")}</p>
            </div>
            <div className="questions-main">
              {selectedTeamData?.teamMembers?.map((item) => (
                <div
                  className={`question ${selectedUser?._id === item._id ? 'active' : ''
                    }`}
                  onClick={() => selectUserState(item)}
                >
                  <p className="question-text">
                    {item.firstname + ' ' + item.lastname}
                  </p>
                  {/*<span className="question-amount">{!!item.unread && item.unread}</span>*/}
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
                +{" "}{/* t("textFeedbackPages:Addnewquestion") */}Add new team members
              </button>
            </div>
          </div>

          <div className="content-card answers">
            <div className="answers-header">
              <p className="answers-header-title">
                {selectedTeam?.name} - {t("common:Selfevaluation")}
              </p>
              <p className="answers-header-amount">
                {t("common:Selfevaluations")}{" "}{t("common:Givenby")}{' '}
                {selectedUser?.firstname + ' ' + selectedUser?.lastname}
              </p>
            </div>

            <div className="answers-main">
              {!!userTextFeedback?.length ? (
                userTextFeedback.map((feed) => (
                  <div
                    className={`answer ${String(selectedFeedback?._id) === String(feed._id)
                      ? 'active'
                      : ''
                      }`}
                    key={feed._id}
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
                          {
                            <p className="answer-set-header-info-text">
                              {moment(dateFromObjectId(feed._id)).fromNow()}
                            </p>
                          }
                        </div>
                      </div>
                      <p className="answer-set-text">
                        {feed.textData.map(
                          (v, i) =>
                            v.value + (i < feed.textData.length - 1 ? ', ' : '')
                        )}
                      </p>
                      <div className="stars">
                        {feed.valueData.map((item) => (
                          <div className="star-item">
                            <p className="star-item-text">{item.question}</p>
                            <div className="star-set">
                              <i className={`icon-star`}></i>
                              <i
                                className={`icon-star ${item.value > 1 ? '' : 'empty'
                                  }`}
                                style={{
                                  display: item.value > 1 ? 'block' : 'none',
                                }}
                              ></i>
                              <i
                                className={`icon-star ${item.value > 2 ? '' : 'empty'
                                  }`}
                                style={{
                                  display: item.value > 2 ? 'block' : 'none',
                                }}
                              ></i>
                              <i
                                className={`icon-star ${item.value > 3 ? '' : 'empty'
                                  }`}
                                style={{
                                  display: item.value > 3 ? 'block' : 'none',
                                }}
                              ></i>
                              <i
                                className={`icon-star ${item.value > 4 ? '' : 'empty'
                                  }`}
                                style={{
                                  display: item.value > 4 ? 'block' : 'none',
                                }}
                              ></i>
                            </div>
                          </div>
                        ))}
                      </div>
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
                    <p className="answers-placeholder-title">{t("common:Nodatayet")}</p>
                    <p className="answers-placeholder-text" style={{ maxWidth: "26rem" }}>
                      {t("common:Teammember")}{' '}
                      <span>{selectedUser?.firstname + ' ' + selectedUser?.lastname}</span>{' '}
                      {t("textFeedbackPages:Noselfevaluationyet")}.
                  </p>
                  </div>
                )}
            </div>
          </div>
          {
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
                        {selectedFeedback.sender.jobtitle || t("common:Nojobtitle")}
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
                              selectedFeedback.like || false,
                              {
                                _id: user._id,
                                firstname: user.firstname,
                                lastname: user.lastname,
                              }
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
                          </div>
                          <div className="profile-footer-item-comment"  >
                            {!!item.comment && <p className="profile-footer-item-comment-text">
                              {item.comment}
                            </p>}
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
          }
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
  )
}

export default connector(GeneralSettings)