import type { Meta, StoryObj } from '@storybook/react';
import { WordMeaningExercise } from '@/components/language-quiz/molecules/word-meaning-exercise';
import { WordMeaningQuestion, QuestionTypeLanguage } from '@/lib/types';

const meta: Meta<typeof WordMeaningExercise> = {
  title: 'Language Quiz/Molecules/WordMeaningExercise',
  component: WordMeaningExercise,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**WordMeaningExercise** ayuda a los usuarios a entender el significado de palabras en contexto.

### Características:
- ✅ Palabra destacada visualmente en la oración
- ✅ Contexto completo para inferir significado
- ✅ Múltiples opciones de significado
- ✅ Auto-submit al seleccionar una opción

### Casos de uso:
- Comprensión de vocabulario en contexto
- Palabras con múltiples significados
- Expresiones idiomáticas
- Vocabulario técnico o especializado
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    onAnswer: { action: 'answered' },
    showResult: { control: 'boolean' }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const baseQuestion: WordMeaningQuestion = {
  id: '1',
  type: QuestionTypeLanguage.WordMeaning,
  question: '¿Qué significa la palabra destacada en esta frase?',
  sentence: 'The old library has a vast collection of rare books.',
  highlightedWord: 'vast',
  options: [
    { option: 'Pequeña', isCorrect: false },
    { option: 'Antigua', isCorrect: false },
    { option: 'Enorme', isCorrect: true },
    { option: 'Cara', isCorrect: false }
  ],
  explanation: '"Vast" significa "enorme" o "muy grande" en español. Se refiere al tamaño de la colección de libros.'
};

export const Default: Story = {
  args: {
    question: baseQuestion
  },
  parameters: {
    docs: {
      description: {
        story: 'Estado básico mostrando una palabra destacada en contexto con opciones de significado.'
      }
    }
  }
};

export const WithSelectedAnswer: Story = {
  args: {
    question: baseQuestion,
    userAnswer: 'Enorme'
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejercicio con una opción de significado ya seleccionada.'
      }
    }
  }
};

export const ShowingCorrectResult: Story = {
  args: {
    question: baseQuestion,
    userAnswer: 'Enorme',
    showResult: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Resultado correcto con feedback positivo y explicación del significado.'
      }
    }
  }
};

export const ShowingIncorrectResult: Story = {
  args: {
    question: baseQuestion,
    userAnswer: 'Pequeña',
    showResult: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Resultado incorrecto mostrando la opción incorrecta vs la correcta.'
      }
    }
  }
};

export const SpanishToEnglish: Story = {
  args: {
    question: {
      id: '2',
      type: QuestionTypeLanguage.WordMeaning,
      question: '¿Qué significa la palabra resaltada en este contexto?',
      sentence: 'El estudiante estaba muy emocionado por su viaje a París.',
      highlightedWord: 'emocionado',
      options: [
        { option: 'Sad', isCorrect: false },
        { option: 'Excited', isCorrect: true },
        { option: 'Angry', isCorrect: false },
        { option: 'Tired', isCorrect: false }
      ],
      explanation: '"Emocionado" in this context means "excited" - showing enthusiasm about the trip to Paris.'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejercicio de español a inglés mostrando contexto emocional.'
      }
    }
  }
};

export const FormalContext: Story = {
  args: {
    question: {
      id: '3',
      type: QuestionTypeLanguage.WordMeaning,
      question: 'What does the highlighted word mean in this formal context?',
      sentence: 'The committee will deliberate on the proposed changes to the policy.',
      highlightedWord: 'deliberate',
      options: [
        { option: 'Ignore', isCorrect: false },
        { option: 'Discuss carefully', isCorrect: true },
        { option: 'Reject', isCorrect: false },
        { option: 'Approve quickly', isCorrect: false }
      ],
      explanation: '"Deliberate" means to think about or discuss something carefully, especially in a formal setting like a committee.'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejercicio con vocabulario formal y profesional.'
      }
    }
  }
};

