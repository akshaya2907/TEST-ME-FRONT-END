const questions = {
  easy: [
    { question: "who is known as father of computer?", options: ["Charles Babbage", "bill gates", "steve jobs", "alan tuning"], answer: "Charles Babbage" },
    { question: "Which of these is a linear structure?", options: ["Tree", "Graph", "Linked list", "Hash table"], answer: "Linked list" },
    { question: "which is output function in C to print text on the screen?",options:["Input()","cout<<","print()","printf()"],answer:"printf()" }],
  medium: [
    { question: "which programming language is known for its coffee cup logo?", options: ["Python", "c++", "java", "ruby"], answer: "java" },
    { question: "which sorting algorithm is known for comparing adjacent element?", options: ["Merge sort", "quick sort", "bubble sort", "selection sort"], answer: "bubble sort" },
    { question: "which device stores the permanent data?", options:["RAM","ROM","CPU","Keyboard"],answer:"ROM"}],
  hard: [
    { question: "who is known for godfather of AI?", options: ["Geoffrey Hinton", "Alan tuning", "Sundar pichai", "Elon musk"], answer: "Geoffrey Hinton" },
    { question: "which AI model become famous for generating text-based code suggestions?", options: ["ENAIC", "Colossus", "Z3", "UNIVAC"], answer: "Colossus" },
    { question: "Which AI model become famous for generating text-based code suggestions",options:[ "Siri","Copilot","Chatgpt","Alexa"],answer:"Copilot"}  ],
};

let currentDifficulty = "";
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

function showDifficulty() {
  switchScreen("difficulty-screen");
}

function startQuiz(difficulty) {
  currentDifficulty = difficulty;
  currentQuestionIndex = 0;
  score = 0;
  switchScreen("quiz-screen");
  loadQuestion();
}

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 10;
  document.getElementById("next-btn").disabled = true;
  document.getElementById("timer").textContent = `Time: ${timeLeft}`;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `Time: ${timeLeft}`;
    if (timeLeft === 0) {
      nextQuestion();
    }
  }, 1000);

  const q = questions[currentDifficulty][currentQuestionIndex];
  document.getElementById("question").textContent = q.question;
  const optionsBox = document.getElementById("options");
  optionsBox.innerHTML = "";

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(btn, opt);
    optionsBox.appendChild(btn);
  });
}

function checkAnswer(btn, selected) {
  const correct = questions[currentDifficulty][currentQuestionIndex].answer;
  if (selected === correct) {
    score++;
    btn.classList.add("correct");
  } else {
    btn.classList.add("wrong");
  }

  Array.from(document.getElementById("options").children).forEach(b => {
    b.disabled = true;
    if (b.textContent === correct) {
      b.classList.add("correct");
    }
  });

  clearInterval(timer);
  setTimeout(() => {
    document.getElementById("next-btn").disabled = false;
  }, 3000); // 3 seconds delay before enabling Next
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions[currentDifficulty].length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  switchScreen("result-screen");
  document.getElementById("final-score").textContent = `Your Score: ${score} / ${questions[currentDifficulty].length}`;
}

function restartQuiz() {
  switchScreen("start-screen");
}

function switchScreen(id) {
  ["start-screen", "difficulty-screen", "quiz-screen", "result-screen"].forEach(screen => {
    document.getElementById(screen).classList.add("hidden");
  });
  document.getElementById(id).classList.remove("hidden");
}
