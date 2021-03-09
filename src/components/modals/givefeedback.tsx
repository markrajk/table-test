import { connect, ConnectedProps } from 'react-redux'
import React, { useState } from 'react'
import { useEffect } from 'react'
import {
  SendFeedbackVariables,
  TextAnswer,
  User,
  UserTeam,
  ValueAnswer,
} from 'src/apiTypes'
import { AppDispatch, RootState } from 'src/configureStore'
import { getQuestions, sendFeedback } from 'src/redux/feedback/actions'
import { IMAGE_API_ROOT } from 'src/request'
import StarRating from '../feedback/starRating'
import TextInput from '../feedback/textInput'
import { sendFeedbackScript } from 'src/main'
import { useTranslation } from 'react-i18next'
import { capitalize } from 'src/utitlity'
import SeeUsersModal from './seeUsersModal'

const mapStateToProps = (state: RootState) => ({
  user: state.authReducer.user,
  questions: state.feedbackReducer.questions,
  feedbackStatus: state.feedbackReducer.feedbackStatus,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getQuestions: (teamId: string, feedbackType: string) =>
    dispatch(getQuestions(teamId, feedbackType)),
  sendFeedback: (data: SendFeedbackVariables) => dispatch(sendFeedback(data)),
})
const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  data: User | null
  team: UserTeam | null
  clear?(): void
}