export const IdiomsExercise: Story = {
  args: {
    question: {
      id: '4',
      type: QuestionTypeLanguage.WordMeaning,
      question: 'What does the highlighted phrase mean?',
      sentence: 'She decided to call it a day after working for twelve hours straight.',
      highlightedWord: 'call it a day',
      options: [
        { option: 'Make a phone call', isCorrect: false },
        { option: 'Stop working', isCorrect: true },
        { option: 'Start working', isCorrect: false },
        { option: 'Work harder', isCorrect: false }
      ],
      explanation: '"Call it a day" is an idiom that means to stop working or to finish what you are doing for the day.'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejercicio con expresiones idiomáticas en inglés.'
      }
    }
  }
};

export const TechnicalVocabulary: Story = {
  args: {
    question: {
      id: '5',
      type: QuestionTypeLanguage.WordMeaning,
      question: 'In this programming context, what does the highlighted word mean?',
      sentence: 'The function will iterate through all elements in the array.',
      highlightedWord: 'iterate',
      options: [
        { option: 'Delete', isCorrect: false },
        { option: 'Loop through', isCorrect: true },
        { option: 'Count', isCorrect: false },
        { option: 'Sort', isCorrect: false }
      ],
      explanation: 'In programming, "iterate" means to loop through or go through each element one by one.'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejercicio con vocabulario técnico especializado (programación).'
      }
    }
  }
};

export const ContextualMeanings: Story = {
  args: {
    question: {
      id: '6',
      type: QuestionTypeLanguage.WordMeaning,
      question: 'What does "run" mean in this business context?',
      sentence: 'She decided to run a small bakery in her neighborhood.',
      highlightedWord: 'run',
      options: [
        { option: 'Jog quickly', isCorrect: false },
        { option: 'Operate/manage', isCorrect: true },
        { option: 'Escape from', isCorrect: false },
        { option: 'Move fast', isCorrect: false }
      ],
      explanation: 'In business context, "run" means to operate or manage a business.'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejercicio mostrando cómo las palabras cambian significado según el contexto.'
      }
    }
  }
};

export const AdvancedVocabulary: Story = {
  args: {
    question: {
      id: '7',
      type: QuestionTypeLanguage.WordMeaning,
      question: 'What does the highlighted word mean in this literary context?',
      sentence: 'The novel has a compelling plot that keeps readers engaged.',
      highlightedWord: 'compelling',
      options: [
        { option: 'Boring', isCorrect: false },
        { option: 'Interesting/captivating', isCorrect: true },
        { option: 'Short', isCorrect: false },
        { option: 'Confusing', isCorrect: false }
      ],
      explanation: '"Compelling" means very interesting or captivating, something that holds your attention.'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejercicio con vocabulario avanzado en contexto literario.'
      }
    }
  }
};

export const InteractiveDemo: Story = {
  render: () => {
    const demoQuestion: WordMeaningQuestion = {
      id: 'demo',
      type: QuestionTypeLanguage.WordMeaning,
      question: 'What does the highlighted word mean in this sentence?',
      sentence: 'The weather forecast predicts heavy rain tomorrow.',
      highlightedWord: 'forecast',
      options: [
        { option: 'Yesterday\'s weather', isCorrect: false },
        { option: 'Prediction', isCorrect: true },
        { option: 'Temperature', isCorrect: false },
        { option: 'Wind speed', isCorrect: false }
      ],
      explanation: '"Forecast" means a prediction or estimate of future weather conditions.'
    };

    return (
      <div className="space-y-6">
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-2">🔍 Comprensión en Contexto:</h3>
          <ul className="text-yellow-700 text-sm space-y-1">
            <li>• La palabra está destacada con fondo amarillo</li>
            <li>• Usa el contexto para inferir el significado</li>
            <li>• Haz clic en la opción que consideres correcta</li>
            <li>• El significado puede variar según el contexto</li>
          </ul>
        </div>

        <WordMeaningExercise
          question={demoQuestion}
          onAnswer={(answer) => console.log('Selected meaning:', answer)}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demo interactivo mostrando cómo funciona el resaltado de palabras y la selección de significado.'
      }
    }
  }
};