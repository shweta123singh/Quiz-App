const quizData = [
  {
    question: "Which of the following is a client-side language?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d",
  },
  {
    question: "What does HTML stand for?",
    a: "Hypertext Markup Language",
    b: "Cascading Style Sheet",
    c: "Jason Object Notation",
    d: "Helicopters Terminals Motorboats Lamborghinis",
    correct: "a",
  },
  {
    question: "What year was JavaScript launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "none of the above",
    correct: "b",
  },
  {
    question: "What does CSS stand for?",
    a: "Hypertext Markup Language",
    b: "Cascading Style Sheet",
    c: "Jason Object Notation",
    d: "Helicopters Terminals Motorboats Lamborghinis",
    correct: "b",
  }
];

let index = 0;
let correct = 0, incorrect = 0;
let total = quizData.length;
let timeLeft = 15;
let timerInterval;

let questionBox = document.getElementById("questionBox");
let allInputs = document.querySelectorAll("input[type='radio']");
let feedback = document.getElementById("feedback");
let timeDisplay = document.getElementById("time");

const loadQuestion = () => {
  if (index === total) {
    return quizEnd();
  }
  reset();
  const data = quizData[index];
  questionBox.innerHTML = `${index + 1}) ${data.question}`;
  allInputs[0].nextElementSibling.innerText = data.a;
  allInputs[1].nextElementSibling.innerText = data.b;
  allInputs[2].nextElementSibling.innerText = data.c;
  allInputs[3].nextElementSibling.innerText = data.d;

  feedback.innerText = "";
  startTimer();
};

document.querySelector("#submit").addEventListener("click", function () {
  checkAnswer();
});

const getAnswer = () => {
  let ans;
  allInputs.forEach((inputEl) => {
    if (inputEl.checked) {
      ans = inputEl.value;
    }
  });
  return ans;
};

const reset = () => {
  allInputs.forEach((inputEl) => {
    inputEl.checked = false;
  });
  clearInterval(timerInterval);
  timeLeft = 15;
  timeDisplay.innerText = timeLeft;
};

const startTimer = () => {
  timerInterval = setInterval(() => {
    timeLeft--;
    timeDisplay.innerText = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      feedback.innerText = "⏰ Time’s up!";
      setTimeout(() => {
        index++;
        loadQuestion();
      }, 1500);
    }
  }, 1000);
};

const checkAnswer = () => {
  const data = quizData[index];
  const ans = getAnswer();
  if (!ans) {
    feedback.innerText = "⚠️ Please select an option!";
    return;
  }
  clearInterval(timerInterval);
  if (ans === data.correct) {
    correct++;
    feedback.innerText = "✅ Correct!";
  } else {
    incorrect++;
    feedback.innerText = `❌ Wrong! Correct answer: ${data[data.correct]}`;
  }
  setTimeout(() => {
    index++;
    loadQuestion();
  }, 1500);
};

const quizEnd = () => {
  document.getElementsByClassName("container")[0].innerHTML = `
    <div class="col">
      <h2>🎉 Quiz Completed!</h2>
      <h3>You scored ${correct} / ${total}</h3>
      <p>Correct: ${correct}</p>
      <p>Incorrect: ${incorrect}</p>
    </div>
  `;
};

loadQuestion();
