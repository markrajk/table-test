import React, { useState } from 'react'

import { AppDispatch, RootState } from 'src/configureStore'
import { connect, ConnectedProps } from 'react-redux'
import { useEffect } from 'react'
import {
  addQuestion,
  deleteQuestion,
  editQuestion,
  getQuestionByCat,
  updateTeamProfile,
} from 'src/redux/teams/actions'
import {
  AddQuestionVariables,
  GetQuestionsByCategoryVariables,
  UpdateTeamProfileVariable,
  User,
} from 'src/apiTypes'
import AddNewQuestion from 'src/components/modals/addNewQuestion'

import { capitalize } from 'src/utitlity'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import CustomQuestion from 'src/components/team/customQuestion'

const mapStateToProps = (state: RootState) => ({
  user: state.authReducer.user,
  selectedTeam: state.teamReducer.selectedTeam,
  questionsByCat: state.teamReducer.questionsByCat,
  feedbackSettingSelection: state.teamReducer.feedbackSettingSelection,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getQuestionByCat: (data: GetQuestionsByCategoryVariables) =>
    dispatch(getQuestionByCat(data)),
  addQuestion: (data: AddQuestionVariables) => dispatch(addQuestion(data)),
  editQuestion: (
    questionId: string,
    question?: string,
    questionOutput?: string
  ) => dispatch(editQuestion(questionId, question, questionOutput)),
  deleteQuestion: (questionId: string) => dispatch(deleteQuestion(questionId)),
  updateTeamProfile: (data: UpdateTeamProfileVariable) =>
    dispatch(updateTeamProfile(data)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  getTeamId(teamId: string): void
}

interface ParamTypes {
  teamId?: string
}

const Feedinput = (props: Props) => {
  const { t } = useTranslation(['feedbackInputPage', 'common'])
  const params = useParams<ParamTypes>()
  const {
    selectedTeam,
    questionsByCat,
    getQuestionByCat,
    addQuestion,
    editQuestion,
    deleteQuestion,
    getTeamId,
    feedbackSettingSelection,
    updateTeamProfile,
  } = props

  useEffect(() => {
    if (selectedTeam) {
      getQuestionByCat({
        teamId: selectedTeam._id,
        category: 'team',
      })
    }
  }, [getQuestionByCat, selectedTeam])

  useEffect(() => {
    if (params.teamId) {
      getTeamId(params.teamId)
    }
  }, [params])
  const [openQuestion, setOpenQuestion] = useState<string | null>(null)
  const returnFreqString = () => {
    const returnFreq = () => {
      if (!selectedTeam) {
        return 0
      }
      if (feedbackSettingSelection === 'team') {
        return selectedTeam.frequency || 2
      }
      if (feedbackSettingSelection === 'self') {
        return selectedTeam.selfFrequency || 2
      }
      if (feedbackSettingSelection === 'supervisor') {
        return selectedTeam.tlFrequency || 2
      }
      return 0
    }
    const freq = returnFreq()
    if (freq === 0) {
      return 'None'
    }
    if (freq === 1) {
      return 'Weekly'
    }
    if (freq === 2) {
      return 'Twice a month'
    }
    if (freq === 3) {
      return 'Every third week'
    }
    if (freq === 4) {
      return 'Monthly'
    }
    if (freq === 0.000099) {
      return '1 minute'
    }
  }

  const frequency = returnFreqString()
  const returnFreq = () => {
    if (feedbackSettingSelection === 'team') {
      return 'frequency'
    }
    if (feedbackSettingSelection === 'self') {
      return 'selfFrequency'
    }
    if (feedbackSettingSelection === 'supervisor') {
      return 'tlFrequency'
    }
    return 'frequency'
  }

  const updateFreqString = returnFreq()
  return (
    <>
      <div
        className="content-wrapper"
        onClick={() =>
          document.getElementById('mainDrawer')?.classList.remove('open')
        }
      >
        <div className="content">
          <div className="content-card">
            <div className="content-card-header">
              <div className="content-card-header-bottom">
                <div className="content-card-header-caption">
                  <p className="content-card-header-caption-title">Questions</p>
                  <p className="content-card-header-caption-text">
                    Here you can add, edit and delete members of this team.
                  </p>
                </div>
                <button
                  className="button button-green-primary"
                  onClick={() => {
                    if (selectedTeam) {
                      document
                        .getElementById('newQuestionModal')
                        ?.classList.add('open')
                    }
                  }}
                >
                  ADD NEW QUESTION
                </button>
                {/*<div className="options">
                  <button
                    className={`options-link ${category === 'team' ? 'active' : ''
                      }`}
                    onClick={() => {
                      if (selectedTeam) {
                        getQuestionByCat({
                          teamId: selectedTeam._id,
                          category: 'team',
                        })
                        selectCategory('team')
                      }
                    }}
                  >
                    {t("common:teamFeedback")}
                  </button>
                  <span className="options-divider">I</span>
                  <button
                    className={`options-link ${category === 'p2p' ? 'active' : ''
                      }`}
                    onClick={() => {
                      if (selectedTeam) {
                        getQuestionByCat({
                          teamId: selectedTeam._id,
                          category: 'p2p',
                        })
                        selectCategory('p2p')
                      }
                    }}
                  >
                    {' '}
                    {t("common:p2pFeedback")}
                  </button>
                  <span className="options-divider">I</span>
                  <button
                    className={`options-link ${category === 'supervisor' ? 'active' : ''
                      }`}
                    onClick={() => {
                      if (selectedTeam) {
                        getQuestionByCat({
                          teamId: selectedTeam._id,
                          category: 'supervisor',
                        })
                        selectCategory('supervisor')
                      }
                    }}
                  >
                    {t("common:supervisoryFeedback")}
                  </button>
                  <span className="options-divider">I</span>
                  <button
                    onClick={() => {
                      if (selectedTeam) {
                        getQuestionByCat({
                          teamId: selectedTeam._id,
                          category: 'subordinate',
                        })
                        selectCategory('subordinate')
                      }
                    }}
                    className={`options-link ${category === 'subordinate' ? 'active' : ''
                      }`}
                  >
                    {t("common:subordinateFeedback")}
                  </button>
                  <span className="options-divider">I</span>
                  <button
                    className={`options-link ${category === 'self' ? 'active' : ''
                      }`}
                    onClick={() => {
                      if (selectedTeam) {
                        getQuestionByCat({
                          teamId: selectedTeam._id,
                          category: 'self',
                        })
                        selectCategory('self')
                      }
                    }}
                  >
                    {t("common:selfEvaluation")}
                  </button>
                </div>*/}
              </div>
            </div>
            <div className="custom-questions custom-accordion">
              {questionsByCat?.map((question) => (
                <CustomQuestion
                  deleteQuestion={() => deleteQuestion(question._id)}
                  editQuestion={(q, qo) => {
                    if (question.level !== 'company') {
                      console.log(qo)
                      editQuestion(question._id, q, qo)
                    }
                  }}
                  open={openQuestion === question._id}
                  question={question}
                  onOpen={() => {
                    if (openQuestion === question._id) {
                      setOpenQuestion(null)
                    } else {
                      setOpenQuestion(question._id)
                    }
                  }}
                />
                /*
                <div className="custom-question" key={question._id}>
                  <div className="custom-question-icon">
                    <i
                      className={
                        question.type === 'value'
                          ? 'icon-star'
                          : 'icon-short-text'
                      }
                    ></i>
                  </div>
                  <input
                    className="custom-question-text"
                    defaultValue={capitalize(question.question)}
                    onChange={(e) => {
                      if (question.level === 'team') {
                        editQuestion(question._id, e.target.value)
                      }
                    }}
                    disabled={question.level === 'company'}
                  />
                  <div className="custom-question-buttons">
                    <button
                      onClick={() => {
                        if (question.level !== 'company') {
                          deleteQuestion(question._id)
                        }
                      }}
                      className={`button ${question.level === 'company'
                        ? `button-lock`
                        : 'button-close'
                        }`}
                    >
                      <i
                        className={`icon-${question.level === 'company' ? 'lock-circle-outlined' : 'close-circle-01'}`}
                      ></i>
                    </button>
                    <button className="button button-menu">
                      <i className="icon-menu-circle-outlined"></i>
                    </button>
                  </div>
                </div>
                */
              ))}
            </div>

            {/*<button
              className="button button-primary add-custom-question-button modal-trigger"
              target-modal="newQuestionModal"
              onClick={() => {
                if (selectedTeam) {
                  document
                    .getElementById('newQuestionModal')
                    ?.classList.add('open')
                }
              }}
            >
              {t("feedbackInputPage:Addanewquestion")}
            </button>*/}
            {/team|self|supervisor/.test(feedbackSettingSelection) && (
              <>
                {selectedTeam && (selectedTeam[updateFreqString] || 1) < 5 && (
                  <div className="settings-section">
                    <div className="settings-section-set">
                      <p className="settings-section-set-title">Frequency</p>
                      <p className="settings-section-set-text">
                        Select how often the team feedback should be collected
                      </p>
                    </div>
                    <div className="custom-dropdown">
                      <div className="custom-dropdown-trigger" tabIndex={-1}>
                        <p className="value">{frequency}</p>
                        <i className="icon-caret-down"></i>
                      </div>
                      <div className="custom-dropdown-menu">
                        <div className="custom-dropdown-menu-item">
                          <button
                            onClick={() => {
                              if (selectedTeam) {
                                updateTeamProfile({
                                  teamId: selectedTeam._id,
                                  [updateFreqString]: 1,
                                })
                              }
                            }}
                          >
                            Weekly
                          </button>
                        </div>
                        <div className="custom-dropdown-menu-item">
                          <button
                            onClick={() => {
                              if (selectedTeam) {
                                updateTeamProfile({
                                  teamId: selectedTeam._id,
                                  [updateFreqString]: 2,
                                })
                              }
                            }}
                          >
                            Twice a month
                          </button>
                        </div>
                        <div className="custom-dropdown-menu-item">
                          <button
                            onClick={() => {
                              if (selectedTeam) {
                                updateTeamProfile({
                                  teamId: selectedTeam._id,
                                  [updateFreqString]: 3,
                                })
                              }
                            }}
                          >
                            Every third week
                          </button>
                        </div>
                        <div className="custom-dropdown-menu-item">
                          <button
                            onClick={() => {
                              if (selectedTeam) {
                                updateTeamProfile({
                                  teamId: selectedTeam._id,
                                  [updateFreqString]: 4,
                                })
                              }
                            }}
                          >
                            Monthly
                          </button>
                        </div>
                        <div className="custom-dropdown-menu-item">
                          <button
                            onClick={() => {
                              if (selectedTeam) {
                                updateTeamProfile({
                                  teamId: selectedTeam._id,
                                  [updateFreqString]: 0.000099,
                                })
                              }
                            }}
                          >
                            1 min
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="settings-section">
                  <div className="settings-section-set">
                    <p className="settings-section-set-title">Status</p>
                    <p className="settings-section-set-text">
                      Here you can activate or disable the team feedback{' '}
                    </p>
                  </div>
                  <div className="option-buttons">
                    <button
                      onClick={() => {
                        if (selectedTeam) {
                          updateTeamProfile({
                            teamId: selectedTeam._id,
                            [updateFreqString]: 2,
                          })
                        }
                      }}
                      className={`button ${
                        selectedTeam &&
                        (selectedTeam[updateFreqString] || 5) < 5
                          ? 'active'
                          : ''
                      }`}
                    >
                      Active
                    </button>
                    <button
                      onClick={() => {
                        if (selectedTeam) {
                          updateTeamProfile({
                            teamId: selectedTeam._id,
                            [updateFreqString]: 9999,
                          })
                        }
                      }}
                      className={`button ${
                        selectedTeam &&
                        (selectedTeam[updateFreqString] || 5) > 4
                          ? 'active'
                          : ''
                      }`}
                    >
                      Disable
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <AddNewQuestion
        category={feedbackSettingSelection}
        teamName={selectedTeam ? selectedTeam.name : ''}
        addQuestion={(type: 'value' | 'text', question: string) => {
          if (selectedTeam) {
            addQuestion({
              teamId: selectedTeam._id,
              category: feedbackSettingSelection,
              type,
              question,
            })
          }
        }}
      />
    </>
  )
}

export default connector(Feedinput)
