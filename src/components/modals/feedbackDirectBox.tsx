import React, { useState } from 'react'
import { DirectFeedback, User } from 'src/apiTypes'
import { quitTeam } from 'src/redux/teams/actions'
import { useTranslation } from 'react-i18next'
import { IMAGE_API_ROOT } from 'src/request'
import { colorByName, dateFromObjectId } from 'src/utitlity'
import SeeUsersModal from './seeUsersModal'
import moment from 'moment'


interface Props {
  data: DirectFeedback
  onExpand(): void
  type?: 'receiver',
  ref?: any
}

const FeedbackSummary = (props: Props) => {
  const { t } = useTranslation(['feedbackSummaryBox', 'common'])
  const { data, onExpand, type, ref } = props
  console.log(data, 'this is the data to check');
  const [selectedProfile, selectProfile] = useState<User | null>(null)
  return (
    <div className="feedback grid-item">

      <div className="feedback-header" >
        {!!data?.[type || 'sender'] ?
          <>
            {data?.[type || 'sender']?.profilePic ? (
              <img
                className="feedback-header-initials"
                src={IMAGE_API_ROOT + data?.[type || 'sender'].profilePic}
                alt="userProfilePic"
                onClick={() => {
                  if (data && data[type || 'sender']) {
                    selectProfile(data[type || 'sender'])
                  }
                }}
              />
            ) : (
                <div
                  onClick={() => {
                    if (data && data[type || 'sender']) {
                      selectProfile(data[type || 'sender'])
                    }
                  }}
                  className="feedback-header-initials"
                  style={{
                    backgroundColor: colorByName(
                      data?.[type || 'sender']?.firstname + ' ' + data?.[type || 'sender']?.lastname
                    ),
                  }}
                >
                  {data?.[type || 'sender']?.firstname[0]}
                  {data?.[type || 'sender']?.lastname[0]}
                </div>
              )}
            <p className="feedback-header-name" onClick={() => {
              if (data && data[type || 'sender']) {
                selectProfile(data[type || 'sender'])
              }
            }}>
              {data?.[type || 'sender']?.firstname + ' ' + data?.[type || 'sender']?.lastname}
            </p>
          </> :
          <p className="feedback-header-name">
            Team feedback
              </p>
        }
        <div className="feedback-header-options">
          <p className="feedback-header-amount">{moment(dateFromObjectId(data._id)).fromNow()}</p>
          {data?.receiver?._id !== data?.sender?._id && <button
            className="feedback-read-more modal-trigger"
            target-modal="feedbackTransferModal"
            onClick={() => onExpand()}
          >
            <i className="icon-expand"></i>
          </button>}
        </div>
      </div>
      <div className="feedback-rating">
          
        {data?.valueData?.map((que) => (
          <div className="feedback-rating-item" key={que.question}>
            <p className="feedback-rating-item-name">{que.question}:</p>
            <div className="feedback-rating-item-stars">
              <i
                className="icon-star"
                style={que.value > 0 ? {} : { display: 'none' }}
              ></i>
              <i
                className="icon-star"
                style={que.value > 1 ? {} : { display: 'none' }}
              ></i>
              <i
                className="icon-star"
                style={que.value > 2 ? {} : { display: 'none' }}
              ></i>
              <i
                className="icon-star"
                style={que.value > 3 ? {} : { display: 'none' }}
              ></i>
              <i
                className="icon-star"
                style={que.value > 4 ? {} : { display: 'none' }}
              ></i>
            </div>
          </div>
        ))}
      </div>
      <div className="feedback-main">
        {data?.textData?.map((item) => (
          <div className="feedback-main-item trunc" ref={() => ref}>
            <p className="feedback-main-item-text">
              <span className="feedback-main-item-text-strong">
                {item.question}:{' '}
              </span>
              {item.value}
            </p>
            <button tabIndex={-1} className="read-more">
              &nbsp;{t('common:Readmore')}
            </button>
          </div>
        ))}

        <div className="close">
          <i className="icon-close"></i>
        </div>
      </div>
      <SeeUsersModal profile={selectedProfile} onClose={() => selectProfile(null)} />
    </div>
  )
}

export default FeedbackSummary
