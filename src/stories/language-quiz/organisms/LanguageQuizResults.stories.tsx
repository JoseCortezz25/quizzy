import type { Meta, StoryObj } from '@storybook/react';
import { LanguageQuizResults } from '@/components/language-quiz/organisms/language-quiz-results';
import { LanguageQuestion, LanguageUserAnswer, QuestionTypeLanguage } from '@/lib/types';

const meta: Meta<typeof LanguageQuizResults> = {
  title: 'Language Quiz/Organisms/LanguageQuizResults',
  component: LanguageQuizResults,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**LanguageQuizResults** es el componente que muestra un análisis detallado de los resultados del quiz, proporcionando feedback comprensivo sobre el rendimiento del usuario.

### Características principales:
- ✅ Resumen general del rendimiento (puntuación, porcentaje)
- ✅ Análisis por tipo de ejercicio con estadísticas específicas
- ✅ Revisión detallada pregunta por pregunta
- ✅ Comparación entre respuestas del usuario y respuestas correctas
- ✅ Explicaciones expandibles para respuestas incorrectas
- ✅ Efectos visuales de celebración para buenos resultados
- ✅ Opciones para reintentar o crear nuevo quiz
- ✅ Funcionalidad de compartir en redes sociales

### Funcionalidades destacadas:
- **Performance Metrics**: Cálculo automático de estadísticas
- **Visual Feedback**: Colores e iconos para resultado inmediato
- **Detailed Review**: Desglose completo de cada respuesta
- **Exercise Type Analytics**: Rendimiento por categoría de ejercicio
- **Social Sharing**: Compartir logros en Twitter
- **Confetti Animation**: Celebración visual para altos puntajes
- **Responsive Design**: Optimizado para todos los dispositivos
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    onRetry: { action: 'retry quiz' },
    onNewQuiz: { action: 'create new quiz' },
    title: { control: 'text' },
    questions: { control: 'object' },
    userAnswers: { control: 'object' }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample questions for testing
const sampleQuestions: LanguageQuestion[] = [
  {
    id: '1',
    type: QuestionTypeLanguage.MultipleChoiceSingle,
    question: '¿Cuál es la traducción correcta de "Hello"?',
    options: [
      { option: 'Hola', isCorrect: true },
      { option: 'Adiós', isCorrect: false },
      { option: 'Gracias', isCorrect: false }
    ],
    explanation: '"Hello" se traduce como "Hola" en español.'
  },
  {
    id: '2',
    type: QuestionTypeLanguage.WordOrder,
    question: 'Ordena las palabras correctamente:',
    words: ['is', 'The', 'cat', 'sleeping'],
    correctOrder: ['The', 'cat', 'is', 'sleeping'],
    explanation: 'El orden correcto en inglés es sujeto-verbo-complemento.'
  },
  {
    id: '3',
    type: QuestionTypeLanguage.WordMeaning,
    question: '¿Qué significa "vast"?',
    sentence: 'The library has a vast collection.',
    highlightedWord: 'vast',
    options: [
      { option: 'Enorme', isCorrect: true },
      { option: 'Pequeño', isCorrect: false }
    ],
    explanation: '"Vast" significa enorme o muy grande.'
  },
  {
    id: '4',
    type: QuestionTypeLanguage.ReadingComprehension,
    question: '¿Cuál es la actividad principal mencionada?',
    passage: 'Sarah goes jogging every morning in the park for 30 minutes.',
    options: [
      { option: 'Jogging', isCorrect: true },
      { option: 'Reading', isCorrect: false }
    ],
    explanation: 'El texto dice claramente que Sarah hace jogging cada mañana.'
  }
];

// Perfect score answers
const perfectAnswers: LanguageUserAnswer[] = [
  {
    questionId: '1',
    type: QuestionTypeLanguage.MultipleChoiceSingle,
    isCorrect: true,
    selectedOptions: ['Hola']
  },
  {
    questionId: '2',
    type: QuestionTypeLanguage.WordOrder,
    isCorrect: true,
    orderedWords: ['The', 'cat', 'is', 'sleeping']
  },
  {
    questionId: '3',
    type: QuestionTypeLanguage.WordMeaning,
    isCorrect: true,
    selectedOption: 'Enorme'
  },
  {
    questionId: '4',
    type: QuestionTypeLanguage.ReadingComprehension,
    isCorrect: true,
    selectedOption: 'Jogging'
  }
];

// Mixed score answers
const mixedAnswers: LanguageUserAnswer[] = [
  {
    questionId: '1',
    type: QuestionTypeLanguage.MultipleChoiceSingle,
    isCorrect: true,
    selectedOptions: ['Hola']
  },
  {
    questionId: '2',
    type: QuestionTypeLanguage.WordOrder,
    isCorrect: false,
    orderedWords: ['Cat', 'the', 'sleeping', 'is']
  },
  {
    questionId: '3',
    type: QuestionTypeLanguage.WordMeaning,
    isCorrect: false,
    selectedOption: 'Pequeño'
  },
  {
    questionId: '4',
    type: QuestionTypeLanguage.ReadingComprehension,
    isCorrect: true,
    selectedOption: 'Jogging'
  }
];

// Poor score answers
const poorAnswers: LanguageUserAnswer[] = [
  {
    questionId: '1',
    type: QuestionTypeLanguage.MultipleChoiceSingle,
    isCorrect: false,
    selectedOptions: ['Adiós']
  },
  {
    questionId: '2',
    type: QuestionTypeLanguage.WordOrder,
    isCorrect: false,
    orderedWords: ['Cat', 'the', 'sleeping', 'is']
  },
  {
    questionId: '3',
    type: QuestionTypeLanguage.WordMeaning,
    isCorrect: false,
    selectedOption: 'Pequeño'
  },
  {
    questionId: '4',
    type: QuestionTypeLanguage.ReadingComprehension,
    isCorrect: true,
    selectedOption: 'Jogging'
  }
];

export const PerfectScore: Story = {
  args: {
    questions: sampleQuestions,
    userAnswers: perfectAnswers,
    title: 'English Basics Quiz',
    onRetry: () => console.log('Retry quiz'),
    onNewQuiz: () => console.log('New quiz')
  },
  parameters: {
    docs: {
      description: {
        story: 'Resultado perfecto (100%) con animación de confetti y mensaje de excelencia.'
      }
    }
  }
};

export const GoodScore: Story = {
  args: {
    questions: sampleQuestions,
    userAnswers: mixedAnswers,
    title: 'Vocabulario Intermedio',
    onRetry: () => console.log('Retry quiz'),
    onNewQuiz: () => console.log('New quiz')
  },
  parameters: {
    docs: {
      description: {
        story: 'Buen resultado (75%) mostrando mezcla de respuestas correctas e incorrectas.'
      }
    }
  }
};

export const PoorScore: Story = {
  args: {
    questions: sampleQuestions,
    userAnswers: poorAnswers,
    title: 'Grammar Challenge',
    onRetry: () => console.log('Retry quiz'),
    onNewQuiz: () => console.log('New quiz')
  },
  parameters: {
    docs: {
      description: {
        story: 'Resultado bajo (25%) con mensaje motivacional para seguir practicando.'
      }
    }
  }
};

export const ComplexQuizResults: Story = {
  args: {
    questions: [
      ...sampleQuestions,
      {
        id: '5',
        type: QuestionTypeLanguage.MultipleChoiceMultiple,
        question: 'Selecciona todos los verbos:',
        options: [
          { option: 'Run', isCorrect: true },
          { option: 'Beautiful', isCorrect: false },
          { option: 'Eat', isCorrect: true },
          { option: 'Quickly', isCorrect: false }
        ],
        explanation: 'Run y Eat son verbos de acción.'
      },
      {
        id: '6',
        type: QuestionTypeLanguage.WordMatch,
        question: 'Empareja las palabras:',
        pairs: [
          { word: 'Dog', translation: 'Perro' },
          { word: 'Cat', translation: 'Gato' }
        ],
        explanation: 'Emparejamientos básicos de animales.'
      },
      {
        id: '7',
        type: QuestionTypeLanguage.OpenEnded,
        question: '¿Cómo se dice "Thank you"?',
        expectedAnswer: 'Gracias',
        explanation: 'La traducción correcta es "Gracias".'
      }
    ],
    userAnswers: [
      ...mixedAnswers,
      {
        questionId: '5',
        type: QuestionTypeLanguage.MultipleChoiceMultiple,
        isCorrect: true,
        selectedOptions: ['Run', 'Eat']
      },
      {
        questionId: '6',
        type: QuestionTypeLanguage.WordMatch,
        isCorrect: false,
        matches: [
          { word: 'Dog', translation: 'Gato' },
          { word: 'Cat', translation: 'Perro' }
        ]
      },
      {
        questionId: '7',
        type: QuestionTypeLanguage.OpenEnded,
        isCorrect: true,
        answer: 'Gracias'
      }
    ],
    title: 'Quiz Comprensivo de 7 Ejercicios',
    onRetry: () => console.log('Retry comprehensive quiz'),
    onNewQuiz: () => console.log('New comprehensive quiz')
  },
  parameters: {
    docs: {
      description: {
        story: 'Quiz completo mostrando todos los 7 tipos de ejercicios con análisis detallado por categoría.'
      }
    }
  }
};

export const SingleQuestionResult: Story = {
  args: {
    questions: [sampleQuestions[0]],
    userAnswers: [perfectAnswers[0]],
    title: 'Quiz Rápido',
    onRetry: () => console.log('Retry single question'),
    onNewQuiz: () => console.log('New single question quiz')
  },
  parameters: {
    docs: {
      description: {
        story: 'Resultado de un quiz de una sola pregunta mostrando interfaz simplificada.'
      }
    }
  }
};

export const AllExerciseTypes: Story = {
  args: {
    questions: [
      {
        id: '1',
        type: QuestionTypeLanguage.OpenEnded,
        question: 'Write the past tense of "go":',
        expectedAnswer: 'went',
        explanation: 'The past tense of "go" is "went".'
      },
      {
        id: '2',
        type: QuestionTypeLanguage.MultipleChoiceSingle,
        question: 'Choose the correct article:',
        options: [
          { option: 'a', isCorrect: false },
          { option: 'an', isCorrect: true },
          { option: 'the', isCorrect: false }
        ],
        explanation: 'Use "an" before vowel sounds.'
      },
      {
        id: '3',
        type: QuestionTypeLanguage.MultipleChoiceMultiple,
        question: 'Select all adjectives:',
        options: [
          { option: 'Beautiful', isCorrect: true },
          { option: 'Run', isCorrect: false },
          { option: 'Happy', isCorrect: true },
          { option: 'Quickly', isCorrect: false }
        ],
        explanation: 'Beautiful and Happy describe nouns.'
      },
      {
        id: '4',
        type: QuestionTypeLanguage.WordOrder,
        question: 'Order the words:',
        words: ['I', 'am', 'a', 'student'],
        correctOrder: ['I', 'am', 'a', 'student'],
        explanation: 'Subject + verb + article + noun.'
      },
      {
        id: '5',
        type: QuestionTypeLanguage.WordMeaning,
        question: 'What does "enormous" mean?',
        sentence: 'The elephant is enormous.',
        highlightedWord: 'enormous',
        options: [
          { option: 'Very large', isCorrect: true },
          { option: 'Small', isCorrect: false }
        ],
        explanation: 'Enormous means very large or huge.'
      },
      {
        id: '6',
        type: QuestionTypeLanguage.WordMatch,
        question: 'Match colors:',
        pairs: [
          { word: 'Red', translation: 'Rojo' },
          { word: 'Blue', translation: 'Azul' }
        ],
        explanation: 'Basic color translations.'
      },
      {
        id: '7',
        type: QuestionTypeLanguage.ReadingComprehension,
        question: 'What time does the store open?',
        passage: 'The bookstore opens at 9 AM and closes at 6 PM daily.',
        options: [
          { option: '9 AM', isCorrect: true },
          { option: '6 PM', isCorrect: false }
        ],
        explanation: 'The passage states it opens at 9 AM.'
      }
    ],
    userAnswers: [
      {
        questionId: '1',
        type: QuestionTypeLanguage.OpenEnded,
        isCorrect: true,
        answer: 'went'
      },
      {
        questionId: '2',
        type: QuestionTypeLanguage.MultipleChoiceSingle,
        isCorrect: false,
        selectedOptions: ['a']
      },
      {
        questionId: '3',
        type: QuestionTypeLanguage.MultipleChoiceMultiple,
        isCorrect: true,
        selectedOptions: ['Beautiful', 'Happy']
      },
      {
        questionId: '4',
        type: QuestionTypeLanguage.WordOrder,
        isCorrect: true,
        orderedWords: ['I', 'am', 'a', 'student']
      },
      {
        questionId: '5',
        type: QuestionTypeLanguage.WordMeaning,
        isCorrect: true,
        selectedOption: 'Very large'
      },
      {
        questionId: '6',
        type: QuestionTypeLanguage.WordMatch,
        isCorrect: false,
        matches: [
          { word: 'Red', translation: 'Azul' },
          { word: 'Blue', translation: 'Rojo' }
        ]
      },
      {
        questionId: '7',
        type: QuestionTypeLanguage.ReadingComprehension,
        isCorrect: true,
        selectedOption: '9 AM'
      }
    ],
    title: 'Complete Exercise Types Demo',
    onRetry: () => console.log('Retry all types'),
    onNewQuiz: () => console.log('New all types quiz')
  },
  parameters: {
    docs: {
      description: {
        story: 'Demostración completa con todos los 7 tipos de ejercicios mostrando el análisis detallado por categoría.'
      }
    }
  }
};

export const InteractiveDemo: Story = {
  render: () => {
    const handleRetry = () => {
      alert('¡Funcionalidad de reintentar activada! En la aplicación real, esto reiniciaría el quiz.');
    };

    const handleNewQuiz = () => {
      alert('¡Funcionalidad de nuevo quiz activada! En la aplicación real, esto abriría el generador de quiz.');
    };

    return (
      <div className="space-y-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">📊 Funcionalidades de Resultados:</h3>
          <ul className="text-green-700 text-sm space-y-1">
            <li>• <strong>Estadísticas generales:</strong> Puntuación total y porcentaje</li>
            <li>• <strong>Análisis por tipo:</strong> Rendimiento en cada categoría de ejercicio</li>
            <li>• <strong>Revisión detallada:</strong> Cada pregunta con respuesta correcta vs incorrecta</li>
            <li>• <strong>Explicaciones:</strong> Haz clic en &quot;Ver explicación&quot; para más detalles</li>
            <li>• <strong>Acciones:</strong> Reintentar quiz o crear uno nuevo</li>
            <li>• <strong>Compartir:</strong> Publica tus logros en redes sociales</li>
          </ul>
        </div>

        <LanguageQuizResults
          questions={sampleQuestions}
          userAnswers={mixedAnswers}
          title="Demo Interactivo - Resultados"
          onRetry={handleRetry}
          onNewQuiz={handleNewQuiz}
        />

        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-medium text-yellow-800 mb-2">🎯 Características destacadas:</h4>
          <ul className="text-yellow-700 text-sm space-y-1">
            <li>• <strong>Confetti Animation:</strong> Se activa automáticamente con puntajes ≥80%</li>
            <li>• <strong>Performance Messages:</strong> Mensajes motivacionales basados en el puntaje</li>
            <li>• <strong>Color Coding:</strong> Verde para correcto, rojo para incorrecto</li>
            <li>• <strong>Responsive Design:</strong> Se adapta a móviles y escritorio</li>
            <li>• <strong>Social Sharing:</strong> Genera tweets personalizados con resultados</li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demo completamente interactivo mostrando todas las funcionalidades de los resultados del quiz.'
      }
    }
  }
};