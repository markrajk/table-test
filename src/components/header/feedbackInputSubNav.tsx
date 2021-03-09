import React, { useState, useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { GetQuestionsByCategoryVariables } from 'src/apiTypes'
import { AppDispatch, RootState } from 'src/configureStore'
import {
  getQuestionByCat,
  selectFeedbackSettings,
} from 'src/redux/teams/actions'

const mapStateToProps = (state: RootState) => ({
  user: state.authReducer.user,
  selectedTeam: state.teamReducer.selectedTeam,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getQuestionByCat: (data: GetQuestionsByCategoryVariables) =>
    dispatch(getQuestionByCat(data)),
  selectFeedbackSettings: (
    selection: 'team' | 'p2p' | 'supervisor' | 'subordinate' | 'self'
  ) => dispatch(selectFeedbackSettings(selection)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {}

const FeedbackInputSubNav = (props: Props) => {
  const { selectedTeam, getQuestionByCat, selectFeedbackSettings } = props
  const [category, selectCategory] = useState<
    'team' | 'p2p' | 'supervisor' | 'subordinate' | 'self'
  >('team')

  useEffect(() => {
    const subheaderNavLIst = document.querySelector('.header-sub-nav')
    // @ts-ignore
    const subnavItems = subheaderNavLIst.querySelectorAll(
      '.header-sub-nav-list-item'
    )
    // @ts-ignore
    const subnavItemsActive = subheaderNavLIst.querySelector(
      '.header-sub-nav-list-item.active'
    )
    // @ts-ignore
    const subsvgArrow = subheaderNavLIst.querySelector('.header-sub-nav svg')

    positionArrow2(subnavItemsActive)

    // @ts-ignore
    function positionArrow2(element) {
      let bodyRect = document.body.getBoundingClientRect(),
        elemRect = element.getBoundingClientRect(),
        offset = elemRect.left - bodyRect.left - 40 + element.clientWidth / 2

      // @ts-ignore
      subsvgArrow.style.left = `${offset}px`
    }

    subnavItems.forEach((e) => {
      e.addEventListener('click', function () {
        // @ts-ignore
        positionArrow2(this)
      })
    })
  }, [])

  return (
    <div className="header-sub-nav">
      <ul className="header-sub-nav-list">
        <li
          className={`header-sub-nav-list-item ${category === 'team' ? 'active' : ''
            }`}
        >
          <button
            className="header-sub-nav-list-item-text"
            text="Team feedback"
            onClick={() => {
              if (selectedTeam) {
                selectCategory('team')
                selectFeedbackSettings('team')
                getQuestionByCat({
                  teamId: selectedTeam._id,
                  category: 'team',
                })
              }
            }}
          >
            Team feedback
          </button>
        </li>
        <li
          className={`header-sub-nav-list-item ${category === 'p2p' ? 'active' : ''
            }`}
        >
          <button
            onClick={() => {
              if (selectedTeam) {
                selectCategory('p2p')
                selectFeedbackSettings('p2p')
                getQuestionByCat({
                  teamId: selectedTeam._id,
                  category: 'p2p',
                })
              }
            }}
            className="header-sub-nav-list-item-text"
            text="P2P feedback"
          >
            P2P routines
          </button>
        </li>
        <li
          className={`header-sub-nav-list-item ${category === 'supervisor' ? 'active' : ''
            }`}
        >
          <button
            onClick={() => {
              if (selectedTeam) {
                selectCategory('supervisor')
                selectFeedbackSettings('supervisor')
                getQuestionByCat({
                  teamId: selectedTeam._id,
                  category: 'supervisor',
                })
              }
            }}
            className="header-sub-nav-list-item-text"
            text="Supervisor feedback"
          >
            Supervisor feedback
          </button>
        </li>
        <li
          className={`header-sub-nav-list-item ${category === 'self' ? 'active' : ''
            }`}
        >
          <button
            onClick={() => {
              if (selectedTeam) {
                selectCategory('self')
                selectFeedbackSettings('self')
                getQuestionByCat({
                  teamId: selectedTeam._id,
                  category: 'self',
                })
              }
            }}
            className="header-sub-nav-list-item-text"
            text="Self evaluations"
          >
            Self evaluations
          </button>
        </li>
        <li
          className={`header-sub-nav-list-item ${category === 'subordinate' ? 'active' : ''
            }`}
        >
          <button
            onClick={() => {
              if (selectedTeam) {
                selectCategory('subordinate')
                selectFeedbackSettings('subordinate')
                getQuestionByCat({
                  teamId: selectedTeam._id,
                  category: 'subordinate',
                })
              }
            }}
            className="header-sub-nav-list-item-text"
            text="Subordinate feedback"
          >
            Subordinate feedback
          </button>
        </li>
      </ul>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 13"><g transform="translate(-548 -124)"><g transform="translate(320)"><path d="M9.722.963a1,1,0,0,1,1.556,0l8.407,10.408A1,1,0,0,1,18.907,13H2.093a1,1,0,0,1-.778-1.628Z" transform="translate(228 124)" fill="#e4e6e9" /></g><g transform="translate(321.35 1.6)"><path d="M9.15,0,18.3,11.4H0Z" transform="translate(228 124)" fill="#fff" /></g></g></svg>
    </div>
  )
}

export default connector(FeedbackInputSubNav)
