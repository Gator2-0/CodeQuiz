let highBox = document.querySelector('.high-box');

//display the highscores stored in the locale storage.
function displayHighscores(){
  storedHighscore = JSON.parse(localStorage.getItem('Highscores'));
  
  if(storedHighscore == null){
    console.log('there are no records in the local storage.')
    storedHighscore = [];
    console.log(highBox.childElementCount);
  }else{
    console.log('From the displayHighscores(). length is ' + storedHighscore.length);
    for (let index = 0; index < storedHighscore.length; index++) {  
      let li = document.createElement('li');
      li.textContent = storedHighscore[index].name + '---' + storedHighscore[index].score;
      highBox.appendChild(li);
    }
  } 
}

function sortList() {
  var list, i, switching, scoreLine, shouldSwitch;
  //list = document.getElementById("id01");
  switching = true;
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    scoreLine = highBox.getElementsByTagName("li");
    console.log('there are '+scoreLine.length +' entries in the highscore list.');
    // Loop through all list items:
    for (i = 0; i < (scoreLine.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Check if the next item should
      switch place with the current item: */
      console.log(getscore(scoreLine[i].textContent));
      if (getscore(scoreLine[i].textContent) < getscore(scoreLine[i + 1].textContent)) {
        /* If next item is alphabetically lower than current item,
        mark as a switch and break the loop: */
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark the switch as done: */
      scoreLine[i].parentNode.insertBefore(scoreLine[i + 1], scoreLine[i]);
      switching = true;
    }
  }
}

//used to get the score from the string oh highscores. (remove the name and ---)
function getscore(text){
  const liToArray = text.split('---');
  let score = liToArray[1];
  return score;
}

displayHighscores();
sortList();

//create the button to clear all highscores
let clearButton = document.createElement('button');
clearButton.textContent = 'Clear highscores';
highBox.appendChild(clearButton);

clearButton.addEventListener('click', function(){
  localStorage.clear();
  location.reload();
})
