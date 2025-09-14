import type { Meta, StoryObj } from '@storybook/react';
import { MultipleChoiceMultipleExercise } from '@/components/language-quiz/molecules/multiple-choice-multiple-exercise';
import { MultipleChoiceMultipleQuestion, QuestionTypeLanguage } from '@/lib/types';

const meta: Meta<typeof MultipleChoiceMultipleExercise> = {
  title: 'Language Quiz/Molecules/MultipleChoiceMultipleExercise',
  component: MultipleChoiceMultipleExercise,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**MultipleChoiceMultipleExercise** permite a los usuarios seleccionar múltiples respuestas correctas de una lista de opciones.

### Características:
- ✅ Selección múltiple con toggle on/off
- ✅ Auto-submit en cada cambio de selección
- ✅ Indicador visual de "selecciona todas las correctas"
- ✅ Validación completa de combinaciones

### Casos de uso:
- Clasificación de palabras (verbos, adjetivos, etc.)
- Reglas gramaticales múltiples
- Vocabulario por categorías
- Identificación de elementos lingüísticos
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

const baseQuestion: MultipleChoiceMultipleQuestion = {
  id: '1',
  type: QuestionTypeLanguage.MultipleChoiceMultiple,
  question: '¿Cuáles de las siguientes palabras son verbos en inglés?',
  options: [
    { option: 'Run', isCorrect: true },
    { option: 'Beautiful', isCorrect: false },
    { option: 'Eat', isCorrect: true },
    { option: 'Quickly', isCorrect: false },
    { option: 'Sleep', isCorrect: true },
    { option: 'Happy', isCorrect: false }
  ],
  explanation: '"Run", "Eat" y "Sleep" son verbos. "Beautiful" y "Happy" son adjetivos, "Quickly" es un adverbio.'
};

export const Default: Story = {
  args: {
    question: baseQuestion
  },
  parameters: {
    docs: {
      description: {
        story: 'Estado inicial mostrando múltiples opciones donde varias pueden ser correctas.'
      }
    }
  }
};

export const WithSelectedAnswers: Story = {
  args: {
    question: baseQuestion,
    userAnswer: ['Run', 'Eat']
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejercicio con algunas opciones ya seleccionadas por el usuario.'
      }
    }
  }
};

export const AllCorrectSelected: Story = {
  args: {
    question: baseQuestion,
    userAnswer: ['Run', 'Eat', 'Sleep']
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejercicio con todas las respuestas correctas seleccionadas.'
      }
    }
  }
};

export const ShowingCorrectResult: Story = {
  args: {
    question: baseQuestion,
    userAnswer: ['Run', 'Eat', 'Sleep'],
    showResult: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Resultado perfecto mostrando todas las respuestas correctas en verde.'
      }
    }
  }
};

export const ShowingPartialResult: Story = {
  args: {
    question: baseQuestion,
    userAnswer: ['Run', 'Beautiful', 'Happy'],
    showResult: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Resultado parcial con una combinación de respuestas correctas e incorrectas.'
      }
    }
  }
};

export const GrammarRulesExercise: Story = {
  args: {
    question: {
      id: '2',
      type: QuestionTypeLanguage.MultipleChoiceMultiple,
      question: 'Which of these sentences use the present simple tense correctly?',
      options: [
        { option: 'She goes to school every day.', isCorrect: true },
        { option: 'He are playing football now.', isCorrect: false },
        { option: 'They live in London.', isCorrect: true },
        { option: 'I am eat lunch.', isCorrect: false },
        { option: 'We work in an office.', isCorrect: true }
      ],
      explanation: 'Present simple uses base form of verb (with -s for third person singular). "She goes", "They live", and "We work" are correct.'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejercicio de gramática para identificar oraciones correctas con presente simple.'
      }
    }
  }
};

export const VocabularyCategorization: Story = {
  args: {
    question: {
      id: '3',
      type: QuestionTypeLanguage.MultipleChoiceMultiple,
      question: 'Selecciona todas las palabras que son frutas:',
      options: [
        { option: 'Manzana', isCorrect: true },
        { option: 'Coche', isCorrect: false },
        { option: 'Plátano', isCorrect: true },
        { option: 'Mesa', isCorrect: false },
        { option: 'Naranja', isCorrect: true },
        { option: 'Libro', isCorrect: false }
      ],
      explanation: '"Manzana", "Plátano" y "Naranja" son frutas. Los demás son objetos.'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejercicio de categorización de vocabulario por tipo de objeto.'
      }
    }
  }
};

export const PronunciationPatterns: Story = {
  args: {
    question: {
      id: '4',
      type: QuestionTypeLanguage.MultipleChoiceMultiple,
      question: 'Which words have the same vowel sound as "cat" /æ/?',
      options: [
        { option: 'Hat', isCorrect: true },
        { option: 'Car', isCorrect: false },
        { option: 'Bat', isCorrect: true },
        { option: 'Boat', isCorrect: false },
        { option: 'Map', isCorrect: true },
        { option: 'Moon', isCorrect: false }
      ],
      explanation: '"Hat", "Bat", and "Map" all have the short /æ/ vowel sound like "cat".'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejercicio avanzado de fonética para identificar patrones de pronunciación.'
      }
    }
  }
};

export const CulturalKnowledge: Story = {
  args: {
    question: {
      id: '5',
      type: QuestionTypeLanguage.MultipleChoiceMultiple,
      question: '¿Cuáles de estos países tienen el español como idioma oficial?',
      options: [
        { option: 'México', isCorrect: true },
        { option: 'Brasil', isCorrect: false },
        { option: 'Argentina', isCorrect: true },
        { option: 'Portugal', isCorrect: false },
        { option: 'España', isCorrect: true },
        { option: 'Francia', isCorrect: false }
      ],
      explanation: 'México, Argentina y España tienen el español como idioma oficial. Brasil habla portugués, Portugal también, y Francia habla francés.'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejercicio de conocimiento cultural sobre países hispanohablantes.'
      }
    }
  }
};

export const InteractiveDemo: Story = {
  render: () => {
    const demoQuestion: MultipleChoiceMultipleQuestion = {
      id: 'demo',
      type: QuestionTypeLanguage.MultipleChoiceMultiple,
      question: 'Select all the animals that can fly:',
      options: [
        { option: 'Bird', isCorrect: true },
        { option: 'Fish', isCorrect: false },
        { option: 'Butterfly', isCorrect: true },
        { option: 'Dog', isCorrect: false },
        { option: 'Bat', isCorrect: true },
        { option: 'Cat', isCorrect: false }
      ],
      explanation: 'Birds, butterflies, and bats can fly. Fish swim, dogs and cats walk.'
    };

    return (
      <div className="space-y-6">
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold text-purple-800 mb-2">🎯 Selección Múltiple:</h3>
          <ul className="text-purple-700 text-sm space-y-1">
            <li>• Puedes seleccionar varias opciones</li>
            <li>• Haz clic para seleccionar/deseleccionar</li>
            <li>• Cada cambio se envía automáticamente</li>
            <li>• No todas las opciones son correctas</li>
          </ul>
        </div>

        <MultipleChoiceMultipleExercise
          question={demoQuestion}
          onAnswer={(answers) => console.log('Current selections:', answers)}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demo interactivo mostrando la selección múltiple con toggle y auto-submit.'
      }
    }
  }
};