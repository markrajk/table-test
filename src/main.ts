//MODAL

export const modalTrigger = () => {
  let modalTriggers: NodeListOf<Element> = document.querySelectorAll(
    '.modal-trigger'
  )
  let modalCloseBtns = document.querySelectorAll('[close-modal]')
  

  modalTriggers.forEach((e) => {
    e.addEventListener('click', function () {
      let modal: HTMLElement | null = document.getElementById(
        `${e.getAttribute('target-modal')}`
      )
      if (modal) {
        modal.classList.add('open')
      }
    })
  })

  modalTriggers.forEach((e) => {
    e.addEventListener('click', function () {
      document.querySelectorAll('.custom-modal-wrapper.open').forEach((e) => {
        e.id !== 'modalCard' && e.classList.remove('open')
      })
      let modal: HTMLElement | null = document.getElementById(
        `${e.getAttribute('target-modal')}`
      )
      if (modal) {
        modal.classList.add('open')
      }
    })
  })

  modalCloseBtns.forEach((e) => {
    e.addEventListener('click', function () {
      let modal: HTMLElement | null = document.getElementById(
        `${e.getAttribute('close-modal')}`
      )
      if (modal) {
        modal.classList.remove('open')
      }
    })
  })
}

//SEND FEEDBACK

export const sendFeedbackScript = () => {
  let sendFeedbackBtn = document.querySelectorAll('.send-feedback-modal')

  if (sendFeedbackBtn) {
    sendFeedbackBtn.forEach((e) => {
      e.addEventListener('click', function () {
        if (e.parentElement) {
          //@ts-ignore
          let modal = this.parentElement.parentElement
          if (modal) {
            let body = modal.querySelector('.custom-modal-body')
            let successMessage = modal.querySelector('.success-message')
            if (successMessage && successMessage.style) {
              successMessage.style.maxHeight = `${
                body.clientHeight /
                parseFloat(getComputedStyle(document.documentElement).fontSize)
              }em`
              modal.classList.add('success')
            }
          }
        }
      })
    })
  }
}

//accordion
export const accordionTrigger = () => {
  let accordionTriggers = document.querySelectorAll('.accordion-card-trigger')

  accordionTriggers.forEach((e) => {
    e.addEventListener('click', function () {
      document.querySelectorAll('.custom-accordion-card').forEach((e) => {
        if (
          !e.classList.contains(
            e?.getAttribute('accordion-trigger-target') ||
              'should not exist abcd'
          )
        ) {
          e.classList.remove('open')
        }
      })
      document
        .querySelectorAll(`.${e.getAttribute('accordion-trigger-target')}`)
        .forEach((e) => {
          e.classList.toggle('open')
        })
    })
  })
}

export const themeChangeScript = () => {
  let themeColorItems = document.querySelectorAll('.theme-colors-item')

  themeColorItems.forEach((e) => {
    e.addEventListener('click', function () {
      themeColorItems.forEach((x) => {
        x.classList.remove('selected')
      })

      document.querySelector('.header-main')?.classList.remove('white-logo')

      e?.classList.add('selected')
      if (e?.classList.contains('white')) {
        document.querySelector('.header-main')?.classList.add('white-logo')
      }
      document.documentElement.style.setProperty(
        '--theme-color-primary',
        e?.getAttribute('theme-color')
      )
    })
  })
}
