import React, { useState } from 'react'
import Header from 'src/components/header'
import HeaderTeamSubNav from 'src/components/header/topSubNav'
import TextFeedbackHeader from 'src/components/header/textFeedbackHeader'
import { AppDispatch, RootState } from 'src/configureStore'
import { connect, ConnectedProps } from 'react-redux'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  getFeedbacksByQuestionId,
  getQuestions,
} from 'src/redux/feedback/actions'
import moment from 'moment'
import { GetFeedbacksByQuestionIdVariables } from 'src/apiTypes'
import { colorByName, dateFromObjectId } from 'src/utitlity'
import { useTranslation } from 'react-i18next'

const mapStateToProps = (state: RootState) => ({
  user: state.authReducer.user,
  selectedTeam: state.teamReducer.selectedTeam,
  questions: state.feedbackReducer.questions,
  feedbacks: state.feedbackReducer.feedbackByQuestionId,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getQuestions: (teamId: string, feedbackType: string) =>
    dispatch(getQuestions(teamId, feedbackType)),
  getFeebacks: (data: GetFeedbacksByQuestionIdVariables) =>
    dispatch(getFeedbacksByQuestionId(data)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {}

const GeneralSettings = (props: Props) => {
  const { t } = useTranslation(['teamFeedbackPage', 'common'])
  const { feedbacks } = props

  return (
    <div className="content-wrapper">
      <div className="content">
        <div className="content-card">
          {!!feedbacks && !feedbacks.length && (
            <div className="placeholder">
              <img
                src="/img/custom-questions-img.png"
                alt="Clip art"
                className="placeholder-img"
              />
              <p className="placeholder-title">
                {t('teamFeedbackPage:placeholder:title')}
              </p>
              <p className="placeholder-text">
                {t('teamFeedbackPage:placeholder:text')}
              </p>
            </div>
          )}
          {feedbacks?.map((feed) => (
            <div className="answer" key={feed._id + 'answer'}>
              <div
                className="answer-initials"
                style={{
                  backgroundColor: colorByName(
                    feed.sender.firstname + ' ' + feed.sender.lastname
                  ),
                }}
              >
                {feed.sender.firstname[0] + feed.sender.lastname[0]}
              </div>
              <div className="answer-set">
                <p className="answer-set-title">
                  <span className="answer-set-title-name">
                    {feed.sender.firstname + ' ' + feed.sender.lastname}
                  </span>
                  <span className="answer-set-title-date">
                    {moment(dateFromObjectId(feed._id)).fromNow()}
                  </span>
                </p>
                <p className="answer-set-text">{feed.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default connector(GeneralSettings)
