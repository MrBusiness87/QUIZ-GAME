const start = document.getElementById("start");
const h1 = document.getElementById("h1");
const h2 = document.getElementById("h2");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

let questions = [{
    question: "What is the purpose of HTML?",
    imgSrc: "./Assets/html.png",
    choiceA: "Format and Display Content in Web Browser.",
    choiceB: "Create Actions on Web Page.",
    choiceC: "Changes Text on Web Page only.",
    correct: "A",
  },
  {
    question: "What are these:<> called?",
    imgSrc: "./Assets/css.png",
    choiceA: "Targets",
    choiceB: "Tags",
    choiceC: "Corners",
    correct: "B",
  },
  {
    question: "What are the three main file types for coding a page?",
    imgSrc: "./Assets/java.png",
    choiceA: "HIJK/CDF/JK",
    choiceB: "HTTP/C++/JK",
    choiceC: "HTML/CSS/JS",
    correct: "C",
  },
  {
    question: "What is the purpose of CSS?",
    imgSrc: "./Assets/css.png",
    choiceA: "To provide code for creating another page.",
    choiceB: "To provide information for styling a page.",
    choiceC: "To create pictures.",
    correct: "B",
  },
  {
    question: "What is the difference between JS and HTML files?",
    imgSrc: "./Assets/java.png",
    choiceA: "JS describes how an element is placed, HTML is used for writing text.",
    choiceB: "JS is for coffee, HTML is for your eggs.",
    choiceC: "JS is the action of the page, HTML is the basic layout.",
    correct: "C",
  },
];

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 120;
const quizTime = 120;
const gaugeWidth = 120;
const gaugeUnit = gaugeWidth / quizTime;
let TIMER;
let score = 0;

function renderQuestion() {
  let q = questions[runningQuestion];

  question.innerHTML = "<p>" + q.question + "</p>";
  qImg.innerHTML = "<img src=" + q.imgSrc + ">";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click", startQuiz);

function startQuiz() {
  h1.style.display = "none";
  h2.style.display = "none";
  start.style.display = "none";
  renderQuestion();
  quiz.style.display = "block";
  renderProgress();
  renderCounter();
  TIMER = setInterval(renderCounter, 1000);
}

function renderProgress() {
  for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
    progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
  }
}

function renderCounter() {
  if (count >= 0) {
    counter.innerHTML = count;
    timeGauge.style.width = count * gaugeUnit + "px";
    count--;
  } else {
    answerIsWrong();
    if (runningQuestion < lastQuestion) {
      runningQuestion++;
      renderQuestion();
    } else {
      clearInterval(TIMER);
      scoreRender();
    }
  }
}

function checkAnswer(answer) {
  if (answer == questions[runningQuestion].correct) {
    score++;
    answerIsCorrect();
  } else {
    count -= 5;
    renderCounter;
    answerIsWrong();
  }
  if (runningQuestion < lastQuestion) {
    runningQuestion++;
    renderQuestion();
  } else {
    clearInterval(TIMER);
    scoreRender();
  }
}

function answerIsCorrect() {
  document.getElementById(runningQuestion).style.backgroundColor = "green";
}

function answerIsWrong() {
  document.getElementById(runningQuestion).style.backgroundColor = "red";
}

function scoreRender() {
  scoreDiv.style.display = "block";

  const scorePercent = Math.round((100 * score) / questions.length);

  let img =
    scorePercent >= 80 ?
    "./Assets/5.png" :
    scorePercent >= 60 ?
    "./Assets/4.png" :
    scorePercent >= 40 ?
    "./Assets/3.png" :
    scorePercent >= 20 ?
    "./Assets/2.png" :
    "./Assets/1.png";

  scoreDiv.innerHTML = "<img src=" + img + ">";
  scoreDiv.innerHTML += "<p>" + scorePercent + "%</p>";
  // createElement.block = "save score";
}

// const username = 