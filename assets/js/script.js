//1-when start button is clicked, first question and answers appear and timer starts.

let timerEl = document.querySelector('.timer');
let startButtonEl = document.querySelector('.start-button');
let questionBox = document.querySelector('.question-box');
let answerBox = document.querySelector('.answer-box');
let section = document.querySelector('.display-section');
let highBox = document.querySelector('.high-box');

let isFinished = false;
let number = 0;
let secondLeft = 60;
let highscore = [];
let storedHighscore = [];
let li1 = document.createElement("li");
let li2 = document.createElement("li");
let li3 = document.createElement("li");
let li4 = document.createElement("li");

const question1 = {
  question: 'What does CSS stand for?',
  answers: ['Cascading style sheet','Cascading Styling sheet','something else','something else'],
  correctAnswer: 'Cascading style sheet'
};

const question2 = {
  question: 'What does HTML stand for?',
  answers: ['Hyper Text Markup Language','Hyper textualise Meaningful Language','something else','something else'],
  correctAnswer: 'Hyper Text Markup Language'
};


const questions = [question1,question2];
let currentQuestion = questions[0];


startButtonEl.addEventListener('click', startQuiz);


//start the quiz
function startQuiz(){
  console.log('Quiz started!');
  startButtonEl.disabled = true
  startTimer();
  displayQuestion();
}

//handle the timer, which also work as score
function startTimer(){
  console.log('Timer started');
  let timerInterval = setInterval(() => {
    secondLeft--;
    timerEl.textContent = secondLeft;
    if(secondLeft >= 0){
      if(isFinished && secondLeft > 0){
        clearInterval(timerInterval); 
        displayScore();
      }
    }

    if(secondLeft == 0){
      clearInterval(timerInterval);
      displayScore();
    }
      
  }, 1000);
};



//Display the question and answers on the screen
function displayQuestion(){
   
  questionBox.textContent = questions[number].question;
    
  li1.textContent = questions[number].answers[0];
  answerBox.appendChild(li1);
  li2.textContent = questions[number].answers[1];
  answerBox.appendChild(li2);
  li3.textContent = questions[number].answers[2];
  answerBox.appendChild(li3);
  li4.textContent = questions[number].answers[3];
  answerBox.appendChild(li4);

  currentQuestion = questions[number];
  console.log('current question is '+ currentQuestion.question);
  
}

function endGame(){
  isFinished = true
}

function winGame(){
  console.log('You won!!');
  questionBox.textContent = 'You Won!!'

}

function loseGame(){  
  console.log('you lost!!');
  questionBox.textContent = 'Sorry better luck next time!'

}

function displayScore(){
  clearScreen();
  questionBox.textContent = 'Your score is ' + secondLeft;
  
  let input = document.createElement('input');
  input.setAttribute('class', 'input');

  let saveButton = document.createElement('button');
  saveButton.textContent = 'Save'

  section.appendChild(input);
  section.appendChild(saveButton);

  saveButton.addEventListener('click', function(){

    let user = {
      name: input.value,
      score: secondLeft
    }

    storedHighscore = JSON.parse(localStorage.getItem('Highscores'));
    if(storedHighscore == null){
      storedHighscore = [];
    }
    storedHighscore.push(user);
    
    localStorage.setItem('Highscores', JSON.stringify(storedHighscore));
    
    window.location.href = './highscores.html'
    console.log(document.URL());
    
  });
  

}

function displayHighscores(){
  storedHighscore = JSON.parse(localStorage.getItem('Highscores'));
    if(storedHighscore == null){
      storedHighscore = [];
    }
  
  console.log('From the displayHighscores(). length is ' + storedHighscore.length);
  for (let index = 0; index < storedHighscore.length; index++) {
    
    let li = document.createElement('li');
    li.textContent = storedHighscore[index].name + '---' + storedHighscore[index].score;
    highBox.appendChild(li);
    
  }
}

function clearScreen(){
  while(answerBox.firstChild){
    answerBox.removeChild(answerBox.firstChild)
  }
}


answerBox.addEventListener('click', function(event){
  let chosenAnswer = event.target.textContent;
  number++;
  if(number < questions.length){
    if(chosenAnswer === currentQuestion.correctAnswer){
    
      console.log('correct answer was chosen.');
      displayQuestion();
  
    }else{
      displayQuestion();
      console.log('wrong answer was chosen');
      secondLeft -= 10;
    }

  }else{
    if(chosenAnswer === currentQuestion.correctAnswer){
      console.log('correct answer was chosen.2');
      endGame();
      
  
    }else{
      console.log('wrong answer was chosen');
      secondLeft -= 10;
      endGame();
    }
  }

});


//1-a create timer | done
//1-b link button | done
//1-c create question object | done
//1-d display question and answers | done


//2-when answer is chosen, check if correct, then display next question | done
//2-a eventlistener answer |done
//2-b is correct function |done
//2-c display next question | done

//3-when last quesiton answered or timer hit 0, end game and display result |done
//3-a more question? if not, end game | done
//3-b display result | done

//4-save result in local storage