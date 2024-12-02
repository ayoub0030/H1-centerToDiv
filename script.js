// Daily affirmations and messages
const affirmations = [
    "Your code is as centered as your chi! 🧘",
    "You're crushing it like a properly aligned flexbox! 💪",
    "Your productivity is grid-template-perfect! 🎯",
    "You're as balanced as a centered div! ⚖️",
    "You're absolutely positioned for success! 🚀",
    "You're more stable than a static position! 🏔️",
    "Your CSS game is strong! 💫",
    "You're floating in the right direction! 🌊"
];

const triviaQuestions = [
    {
        question: "What CSS property is used to center a div horizontally?",
        options: ["margin: auto", "align: center", "text-align: center", "float: center"],
        correct: 0
    },
    {
        question: "Which display property makes an element a flex container?",
        options: ["display: flexible", "display: flex", "display: flexbox", "display: flex-container"],
        correct: 1
    },
    {
        question: "What's the modern way to create a grid layout?",
        options: ["display: grid", "display: table", "float: grid", "position: grid"],
        correct: 0
    }
];

// DOM Elements
const dailyMessage = document.querySelector('.daily-message');
const tasks = document.querySelectorAll('.task');
const addTaskButton = document.getElementById('add-task');
const startChallengeButton = document.getElementById('start-challenge');
const targetDiv = document.getElementById('target-div');
const nextQuestionButton = document.getElementById('next-question');
const startMindfulnessButton = document.getElementById('start-mindfulness');
const affirmationPopup = document.getElementById('affirmation-popup');
const affirmationText = document.getElementById('affirmation-text');
const meditationText = document.querySelector('.meditation-text');
const meditationTimerDisplay = document.querySelector('.meditation-timer');
const setDurationButton = document.getElementById('set-duration');

// Initialize daily message
function updateDailyMessage() {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    dailyMessage.textContent = affirmations[randomIndex];
    dailyMessage.style.opacity = 0;
    setTimeout(() => {
        dailyMessage.style.opacity = 1;
    }, 100);
}

// Task management
tasks.forEach(task => {
    task.addEventListener('click', () => {
        if (task.dataset.completed === 'false') {
            task.dataset.completed = 'true';
            task.style.transform = 'translate(-50%, -50%)';
            task.style.left = '50%';
            task.style.top = '50%';
            showAffirmation("Task centered successfully! 🎉");
        }
    });
});

// Add new task
addTaskButton.addEventListener('click', () => {
    const taskText = prompt("Enter your new task:");
    if (taskText) {
        const tasksContainer = document.querySelector('.tasks-container');
        const newTask = document.createElement('div');
        newTask.className = 'task';
        newTask.dataset.completed = 'false';
        newTask.innerHTML = `<span class="task-text">${taskText}</span>`;
        
        newTask.addEventListener('click', () => {
            if (newTask.dataset.completed === 'false') {
                newTask.dataset.completed = 'true';
                showAffirmation("New task centered! Keep going! 🌟");
            }
        });
        
        tasksContainer.appendChild(newTask);
    }
});

// Zen Garden Challenge with Touch Support
let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

const zenGardenContainer = document.querySelector('.zen-garden-container');

// Mouse Events
targetDiv.addEventListener('mousedown', dragStart);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', dragEnd);

// Touch Events
targetDiv.addEventListener('touchstart', dragStart, { passive: false });
document.addEventListener('touchmove', drag, { passive: false });
document.addEventListener('touchend', dragEnd);

function dragStart(e) {
    if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
    } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
    }

    if (e.target === targetDiv) {
        isDragging = true;
    }
}

