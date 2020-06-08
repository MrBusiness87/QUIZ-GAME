const start = document.getElementById("start");
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

let questions = [
    {
        question : "What does HTML stand for?",
        imgSrc : "./Assets/html.png",
        choiceA : "Correct",
        choiceB : "Wrong",
        choiceC : "Wrong",
        correct : "A"
    },{
        question : "What does CSS stand for?",
        imgSrc : "./Assets/css.png",
        choiceA : "Wrong",
        choiceB : "Correct",
        choiceC : "Wrong",
        correct : "B"
    },{
        question : "What does JS stand for?",
        imgSrc : "./Assets/js.png",
        choiceA : "Wrong",
        choiceB : "Wrong",
        choiceC : "Correct",
        correct : "C"
    }
];

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10;
const gaugeWidth = 150;
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000);
}

function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        score++;
        answerIsCorrect();
    }else{
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        clearInterval(TIMER);
        scoreRender();
    }
}

function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "green";
}

function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "red";
}

function scoreRender(){
    scoreDiv.style.display = "block";
    
    const scorePercent = Math.round(100 * score/questions.length);

    let img = (scorePercent >= 80) ? "./Assets/5.png" :
              (scorePercent >= 60) ? "./Assets/4.png" :
              (scorePercent >= 40) ? "./Assets/3.png" :
              (scorePercent >= 20) ? "./Assets/2.png" :
              "./Assets/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePercent +"%</p>";
}