import React, { useEffect, useState } from 'react'
import { QuestionByCategory } from 'src/apiTypes'
import { capitalize } from 'src/utitlity'

interface Props {
  open: boolean
  question: QuestionByCategory
  onOpen(): void
  editQuestion(question?: string, questionData?: string): void
  deleteQuestion(): void
}

const CustomQuestion = (props: Props) => {
  const { open, question, onOpen, editQuestion, deleteQuestion } = props

  console.log(question)

  return (
    <div
      className={`custom-question-wrapper custom-accordion-card ${
        open ? 'open' : ''
      } card-01`}
    >
      <div
        className="custom-question accordion-card-trigger"
        accordion-trigger-target="card-01"
        onClick={onOpen}
      >
        <div className="custom-question-icon">
          <i
            className={
              question.type === 'value' ? 'icon-star' : 'icon-short-text'
            }
          ></i>
        </div>
        <p className="custom-question-text">{capitalize(question.question)}</p>
        <div className="custom-question-buttons">
          <svg
            className="chevron-down-circle"
            style={{ marginRight: '4px' }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g transform="translate(-815.784 -315.402)">
              <g
                transform="translate(815.784 315.402)"
                fill="none"
                stroke="#0d1826"
                stroke-width="1.5"
                opacity="0.798"
              >
                <circle cx="12" cy="12" r="12" stroke="none" />
                <circle cx="12" cy="12" r="11.25" fill="none" />
              </g>
              <path
                d="M12.44,16.239l4.726-4.73a.89.89,0,0,1,1.262,0,.9.9,0,0,1,0,1.265l-5.355,5.359a.892.892,0,0,1-1.232.026L6.448,12.778A.893.893,0,1,1,7.71,11.513Z"
                transform="translate(815.293 313.754)"
                fill="#0d1826"
                opacity="0.797"
              />
            </g>
          </svg>
          <svg
            className="menu-cicle"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g transform="translate(-844.984 -317.402)">
              <g
                transform="translate(851.106 325.693)"
                fill="#fff"
                stroke="#0d1826"
                stroke-width="1"
                opacity="0.803"
              >
                <rect width="11.962" height="1.553" rx="0.777" stroke="none" />
                <rect
                  x="0.5"
                  y="0.5"
                  width="10.962"
                  height="0.553"
                  rx="0.277"
                  fill="none"
                />
              </g>
              <g
                transform="translate(851.106 329.238)"
                fill="#fff"
                stroke="#0d1826"
                stroke-width="1"
                opacity="0.803"
              >
                <rect width="11.962" height="1.553" rx="0.777" stroke="none" />
                <rect
                  x="0.5"
                  y="0.5"
                  width="10.962"
                  height="0.553"
                  rx="0.277"
                  fill="none"
                />
              </g>
              <g
                transform="translate(851.106 332.783)"
                fill="#fff"
                stroke="#0d1826"
                stroke-width="1"
                opacity="0.803"
              >
                <rect width="11.962" height="1.553" rx="0.777" stroke="none" />
                <rect
                  x="0.5"
                  y="0.5"
                  width="10.962"
                  height="0.553"
                  rx="0.277"
                  fill="none"
                />
              </g>
              <g
                transform="translate(844.984 317.402)"
                fill="none"
                stroke="#0d1826"
                stroke-width="1.5"
                opacity="0.803"
              >
                <circle cx="12" cy="12" r="12" stroke="none" />
                <circle cx="12" cy="12" r="11.25" fill="none" />
              </g>
            </g>
          </svg>
        </div>
      </div>
      <div className={`custom-question-body custom-accordion-card-body ${question.level === 'company' ? 'disabled' : question.level === 'startQuestion' ? 'disabled-delete' : ''}`}>
        <div className="translation" style={{ marginBottom: '2.8em' }}>
          <p className="custom-question-body-label">Question</p>
          <div className="custom-input-group">
            {/* <div className="custom-dropdown">
                      <button className="custom-dropdown-trigger" tabIndex={-1}
                        //onfocus="this.parentElement.parentElement.parentElement.parentElement.classList.add('no-overflow')"
                        //onfocusout="this.parentElement.parentElement.parentElement.parentElement.classList.remove('no-overflow')"
                        >
                        <p className="custom-dropdown-trigger-value">EN</p>
                        <i className="icon-caret-down"></i>
                      </button>
                      <div className="custom-dropdown-menu">
                        <div className="custom-dropdown-menu-item active">
                          <img src="../public//img/usa-flag.png" alt="Flag" className="custom-dropdown-menu-item-img" />
                          <p className="custom-dropdown-menu-item-text">English</p>
                        </div>
                        <div className="custom-dropdown-menu-item">
                          <img src="../public/img/fin-flag.png" alt="Flag" className="custom-dropdown-menu-item-img" />
                          <p className="custom-dropdown-menu-item-text">Finnish</p>
                        </div>
                        <div className="custom-dropdown-menu-item">
                          <img src="../public/img/srb-flag.png" alt="Flag" className="custom-dropdown-menu-item-img" />
                          <p className="custom-dropdown-menu-item-text">Serbian</p>
                        </div>
                        <div className="custom-dropdown-menu-item">
                          <img src="../public/img/ind-flag.png" alt="Flag" className="custom-dropdown-menu-item-img" />
                          <p className="custom-dropdown-menu-item-text">Hindu</p>
                        </div>
                      </div>
                    </div> */}
            <input
              type="text"
              onChange={(e) => editQuestion(e.target.value)}
              value={question.question}
              disabled={/startQuestion|company/.test(question.level)}
              placeholder="Enter question..."
              style={{ borderRadius: '4px' }}
            />
          </div>
          {/* <div className="custom-input-group">
            <div className="custom-dropdown">
                      <button className="custom-dropdown-trigger"  tabIndex={-1}
                       // onfocus="this.parentElement.parentElement.parentElement.parentElement.classList.add('no-overflow')"
                       // onfocusout="this.parentElement.parentElement.parentElement.parentElement.classList.remove('no-overflow')"
                        >
                        <p className="custom-dropdown-trigger-value">EN</p>
                        <i className="icon-caret-down"></i>
                      </button>
                      <div className="custom-dropdown-menu">
                        <div className="custom-dropdown-menu-item active">
                          <img src="../public//img/usa-flag.png" alt="Flag" className="custom-dropdown-menu-item-img" />
                          <p className="custom-dropdown-menu-item-text">English</p>
                        </div>
                        <div className="custom-dropdown-menu-item">
                          <img src="../public/img/fin-flag.png" alt="Flag" className="custom-dropdown-menu-item-img" />
                          <p className="custom-dropdown-menu-item-text">Finnish</p>
                        </div>
                        <div className="custom-dropdown-menu-item">
                          <img src="../public/img/srb-flag.png" alt="Flag" className="custom-dropdown-menu-item-img" />
                          <p className="custom-dropdown-menu-item-text">Serbian</p>
                        </div>
                        <div className="custom-dropdown-menu-item">
                          <img src="../public/img/ind-flag.png" alt="Flag" className="custom-dropdown-menu-item-img" />
                          <p className="custom-dropdown-menu-item-text">Hindu</p>
                        </div>
                      </div>
                    </div>
            <input type="text" value="How do people feel working in this team?" placeholder="Enter question..." />
          </div> */}
        </div>

        {/* <button className="custom-question-body-info">+ Add a translation</button> */}

        <div className="short">
          <p className="custom-question-body-label">Short form</p>
          <div className="custom-input-group">
            {/* <div className="custom-dropdown">
                      <button className="custom-dropdown-trigger"  tabIndex={-1}
                        //onFocus={ (e) => e?.parentElement?.parentElement.parentElement.parentElement.classList.add('no-overflow')}
                        //onFocusOut="this.parentElement.parentElement.parentElement.parentElement.classList.remove('no-overflow')"
                        >
                        <p className="custom-dropdown-trigger-value">EN</p>
                        <i className="icon-caret-down"></i>
                      </button>
                      <div className="custom-dropdown-menu">
                        <div className="custom-dropdown-menu-item active">
                          <img src="../public//img/usa-flag.png" alt="Flag" className="custom-dropdown-menu-item-img" />
                          <p className="custom-dropdown-menu-item-text">English</p>
                        </div>
                        <div className="custom-dropdown-menu-item">
                          <img src="../public/img/fin-flag.png" alt="Flag" className="custom-dropdown-menu-item-img" />
                          <p className="custom-dropdown-menu-item-text">Finnish</p>
                        </div>
                        <div className="custom-dropdown-menu-item">
                          <img src="../public/img/srb-flag.png" alt="Flag" className="custom-dropdown-menu-item-img" />
                          <p className="custom-dropdown-menu-item-text">Serbian</p>
                        </div>
                        <div className="custom-dropdown-menu-item">
                          <img src="../public/img/ind-flag.png" alt="Flag" className="custom-dropdown-menu-item-img" />
                          <p className="custom-dropdown-menu-item-text">Hindu</p>
                        </div>
                      </div>
                    </div> */}
            <input
              type="text"
              onChange={(e) => editQuestion(undefined, e.target.value)}
              defaultValue={question.questionOutput}
              placeholder="Enter question..."
              disabled={/startQuestion|company/.test(question.level)}
              style={{ borderRadius: '3px' }}
            />
          </div>
        </div>
        {question.level !== 'company' && (
          <div className="custom-question-body-footer">
            <button
              className="button button-light-gray"
              onClick={deleteQuestion}
            >
              Delete question
            </button>
            <button className="button button-green-primary">
              Save changes
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomQuestion
