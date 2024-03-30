const questions = [
    {
        question:"Which of these is used to allocate memory for an object?",
        answers: [
            {text:"extends",correct: false},
            {text:"impliments",correct: false},
            {text:"new",correct: true},
            {text:"heap",correct: false},

        ]
    },
    {
        question:"Which of the following is a superclass of every class in Java?",
        answers: [
            {text:"ArrayList",correct: false},
            {text:"Abstract class",correct: false},
            {text:"Object class",correct: true},
            {text:"String  class",correct: false},
        ]
    },
    {
        question:"Which one of the following is not an access modifier?",
        answers: [
            {text:"Protected",correct: false},
            {text:"Void",correct: true},
            {text:"Public",correct: false},
            {text:"Private",correct: false},
        ]
    },
    {
        question:"What ois the numerical range of a byte data type in Java?",
        answers: [
            {text:"0 to 256",correct: false},
            {text:"-128 to 127",correct: true},
            {text:"128 to -127",correct: false},
            {text:"0 to 12345",correct: false},
        ]
    },
    {
        question:"Who developed Java?",
        answers: [
            {text:"James Gosling",correct: true},
            {text:"Adam Bien",correct: false},
            {text:"Brian Goetz",correct: false},
            {text:"Mark Reinhold",correct: false},
        ]
    },
    {
        question:"Which component is used to compile,debug & execute the java programs?",
        answers: [
            {text:"JRE",correct: false},
            {text:"JIT",correct: false},
            {text:"JDK",correct: true},
            {text:"JVM",correct: false},
        ]
    },
    {
        question:"What is the extension of java code files?",
        answers: [
            {text:".js",correct: false},
            {text:".txt",correct: false},
            {text:".class",correct: false},
            {text:".java",correct: true},
        ]
    },
    {
        question:"What is the extension of compiled java classes?",
        answers: [
            {text:".txt",correct: false},
            {text:".js",correct: false},
            {text:".class",correct: true},
            {text:".java",correct: false},
        ]
    },
    {
        question:"Which exception is thrown when java is out of memory?",
        answers: [
            {text:"MemoryError",correct: false},
            {text:"OutOfMemoryError",correct: true},
            {text:"MemoryFullException",correct: false},
            {text:"MemoryOutOfBoundException",correct: false},
        ]
    },
    {
        question:"Which of the following is selection statement in Java?",
        answers: [
            {text:"break",correct: false},
            {text:"continue",correct: false},
            {text:"for",correct: false},
            {text:"if",correct: true},
        ]
    }

];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;

    });
    nextButton.style.display = "block";

}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})


startQuiz();