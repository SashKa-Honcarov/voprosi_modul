const questions = [
    {
      question: "Що робить функція open('file.txt', 'r') у Python?",
      answers: [
        { text: "Відкриває файл для читання", correct: true },
        { text: "Відкриває файл для запису", correct: false },
        { text: "Створює новий файл", correct: false },
        { text: "Видаляє файл", correct: false }
      ]
    },
    {
      question: "Яка функція зчитує весь вміст файлу у змінну?",
      answers: [
        { text: "readlines()", correct: false },
        { text: "read()", correct: true },
        { text: "readfile()", correct: false },
        { text: "getline()", correct: false }
      ]
    },
    {
      question: "Що відбудеться при спробі відкрити неіснуючий файл у режимі 'r'?",
      answers: [
        { text: "Файл буде створений", correct: false },
        { text: "Файл відкриється порожнім", correct: false },
        { text: "Повернеться None", correct: false },
        { text: "Виникне помилка FileNotFoundError", correct: true }
      ]
    },
    {
      question: "Який метод відкриває файл у режимі додавання?",
      answers: [
        { text: "'a'", correct: true },
        { text: "'w'", correct: false },
        { text: "'x'", correct: false },
        { text: "'r+'", correct: false }
      ]
    },
    {
      question: "Що таке модуль у Python?",
      answers: [
        { text: "Інструмент для збереження даних", correct: false },
        { text: "Файл з функціями та змінними", correct: true },
        { text: "Бібліотека операційної системи", correct: false },
        { text: "Клас зі спеціальними методами", correct: false }
      ]
    },
    {
      question: "Як правильно імпортувати модуль math?",
      answers: [
        { text: "use math", correct: false },
        { text: "include math", correct: false },
        { text: "import math", correct: true },
        { text: "math import", correct: false }
      ]
    },
    {
      question: "Що означає запис from math import sqrt?",
      answers: [
        { text: "Імпортує всі функції з math", correct: false },
        { text: "Імпортує тільки функцію sqrt", correct: true },
        { text: "Імпортує модуль з іншим ім’ям", correct: false },
        { text: "Видаляє функцію sqrt", correct: false }
      ]
    },
    {
      question: "Як визначити, чи модуль запускається напряму?",
      answers: [
        { text: "if __name__ == '__main__'", correct: true },
        { text: "if __file__ == '__main__'", correct: false },
        { text: "main() == True", correct: false },
        { text: "__main__ = True", correct: false }
      ]
    },
    {
      question: "Яка функція використовується для запису у файл?",
      answers: [
        { text: "print()", correct: false },
        { text: "append()", correct: false },
        { text: "write()", correct: true },
        { text: "log()", correct: false }
      ]
    },
    {
      question: "Як безпечно працювати з файлом у Python?",
      answers: [
        { text: "Використовувати try...except", correct: false },
        { text: "Використовувати with open(...) as f", correct: true },
        { text: "Завжди відкривати у режимі 'w'", correct: false },
        { text: "Очищати кеш перед читанням", correct: false }
      ]
    }
  ];
  
  
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const exitBtn = document.getElementById("exit-btn");
  const questionContainer = document.getElementById("question-container");
  const questionEl = document.getElementById("question");
  const answerButtonsEl = document.getElementById("answer-buttons");
  const quizScreen = document.getElementById("quiz-screen");
  const startScreen = document.getElementById("start-screen");
  const resultScreen = document.getElementById("result-screen");
  const resultScore = document.getElementById("result-score");
  const resultTime = document.getElementById("result-time");
  
  let currentQuestionIndex = 0;
  let correctAnswers = 0;
  let startTime;
  
  startBtn.addEventListener("click", startQuiz);
  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
  });
  restartBtn.addEventListener("click", startQuiz);
  exitBtn.addEventListener("click", () => {
    window.close(); // Працює тільки в окремому вікні
  });
  
  function startQuiz() {
    startScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    currentQuestionIndex = 0;
    correctAnswers = 0;
    startTime = new Date();
    setNextQuestion();
  }
  
  function setNextQuestion() {
    resetState();
    if (currentQuestionIndex < questions.length) {
      showQuestion(questions[currentQuestionIndex]);
      if (currentQuestionIndex === questions.length - 1) {
        nextBtn.innerText = "Завершити тест";
      } else {
        nextBtn.innerText = "Наступне питання";
      }
    } else {
      finishQuiz();
    }
  }
  
  function showQuestion(questionObj) {
    questionEl.innerText = questionObj.question;
    questionObj.answers.forEach(answer => {
      const btn = document.createElement("button");
      btn.innerText = answer.text;
      btn.classList.add("btn");
      btn.addEventListener("click", () => selectAnswer(btn, answer.correct));
      answerButtonsEl.appendChild(btn);
    });
  }
  
  function resetState() {
    nextBtn.classList.add("hidden");
    answerButtonsEl.innerHTML = "";
  }
  
  function selectAnswer(button, isCorrect) {
    // Вимикаємо всі кнопки
    const buttons = answerButtonsEl.children;
    for (let btn of buttons) {
      btn.disabled = true;
    }
  
    // Підсвічуємо лише натиснуту кнопку
    button.classList.add(isCorrect ? "correct" : "wrong");
  
    if (isCorrect) correctAnswers++;
    nextBtn.classList.remove("hidden");
  }
  
  function finishQuiz() {
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
  
    const marks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const mark = marks[correctAnswers] || 2;
    
    const endTime = new Date();
    const timeTaken = Math.round((endTime - startTime) / 1000);
  
    resultScore.innerText = `Правильних відповідей: ${correctAnswers} з ${questions.length} — Оцінка: ${mark} бал(ів)`;
    resultTime.innerText = `Час проходження: ${timeTaken} сек.`;
  }
  