//TABLE CARD FUNCTION
let fakeCard = document.querySelector('.fake-card');
let tableWrapperBody = document.querySelector('.custom-table-wrapper-body');
let tableWrapperBodyCustomTable = document.querySelector('.custom-table-wrapper-body .custom-table');





function backgroundCardHeight() {
/*   if (fakeCard.classList.contains('fake-card-team-settings-members') || fakeCard.classList.contains('fake-card-team-settings-lead') || fakeCard.classList.contains('fake-card-team-settings-viewing-rights') || fakeCard.classList.contains('fake-card-team-settings-admin-rights')) {
    fakeCard.style.height = `calc(${tableWrapperBodyCustomTable.clientHeight}px + 6.9em + 4em + 3.4em + 3.5em)`;
  } else {
    fakeCard.style.height = `calc(${tableWrapperBodyCustomTable.clientHeight}px + 12.453em + 2.2em + 3.4em + 3.5em)`;
  }

  
  if (tableWrapperBodyCustomTable.scrollHeight >= tableWrapperBody.clientHeight) {
    
    tableWrapperBody.classList.add('with-border');
    tableWrapperBodyCustomTable.classList.remove('with-border');
  } else {
    tableWrapperBody.classList.remove('with-border');
    tableWrapperBodyCustomTable.classList.add('with-border');
  } */
}

backgroundCardHeight();

window.addEventListener('resize', function () {
  //console.log(tableWrapperBodyCustomTable.clientHeight);
  backgroundCardHeight();
})

// TOGGLE INPUT ROW
let inputRowToggle = document.querySelector(".toggle-input-row");
let inputRow = document.querySelector(".custom-table-input-row");

if (inputRow) {
  inputRowToggle.addEventListener("click", function () {

    inputRow.classList.toggle("open");
    backgroundCardHeight();

    //  if(inputRow.classList.contains('open')) {
    //    let objDiv = document.querySelector('.custom-table-wrapper-body');
    //    objDiv.scrollTop = objDiv.scrollHeight;
    //  }
  });
}

//NEW TALBE DROPDOWN POSITION
let tableTriggers = document.querySelectorAll('.custom-table tbody .custom-dropdown-trigger')


tableTriggers.forEach(e => {
  e.addEventListener('click', function () {
    const x = window.scrollY + this.getBoundingClientRect().top // Y
    const y = window.scrollX + this.getBoundingClientRect().left // X

    if (window.innerHeight < x + 250) {
      
      this.classList.add('top');
    } else {
      this.classList.remove('top');
    }
  })
})


//ROTATE TABLE ARROWS
let tableHeaderTriggers = document.querySelectorAll('.custom-table-head .custom-table-row th');

tableHeaderTriggers.forEach(e => {
  e.addEventListener('click', function () {
    this.classList.toggle('up');
  })
})