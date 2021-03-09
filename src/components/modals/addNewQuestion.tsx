import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { capitalize } from 'src/utitlity'

interface Props {
  addQuestion(type: 'value' | 'text', question: string): void
  category: 'team' | 'p2p' | 'supervisor' | 'subordinate' | 'self'
  teamName: string
}

const AddNewQuestion = (props: Props) => {
  const { t } = useTranslation(['addNewQuestionModal', 'common'])
  const [type, setType] = useState<'value' | 'text'>('value')
  const [question, setQuestion] = useState('')
  const { addQuestion, category, teamName } = props

  return (
    <div className="custom-modal-wrapper" id="newQuestionModal">
      <div className="custom-modal">
        <div className="custom-modal-body">
          <div
            className="custom-modal-close"
            close-modal="newQuestionModal"
            onClick={() => {
              document
                .getElementById('newQuestionModal')
                ?.classList.remove('open')
            }}
          >
            <i className="icon-close"></i>
          </div>
          <p className="custom-modal-body-title">
            {t('addNewQuestionModal:Addnewquestion')}
          </p>
          <p className="custom-modal-body-subtitle">
            {teamName} - {capitalize(category) + ' feedback'}
          </p>
          <p className="custom-modal-body-label">
            {t('addNewQuestionModal:Selecttype')}
          </p>
          <div className="buttons">
            <button
              className={`button text-entry ${type == 'value' && 'active'}`}
              // style={
              //   type == 'value'
              //     ? { backgroundColor: 'grey', color: '#FFF' }
              //     : {}
              // }
              onClick={() => {
                setType('value')
              }}
            >
              <i className="icon-star"></i>
              {t('addNewQuestionModal:Starrating')}
            </button>
            <button
              className={`button text-entry ${type == 'text' && 'active'}`}
              onClick={() => {
                setType('text')
              }}
            // style={
            //   type == 'text' ? { backgroundColor: 'grey', color: '#FFF' } : {}
            // }
            >
              <i className="icon-short-text"></i>
              {t('addNewQuestionModal:Textentry')}
            </button>
          </div>
          <p className="custom-modal-body-label">
            {t('addNewQuestionModal:Enterquestion')}
          </p>
          <input
            type="text"
            placeholder={`${t('addNewQuestionModal:Enterquestion')}`}
            value={capitalize(question)}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button
            className="button button-primary"
            onClick={() => {
              if (question && type) {
                addQuestion(type, question)
                document
                  .getElementById('newQuestionModal')
                  ?.classList.remove('open')
                setQuestion('')
              } else {
                window.alert('type question')
              }
            }}
          >
            {t('addNewQuestionModal:Addquestion')}
          </button>
        </div>
      </div>
      <div className="custom-modal-backdrop"></div>
    </div>
  )
}

export default AddNewQuestion
