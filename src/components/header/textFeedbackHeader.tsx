import React, { useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { GetFeedbacksByQuestionIdVariables, Question } from 'src/apiTypes'
import { AppDispatch, RootState } from 'src/configureStore'
import {
  getFeedbacksByQuestionId,
  getQuestions,
} from 'src/redux/feedback/actions'
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

const TextTeamSubHeader = (props: Props) => {
  const { questions, getFeebacks, selectedTeam, getQuestions } = props
  

  const [selection, onSelect] = useState('')
  useEffect(() => {
    if (selection && onSelect && selectedTeam) {
      getFeebacks({
        teamId: selectedTeam._id,
        questionId: selection,
      })
    }
  }, [selection, onSelect])

  useEffect(() => {
    if (!selection && questions && questions.textQuestions[0]) {
      onSelect(questions.textQuestions[0].questionId)
    }
  }, [questions, onSelect])
  useEffect(() => {
    // backgroundCardHeight()
    if (selectedTeam) {
      getQuestions(selectedTeam._id, 'team')
    }
  }, [selectedTeam])

  // let header = (document.querySelector(".header") as HTMLElement);
  // let headerMain = (document.querySelector(".header-main") as HTMLElement);
  // let headerNavListItems = document.querySelectorAll(".header-nav-list-item");

  // console.log('HEADER', header)
  // console.log('HEADER MAIN', headerMain)

  // let headerNavListItemsWidth = 0;
  // headerNavListItems.forEach(e => {
  //   headerNavListItemsWidth += e.clientWidth + 45;
  // })

  // console.log('ITEMS WIDTH', headerNavListItemsWidth)

  // console.log(headerNavListItemsWidth)

  // function checkForNavDropdown() {
  //   if (headerNavListItemsWidth > headerMain.clientWidth) {
  //     header.classList.add('show-dropdown');
  //   } else {
  //     header.classList.remove('show-dropdown');
  //   }
  // }

  // checkForNavDropdown()

  // window.addEventListener('resize', checkForNavDropdown)

  useEffect(() => {
    let header = document.querySelector('.header') as HTMLElement
    let headerMain = document.querySelector('.header-main') as HTMLElement
    let navDropdown = document.querySelector('.nav-dropdown') as HTMLElement
    let headerNavListItems = document.querySelectorAll('.header-nav-list-item')

    let headerNavListItemsWidth = 0
    let headerNavListItemsWidthTemp = 0
    headerNavListItems.forEach((e) => {
      headerNavListItemsWidth += e.clientWidth + 45
    })

    if (headerNavListItemsWidth > headerMain.clientWidth) {
      header.classList.add('show-dropdown')
    } else {
      header.classList.remove('show-dropdown')
    }

    window.addEventListener('resize', function () {
      if (headerNavListItemsWidth > headerMain.clientWidth) {
        header.classList.add('show-dropdown')
      } else {
        header.classList.remove('show-dropdown')
        navDropdown.classList.remove('open')
      }
    })
  })

  return (
    <>
      <div className="header-nav">
        <ul className="header-nav-list">
          {questions?.textQuestions?.map((item) => (
            <li
              className={`header-nav-list-item ${selection === item.questionId ? 'active' : ''
                }`}
              onClick={() => onSelect(item.questionId)}
              key={item.questionId}
            >
              <button
                className="header-nav-list-item-text"
                text={item.question}
              >
                {item.question}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="nav-dropdown">
        <div
          className="nav-dropdown-trigger"
          onClick={(e) =>
            e.currentTarget.parentElement?.classList.toggle('open')
          }
        >
          <p className="nav-dropdown-trigger-value">
            {questions &&
              questions?.textQuestions?.find(
                (item) => selection === item.questionId
              )?.question}
          </p>
          <i className="icon-chevron-down"></i>
        </div>
        <div className="nav-dropdown-menu">
          {questions?.textQuestions?.map((item) => (
            <div
              className={`nav-dropdown-menu-item ${selection === item.questionId ? 'selected' : ''
                }`}
              onClick={() => onSelect(item.questionId)}
              key={item.questionId}
            >
              <button className="nav-dropdown-menu-item-button">
                {item.question}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* <div className="nav-dropdown">
        <div className="nav-dropdown-trigger" onClick={(e) => e.currentTarget.parentElement?.classList.toggle('open')}>
          <p className="nav-dropdown-trigger-value">Lorem ipsum dolor sit amet.</p>
          <i className="icon-chevron-down"></i>
        </div>
        <div className="nav-dropdown-menu">
          <div className="nav-dropdown-menu-item selected">
            <button className="nav-dropdown-menu-item-button">Lorem, ipsum dolor</button>
          </div>
          <div className="nav-dropdown-menu-item">
            <button className="nav-dropdown-menu-item-button">Lorem, ipsum dolor</button>
          </div>
          <div className="nav-dropdown-menu-item">
            <button className="nav-dropdown-menu-item-button">Lorem ipsum dolor sit amet consectetur</button>
          </div>
          <div className="nav-dropdown-menu-item">
            <button className="nav-dropdown-menu-item-button">Lorem ipsum dolor sit amet</button>
          </div>
        </div>
      </div> */}
    </>
  )
}

export default connector(TextTeamSubHeader)
