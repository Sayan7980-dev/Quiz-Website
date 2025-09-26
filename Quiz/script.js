const quizData = [{
        question: "What is the correct file extension for Python files?",
        options: [".pyth", ".pt", ".py", ".pyt"],
        answer: ".py"
    },
    {
        question: "Which keyword is used for function declaration in Python?",
        options: ["function", "define", "def", "fun"],
        answer: "def"
    },
    {
        question: "How do you insert COMMENTS in Python code?",
        options: ["// This is a comment", "# This is a comment", "/* comment */", "-- comment"],
        answer: "# This is a comment"
    },
    {
        question: "Which data type is immutable?",
        options: ["List", "Set", "Dictionary", "Tuple"],
        answer: "Tuple"
    },
    {
        question: "What does the 'len()' function do?",
        options: ["Returns the length", "Deletes the list", "Sorts items", "Appends data"],
        answer: "Returns the length"
    },
    {
        question: "What will '2 ** 3' return?",
        options: ["5", "6", "8", "9"],
        answer: "8"
    },
    {
        question: "Which of the following is NOT a valid Python loop?",
        options: ["for", "while", "loop", "none of the above"],
        answer: "loop"
    },
    {
        question: "Which keyword is used to handle exceptions?",
        options: ["catch", "try", "handle", "except"],
        answer: "except"
    },
    {
        question: "What is the output of type({})?",
        options: ["<class 'list'>", "<class 'dict'>", "<class 'set'>", "<class 'tuple'>"],
        answer: "<class 'dict'>"
    },
    {
        question: "Which module in Python is used to generate random numbers?",
        options: ["math", "random", "numbers", "os"],
        answer: "random"
    }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 10;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const resultBox = document.getElementById('result');
const scoreEl = document.getElementById('score');
const quizBox = document.getElementById('quiz-box');
const timeDisplay = document.getElementById('time-left');

function loadQuestion() {
    clearInterval(timer);
    timeLeft = 10;
    timeDisplay.textContent = timeLeft;

    const current = quizData[currentQuestion];
    questionEl.textContent = `Q${currentQuestion + 1}. ${current.question}`;
    optionsEl.innerHTML = '';
    current.options.forEach(option => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.classList.add('option-btn');
        btn.onclick = () => checkAnswer(option);
        optionsEl.appendChild(btn);
    });

    startTimer();
    nextBtn.style.display = 'none';
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            autoRevealAndNext();
        }
    }, 1000);
}

function checkAnswer(selected) {
    clearInterval(timer);
    const correct = quizData[currentQuestion].answer;
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === correct) {
            btn.style.backgroundColor = '#4CAF50';
            btn.style.color = 'white';
        }
        if (btn.textContent === selected && selected !== correct) {
            btn.style.backgroundColor = '#f44336';
            btn.style.color = 'white';
        }
    });
    if (selected === correct) score++;
    nextBtn.style.display = 'inline-block';
}

function autoRevealAndNext() {
    const correct = quizData[currentQuestion].answer;
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === correct) {
            btn.style.backgroundColor = '#4CAF50';
            btn.style.color = 'white';
        }
    });
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 2000);
}

nextBtn.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    clearInterval(timer);
    quizBox.classList.add('hidden');
    resultBox.classList.remove('hidden');
    scoreEl.textContent = `${score} / ${quizData.length}`;
}

function restartQuiz() {
    clearInterval(timer);
    currentQuestion = 0;
    score = 0;
    quizBox.classList.remove('hidden');
    resultBox.classList.add('hidden');
    nextBtn.style.display = 'none';
    loadQuestion();
}

loadQuestion();