const GiveFeedbackmodal = (props: Props) => {
  const { t } = useTranslation(['giveFeedbackModal', 'common'])
  const { data, team, questions, getQuestions, sendFeedback, clear } = props
  const [answers, setAnswers] = useState<ValueAnswer[]>([])

  const [textAnswers, setTextAnswers] = useState<TextAnswer[]>([])
  const [ buttonCaption, setButtonCaption ] = useState<'Send feedback' |'Sending...' | 'Sent'>('Send feedback')
  
  useEffect(() => {
    sendFeedbackScript()
    if (team) {
      getQuestions(team._id, team.category)
    }
  }, [team])

  useEffect(() => {
    let sendFeedbackBtn = document.querySelectorAll('.send-feedback-modal')
    console.log(data, 'useris here');
    
    if (sendFeedbackBtn) {
      sendFeedbackBtn.forEach((e) => {
        e.addEventListener('click', function () {
          if (e.parentElement && e.parentElement.parentElement) {
            let modal = e.parentElement.parentElement
            let body = modal.querySelector('.custom-modal-body')
            let successMessage = modal.querySelector('.success-message')
            if (successMessage) {
              //@ts-ignore
              successMessage.style.maxHeight = `${
                //@ts-ignore
                body.clientHeight /
                parseFloat(getComputedStyle(document.documentElement).fontSize)
                }em`
              modal.classList.add('success')
            }
          }
        })
      })
    }
  }, [])

  const onClose = () => {
    document.getElementById('peerToPeerFeedbackModal')?.classList.remove('open')
 //   document.getElementById('successModal')?.classList.remove('success')
    setButtonCaption('Send feedback')
    setAnswers([])
    setTextAnswers([])
    if (clear) {
      clear()
    }
  }

  const allStarAnswered = () => {
    let status = false
    if (!questions) return false
    const answeredQuest = questions.valueQuestions.map((ans) =>
      String(ans.questionId)
    )
    answeredQuest.forEach((item) => {
      const check = answers.find((ans) => String(ans.questionId) === item)
      if (check) {
        status = true
      } else {
        status = false
      }
    })
    return status
  }

  const isAnswered = allStarAnswered()
  
  
  useEffect(() => {
    if (buttonCaption === 'Sent') {
      setTimeout(onClose, 500)
    }
  }, [buttonCaption])

  const [ selectedProfile, selectProfile ] = useState<User | null>(null)
  
  return (
    <div className="custom-modal-wrapper" id="peerToPeerFeedbackModal" style={{
      zIndex: 999999999
    }}>
      <div className="custom-modal" id="successModal">
        <div className="custom-modal-header">
          <div
            className="custom-modal-close"
            close-modal="peerToPeerFeedbackModal"
            onClick={onClose}
          >
            <i className="icon-close"></i>
          </div>
          <div className="custom-modal-header-set" onClick={() => selectProfile(data)} >
            {data?.profilePic ? (
              <img
                src={IMAGE_API_ROOT + data.profilePic}
                alt="User's profile picture"
                className="custom-modal-header-set-img"
              />
            ) : team?.category === 'team' ? (
              <div className="custom-modal-header-set-icon">
                <i className="icon-users"></i>
              </div>
            ) : (
                  <div className="custom-modal-header-set-initials">
                    {data?.firstname ? data.firstname[0] : ' '}
                    {data?.lastname ? data.lastname[0] : ' '}
                  </div>
                )}

            <p className="custom-modal-header-set-subtitle">
              {t('common:Givefeedbackto')}
            </p>
            <p className="custom-modal-header-set-title">
              {team?.category === 'team'
                ? team.name
                : data?.firstname + ' ' + data?.lastname}
            </p>
          </div>
        </div>

        <div className="custom-modal-body">
          {questions?.valueQuestions.map((question) => (
            <StarRating
              value={answers.find((questi) => {
                if (question.questionId === questi.questionId) {
                  return true
                }
              })}
              onSelect={(value) => {
                const oldAnswers = [...answers]
                const alreadyExist = oldAnswers.filter((ans) => {
                  if (ans.questionId === question.questionId) {
                    ans.value = value
                    return true
                  }
                })

                if (!alreadyExist.length) {
                  oldAnswers.push({
                    questionId: question.questionId,
                    question: question.question,
                    value,
                  })
                }
                setAnswers(oldAnswers)
              }}
              key={question._id}
              data={question}
            />
          ))}

          {questions?.textQuestions.map((question) => (
            <TextInput
              key={question._id}
              data={question}
              value={
                textAnswers.find(
                  (ans) => ans.questionId === question.questionId
                )?.value || ''
              }
              onChange={(text) => {
                const oldAnswers = [...textAnswers]
                const alreadyExist = oldAnswers.filter((ans, i) => {
                  if (ans.questionId === question.questionId) {
                    //  if (text) {
                    ans.value = capitalize(text)
                    //} else {                    }

                    if (!text) {
                      oldAnswers.splice(i, 1)
                    }

                    return true
                  }
                })

                if (text && !alreadyExist.length) {
                  oldAnswers.push({
                    questionId: question.questionId,
                    question: question.question,
                    value: text,
                  })
                }
                setTextAnswers(oldAnswers)
              }}
            />
          ))}

          { <div className="success-message">
            <i className="icon-check-circle-full"></i>
            <p className="success-message-title">{t('common:Feedbacksent')}</p>
            <p className="success-message-text">
              {t('giveFeedbackModal:Windowcolosesautomaticly')}.
            </p>
          </div> }
        </div>
        <div className="custom-modal-footer">
          <button
            className={`button ${buttonCaption === 'Send feedback' ? 'button-primary' : 'sent'}`}
            style={{
              color: isAnswered ? '#fff' : 'rgba(255,255,255, .5)',
              minWidth: 150
            }}
            onClick={() => {
              if (isAnswered) {
                if ((team && data) || (team && team.category === 'team')) {
                  if (team && data) {
                    sendFeedback({
                      receiver: data._id,
                      teamId: team._id,
                      textData: textAnswers,
                      valueData: answers,
                      category: team.category,
                    })
                    /* document
                      .getElementById('successModal')
                      ?.classList.add('success') */
                    setTimeout(() => {
                  //    onClose()
                    }, 3000)
                    setButtonCaption('Sending...')
                    setTimeout(() => {
                      setButtonCaption('Sent')
                    }, 500)
                    return
                  }
                  if (team && team.category === 'team') {
                    sendFeedback({
                      receiver: team._id,
                      teamId: team._id,
                      textData: textAnswers,
                      valueData: answers,
                      category: team.category,
                    })
                    /* document
                      .getElementById('successModal')
                      ?.classList.add('success') */
                    setTimeout(() => {
                      //onClose()
                    }, 3000)
                    setButtonCaption('Sending...')
                    setTimeout(() => {
                      setButtonCaption('Sent')
                    }, 500)
                    return
                  }
                  
                } else {
                  console.log('failed')
                  console.log(data)
                }
              } else {
                window.alert('answer all star questions')
              }
            }}
          >
            {/* t('common:Sendfeedback') */}
            {buttonCaption}
          </button>
          {<button className="button button-dark">{t('common:Sent')}</button>}
        </div>
      </div>
      <div className="custom-modal-backdrop"></div>
      <SeeUsersModal profile={selectedProfile} onClose={() => selectProfile(null)} />
    </div>
  )
}

export default connector(GiveFeedbackmodal)
