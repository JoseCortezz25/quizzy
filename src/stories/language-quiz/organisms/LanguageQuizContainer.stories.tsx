import type { Meta, StoryObj } from '@storybook/react';
import { LanguageQuizContainer } from '@/components/language-quiz/organisms/language-quiz-container';
import { LanguageQuestion, QuestionTypeLanguage } from '@/lib/types';

const meta: Meta<typeof LanguageQuizContainer> = {
  title: 'Language Quiz/Organisms/LanguageQuizContainer',
  component: LanguageQuizContainer,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**LanguageQuizContainer** es el componente principal que orquesta todo el flujo del quiz de idiomas, desde la navegación entre preguntas hasta la visualización de resultados.

### Características principales:
- ✅ Navegación fluida entre preguntas con barra de progreso
- ✅ Soporte para los 7 tipos diferentes de ejercicios
- ✅ Validación automática de respuestas
- ✅ Vista de resultados integrada al finalizar
- ✅ Controles de navegación inteligentes (anterior/siguiente)
- ✅ Callbacks personalizables para retry y nuevo quiz

### Funcionalidades:
- **Gestión de estado**: Maneja respuestas, progreso y navegación
- **Validación**: Verifica respuestas según el tipo de ejercicio
- **Progress tracking**: Barra visual y porcentaje de completado
- **Results integration**: Transición automática a vista de resultados
- **Responsive design**: Optimizado para mobile y desktop
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    onComplete: { action: 'quiz completed' },
    onRetry: { action: 'quiz retry' },
    onNewQuiz: { action: 'new quiz requested' },
    title: { control: 'text' },
    questions: { control: 'object' }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const mixedQuestions: LanguageQuestion[] = [
  {
    id: '1',
    type: QuestionTypeLanguage.MultipleChoiceSingle,
    question: '¿Cuál es la traducción correcta de "Hello" en español?',
    options: [
      { option: 'Adiós', isCorrect: false },
      { option: 'Hola', isCorrect: true },
      { option: 'Gracias', isCorrect: false },
      { option: 'Por favor', isCorrect: false }
    ],
    explanation: '"Hello" se traduce como "Hola" en español.'
  },
  {
    id: '2',
    type: QuestionTypeLanguage.WordOrder,
    question: 'Ordena las palabras para formar una oración correcta:',
    words: ['is', 'The', 'cat', 'sleeping'],
    correctOrder: ['The', 'cat', 'is', 'sleeping'],
    explanation: 'En inglés, el orden básico es sujeto-verbo-complemento: "The cat is sleeping".'
  },
  {
    id: '3',
    type: QuestionTypeLanguage.WordMeaning,
    question: '¿Qué significa la palabra destacada en esta frase?',
    sentence: 'The library has a vast collection of books.',
    highlightedWord: 'vast',
    options: [
      { option: 'Pequeña', isCorrect: false },
      { option: 'Antigua', isCorrect: false },
      { option: 'Enorme', isCorrect: true },
      { option: 'Cara', isCorrect: false }
    ],
    explanation: '"Vast" significa "enorme" o "muy grande" en español.'
  }
];

const englishGrammarQuiz: LanguageQuestion[] = [
  {
    id: '1',
    type: QuestionTypeLanguage.MultipleChoiceMultiple,
    question: 'Which of these sentences use present simple correctly?',
    options: [
      { option: 'She goes to school every day.', isCorrect: true },
      { option: 'He are playing football now.', isCorrect: false },
      { option: 'They live in London.', isCorrect: true },
      { option: 'I am eat lunch.', isCorrect: false }
    ],
    explanation: 'Present simple uses base form with -s for third person singular.'
  },
  {
    id: '2',
    type: QuestionTypeLanguage.WordMatch,
    question: 'Match each word with its correct translation:',
    pairs: [
      { word: 'House', translation: 'Casa' },
      { word: 'Car', translation: 'Coche' },
      { word: 'Book', translation: 'Libro' }
    ],
    explanation: 'Basic vocabulary matching between English and Spanish.'
  },
  {
    id: '3',
    type: QuestionTypeLanguage.ReadingComprehension,
    question: 'What is the main activity mentioned in the passage?',
    passage: 'Every morning, Sarah goes jogging in the park. She enjoys the fresh air and exercises for about 30 minutes before starting her workday.',
    options: [
      { option: 'Working in an office', isCorrect: false },
      { option: 'Jogging in the park', isCorrect: true },
      { option: 'Reading books', isCorrect: false },
      { option: 'Cooking breakfast', isCorrect: false }
    ],
    explanation: 'The passage clearly states that Sarah goes jogging in the park every morning.'
  }
];

const spanishVocabularyQuiz: LanguageQuestion[] = [
  {
    id: '1',
    type: QuestionTypeLanguage.OpenEnded,
    question: '¿Cómo se dice "Thank you" en español?',
    expectedAnswer: 'Gracias',
    explanation: '"Thank you" se traduce como "Gracias" en español.'
  },
  {
    id: '2',
    type: QuestionTypeLanguage.WordOrder,
    question: 'Ordena estas palabras para formar una pregunta:',
    words: ['¿', 'llamas', 'Cómo', 'te', '?'],
    correctOrder: ['¿', 'Cómo', 'te', 'llamas', '?'],
    explanation: 'La estructura correcta es "¿Cómo te llamas?" para preguntar el nombre.'
  }
];

export const Default: Story = {
  args: {
    questions: mixedQuestions,
    title: 'Quiz de Práctica de Idiomas',
    onComplete: (answers) => console.log('Quiz completed:', answers),
    onRetry: () => console.log('Retry quiz'),
    onNewQuiz: () => console.log('New quiz requested')
  },
  parameters: {
    docs: {
      description: {
        story: 'Quiz básico con diferentes tipos de ejercicios mostrando la funcionalidad completa del contenedor.'
      }
    }
  }
};

export const EnglishGrammarQuiz: Story = {
  args: {
    questions: englishGrammarQuiz,
    title: 'English Grammar Practice',
    onComplete: (answers) => console.log('Grammar quiz completed:', answers),
    onRetry: () => console.log('Retry grammar quiz'),
    onNewQuiz: () => console.log('New grammar quiz')
  },
  parameters: {
    docs: {
      description: {
        story: 'Quiz especializado en gramática inglesa con ejercicios de selección múltiple, emparejamiento y comprensión lectora.'
      }
    }
  }
};

export const SpanishVocabularyQuiz: Story = {
  args: {
    questions: spanishVocabularyQuiz,
    title: 'Vocabulario Básico en Español',
    onComplete: (answers) => console.log('Spanish quiz completed:', answers),
    onRetry: () => console.log('Retry Spanish quiz'),
    onNewQuiz: () => console.log('New Spanish quiz')
  },
  parameters: {
    docs: {
      description: {
        story: 'Quiz enfocado en vocabulario español básico con respuestas abiertas y ordenamiento de palabras.'
      }
    }
  }
};

export const SingleQuestionQuiz: Story = {
  args: {
    questions: [mixedQuestions[0]],
    title: 'Quiz de Una Pregunta',
    onComplete: (answers) => console.log('Single question answered:', answers)
  },
  parameters: {
    docs: {
      description: {
        story: 'Quiz de una sola pregunta mostrando el comportamiento con contenido mínimo.'
      }
    }
  }
};

export const LongQuiz: Story = {
  args: {
    questions: [
      ...mixedQuestions,
      ...englishGrammarQuiz,
      ...spanishVocabularyQuiz,
      {
        id: '7',
        type: QuestionTypeLanguage.WordMeaning,
        question: 'What does "ubiquitous" mean?',
        sentence: 'Smartphones have become ubiquitous in modern society.',
        highlightedWord: 'ubiquitous',
        options: [
          { option: 'Rare', isCorrect: false },
          { option: 'Expensive', isCorrect: false },
          { option: 'Everywhere/common', isCorrect: true },
          { option: 'Outdated', isCorrect: false }
        ],
        explanation: '"Ubiquitous" means present, appearing, or found everywhere.'
      },
      {
        id: '8',
        type: QuestionTypeLanguage.MultipleChoiceSingle,
        question: 'Which is the correct past tense of "go"?',
        options: [
          { option: 'Goed', isCorrect: false },
          { option: 'Went', isCorrect: true },
          { option: 'Gone', isCorrect: false },
          { option: 'Going', isCorrect: false }
        ],
        explanation: 'The past tense of "go" is "went" (irregular verb).'
      }
    ],
    title: 'Quiz Comprensivo de Idiomas',
    onComplete: (answers) => console.log('Long quiz completed:', answers),
    onRetry: () => console.log('Retry long quiz'),
    onNewQuiz: () => console.log('New long quiz')
  },
  parameters: {
    docs: {
      description: {
        story: 'Quiz largo con 8 preguntas mostrando la barra de progreso y navegación completa.'
      }
    }
  }
};

export const InteractiveDemo: Story = {
  render: () => {
    const demoQuestions: LanguageQuestion[] = [
      {
        id: 'demo1',
        type: QuestionTypeLanguage.MultipleChoiceSingle,
        question: 'Choose the correct greeting in Spanish:',
        options: [
          { option: 'Buenos días', isCorrect: true },
          { option: 'Buenas noches', isCorrect: false },
          { option: 'Hasta luego', isCorrect: false }
        ],
        explanation: '"Buenos días" means "Good morning" and is used as a greeting.'
      },
      {
        id: 'demo2',
        type: QuestionTypeLanguage.WordMatch,
        question: 'Match the English words with their Spanish translations:',
        pairs: [
          { word: 'Dog', translation: 'Perro' },
          { word: 'Cat', translation: 'Gato' },
          { word: 'Bird', translation: 'Pájaro' }
        ],
        explanation: 'These are basic animal names in English and Spanish.'
      },
      {
        id: 'demo3',
        type: QuestionTypeLanguage.WordOrder,
        question: 'Put these words in the correct order:',
        words: ['am', 'I', 'student', 'a'],
        correctOrder: ['I', 'am', 'a', 'student'],
        explanation: 'The correct order is: Subject + Verb + Article + Noun.'
      }
    ];

    return (
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">🎯 Cómo usar el Quiz Container:</h3>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• Progresa por las preguntas usando los botones de navegación</li>
            <li>• La barra de progreso muestra tu avance en tiempo real</li>
            <li>• Cada ejercicio se valida automáticamente</li>
            <li>• Al finalizar verás los resultados completos</li>
            <li>• Puedes reintentar o generar un nuevo quiz</li>
          </ul>
        </div>

        <LanguageQuizContainer
          questions={demoQuestions}
          title="Demo Interactivo - Language Quiz"
          onComplete={(answers) => console.log('Demo completed:', answers)}
          onRetry={() => console.log('Demo retry')}
          onNewQuiz={() => console.log('New demo quiz')}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demo completamente interactivo mostrando el flujo completo del quiz desde el inicio hasta los resultados.'
      }
    }
  }
};