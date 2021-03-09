import React, { useState } from 'react'


interface Props {
  onConfirm(): void
  onCancel(): void
  updateUserLayout(setting: any): void
}
const WidgetPlacementModal = (props: Props) => {
  const [auto, setAuto] = useState(true)
  const { onConfirm, onCancel, updateUserLayout } = props
  const handleClick = (bool: boolean) => {
    setAuto(bool)
  }
  
  const [ checked, setCheck ] = useState(false)

  

  return (
    <div className="custom-modal-wrapper" id="widgetPlacementModal">
      <div className="custom-modal">
        <div className="custom-modal-body">
          <div
            className="custom-modal-close"
            close-modal="widgetPlacementModal"
          >
            <i className="icon-close"></i>
          </div>
          <p className="custom-modal-body-title">
            Hey, we see you added new questions
          </p>
          <p className="custom-modal-body-text">
            We will automatically add new charts for your new questions. How
            should we add them for you?
          </p>

          <p className="custom-modal-body-label">Select option</p>

          <div className="custom-modal-body-buttons">
            <button
              className={`button ${auto && 'active'}`}
              onClick={() => handleClick(true)}
            >
              Auto layout
            </button>
            <button
              className={`button ${!auto && 'active'}`}
              onClick={() => handleClick(false)}
            >
              Manual layout
            </button>
          </div>

          <p
            className="custom-modal-body-info-text"
            style={{ display: auto ? 'none' : '' }}
          >
            This option generates automatically a clean new layout.<br></br>
            In case you have customized the layout, customizations will be gone.
          </p>

          <p
            className="custom-modal-body-info-text"
            style={{ display: !auto ? 'none' : '' }}
          >
            This option will add the new charts down on the page and you
            <br></br>
            can position them yourself in the right position.
          </p>

          <div className="custom-modal-body-check">
            <div className="pretty p-default p-curve">
              <input type="checkbox" checked={checked} onClick={() => setCheck(!checked)} />
              <div className="state p-success">
                <label>&nbsp;</label>
              </div>
            </div>
            <p className="custom-modal-body-check-text">
              Don’t show this question again
            </p>
          </div>
        </div>

        <div className="custom-modal-footer">
          <button className="button button-green-primary" onClick={() => {
            if (auto) {
              onConfirm()
              document.getElementById('widgetPlacementModal')?.classList.remove('open')
              if (checked) {
                updateUserLayout({
                  autoAdjust: auto ? 'yes' : 'no'
                })
                
              }
              onCancel()
            } else {
              document.getElementById('widgetPlacementModal')?.classList.remove('open')
              onCancel()
            }
          }}>Confirm</button>
          <button className="button button-light-gray" onClick={() => {
            document.getElementById('widgetPlacementModal')?.classList.remove('open')
            onConfirm()
            onCancel()
          }} >Cancel</button>
        </div>
      </div>
      <div className="custom-modal-backdrop"></div>
    </div>
  )
}

export default WidgetPlacementModal
