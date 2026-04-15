// DOM
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");

const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");

const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");

const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");

const progressBar = document.getElementById("progress");

// Questions
const questions = [
  {
    question: "Capital of Pakistan?",
    answers: [
      { text: "Karachi", correct: false },
      { text: "Islamabad", correct: true },
      { text: "Lahore", correct: false },
      { text: "Other", correct: false }
    ]
  },
  
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
      { text: "Paris", correct: true },
      { text: "Rome", correct: false }
    ]
  },
  {
    question: "Which is the largest ocean in the world?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
      { text: "Arctic Ocean", correct: false }
    ]
  },
  {
    question: "Who is known as the Father of Computers?",
    answers: [
      { text: "Albert Einstein", correct: false },
      { text: "Charles Babbage", correct: true },
      { text: "Isaac Newton", correct: false },
      { text: "Alan Turing", correct: false }
    ]
  },
  {
    question: "Which country is famous for the Great Wall?",
    answers: [
      { text: "India", correct: false },
      { text: "China", correct: true },
      { text: "Japan", correct: false },
      { text: "Korea", correct: false }
    ]
  },
  {
    question: "What is the largest planet in our solar system?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: false },
      { text: "Jupiter", correct: true },
      { text: "Saturn", correct: false }
    ]
  },
  {
    question: "Which continent is known as the Dark Continent?",
    answers: [
      { text: "Asia", correct: false },
      { text: "Africa", correct: true },
      { text: "Europe", correct: false },
      { text: "Australia", correct: false }
    ]
  },
  {
    question: "Who discovered gravity?",
    answers: [
      { text: "Newton", correct: true },
      { text: "Galileo", correct: false },
      { text: "Einstein", correct: false },
      { text: "Tesla", correct: false }
    ]
  },
  {
    question: "Which is the longest river in the world?",
    answers: [
      { text: "Amazon River", correct: false },
      { text: "Nile River", correct: true },
      { text: "Yangtze River", correct: false },
      { text: "Mississippi River", correct: false }
    ]
  },
  {
    question: "What is the national animal of Pakistan?",
    answers: [
      { text: "Lion", correct: false },
      { text: "Markhor", correct: true },
      { text: "Tiger", correct: false },
      { text: "Leopard", correct: false }
    ]
  },
  {
    question: "Which country hosted the FIFA World Cup 2022?",
    answers: [
      { text: "Brazil", correct: false },
      { text: "Russia", correct: false },
      { text: "Qatar", correct: true },
      { text: "Germany", correct: false }
    ]
  },
  {
    question: "What is the chemical symbol for water?",
    answers: [
      { text: "H2O", correct: true },
      { text: "O2", correct: false },
      { text: "CO2", correct: false },
      { text: "NaCl", correct: false }
    ]
  },
  {
    question: "What is the capital of Japan?",
    answers: [
      { text: "Beijing", correct: false },
      { text: "Tokyo", correct: true },
      { text: "Seoul", correct: false },
      { text: "Bangkok", correct: false }
    ]
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false }
    ]
  },
  {
    question: "Who is the author of 'Harry Potter' series?",
    answers: [
      { text: "J.R.R. Tolkien", correct: false },
      { text: "J.K. Rowling", correct: true },
      { text: "George R.R. Martin", correct: false },
      { text: "Stephen King", correct: false }
    ]
  }

];



// State
let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

// Init
totalQuestionsSpan.textContent = questions.length;
maxScoreSpan.textContent = questions.length;

// Events
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", startQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = score;

  startScreen.classList.remove("active");
  resultScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  answerDisabled = false;

  const current = questions[currentQuestionIndex];
  questionText.textContent = current.question;
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  progressBar.style.width =
    ((currentQuestionIndex + 1) / questions.length) * 100 + "%";

  answersContainer.innerHTML = "";

  current.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.textContent = answer.text;
    btn.classList.add("answer-btn");

    btn.dataset.correct = answer.correct;
    btn.onclick = selectAnswer;

    answersContainer.appendChild(btn);
  });
}

function selectAnswer(e) {
  if (answerDisabled) return;
  answerDisabled = true;

  const selected = e.target;
  const correct = selected.dataset.correct === "true";

  Array.from(answersContainer.children).forEach(btn => {
    btn.classList.add(
      btn.dataset.correct === "true" ? "correct" : "incorrect"
    );
  });

  if (correct) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

function showResult() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percent = (score / questions.length) * 100;

  if (percent === 100) resultMessage.textContent = "Excellent!";
  else if (percent >= 80) resultMessage.textContent = "Great!";
  else if (percent >= 50) resultMessage.textContent = "Good!";
  else resultMessage.textContent = "Try Again!";
}