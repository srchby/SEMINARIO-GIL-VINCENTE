const textContainer2 = document.getElementById('text-container-2')
const textContainer = document.getElementById('text-container')
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  textContainer.classList.add('hide')
  textContainer2.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Recomeçar, Obrigado por jogar!'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Qual a fonte de energia mais abundante na Terra?',
    answers: [
      { text: 'Energia Solar', correct: true },
      { text: 'Energia Nuclear', correct: false },
      { text: 'Energia Eólica', correct: false },
      { text: 'Petróleo', correct: false }
    ]
  },
  {
    question: 'O que significa a sigla "ODS"?',
    answers: [
      { text: 'Ondas de Desenvolvimento Sustentável', correct: false },
      { text: 'Organização de Desenvolvimento Solar', correct: false },
      { text: 'Otimização de Desenvolvimento Sustentável', correct: false },
      { text: 'Objetivos de Desenvolvimento Sustentável', correct: true }
    ]
  },
    {
    question: 'Qual o tipo de energia que é gerado pelo movimento do ar?',
    answers: [
      { text: 'Energia Solar', correct: false },
      { text: 'Energia Eólica', correct: true },
      { text: 'Biomassa', correct: false },
      { text: 'Energia Hidrelétrica', correct: false }
    ]
  },
  {
    question: 'Qual é a fonte de energia mais usada globalmente para produção de eletricidade?',
    answers: [
      { text: 'Energia Eólica', correct: false },
      { text: 'Energia Solar', correct: false },
      { text: 'Carvão', correct: true },
      { text: 'Energia Nuclear', correct: false }
    ]
  },
  {
    question: 'Qual país mais produz energia eólica?',
    answers: [
      { text: 'Noruega', correct: false },
      { text: 'Índia', correct: false },
      { text: 'China', correct: true },
      { text: 'Alemanha', correct: false }
    ]
  }
]