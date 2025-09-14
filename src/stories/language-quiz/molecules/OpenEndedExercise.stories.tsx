import type { Meta, StoryObj } from '@storybook/react';
import { OpenEndedExercise } from '../../../components/language-quiz/molecules/open-ended-exercise';
import { OpenEndedQuestion, QuestionTypeLanguage } from '../../../lib/types';
import React from 'react';

const meta: Meta<typeof OpenEndedExercise> = {
  title: 'Language Quiz/Molecules/OpenEndedExercise',
  component: OpenEndedExercise,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**OpenEndedExercise** permite a los usuarios escribir respuestas libres para preguntas de traducción, gramática o vocabulario.

### Características:
- ✅ Auto-submit mientras el usuario escribe
- ✅ Validación inmediata de respuestas
- ✅ Feedback educativo con explicaciones
- ✅ Soporte para respuestas de texto libre

### Casos de uso:
- Ejercicios de traducción
- Conjugación de verbos
- Respuestas gramaticales
- Definiciones de vocabulario
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

const baseQuestion: OpenEndedQuestion = {
  id: '1',
  type: QuestionTypeLanguage.OpenEnded,
  question: '¿Cómo se dice "Good morning" en español?',
  expectedAnswer: 'Buenos días',
  explanation: 'La traducción correcta de "Good morning" en español es "Buenos días", una expresión común usada para saludar por la mañana.'
};

export const Default: Story = {
  args: {
    question: baseQuestion
  },
  parameters: {
    docs: {
      description: {
        story: 'Estado básico del ejercicio con una pregunta de traducción simple.'
      }
    }
  }
};

export const WithUserInput: Story = {
  args: {
    question: baseQuestion,
    userAnswer: 'Buenos dias'
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejercicio con una respuesta parcialmente completada por el usuario.'
      }
    }
  }
};

export const ShowingCorrectResult: Story = {
  args: {
    question: baseQuestion,
    userAnswer: 'Buenos días',
    showResult: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Vista de resultado mostrando una respuesta correcta con la explicación.'
      }
    }
  }
};

export const ShowingIncorrectResult: Story = {
  args: {
    question: baseQuestion,
    userAnswer: 'Buenas mañanas',
    showResult: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Vista de resultado mostrando una respuesta incorrecta comparada con la esperada.'
      }
    }
  }
};

export const VerbConjugation: Story = {
  args: {
    question: {
      id: '2',
      type: QuestionTypeLanguage.OpenEnded,
      question: 'Conjuga el verbo "hablar" en primera persona del singular del presente:',
      expectedAnswer: 'hablo',
      explanation: 'La conjugación correcta del verbo "hablar" en primera persona del singular del presente indicativo es "hablo".'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejercicio de conjugación verbal, común en el aprendizaje de gramática.'
      }
    }
  }
};

export const EnglishTranslation: Story = {
  args: {
    question: {
      id: '3',
      type: QuestionTypeLanguage.OpenEnded,
      question: 'Translate "I love you" to Spanish:',
      expectedAnswer: 'Te amo',
      explanation: '"Te amo" is the direct translation of "I love you" in Spanish, expressing deep romantic love.'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejercicio de traducción del inglés al español con contexto emocional.'
      }
    }
  }
};

export const DefinitionExercise: Story = {
  args: {
    question: {
      id: '4',
      type: QuestionTypeLanguage.OpenEnded,
      question: 'Define qué es un "adjetivo" en gramática:',
      expectedAnswer: 'palabra que describe o modifica un sustantivo',
      explanation: 'Un adjetivo es una palabra que describe, califica o modifica un sustantivo, proporcionando más información sobre sus características.'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejercicio de definición gramatical para evaluar comprensión de conceptos.'
      }
    }
  }
};

export const InteractiveDemo: Story = {
  render: () => {
    const demoQuestion: OpenEndedQuestion = {
      id: 'demo',
      type: QuestionTypeLanguage.OpenEnded,
      question: 'How do you say "Thank you very much" in Spanish?',
      expectedAnswer: 'Muchas gracias',
      explanation: '"Muchas gracias" is the common way to say "Thank you very much" in Spanish, showing extra gratitude.'
    };

    return (
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">💡 Instrucciones:</h3>
          <p className="text-blue-700 text-sm">
            Escribe tu respuesta en el campo de texto. La respuesta se enviará automáticamente
            mientras escribes. No necesitas hacer clic en ningún botón de confirmación.
          </p>
        </div>

        <OpenEndedExercise
          question={demoQuestion}
          onAnswer={(answer) => console.log('User answered:', answer)}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demo interactivo que muestra cómo funciona el auto-submit del componente.'
      }
    }
  }
};