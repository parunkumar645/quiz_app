const question = [
  {
    question: "Which is larget animal in the world?",
    answers: [
      { text: "Shark", Correct: false },
      { text: "Blue whale", Correct: true },
      { text: "Elephant", Correct: false },
      { text: "Giraffe", Correct: false },
    ],
  },
  {
    question: "Which is the largest desert in the world",
    answers: [
      { text: "Kalahari", Correct: false },
      { text: "Gobi", Correct: false },
      { text: "Sahara", Correct: false },
      { text: "Antarctica", Correct: true },
    ],
  },
  {
    question: "Which is the smallest continent in the world",
    answers: [
      { text: "Asia", Correct: false },
      { text: "Australia", Correct: true },
      { text: "Arctic", Correct: false },
      { text: "Africa", Correct: false },
    ],
  },
  {
    question: "Grand Central Terminal, Park Avenue, New York is the world's",
    answers: [
      { text: "largest railway station", Correct: true },
      { text: "highest railway station", Correct: false },
      { text: "longest railway station", Correct: false },
      { text: "All the above ", Correct: false },
    ],
  },
  {
    question: "Entomology is the science that studies",
    answers: [
      { text: "Behavior of human beings", Correct: false },
      { text: "Insects", Correct: true },
      {
        text: "The origin and history of technical and scientific terms",
        Correct: false,
      },
      { text: "The formation of rocks", Correct: false },
    ],
  },
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showquestion();
}
function showquestion() {
  resetState();
  let currentQuestion = question[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + "." + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.Correct) {
      button.dataset.Correct = answer.Correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.Correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.Correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}
function showScore() {
  resetState();
  questionElement.innerHTML = `You scored${score} out of ${question.length}!`;
  nextButton.innerHTML = "play Again";
  nextButton.style.display = "block";
}
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < question.length) {
    showquestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < question.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
