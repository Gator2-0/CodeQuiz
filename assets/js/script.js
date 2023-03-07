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

//questions section
const questions = [{
  question: 'What does CSS stand for?',
  answers: ['Cascading style sheet','Cascading Styling sheet','Consecutive Style Sheet','Consecutive styling sheet'],
  correctAnswer: 'Cascading style sheet'

},
{
  question: 'What does HTML stand for?',
  answers: ['Hyper Text Markup Language','Hyper textualise Meaningful Language','Hyper Text Made Up Language','None of the above'],
  correctAnswer: 'Hyper Text Markup Language'

},
{
  question: 'Complete the following: function = myFunction__{}',
  answers: ['()','{}','[]','\'\''],
  correctAnswer: '()'

},
{
  question: 'What tag represents an Unordered List?',
  answers: ['<ul>','<li>','<ol>','<dl>'],
  correctAnswer: '<ul>'

},
{
  question: 'What is the latest version of HTML?',
  answers: ['3','4','5','6'],
  correctAnswer: '5'

}


]
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

    if(secondLeft <= 0){
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

//when the quiz finishes, display the score and asks for username to save in highscores.
function displayScore(){
  clearScreen();
  if(secondLeft < 0){
    secondLeft = 0;
  }
  questionBox.textContent = 'Your score is ' + secondLeft;
  
  let input = document.createElement('input');
  input.setAttribute('class', 'input');
  input.setAttribute('placeholder','Type your name here');

  let saveButton = document.createElement('button');
  saveButton.setAttribute('class','save-button');
  
  saveButton.textContent = 'Save';

  section.appendChild(input);
  section.appendChild(saveButton);

  saveButton.addEventListener('click', function(){
    //a space has been added to void problem with the getScore(). 
    //the function separate the score from name using .split('---'), the extra space protect the split.
    let user = {
      name: input.value + ' ',
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

//remove the answers of the last question from the screen
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