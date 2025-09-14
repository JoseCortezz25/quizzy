import type { Meta, StoryObj } from '@storybook/react';
import { MultipleChoiceSingleExercise } from '../../../components/language-quiz/molecules/multiple-choice-single-exercise';
import { MultipleChoiceSingleQuestion, QuestionTypeLanguage } from '../../../lib/types';
import React from 'react';

const meta: Meta<typeof MultipleChoiceSingleExercise> = {
  title: 'Language Quiz/Molecules/MultipleChoiceSingleExercise',
  component: MultipleChoiceSingleExercise,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**MultipleChoiceSingleExercise** presenta preguntas con múltiples opciones donde solo una es correcta.

### Características:
- ✅ Auto-submit al seleccionar una opción
- ✅ Feedback visual inmediato
- ✅ Estados claros: seleccionado, correcto, incorrecto
- ✅ Explicaciones educativas detalladas

### Casos de uso:
- Preguntas de vocabulario
- Traducción de palabras
- Gramática básica
- Comprensión de reglas lingüísticas
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

const baseQuestion: MultipleChoiceSingleQuestion = {
  id: '1',
  type: QuestionTypeLanguage.MultipleChoiceSingle,
  question: '¿Cuál es la traducción correcta de "Thank you" en español?',
  options: [
    { option: 'Por favor', isCorrect: false },
    { option: 'Gracias', isCorrect: true },
    { option: 'De nada', isCorrect: false },
    { option: 'Perdón', isCorrect: false }
  ],
  explanation: '"Gracias" es la traducción correcta de "Thank you" en español. Es una expresión básica de cortesía.'
};

export const Default: Story = {
  args: {
    question: baseQuestion
  },
  parameters: {
    docs: {
      description: {
        story: 'Estado inicial del ejercicio con cuatro opciones de respuesta.'
      }
    }
  }
};

export const WithSelectedAnswer: Story = {
  args: {
    question: baseQuestion,
    userAnswer: ['Gracias']
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejercicio con una opción ya seleccionada por el usuario.'
      }
    }
  }
};

export const ShowingCorrectResult: Story = {
  args: {
    question: baseQuestion,
    userAnswer: ['Gracias'],
    showResult: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Resultado mostrando la respuesta correcta con feedback positivo y explicación.'
      }
    }
  }
};

export const ShowingIncorrectResult: Story = {
  args: {
    question: baseQuestion,
    userAnswer: ['Por favor'],
    showResult: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Resultado mostrando una respuesta incorrecta con feedback negativo y la respuesta correcta resaltada.'
      }
    }
  }
};

export const GrammarQuestion: Story = {
  args: {
    question: {
      id: '2',
      type: QuestionTypeLanguage.MultipleChoiceSingle,
      question: '¿Cuál es la forma correcta del verbo "to be" en tercera persona singular?',
      options: [
        { option: 'am', isCorrect: false },
        { option: 'is', isCorrect: true },
        { option: 'are', isCorrect: false },
        { option: 'be', isCorrect: false }
      ],
      explanation: '"Is" es la forma correcta del verbo "to be" para la tercera persona singular (he/she/it).'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejercicio de gramática sobre conjugación verbal en inglés.'
      }
    }
  }
};

export const VocabularyQuestion: Story = {
  args: {
    question: {
      id: '3',
      type: QuestionTypeLanguage.MultipleChoiceSingle,
      question: 'What does "biblioteca" mean in English?',
      options: [
        { option: 'Hospital', isCorrect: false },
        { option: 'School', isCorrect: false },
        { option: 'Library', isCorrect: true },
        { option: 'Museum', isCorrect: false }
      ],
      explanation: '"Biblioteca" means "library" in English - a place where books are kept for reading or borrowing.'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejercicio de vocabulario básico español-inglés.'
      }
    }
  }
};

export const ArticlesExercise: Story = {
  args: {
    question: {
      id: '4',
      type: QuestionTypeLanguage.MultipleChoiceSingle,
      question: 'Choose the correct article for "casa" (house):',
      options: [
        { option: 'el casa', isCorrect: false },
        { option: 'la casa', isCorrect: true },
        { option: 'los casa', isCorrect: false },
        { option: 'las casa', isCorrect: false }
      ],
      explanation: '"La casa" es correcto porque "casa" es un sustantivo femenino singular en español.'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejercicio sobre artículos definidos en español, mostrando concordancia de género.'
      }
    }
  }
};

export const LongOptionsExample: Story = {
  args: {
    question: {
      id: '5',
      type: QuestionTypeLanguage.MultipleChoiceSingle,
      question: 'Which sentence correctly uses the present perfect tense?',
      options: [
        { option: 'I have been studying Spanish for three years and I love it', isCorrect: true },
        { option: 'I am studying Spanish for three years now', isCorrect: false },
        { option: 'I study Spanish for three years', isCorrect: false },
        { option: 'I was studying Spanish for three years', isCorrect: false }
      ],
      explanation: 'Present perfect (have + past participle) is used for actions that started in the past and continue to the present.'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejercicio con opciones más largas para demostrar el manejo del diseño responsivo.'
      }
    }
  }
};

export const InteractiveDemo: Story = {
  render: () => {
    const demoQuestion: MultipleChoiceSingleQuestion = {
      id: 'demo',
      type: QuestionTypeLanguage.MultipleChoiceSingle,
      question: 'What is the plural of "child" in English?',
      options: [
        { option: 'childs', isCorrect: false },
        { option: 'children', isCorrect: true },
        { option: 'childes', isCorrect: false },
        { option: 'child', isCorrect: false }
      ],
      explanation: '"Children" is the irregular plural form of "child" in English.'
    };

    return (
      <div className="space-y-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">🎯 Funcionamiento:</h3>
          <ul className="text-green-700 text-sm space-y-1">
            <li>• Haz clic en una opción para seleccionarla</li>
            <li>• La respuesta se envía automáticamente</li>
            <li>• Solo puedes seleccionar una opción</li>
            <li>• Mira la consola para ver las respuestas</li>
          </ul>
        </div>

        <MultipleChoiceSingleExercise
          question={demoQuestion}
          onAnswer={(answer) => console.log('User selected:', answer)}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demo interactivo mostrando el comportamiento de selección única con auto-submit.'
      }
    }
  }
};