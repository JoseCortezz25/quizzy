import { GenerateQuiz, QuestionType, QuestionTypeLanguage } from './types';

export const generatedQuiz: GenerateQuiz = {
  title: 'Test Quiz',
  quiz: {
    questions: [
      {
        question: 'Which of the following are programming languages?',
        options: ['Python', 'HTML', 'JavaScript', 'CSS'],
        type: QuestionType.MultipleChoice,
        answer: ['Python', 'JavaScript'],
        explanation:
          'Python and JavaScript are programming languages, while HTML and CSS are markup and style sheet languages respectively.'
      },
      {
        question: 'Which of the following are web browsers?',
        options: ['Firefox', 'Chrome', 'Safari', 'iOS'],
        type: QuestionType.MultipleChoice,
        answer: ['Firefox', 'Chrome', 'Safari'],
        explanation: 'Firefox, Chrome, Safari, and Opera are all web browsers.'
      },
      {
        question: 'Which of the following are front-end frameworks?',
        options: ['React', 'Vue', 'Angular', 'Express'],
        type: QuestionType.MultipleChoice,
        answer: ['React', 'Vue', 'Angular'],
        explanation:
          'React, Vue, and Angular are front-end frameworks, while Express is a back-end framework.'
      },
      {
        question: 'Which of the following are back-end frameworks?',
        options: ['Express', 'Django', 'Flask', 'React'],
        type: QuestionType.MultipleChoice,
        answer: ['Express', 'Django', 'Flask'],
        explanation:
          'Express, Django, and Flask are back-end frameworks, while React is a front-end framework.'
      }
    ]
  }
};

export const oneRightOptionQuiz: GenerateQuiz = {
  title: 'Test Quiz',
  quiz: {
    questions: [
      {
        question: 'Which of the following are programming languages?',
        options: ['Python', 'HTML', 'Write in paper', 'CSS'],
        type: QuestionType.MultipleChoiceSingle,
        answer: ['Python'],
        explanation: 'Python is a programming language.'
      },
      {
        question: 'Which of the following are web browsers?',
        options: ['Firefox', 'ChromeOS', 'Windows', 'iOS'],
        type: QuestionType.MultipleChoiceSingle,
        answer: ['Firefox'],
        explanation: 'Firefox is a web browser.'
      },
      {
        question: 'Which of the following are front-end frameworks?',
        options: ['React', 'Hono', 'React Native', 'Express'],
        type: QuestionType.MultipleChoiceSingle,
        answer: ['React'],
        explanation: 'React is a front-end framework.'
      },
      {
        question: 'Which of the following are back-end frameworks?',
        options: ['Express', 'Angular', 'Vue', 'React'],
        type: QuestionType.MultipleChoiceSingle,
        answer: ['Express'],
        explanation: 'Express is a back-end framework.'
      }
    ]
  }
};

export const falseOrTrueQuiz: GenerateQuiz = {
  quiz: {
    questions: [
      {
        question:
          'Colombia es reconocida por tener una de las biodiversidades más ricas del mundo.',
        options: ['Verdadero', 'Falso'],
        answer: ['Verdadero'],
        explanation:
          'El texto menciona explícitamente que Colombia es reconocida como una de las más ricas del mundo en términos de biodiversidad.',
        type: QuestionType.TrueOrFalse
      },
      {
        question:
          'El impacto del cambio climático no ha afectado la biodiversidad en Colombia.',
        options: ['Verdadero', 'Falso'],
        answer: ['Falso'],
        explanation:
          'El texto menciona que el cambio climático afecta significativamente la biodiversidad y los ecosistemas del país.',
        type: QuestionType.TrueOrFalse
      },
      {
        question:
          'El acuerdo de paz en Colombia se firmó en el año 2016 con las FARC.',
        options: ['Verdadero', 'Falso'],
        answer: ['Verdadero'],
        explanation:
          'El texto indica que el Acuerdo de Paz se firmó en 2016 entre el gobierno colombiano y las FARC.',
        type: QuestionType.TrueOrFalse
      }
    ]
  },
  title: 'Quiz sobre Colombia'
};

export const languageQuizMock = {
  title: 'Mock Language Quiz',
  questions: [
    {
      question: 'Read the text and answer: What is the main idea?',
      options: [
        { option: 'To explain a process', isCorrect: false },
        { option: 'To describe a place', isCorrect: false },
        { option: 'To narrate an event', isCorrect: true },
        { option: 'To compare two things', isCorrect: false }
      ],
      type: QuestionTypeLanguage.OpenEnded,
      explanation:
        'The text narrates an event, as seen in the sequence of actions described.'
    },
    {
      question: "Organize the words: 'quickly / the / ran / dog'",
      options: [
        { option: 'The dog ran quickly', isCorrect: true },
        { option: 'Quickly the dog ran', isCorrect: false },
        { option: 'Ran the dog quickly', isCorrect: false },
        { option: 'Dog quickly the ran', isCorrect: false }
      ],
      type: QuestionTypeLanguage.WordOrder,
      explanation:
        "The correct order is 'The dog ran quickly' following English syntax."
    },
    {
      question: 'Fill in the blank: She ___ to the store yesterday.',
      options: [
        { option: 'goes', isCorrect: false },
        { option: 'went', isCorrect: true },
        { option: 'gone', isCorrect: false },
        { option: 'going', isCorrect: false }
      ],
      type: QuestionTypeLanguage.OpenEnded,
      explanation:
        "'Went' is the correct past tense form for 'go' in this context."
    },
    {
      question:
        'Which is the correct answer to: What color is the sky on a clear day?',
      options: [
        { option: 'Blue', isCorrect: true },
        { option: 'Green', isCorrect: false },
        { option: 'Red', isCorrect: false },
        { option: 'Yellow', isCorrect: false }
      ],
      type: QuestionTypeLanguage.MultipleChoiceSingle,
      explanation:
        'The sky appears blue on a clear day due to Rayleigh scattering.'
    },
    {
      question: "Match the correct pair: 'Dog' - ?",
      options: [
        { option: 'Cat', isCorrect: false },
        { option: 'Bark', isCorrect: true },
        { option: 'Meow', isCorrect: false },
        { option: 'Run', isCorrect: false }
      ],
      type: QuestionTypeLanguage.WordMatch,
      explanation: "'Bark' is the sound a dog makes, so it is the correct pair."
    }
  ]
};
