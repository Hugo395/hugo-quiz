//Constants

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoring = document.getElementById("score");

const correctBonus = 10;
const maxQuestions = 5;
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

//Questions part

let questions = [
  {
    question: "Which insurance covers fire and burglary?",
    choice1: "Home insurance",
    choice2: "Liability insurance",
    choice3: "Travel insurance",
    choice4: "Life insurance",
    answer: 1
  },
  {
    question: "What is gross salary?",
    choice1: "The amount of salary that you actually receive",
    choice2: "The amount that is agreed upon in the employment contract",
    choice3: "The difference between personl income and taxable income",
    choice4: "The difference between net income and taxable income",
    answer: 2
  },
  {
    question: "What does inflation mean?",
    choice1: "Prices decrease",
    choice2: "More value of money due to sustained decrease in prices",
    choice3: "Less value of money due to sustained increase in prices",
    choice4: "That you have to pay in cash",
    answer: 3
  },
  {
    question: "What of this isn't a type of Loans offered by banks?",
    choice1: "Mortgage Loans",
    choice2: "Secured Personal Loan",
    choice3: "Credit Card",
    choice4: "Unsecured Personal Loan",
    answer: 3
  },
  {
    question: "What is an expense?",
    choice1: "A bank transfer",
    choice2: "An obligation to pay for services/goods",
    choice3: "An obligation to receive money",
    choice4: "A money deposit",
    answer: 2
  },
  {
    question: "Why should you think twice about getting a personal loan?",
    choice1: "Because these loans do not exist",
    choice2: "Because these loans are often very expensive",
    choice3: "Because you always get scammed",
    choice4: "Because these loans mean you have to sell your car",
    answer: 2
  },
  {
    question: "What is VAT?",
    choice1: "A tax that is on nearly all goods",
    choice2: "A grant you receive from the government",
    choice3: "A tax only for goods over €100",
    choice4: "A tax only for soda and candy",
    answer: 1
  },
  {
    question: "What should you spread in order to reduce risk?",
    choice1: "Budgets",
    choice2: "Deposits",
    choice3: "Cash money",
    choice4: "None of these options ",
    answer: 2
  },
  {
    question: "Which expenditure should receive the highest priority?",
    choice1: "Ironbeers",
    choice2: "Netflix subscription",
    choice3: "Rent payment",
    choice4: "Ticket's for a Benfica Game ",
    answer: 3
  },
  {
    question:
      "You are saving €120 with an interest rate of 2% per year. After 3 years, how much do you have?",
    choice1: "Less that €127",
    choice2: "More €127",
    choice3: "Exactly €127",
    choice4: "How? I don't have any money to save",
    answer: 2
  },
  {
    question:
      "If you receive a suspects message from your supposed bank, what should you do?",
    choice1: "It is safe, click the link and enter your details",
    choice2: "If the link contains your bank name, it is safe",
    choice3: "Ignore the message, do nothing",
    choice4: "Do not click, call your bank",
    answer: 4
  },
  {
    question: "Which debt should you try to pay back first?",
    choice1: "The debt with the highest interest rate",
    choice2: "The highest debt",
    choice3: "The lowest debt",
    choice4: "The debt with the lowest interest rate",
    answer: 1
  },
  {
    question: "Which of the following is NOT a debt?",
    choice1: "A stock",
    choice2: "Mortage",
    choice3: "Telephone subscription with a telephone",
    choice4: "When your parents lend you €10",
    answer: 1
  },
  {
    question:
      "Someone on Instagram asks you in a message to open a bank account for them, what do you do?",
    choice1: "Block the account and report it to Instagram",
    choice2:
      "Ask him more questions about it, and transfer the initial amount to start the bank relationship",
    choice3: "Open the bank account, DM your PIN, give him your bank card",
    choice4: "Nothing",
    answer: 1
  },
  {
    question:
      "In 2008, 300 billion Zimbabwe dollars equaled aproximately €1. What happened?",
    choice1: "The euro was doing very well",
    choice2: "It has always been like this",
    choice3: "HyperDEflation",
    choice4: "HyperINflation",
    answer: 4
  }
];

//Game Script's
startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
    localStorage.setItem("recentScore", score);
    // go to end page after finnishing
    return window.location.assign("/endPage.html");
  }
  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${maxQuestions}`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    //Show in each option if right or wrong
    //Searched in youtube this way, and worked
    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(correctBonus);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

//Score function  - 1 Win - X Point

incrementScore = num => {
  score += num;
  scoring.innerText = score;
};

startGame();
