//1-when start button is clicked, first question and answers appear and timer starts.

let timerEl = document.querySelector('.timer');
let startButtonEl = document.querySelector('.start-button');
let questionBox = document.querySelector('.question-box');
let answerBox = document.querySelector('.answer-box');

let isWin = false;
let number = 0;
let secondLeft = 60;
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



function startQuiz(){
  console.log('Quiz started!');
  startButtonEl.disabled = true
  startTimer();
  displayQuestion();
}

function startTimer(){
  console.log('Timer started');
  let timerInterval = setInterval(() => {
    secondLeft--;
    timerEl.textContent = secondLeft;
    if(secondLeft >= 0){
      if(isWin && secondLeft > 0){
        clearInterval(timerInterval); 
        winGame();
      }
    }

    if(secondLeft == 0){
      clearInterval(timerInterval);
      loseGame();
    }
      
  }, 1000);
};




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
  //number++;
  //console.log('number: '+ number);
  //if(number >= questions.length){
   // winGame();
  //}
  

}

function winGame(){
  console.log('You won!!');
  questionBox.textContent = 'You Won!!'

}

function loseGame(){  
  console.log('you lost!!');
  questionBox.textContent = 'Sorry better luck next time!'

}

function checkWin(){
  isWin = true
  
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
    }

  }else{
    checkWin();
  }



 
});



//1-a create timer | done
//1-b link button | done
//1-c create question object | done
//1-d display question and answers | done


//2-when answer is chosen, check if correct, then display next question
//2-a eventlistener answer
//2-b is correct function
//2-c display next question

//3-when last quesiton answered or timer hit 0, end game and display result
//3-a more question? if not, end game
//3-b display result 

//4-save result in local storage