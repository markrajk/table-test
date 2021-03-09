import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { AppDispatch, RootState } from 'src/configureStore'
import { accordionTrigger } from 'src/main'
import { useTranslation } from 'react-i18next'

const mapStateToProps = (state: RootState) => ({
  user: state.authReducer.user,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {}

const AddWidget = (props: Props) => {
  const { t } = useTranslation([''])
  useEffect(() => {
    accordionTrigger()
  }, [])

  return (
    <div className="custom-modal-wrapper" id="addWidgetModal">
      <div className="custom-modal">
        <div className="custom-modal-header">
          <p className="custom-modal-header-title">
            <span className="strong">Feedback</span> Widgets
          </p>
          <div
            className="custom-modal-close"
            close-modal="addWidgetModal"
            onClick={() =>
              document
                .getElementById('addWidgetModal')
                ?.classList.remove('open')
            }
          >
            <i className="icon-close"></i>
          </div>
        </div>

        <div className="custom-modal-body">
          <div className="custom-modal-body-side">
            <div className="custom-accordion">
              <div className="custom-accordion-card card-01">
                <button
                  className="custom-accordion-card-header accordion-card-trigger"
                  accordion-trigger-target="card-01"
                >
                  <p>Team data</p>
                  <i className="icon-chevron-down"></i>
                </button>
                <div className="custom-accordion-card-body">
                  <button className="custom-accordion-card-body-item active">
                    <div className="custom-accordion-card-body-item-icon">
                      <i className="icon-chart-bar"></i>
                    </div>
                    <p className="custom-accordion-card-body-item-text">
                      Bar chart
                    </p>
                  </button>
                  <button className="custom-accordion-card-body-item">
                    <div className="custom-accordion-card-body-item-icon">
                      <i className="icon-chart-line"></i>
                    </div>
                    <p className="custom-accordion-card-body-item-text">
                      Line chart
                    </p>
                  </button>
                  <button className="custom-accordion-card-body-item">
                    <div className="custom-accordion-card-body-item-icon">
                      <i className="icon-chart-pie"></i>
                    </div>
                    <p className="custom-accordion-card-body-item-text">
                      Pie chart
                    </p>
                  </button>
                  <button className="custom-accordion-card-body-item">
                    <div className="custom-accordion-card-body-item-icon value">
                      <span>17</span>
                    </div>
                    <p className="custom-accordion-card-body-item-text">
                      Value boxes
                    </p>
                  </button>
                  <button className="custom-accordion-card-body-item">
                    <div className="custom-accordion-card-body-item-icon">
                      <i className="icon-bubble-chart"></i>
                    </div>
                    <p className="custom-accordion-card-body-item-text">
                      Other charts
                    </p>
                  </button>
                </div>
              </div>

              <div className="custom-accordion-card open card-02">
                <button
                  className="custom-accordion-card-header accordion-card-trigger"
                  accordion-trigger-target="card-02"
                >
                  <p>Team data</p>
                  <i className="icon-chevron-down"></i>
                </button>
                <div className="custom-accordion-card-body">
                  <button className="custom-accordion-card-body-item active">
                    <div className="custom-accordion-card-body-item-icon">
                      <i className="icon-chart-bar"></i>
                    </div>
                    <p className="custom-accordion-card-body-item-text">
                      Bar chart
                    </p>
                  </button>
                  <button className="custom-accordion-card-body-item">
                    <div className="custom-accordion-card-body-item-icon">
                      <i className="icon-chart-line"></i>
                    </div>
                    <p className="custom-accordion-card-body-item-text">
                      Line chart
                    </p>
                  </button>
                  <button className="custom-accordion-card-body-item">
                    <div className="custom-accordion-card-body-item-icon">
                      <i className="icon-chart-pie"></i>
                    </div>
                    <p className="custom-accordion-card-body-item-text">
                      Pie chart
                    </p>
                  </button>
                  <button className="custom-accordion-card-body-item">
                    <div className="custom-accordion-card-body-item-icon value">
                      <span>17</span>
                    </div>
                    <p className="custom-accordion-card-body-item-text">
                      Value boxes
                    </p>
                  </button>
                  <button className="custom-accordion-card-body-item">
                    <div className="custom-accordion-card-body-item-icon">
                      <i className="icon-bubble-chart"></i>
                    </div>
                    <p className="custom-accordion-card-body-item-text">
                      Other charts
                    </p>
                  </button>
                </div>
              </div>

              <div className="custom-accordion-card card-03">
                <button
                  className="custom-accordion-card-header accordion-card-trigger"
                  accordion-trigger-target="card-03"
                >
                  <p>Team data</p>
                  <i className="icon-chevron-down"></i>
                </button>
                <div className="custom-accordion-card-body">
                  <button className="custom-accordion-card-body-item active">
                    <div className="custom-accordion-card-body-item-icon">
                      <i className="icon-chart-bar"></i>
                    </div>
                    <p className="custom-accordion-card-body-item-text">
                      Bar chart
                    </p>
                  </button>
                  <button className="custom-accordion-card-body-item">
                    <div className="custom-accordion-card-body-item-icon">
                      <i className="icon-chart-line"></i>
                    </div>
                    <p className="custom-accordion-card-body-item-text">
                      Line chart
                    </p>
                  </button>
                  <button className="custom-accordion-card-body-item">
                    <div className="custom-accordion-card-body-item-icon">
                      <i className="icon-chart-pie"></i>
                    </div>
                    <p className="custom-accordion-card-body-item-text">
                      Pie chart
                    </p>
                  </button>
                  <button className="custom-accordion-card-body-item">
                    <div className="custom-accordion-card-body-item-icon value">
                      <span>17</span>
                    </div>
                    <p className="custom-accordion-card-body-item-text">
                      Value boxes
                    </p>
                  </button>
                  <button className="custom-accordion-card-body-item">
                    <div className="custom-accordion-card-body-item-icon">
                      <i className="icon-bubble-chart"></i>
                    </div>
                    <p className="custom-accordion-card-body-item-text">
                      Other charts
                    </p>
                  </button>
                </div>
              </div>

              <div className="custom-accordion-card card-04">
                <button
                  className="custom-accordion-card-header accordion-card-trigger"
                  accordion-trigger-target="card-04"
                >
                  <p>Team data</p>
                  <i className="icon-chevron-down"></i>
                </button>
                <div className="custom-accordion-card-body">
                  <button className="custom-accordion-card-body-item active">
                    <div className="custom-accordion-card-body-item-icon">
                      <i className="icon-chart-bar"></i>
                    </div>
                    <p className="custom-accordion-card-body-item-text">
                      Bar chart
                    </p>
                  </button>
                  <button className="custom-accordion-card-body-item">
                    <div className="custom-accordion-card-body-item-icon">
                      <i className="icon-chart-line"></i>
                    </div>
                    <p className="custom-accordion-card-body-item-text">
                      Line chart
                    </p>
                  </button>
                  <button className="custom-accordion-card-body-item">
                    <div className="custom-accordion-card-body-item-icon">
                      <i className="icon-chart-pie"></i>
                    </div>
                    <p className="custom-accordion-card-body-item-text">
                      Pie chart
                    </p>
                  </button>
                  <button className="custom-accordion-card-body-item">
                    <div className="custom-accordion-card-body-item-icon value">
                      <span>17</span>
                    </div>
                    <p className="custom-accordion-card-body-item-text">
                      Value boxes
                    </p>
                  </button>
                  <button className="custom-accordion-card-body-item">
                    <div className="custom-accordion-card-body-item-icon">
                      <i className="icon-bubble-chart"></i>
                    </div>
                    <p className="custom-accordion-card-body-item-text">
                      Other charts
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="custom-modal-body-main">
            <div className="input-container">
              <input type="text" placeholder="Search" />
              <i className="icon-search"></i>
            </div>
            <div className="banner">
              <p className="banner-text">
                Welcome to add Feedback Widgets - Let’s find the best way to
                present your data
              </p>
            </div>
            <div className="widgets-header">
              <p className="widgets-header-text">Explore By App</p>
            </div>
            <div className="widgets">
              <div className="widget-card">
                <div
                  className="widget-card-header"
                  style={{ backgroundColor: '#1f9bf5' }}
                ></div>
                <div className="widget-card-body">
                  <p className="widget-card-body-title">Example Widget</p>
                  <p className="widget-card-body-text">
                    This is an example description
                  </p>
                  <div className="widget-card-body-bottom">
                    <button className="widget-card-body-bottom-link">
                      Add to Dashboard
                    </button>
                    <div className="widget-card-body-bottom-likes">
                      <i className="icon-thumbs-up"></i>
                      299
                    </div>
                  </div>
                </div>
              </div>

              <div className="widget-card">
                <div
                  className="widget-card-header"
                  style={{ backgroundColor: '#f5b31f' }}
                ></div>
                <div className="widget-card-body">
                  <p className="widget-card-body-title">Example Widget</p>
                  <p className="widget-card-body-text">
                    This is an example description
                  </p>
                  <div className="widget-card-body-bottom">
                    <button className="widget-card-body-bottom-link">
                      Add to Dashboard
                    </button>
                    <div className="widget-card-body-bottom-likes">
                      <i className="icon-thumbs-up"></i>
                      299
                    </div>
                  </div>
                </div>
              </div>

              <div className="widget-card">
                <div
                  className="widget-card-header"
                  style={{ backgroundColor: '#58c129' }}
                ></div>
                <div className="widget-card-body">
                  <p className="widget-card-body-title">Example Widget</p>
                  <p className="widget-card-body-text">
                    This is an example description
                  </p>
                  <div className="widget-card-body-bottom">
                    <button className="widget-card-body-bottom-link">
                      Add to Dashboard
                    </button>
                    <div className="widget-card-body-bottom-likes">
                      <i className="icon-thumbs-up"></i>
                      299
                    </div>
                  </div>
                </div>
              </div>

              <div className="widget-card">
                <div
                  className="widget-card-header"
                  style={{ backgroundColor: '#f57a1f' }}
                ></div>
                <div className="widget-card-body">
                  <p className="widget-card-body-title">Example Widget</p>
                  <p className="widget-card-body-text">
                    This is an example description
                  </p>
                  <div className="widget-card-body-bottom">
                    <button className="widget-card-body-bottom-link">
                      Add to Dashboard
                    </button>
                    <div className="widget-card-body-bottom-likes">
                      <i className="icon-thumbs-up"></i>
                      299
                    </div>
                  </div>
                </div>
              </div>

              <div className="widget-card">
                <div
                  className="widget-card-header"
                  style={{ backgroundColor: '#f57a1f' }}
                ></div>
                <div className="widget-card-body">
                  <p className="widget-card-body-title">Example Widget</p>
                  <p className="widget-card-body-text">
                    This is an example description
                  </p>
                  <div className="widget-card-body-bottom">
                    <button className="widget-card-body-bottom-link">
                      Add to Dashboard
                    </button>
                    <div className="widget-card-body-bottom-likes">
                      <i className="icon-thumbs-up"></i>
                      299
                    </div>
                  </div>
                </div>
              </div>

              <div className="widget-card">
                <div
                  className="widget-card-header"
                  style={{ backgroundColor: '#1f9bf5' }}
                ></div>
                <div className="widget-card-body">
                  <p className="widget-card-body-title">Example Widget</p>
                  <p className="widget-card-body-text">
                    This is an example description
                  </p>
                  <div className="widget-card-body-bottom">
                    <button className="widget-card-body-bottom-link">
                      Add to Dashboard
                    </button>
                    <div className="widget-card-body-bottom-likes">
                      <i className="icon-thumbs-up"></i>
                      299
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="custom-modal-backdrop"></div>
    </div>
  )
}

export default connector(AddWidget)
