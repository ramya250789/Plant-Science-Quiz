document.addEventListener("DOMContentLoaded", () => {

    const quiz = [
        {
            question: "Bonsai is the art of:",
            options: [
                "Genetic dwarfing",
                "Growing plants without soil",
                "Growing miniature trees in containers",
                "Artificial plants"
            ],
            answer: 2
        },
        {
            question: "Mangroves are specially adapted to:",
            options: [
                "Desert conditions",
                "Freshwater lakes",
                "Coastal saline conditions",
                "Mountain regions"
            ],
            answer: 2
        },
        {
            question: "Pneumatophores are:",
            options: [
                "Underground stems",
                "Breathing roots",
                "Storage roots",
                "Climbing roots"
            ],
            answer: 1
        },
        {
            question: "Hydroponics means growing plants:",
            options: [
                "In air",
                "In sand",
                "In water with nutrients",
                "In clay pots"
            ],
            answer: 2
        },
        {
            question: "Medicinal plants are important because they:",
            options: [
                "Look attractive",
                "Produce flowers",
                "Contain bioactive compounds",
                "Grow fast"
            ],
            answer: 2
        },
        {
            question: "Which plant part commonly gives natural dye?",
            options: [
                "Fruit peel",
                "Leaf",
                "Root",
                "All of the above"
            ],
            answer: 3
        },
        {
            question: "Xylarium mainly displays:",
            options: [
                "Leaves",
                "Flowers",
                "Wood samples",
                "Roots"
            ],
            answer: 2
        },
        {
            question: "A terrarium is best described as:",
            options: [
                "Artificial garden",
                "Miniature ecosystem in glass",
                "Plastic plant model",
                "Dry flower arrangement"
            ],
            answer: 1
        },
        {
            question: "One major advantage of hydroponics is:",
            options: [
                "More land required",
                "Less water usage",
                "Slow growth",
                "Soil pollution"
            ],
            answer: 1
        },
        {
            question: "Kokedama is best described as:",
            options: [
                "Soil-free farming method",
                "Japanese plant art using moss ball",
                "Artificial plant decoration",
                "Dry flower technique"
            ],
            answer: 1
        }
    ];
    

    let current = 0;
    let score = 0;
    let timeLeft = 20;
    let timer;

    const welcomeScreen = document.getElementById("welcome-screen");
    const quizScreen = document.getElementById("quiz-screen");
    const startBtn = document.getElementById("startBtn");

    const questionEl = document.getElementById("question");
    const textEls = document.querySelectorAll(".text");
    const radios = document.querySelectorAll("input[name='option']");
    const progressEl = document.getElementById("progress");
    const timerEl = document.getElementById("timer");
    const nextBtn = document.getElementById("nextBtn");

    /* 🔹 Start Quiz */
    startBtn.addEventListener("click", () => {
        welcomeScreen.classList.add("hidden");
        quizScreen.classList.remove("hidden");
        current = 0;
        score = 0;
        loadQuestion();
        startTimer();
    });

    function loadQuestion() {
        const q = quiz[current];
        questionEl.textContent = q.question;

        textEls.forEach((el, i) => {
            el.textContent = q.options[i];
            radios[i].checked = false;
        });

        progressEl.textContent = `Question ${current + 1} / ${quiz.length}`;
    }

    function startTimer() {
        clearInterval(timer);
        timeLeft = 20;
        timerEl.textContent = `Time: ${timeLeft}`;

        timer = setInterval(() => {
            timeLeft--;
            timerEl.textContent = `Time: ${timeLeft}`;

            if (timeLeft === 0) {
                clearInterval(timer);
                nextQuestion();
            }
        }, 1000);
    }

    nextBtn.addEventListener("click", () => {
        clearInterval(timer);
        nextQuestion();
    });

    function nextQuestion() {
        let selected = -1;
    
        radios.forEach((r, i) => {
            if (r.checked) selected = i;
        });
    
        // ❌ If Next is clicked without selecting an option
        if (selected === -1) {
            showSelectWarning();
            return; // ⛔ do NOT proceed
        }
    
        // ✅ Remove warning once user selects
        const warning = document.getElementById("select-warning");
        if (warning) warning.remove();
    
        if (selected === quiz[current].answer) {
            score++;
        }
    
        current++;
    
        if (current < quiz.length) {
            loadQuestion();
            startTimer();
        } else {
            showResult();
        }
    }
function nextQuestion() {
    let selected = -1;

    radios.forEach((r, i) => {
        if (r.checked) selected = i;
    });

    // ❌ If Next is clicked without selecting an option
    if (selected === -1) {
        showSelectWarning();
        return; // ⛔ do NOT proceed
    }

    // ✅ Remove warning once user selects
    const warning = document.getElementById("select-warning");
    if (warning) warning.remove();

    if (selected === quiz[current].answer) {
        score++;
    }

    current++;

    if (current < quiz.length) {
        loadQuestion();
        startTimer();
    } else {
        showResult();
    }
}
function showSelectWarning() {
    // Avoid duplicate warnings
    if (document.getElementById("select-warning")) return;

    const warning = document.createElement("p");
    warning.id = "select-warning";
    warning.textContent = "⚠ Please select one option before proceeding";
    warning.style.color = "red";
    warning.style.fontWeight = "bold";
    warning.style.marginTop = "10px";

    quizScreen.appendChild(warning);
}

function showResult() {
        let message = "";
    
        if (score < 10) {
             message = "<h3>🌿 Nice attempt! Keep exploring nature 🌱</h3>";
        } 
    
        quizScreen.innerHTML = `
            <h2>Quiz Completed 🌿</h2>
            <p>Your Score: <strong>${score} / ${quiz.length}</strong></p>
            ${message}
        `;
    
        // 🎆 Firecracker celebration ONLY for full marks
        if (score === quiz.length) {
            const fw = document.getElementById("fireworks");
            fw.classList.remove("hidden");
    
            // Stop fireworks after 6 seconds
            setTimeout(() => {
                fw.classList.add("hidden");
            }, 6000);
        }
    }
    
    
    
});
