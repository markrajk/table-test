import { ResizeObserver } from '@juggle/resize-observer'
import React, { useEffect, useRef, useState } from 'react'
import { MyWidget } from 'src/apiTypes'
import { modalTrigger } from 'src/main'
import useOnClickOutside from 'src/hooks/useOnClickOutside'
import { useTranslation } from 'react-i18next'

interface Props {
  addNew: boolean
  data: MyWidget
}

const ValueBox = (props: Props) => {
  const { addNew, data } = props

  const noData = data?.average === 0 && true

  const { t } = useTranslation('common')

  // REUSABLE RESIZE OBSERVER
  var ro = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const crWidth = entry.borderBoxSize[0].inlineSize
      const crHeight = entry.borderBoxSize[0].blockSize
      const widgetHeader = Array.from(
        entry.target.children as HTMLCollectionOf<HTMLElement>
      )[0]
      const widgetBody = Array.from(
        entry.target.children as HTMLCollectionOf<HTMLElement>
      )[1]
      const valueBox = Array.from(
        widgetBody.children as HTMLCollectionOf<HTMLElement>
      )[0]
      const valueBoxItem = valueBox.children[0]
      const valueBoxItemAmount = valueBoxItem.children[0]
      const valueBoxItemText = valueBoxItem.children[1]

      let scale = 0
      let rem = parseFloat(getComputedStyle(document.documentElement).fontSize)

      if (crWidth <= crHeight) {
        scale = crWidth / 233
      } else {
        scale = (crHeight - widgetHeader.clientHeight) / 188
      }

      if (scale < 1) scale = 1

      valueBox.style.fontSize = `${scale}em`
    }
  })

  const refElement = useRef<HTMLDivElement>(null)
  const element = refElement.current
  
  //const element = document.getElementById('widget-value-box')

  useEffect(() => {
    if (element) {
      ro.observe(element)
      
    }
  }, [element])

  useEffect(() => {
    modalTrigger()
  })

  const [open, setOpen] = useState(false)
  const drowdownEl = useRef(null)
  useOnClickOutside(drowdownEl, () => setOpen(false))

  function handleToggle() {
    setOpen(!open)
  }

  return (
    <>
      <div
        ref={refElement}
        className="widget widget-value-box"
        id="widget-value-box"
      >
        <div className="widget-header">
          <input
            type="text"
            value="Chart title"
            className="widget-header-title"
            placeholder="Write Chart Title"
          />
          <div className="widget-header-buttons">
            <div className={`exp-dropdown ${open && 'open'}`} ref={drowdownEl} style={{ display: "none" }}>
              <button className="exp-dropdown-trigger" onClick={handleToggle}>
                <i className="icon-cog-outlined"></i>
              </button>

              <div className="exp-dropdown-menu">
                <div className="secondary-dropdown">
                  <div className="exp-dropdown-menu-item secondary-dropdown-trigger">
                    <i className="icon-chevron-left"></i>
                    <p className="exp-dropdown-menu-item-text">Time period</p>
                    <i className="icon-check"></i>
                  </div>

                  {/* @ts-ignore */}
                  <div
                    className="secondary-dropdown-menu"
                    onMouseEnter={(e) =>
                      e.currentTarget.parentElement?.classList.add('open')
                    }
                    onMouseLeave={(e) =>
                      e.currentTarget.parentElement?.classList.remove('open')
                    }
                  >
                    <div className="secondary-dropdown-menu-item">
                      <p className="secondary-dropdown-menu-item-text">
                        In weeks
                      </p>
                      <i className="icon-check"></i>
                    </div>
                    <div className="secondary-dropdown-menu-item active">
                      <p className="secondary-dropdown-menu-item-text">
                        In months
                      </p>
                      <i className="icon-check"></i>
                    </div>
                  </div>
                </div>

                <div className="secondary-dropdown">
                  <div className="exp-dropdown-menu-item secondary-dropdown-trigger">
                    <i className="icon-chevron-left"></i>
                    <p className="exp-dropdown-menu-item-text">Questions</p>
                    <i className="icon-check"></i>
                  </div>

                  <div
                    className="secondary-dropdown-menu"
                    onMouseEnter={(e) =>
                      e.currentTarget.parentElement?.classList.add('open')
                    }
                    onMouseLeave={(e) =>
                      e.currentTarget.parentElement?.classList.remove('open')
                    }
                  >
                    <div className="secondary-dropdown-menu-item active">
                      <p className="secondary-dropdown-menu-item-text">
                        Option I
                      </p>
                      <i className="icon-check"></i>
                    </div>
                    <div className="secondary-dropdown-menu-item">
                      <p className="secondary-dropdown-menu-item-text">
                        Option II
                      </p>
                      <i className="icon-check"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="widget-body">
          <div
            className={`value-box ${addNew ? 'add-new modal-trigger' : ''}`}
            target-modal={addNew && 'newQuestionModal'}
          >
            <div className="value-box-item">
              <div className="value-box-item-main">
                {noData ? (
                  <p className={`value-box-item-main-amount no-data-title`}>
                    {t('common:Nodatayet')}
                  </p>
                ) : (
                    <p className="value-box-item-main-amount">
                      {!addNew && data.average ? (
                        Math.round(data.average * 10) / 10
                      ) : (
                          <i className="icon-plus"></i>
                        )}
                    </p>
                  )}

                {!noData && (
                  <span
                    className={`arrow ${data.change && data.change > 0
                        ? 'arrow-up'
                        : data.change && data.change < 0
                          ? 'arrow-down'
                          : ''
                      }`}
                  >
                    <i className="icon-arrow-right"></i>
                  </span>
                )}
              </div>
              <p className="value-box-item-text">{data.question}</p>
            </div>
          </div>

          {/* {
          noData ? (
            <div className="value-box-placeholder">
              <p className="value-box-placeholder-title">No data yet</p>
              <p className="value-box-placeholder-text">How do people feel working in this team</p>

            </div>
          ) : (
              <div className={`value-box ${addNew && 'add-new'}`}>
                <div className="value-box-item">
                  <div className="value-box-item-main">
                    <p className="value-box-item-main-amount">
                      {!addNew ? data.average : <i className="icon-plus"></i>}
                    </p>
                    <span className={`arrow ${data.change && data.change > 0 ? 'arrow-up' : data.change && data.change < 0 ? 'arrow-down' : ''}`}>
                      <i className="icon-arrow-right"></i>
                    </span>
                  </div>
                  <p className="value-box-item-text">{data.question}</p>
                </div>
              </div>
            )
        } */}
        </div>
      </div>
    </>
  )
}

export default ValueBox
