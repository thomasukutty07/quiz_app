const questions = [
    {
        question :"which is the largest animal in the world",
        answers : [
            {text:"Shark",correct:false},
            {text:"Blue whale",correct:true},
            {text:"Elephant",correct:false},
            {text:"Giraffe",correct:false},
        ]
    },
    {
        question :"which is the smallest country in the world",
        answers : [
            {text:"Bhutan",correct:false},
            {text:"Sri lanka",correct:false},
            {text:"Nepal",correct:false},
            {text:"Varican city",correct:true},
        ]
    },
    {
        question :"which is the largest desert in the world",
        answers : [
            {text:"Kalahari",correct:false},
            {text:"Gobi",correct:false},
            {text:"Shara",correct:false},
            {text:"Antartica",correct:true},
        ]
    },
    {
        question:"which is the smallest continent in the world",
        answers : [
            {text:"Asia",correct:false},
            {text:"Africa",correct:false},
            {text:"Austraila",correct:true},
            {text:"Artic",correct:false}
        ]
    }
]

const questionElement = document.getElementById("question")
const answerButtons = document.getElementById("answer-btn")
const nextButton = document.getElementById("next-btn")

let currentQuestionIndex = 0;
let score = 0;
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next'
    showQuesiton();
}

function showQuesiton(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". "+currentQuestion.question;

    currentQuestion.answers.forEach(result =>{
        const button = document.createElement("button");
        button.innerHTML = result.text;
        button.classList.add('btn')
        answerButtons.appendChild(button)
        if(result.correct){
            button.dataset.correct = result.correct
        }
        button.addEventListener("click",selectAnswer)

    })
      
}
function resetState(){
    nextButton.style.display = 'none'
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}
function selectAnswer(e){
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === 'true'
    if(isCorrect){
        selectedBtn.classList.add("correct")
        score++
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(keys =>{
    if(keys.dataset.correct === 'true'){
        keys.classList.add("correct")
    }
    keys.disabled = 'true'
    })
    nextButton.style.display = 'block'
}

function showScore(){
    resetState()
    questionElement.innerHTML = `Your scored ${score} out of ${questions.length}`
    nextButton.innerHTML = 'Play Again'
    nextButton.style.display = 'block'
}

function handleNextButton(){
  currentQuestionIndex++
  if(currentQuestionIndex < questions.length){
    showQuesiton();
  }else{
    showScore();
  }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton()
    }else{
        startQuiz()
    }
})
startQuiz()