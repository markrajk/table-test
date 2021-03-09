//TABLE CARD FUNCTION

export const backgroundCardHeight = () => {/* 
  let fakeCard: any = document.querySelector('.fake-card')
  let tableWrapperBody: any = document.querySelector(
    '.custom-table-wrapper-body'
  )
  let tableWrapperBodyCustomTable: any = document.querySelector(
    '.custom-table-wrapper-body .custom-table'
  )

  if (
    fakeCard &&
    (fakeCard.classList.contains('fake-card-team-settings-members') ||
      fakeCard.classList.contains('fake-card-team-settings-lead') ||
      fakeCard.classList.contains('fake-card-team-settings-viewing-rights') ||
      fakeCard.classList.contains('fake-card-team-settings-admin-rights'))
  ) {
    fakeCard.style.height = `calc(${tableWrapperBodyCustomTable.clientHeight}px + 6.9em + 4em + 3.4em + 3.5em)`
  } else {
    fakeCard.style.height = `calc(${tableWrapperBodyCustomTable.clientHeight}px + 12.453em + 2.2em + 3.4em + 3.5em)`
  }

  
  if (
    tableWrapperBodyCustomTable.scrollHeight >= tableWrapperBody.clientHeight
  ) {
    //console.log('Add border');
    tableWrapperBody.classList.add('with-border')
    tableWrapperBodyCustomTable.classList.remove('with-border')
  } else {
    tableWrapperBody.classList.remove('with-border')
    tableWrapperBodyCustomTable.classList.add('with-border')
  } */
}

/*
 window.addEventListener('resize', function() {
    //console.log(tableWrapperBodyCustomTable.clientHeight);
    backgroundCardHeight();
  })
*/

// TOGGLE INPUT ROW
export const toggleInputRow = () => {
  let inputRowToggle: any = document.querySelector('.toggle-input-row')
  let inputRow: any = document.querySelector('.custom-table-input-row')

  if (inputRow) {
    inputRowToggle.addEventListener('click', function () {
      inputRow.classList.toggle('open')
      backgroundCardHeight()

      if (inputRow.classList.contains('open')) {
        let objDiv: any = document.querySelector('.custom-table-wrapper-body')
        objDiv.scrollTop = objDiv.scrollHeight
      }
    })
  }
}

//NEW TALBE DROPDOWN POSITION

export const toggleTableDropDown = () => {
  let tableTriggers = document.querySelectorAll(
    '.custom-table tbody .custom-dropdown-trigger'
  )
  console.log(tableTriggers)

  tableTriggers.forEach((e) => {
    e.addEventListener('click', function () {
      const x = window.scrollY + e.getBoundingClientRect().top // Y
      const y = window.scrollX + e.getBoundingClientRect().left // X

      if (window.innerHeight < x + 250) {
        console.log('TOP')
        e.classList.add('top')
      } else {
        e.classList.remove('top')
      }
    })
  })
}

export const rotateTableArrows = () => {
  //ROTATE TABLE ARROWS
  let tableHeaderTriggers = document.querySelectorAll(
    '.custom-table-head .custom-table-row th'
  )

  tableHeaderTriggers.forEach((e) => {
    e.addEventListener('click', function () {
      e.classList.toggle('up')
    })
  })
}

export const accordion = () => {
  let accordionTriggers = document.querySelectorAll('.accordion-card-trigger')

  accordionTriggers.forEach((e) => {
    e.addEventListener('click', function () {
      document
        .querySelectorAll(`.${e.getAttribute('accordion-trigger-target')}`)
        .forEach((e) => {
          e.classList.toggle('open')
        })
    })
  })
}
