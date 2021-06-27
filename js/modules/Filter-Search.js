export function submit(evt) {
    evt.preventDefault();
 }
 
export function filter(evt) {
    evt.preventDefault();
    let input = document.querySelector('#site-search');
    let inputValue = input.value.toUpperCase();
    let cards = document.querySelectorAll('.cardItem');
 
 
 
    cards.forEach(
       function getMatch(info) {
          let heading = info.querySelector('span');
          let headingContent = heading.innerHTML.toUpperCase();
          
 
          if (headingContent.includes(inputValue)) {
             info.classList.add('show');
             info.classList.remove('hide');
          }
          else {
             info.classList.add('hide');
             info.classList.remove('show');
          }
       }
    )
 }
 
export function autoReset() {
    let input = document.querySelector('#site-search');
    let cards = document.querySelectorAll('.cardItem');
 
    cards.forEach(
       function getMatch(info) {
          if (input.value == null, input.value == "") {
             info.classList.remove('show');
             info.classList.remove('show');
          }
          else {
             return;
          }
       }
    )
 }