function drag(e) {
    if (isDragging) {
        e.preventDefault();

        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        // Constrain movement within container bounds
        const containerRect = zenGardenContainer.getBoundingClientRect();
        const divRect = targetDiv.getBoundingClientRect();

        if (currentX < 0) currentX = 0;
        if (currentY < 0) currentY = 0;
        if (currentX > containerRect.width - divRect.width) 
            currentX = containerRect.width - divRect.width;
        if (currentY > containerRect.height - divRect.height)
            currentY = containerRect.height - divRect.height;

        setTranslate(currentX, currentY, targetDiv);
        checkCentering();
    }
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate(${xPos}px, ${yPos}px)`;
}

function dragEnd() {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
}

function checkCentering() {
    const containerRect = zenGardenContainer.getBoundingClientRect();
    const divRect = targetDiv.getBoundingClientRect();
    
    const centerX = containerRect.width / 2 - divRect.width / 2;
    const centerY = containerRect.height / 2 - divRect.height / 2;
    
    const tolerance = 20; // pixels of tolerance
    
    if (Math.abs(currentX - centerX) < tolerance && Math.abs(currentY - centerY) < tolerance) {
        showAffirmation("Perfect centering! You're a CSS master! 🎨");
        targetDiv.style.backgroundColor = 'var(--secondary-color)';
        targetDiv.style.boxShadow = '0 0 20px var(--secondary-color)';
    } else {
        targetDiv.style.backgroundColor = 'var(--primary-color)';
        targetDiv.style.boxShadow = 'none';
    }
}

// Reset Zen Garden Challenge
document.getElementById('start-challenge').addEventListener('click', () => {
    xOffset = 0;
    yOffset = 0;
    currentX = 0;
    currentY = 0;
    targetDiv.style.transform = 'translate(0, 0)';
    targetDiv.style.backgroundColor = 'var(--primary-color)';
    targetDiv.style.boxShadow = 'none';
    showAffirmation("Challenge reset! Try to center the div! 🎯");
});

// Trivia
let currentQuestion = 0;

function loadQuestion() {
    const questionCard = document.querySelector('.question-card');
    const question = triviaQuestions[currentQuestion];
    
    questionCard.innerHTML = `
        <p class="question">${question.question}</p>
        <div class="options">
            ${question.options.map((option, index) => `
                <button class="button option" data-index="${index}">${option}</button>
            `).join('')}
        </div>
    `;
    
    const options = questionCard.querySelectorAll('.option');
    options.forEach(option => {
        option.addEventListener('click', checkAnswer);
    });
}

function checkAnswer(e) {
    const selectedIndex = parseInt(e.target.dataset.index);
    const question = triviaQuestions[currentQuestion];
    
    if (selectedIndex === question.correct) {
        showAffirmation("Correct! Your CSS knowledge is on point! 🎯");
        e.target.style.backgroundColor = '#4CAF50';
    } else {
        showAffirmation("Not quite! Keep learning! 📚");
        e.target.style.backgroundColor = '#ff5252';
    }
    
    setTimeout(() => {
        currentQuestion = (currentQuestion + 1) % triviaQuestions.length;
        loadQuestion();
    }, 1500);
}

// Mindfulness Mode
let meditationActive = false;
let meditationTimer;
let meditationSeconds = 0;
let meditationDuration = 300; // 5 minutes default

const meditationPrompts = [
    "Breathe in... Code flows through you... 🌊",
    "Exhale the bugs away... 🦋",
    "Center your div and your mind... 🎯",
    "Float in the digital space... 🌌",
    "Your code is becoming one with the flow... ✨",
    "Debugging with peace... 🧘",
    "Align your chakras and your elements... 🎭",
    "Find balance in the matrix... 🌐"
];

startMindfulnessButton.addEventListener('click', () => {
    const breathingCircle = document.querySelector('.breathing-circle');
    meditationActive = !meditationActive;
    
    if (meditationActive) {
        startMindfulnessButton.textContent = 'End Meditation 🛑';
        breathingCircle.style.animation = 'breathe 4s ease-in-out infinite';
        startMeditationTimer();
        cycleMeditationPrompts();
    } else {
        startMindfulnessButton.textContent = 'Start Meditation 🧘';
        breathingCircle.style.animation = 'none';
        clearInterval(meditationTimer);
        meditationSeconds = 0;
        updateMeditationTimer();
        meditationText.textContent = "Breathe with the flow...";
    }
});

setDurationButton.addEventListener('click', () => {
    const minutes = prompt("Enter meditation duration in minutes (1-60):", "5");
    if (minutes && !isNaN(minutes) && minutes > 0 && minutes <= 60) {
        meditationDuration = minutes * 60;
        showAffirmation(`Meditation duration set to ${minutes} minutes 🕒`);
    }
});

function startMeditationTimer() {
    meditationSeconds = 0;
    updateMeditationTimer();
    
    meditationTimer = setInterval(() => {
        meditationSeconds++;
        updateMeditationTimer();
        
        if (meditationSeconds >= meditationDuration) {
            clearInterval(meditationTimer);
            meditationActive = false;
            startMindfulnessButton.textContent = 'Start Meditation 🧘';
            showAffirmation("Meditation complete! Your mind is centered 🎯");
            meditationText.textContent = "Meditation complete ✨";
        }
    }, 1000);
}

function updateMeditationTimer() {
    const minutes = Math.floor(meditationSeconds / 60);
    const seconds = meditationSeconds % 60;
    meditationTimerDisplay.textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function cycleMeditationPrompts() {
    let promptIndex = 0;
    
    function updatePrompt() {
        if (meditationActive) {
            meditationText.textContent = meditationPrompts[promptIndex];
            promptIndex = (promptIndex + 1) % meditationPrompts.length;
            setTimeout(updatePrompt, 10000); // Change prompt every 10 seconds
        }
    }
    
    updatePrompt();
}

// Affirmation popup
function showAffirmation(message) {
    affirmationText.textContent = message;
    affirmationPopup.style.display = 'flex';
    
    setTimeout(() => {
        affirmationPopup.style.opacity = '0';
        setTimeout(() => {
            affirmationPopup.style.display = 'none';
            affirmationPopup.style.opacity = '1';
        }, 300);
    }, 2000);
}

// Initialize
updateDailyMessage();
loadQuestion();

// Update daily message every 24 hours
setInterval(updateDailyMessage, 24 * 60 * 60 * 1000);
