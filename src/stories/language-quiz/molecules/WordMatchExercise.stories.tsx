import type { Meta, StoryObj } from '@storybook/react';
import { WordMatchExercise } from '@/components/language-quiz/molecules/word-match-exercise';
import { WordMatchQuestion, QuestionTypeLanguage } from '@/lib/types';

const meta: Meta<typeof WordMatchExercise> = {
  title: 'Language Quiz/Molecules/WordMatchExercise',
  component: WordMatchExercise,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**WordMatchExercise** permite a los usuarios emparejar palabras entre dos idiomas o conceptos relacionados.

### Características:
- ✅ Interfaz de dos columnas para emparejamiento
- ✅ Selección visual clara de palabras y traducciones
- ✅ Auto-submit en cada emparejamiento
- ✅ Posiciones aleatorias para evitar patrones

### Casos de uso:
- Vocabulario básico entre idiomas
- Conceptos y definiciones
- Sinónimos y antónimos
- Categorización por grupos
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

const baseQuestion: WordMatchQuestion = {
  id: '1',
  type: QuestionTypeLanguage.WordMatch,
  question: 'Empareja cada palabra en inglés con su traducción en español:',
  pairs: [
    { word: 'House', translation: 'Casa' },
    { word: 'Car', translation: 'Coche' },
    { word: 'Book', translation: 'Libro' },
    { word: 'Water', translation: 'Agua' }
  ],
  explanation: 'Estas son traducciones básicas de objetos comunes del inglés al español.'
};

export const Default: Story = {
  args: {
    question: baseQuestion
  },
  parameters: {
    docs: {
      description: {
        story: 'Estado inicial con palabras y traducciones listas para emparejar.'
      }
    }
  }
};

export const PartiallyMatched: Story = {
  args: {
    question: baseQuestion,
    userAnswer: [
      { word: 'House', translation: 'Casa' },
      { word: 'Car', translation: 'Coche' }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejercicio en progreso con algunos emparejamientos ya realizados.'
      }
    }
  }
};

export const CompletelyMatched: Story = {
  args: {
    question: baseQuestion,
    userAnswer: [
      { word: 'House', translation: 'Casa' },
      { word: 'Car', translation: 'Coche' },
      { word: 'Book', translation: 'Libro' },
      { word: 'Water', translation: 'Agua' }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejercicio completo con todos los emparejamientos realizados.'
      }
    }
  }
};

export const ShowingCorrectResult: Story = {
  args: {
    question: baseQuestion,
    userAnswer: [
      { word: 'House', translation: 'Casa' },
      { word: 'Car', translation: 'Coche' },
      { word: 'Book', translation: 'Libro' },
      { word: 'Water', translation: 'Agua' }
    ],
    showResult: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Resultado perfecto mostrando todos los emparejamientos correctos.'
      }
    }
  }
};

export const ShowingMixedResult: Story = {
  args: {
    question: baseQuestion,
    userAnswer: [
      { word: 'House', translation: 'Coche' }, // Incorrect
      { word: 'Car', translation: 'Casa' },    // Incorrect
      { word: 'Book', translation: 'Libro' },  // Correct
      { word: 'Water', translation: 'Agua' }  // Correct
    ],
    showResult: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Resultado mixto con emparejamientos correctos e incorrectos.'
      }
    }
  }
};

export const FrenchVocabulary: Story = {
  args: {
    question: {
      id: '2',
      type: QuestionTypeLanguage.WordMatch,
      question: 'Match French words with their English translations:',
      pairs: [
        { word: 'Bonjour', translation: 'Hello' },
        { word: 'Merci', translation: 'Thank you' },
        { word: 'Au revoir', translation: 'Goodbye' },
        { word: 'S\'il vous plaît', translation: 'Please' }
      ],
      explanation: 'These are basic French greetings and polite expressions.'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejercicio con vocabulario francés básico de cortesía.'
      }
    }
  }
};

