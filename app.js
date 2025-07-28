const questions = [
  {
    question: "How can Rohan get the book from the shop?",
    options: [
      "Ask the shopkeeper and he will give it",
      "Give money to the shopkeeper and he will give the book",
      "Just grab the book from the shop and run"
    ],
    correctIndex: 1,
    character: "shopkeeper.png"
  },
  {
    question: "How does Rohan get money?",
    options: [
      "Pray to god and god will place it under his pillow while he is asleep",
      "Take from parents' wallet",
      "Request his parents to give him money to buy a book"
    ],
    correctIndex: 2,
    character: "rohan.png"
  },
  {
    question: "Rohan was perplexed as to why the shopkeeper needs money to give him a book. Can you tell him why?",
    options: [
      "Because he expects something of value in return for the book he is giving you",
      "Because he is greedy",
      "Because the shopkeeper's father told him to take money"
    ],
    correctIndex: 0,
    character: "shopkeeper.png"
  },
  {
    question: "Rohan did not understand what money was. Can you help him understand?",
    options: [
      "Money is something that can buy things we need or want. It has value because everybody agreed to value it the same.",
      "Money is an imaginary thing that nobody can see, but everybody talks about. It has no value in reality.",
      "Money is a piece of paper or a coin. Anybody can paint money on paper or make it on some metal."
    ],
    correctIndex: 0,
    character: "money.png"
  },
  {
    question: "Rohan then started thinking how his parents get money from. Do you know how?",
    options: [
      "They have a magical tree in their backyard that gives them money",
      "Because they pray to god, god fills their wallet every day",
      "They work by giving their time, energy, and thoughts to get money, just like the shopkeeper and the driver."
    ],
    correctIndex: 2,
    character: "ramesh.png"
  },
  {
    question: "Rohan started thinking that he lost his book, which his parents bought for him then. Since he gave his book to someone somewhere, somebody should give him money too. Can you help him understand if that is correct?",
    options: [
      "Yes, since the book was lost during school timings, the school teacher should give him money. He can use the same money to buy a new book.",
      "The book was lost and nobody bought it from Rohan. When it is not bought, Rohan will not get money. He wasted the money that his parents got by working."
    ],
    correctIndex: 1,
    character: "rohan.png"
  }
];

let currentQuestionIndex = 0;

const questionTextElem = document.getElementById("question-text");
const optionsElem = document.getElementById("options");
const resultMessageElem = document.getElementById("result-message");
const nextBtn = document.getElementById("next-btn");
const storyParagraph = document.getElementById("story-paragraph");
const characterImg = document.getElementById("character-img");

const storyIntro = [
  "Rohan lost his book at school. He asks his school bus driver, Ramesh, how to get it back. Ramesh tells him to get it from the shop. Rohan doesn’t understand how.",
  "Let's help Rohan understand how to get his book from the shop.",
  "Let's find out how Rohan can get money.",
  "Why does the shopkeeper ask for money?",
  "What exactly is money?",
  "How do Rohan's parents get money?",
  "Does Rohan get money back because he lost the book?"
];

function loadQuestion(index) {
  // Clear previous feedback
  resultMessageElem.textContent = "";
  resultMessageElem.className = "";
  nextBtn.style.display = "none";

  // Animate fade-out then update content then fade-in
  fadeOutIn(() => {
    const q = questions[index];
    questionTextElem.textContent = q.question;
    optionsElem.innerHTML = "";

    // Update character image
    characterImg.src = q.character;
    characterImg.alt = "Character";

    // Update story paragraph (show intro if at first question else blank)
    storyParagraph.textContent = storyIntro[index] || "";

    // Add option buttons
    q.options.forEach((option, i) => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.onclick = () => handleAnswer(i);
      optionsElem.appendChild(btn);
    });
  });
}

function fadeOutIn(updateContent) {
  const questionSection = document.getElementById("question-section");
  questionSection.classList.remove("fade-in");
  questionSection.style.opacity = "0";

  setTimeout(() => {
    updateContent();
    questionSection.classList.add("fade-in");
    questionSection.style.opacity = "1";
  }, 350);
}

function handleAnswer(selectedIndex) {
  const q = questions[currentQuestionIndex];

  // Disable all buttons after answer
  Array.from(optionsElem.children).forEach(btn => btn.disabled = true);

  if (selectedIndex === q.correctIndex) {
    resultMessageElem.textContent = "Great!";
    resultMessageElem.className = "good";
    nextBtn.style.display = "inline-block";
  } else {
    resultMessageElem.textContent = "Try Again!";
    resultMessageElem.className = "bad";

    // Re-enable buttons for retry
    Array.from(optionsElem.children).forEach(btn => btn.disabled = false);
  }
}

nextBtn.onclick = function () {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion(currentQuestionIndex);
  } else {
    showGameComplete();
  }
};

function showGameComplete() {
  fadeOutIn(() => {
    questionTextElem.textContent = "Well done! You helped Rohan understand the importance of money.";
    optionsElem.innerHTML = "";
    resultMessageElem.textContent = "";
    nextBtn.style.display = "none";
    characterImg.src = "rohan.png";
    characterImg.alt = "Rohan";

    const restartBtn = document.createElement("button");
    restartBtn.textContent = "Play Again";
    restartBtn.onclick = () => {
      currentQuestionIndex = 0;
      loadQuestion(0);
      restartBtn.remove();
    };
    optionsElem.appendChild(restartBtn);

    storyParagraph.textContent = "Rohan is now smarter about money thanks to you!";
  });
}

// Initial load
loadQuestion(currentQuestionIndex);
