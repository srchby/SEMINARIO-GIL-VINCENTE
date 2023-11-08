const textContainer2 = document.getElementById('text-container-2')
const textContainer = document.getElementById('text-container')
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const pointsContainer = document.getElementById('points')

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
    question: 'Qual das alternativas abaixo NÃO faz parte das obras de Gil Vicente?',
    answers: [
      { text: 'O auto do bom sucesso', correct: true },
      { text: 'O auto da barca do inferno', correct: false },
      { text: 'A farça de Inés Pereira', correct: false },
      { text: 'O velho da horta', correct: false }
    ]
  },
  {
    question: 'Qual foi a primeira obra publicada de Gil Vicente?',
    answers: [
      { text: 'Auto da Barca do Inferno', correct: false },
      { text: 'Quem tem Farelos?', correct: false },
      { text: 'Auto da Alma', correct: false },
      { text: 'Monologo do Vaqueiro', correct: true }
    ]
  },
  {
    question: 'Gil Vicente escreveu o Auto da Barca do Inferno em 1517, no momento em que eclodia na Alemanha a Reforma Protestante com a crítica veemente de Lutero ao mau clero dominante na Igreja. Nessa obra, há a figura do frade, severamente censurado como um sacerdote negligente. Indique a alternativa cujo conteúdo não se presta a caracterizar, na referida peça, os erros cometidos pelo religioso.',
    answers: [
      { text: 'Não cumprir os votos de celibato, mantendo a concubina Florença.', correct: false },
      { text: 'Praticar a avareza como cúmplice do Fidalgo, e a exploração da prostituição em parceria com a alcoviteira.', correct: true },
      { text: 'Entregar-se a práticas mundanas, como a dança.', correct: false },
      { text: 'Praticar esgrima e usar armamentos de guerra, proibidos aos clérigos.', correct: false }
    ]
  },
  {
    question: 'Sobre o Auto da barca do Inferno, de Gil Vicente, é incorreto afirmar:',
    answers: [
      { text: 'O autor apresenta severa crítica à prepotência e tirania dos nobres, e à desonestidade e corrupção dos homens da lei.', correct: false },
      { text: 'O diabo atua como agente crítico, que revela as mentiras e falsidades das personagens.', correct: false },
      { text: 'Na luta entre o Bem e o Mal são favorecidos aqueles que em vida pertenceram à classe social privilegiada.', correct: true },
      { text: 'O autor vale-se do tema do Juízo Final para estabelecer uma crítica à sociedade, fazendo desfilar em cena os tipos sociais identificados através de suas qualidades e defeitos.', correct: false }
    ]
  },
  {
    question: 'Qual área do renascimento Gil Vicente se encontra?',
    answers: [
      { text: 'Capitalismo', correct: false },
      { text: 'Cubismo', correct: false },
      { text: 'Humanismo', correct: true },
      { text: 'Feudalismo', correct: false }
    ]
  }
]