export const AnimalNames: Story = {
  args: {
    question: {
      id: '3',
      type: QuestionTypeLanguage.WordMatch,
      question: 'Conecta cada animal con su nombre en español:',
      pairs: [
        { word: 'Cat', translation: 'Gato' },
        { word: 'Dog', translation: 'Perro' },
        { word: 'Bird', translation: 'Pájaro' },
        { word: 'Fish', translation: 'Pez' },
        { word: 'Horse', translation: 'Caballo' }
      ],
      explanation: 'Vocabulario básico de animales en inglés y español.'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejercicio temático con nombres de animales.'
      }
    }
  }
};

export const BodyParts: Story = {
  args: {
    question: {
      id: '4',
      type: QuestionTypeLanguage.WordMatch,
      question: 'Match body parts with their Spanish names:',
      pairs: [
        { word: 'Head', translation: 'Cabeza' },
        { word: 'Hand', translation: 'Mano' },
        { word: 'Eye', translation: 'Ojo' },
        { word: 'Foot', translation: 'Pie' },
        { word: 'Ear', translation: 'Oreja' },
        { word: 'Nose', translation: 'Nariz' }
      ],
      explanation: 'Partes del cuerpo humano en inglés y su traducción al español.'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejercicio con vocabulario anatómico (partes del cuerpo).'
      }
    }
  }
};

export const ColorsVocabulary: Story = {
  args: {
    question: {
      id: '5',
      type: QuestionTypeLanguage.WordMatch,
      question: 'Match colors with their Spanish translations:',
      pairs: [
        { word: 'Red', translation: 'Rojo' },
        { word: 'Blue', translation: 'Azul' },
        { word: 'Green', translation: 'Verde' },
        { word: 'Yellow', translation: 'Amarillo' },
        { word: 'Black', translation: 'Negro' }
      ],
      explanation: 'Colores básicos en inglés y español.'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejercicio temático con colores básicos.'
      }
    }
  }
};

export const FoodVocabulary: Story = {
  args: {
    question: {
      id: '6',
      type: QuestionTypeLanguage.WordMatch,
      question: 'Empareja cada comida con su traducción:',
      pairs: [
        { word: 'Apple', translation: 'Manzana' },
        { word: 'Bread', translation: 'Pan' },
        { word: 'Milk', translation: 'Leche' },
        { word: 'Rice', translation: 'Arroz' },
        { word: 'Cheese', translation: 'Queso' },
        { word: 'Fish', translation: 'Pescado' }
      ],
      explanation: 'Vocabulario básico de alimentos en inglés y español.'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejercicio con vocabulario de comida y alimentos.'
      }
    }
  }
};

export const InteractiveDemo: Story = {
  render: () => {
    const demoQuestion: WordMatchQuestion = {
      id: 'demo',
      type: QuestionTypeLanguage.WordMatch,
      question: 'Match these common verbs with their Spanish translations:',
      pairs: [
        { word: 'To eat', translation: 'Comer' },
        { word: 'To drink', translation: 'Beber' },
        { word: 'To sleep', translation: 'Dormir' },
        { word: 'To walk', translation: 'Caminar' }
      ],
      explanation: 'Verbos básicos de acciones cotidianas en inglés y español.'
    };

    return (
      <div className="space-y-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">🔗 Emparejamiento:</h3>
          <ul className="text-green-700 text-sm space-y-1">
            <li>• Haz clic en una palabra, luego en su traducción</li>
            <li>• Los emparejamientos se marcan automáticamente</li>
            <li>• Las palabras emparejadas se desactivan</li>
            <li>• Cada emparejamiento se envía automáticamente</li>
          </ul>
        </div>

        <WordMatchExercise
          question={demoQuestion}
          onAnswer={(matches) => console.log('Current matches:', matches)}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demo interactivo mostrando la funcionalidad completa de emparejamiento.'
      }
    }
  }
};