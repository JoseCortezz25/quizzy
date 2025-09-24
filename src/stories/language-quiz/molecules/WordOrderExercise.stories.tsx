import type { Meta, StoryObj } from '@storybook/react';
import { WordOrderExercise } from '@/components/language-quiz/molecules/word-order-exercise';
import { WordOrderQuestion, QuestionTypeLanguage } from '@/lib/types';

const meta: Meta<typeof WordOrderExercise> = {
  title: 'Language Quiz/Molecules/WordOrderExercise',
  component: WordOrderExercise,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**WordOrderExercise** permite a los usuarios organizar palabras desordenadas para formar oraciones correctas.

### Características:
- ✅ Interfaz de arrastrar y soltar (drag & drop)
- ✅ Auto-submit cuando todas las palabras están ordenadas
- ✅ Área visual clara para palabras disponibles y ordenadas
- ✅ Botón de reinicio para empezar de nuevo

### Casos de uso:
- Estructura de oraciones básicas
- Orden de palabras en diferentes idiomas
- Formación de preguntas
- Construcción gramatical
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    onAnswer: { action: 'answered' }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const baseQuestion: WordOrderQuestion = {
  id: '1',
  type: QuestionTypeLanguage.WordOrder,
  question: 'Ordena las palabras para formar una oración correcta:',
  words: ['is', 'The', 'cat', 'sleeping'],
  correctOrder: ['The', 'cat', 'is', 'sleeping'],
  explanation: 'En inglés, el orden básico es sujeto-verbo-complemento: "The cat is sleeping".'
};

export const Default: Story = {
  args: {
    question: baseQuestion
  },
  parameters: {
    docs: {
      description: {
        story: 'Estado inicial con palabras desordenadas listas para organizar.'
      }
    }
  }
};

export const PartiallyOrdered: Story = {
  args: {
    question: baseQuestion,
    userAnswer: ['The', 'cat']
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejercicio en progreso con algunas palabras ya ordenadas.'
      }
    }
  }
};

export const CompletelyOrdered: Story = {
  args: {
    question: baseQuestion,
    userAnswer: ['The', 'cat', 'is', 'sleeping']
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejercicio completo con todas las palabras en orden correcto.'
      }
    }
  }
};

export const ShowingCorrectResult: Story = {
  args: {
    question: baseQuestion,
    userAnswer: ['The', 'cat', 'is', 'sleeping']
  },
  parameters: {
    docs: {
      description: {
        story: 'Resultado correcto con feedback positivo y explicación.'
      }
    }
  }
};

export const ShowingIncorrectResult: Story = {
  args: {
    question: baseQuestion,
    userAnswer: ['Cat', 'the', 'sleeping', 'is']
  },
  parameters: {
    docs: {
      description: {
        story: 'Resultado incorrecto mostrando el orden incorrecto vs el correcto.'
      }
    }
  }
};

export const SpanishQuestion: Story = {
  args: {
    question: {
      id: '2',
      type: QuestionTypeLanguage.WordOrder,
      question: 'Organiza estas palabras para formar una pregunta en español:',
      words: ['¿', 'llamas', 'Cómo', 'te', '?'],
      correctOrder: ['¿', 'Cómo', 'te', 'llamas', '?'],
      explanation: 'La estructura correcta para preguntar el nombre en español es "¿Cómo te llamas?"'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejercicio en español para formar una pregunta básica.'
      }
    }
  }
};

export const ComplexSentence: Story = {
  args: {
    question: {
      id: '3',
      type: QuestionTypeLanguage.WordOrder,
      question: 'Forma una oración completa con estas palabras:',
      words: ['beautiful', 'very', 'garden', 'The', 'is'],
      correctOrder: ['The', 'garden', 'is', 'very', 'beautiful'],
      explanation: 'En inglés, los adjetivos generalmente van después del verbo "to be": "The garden is very beautiful".'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejercicio más complejo con adjetivos y adverbios.'
      }
    }
  }
};

export const FrenchSentence: Story = {
  args: {
    question: {
      id: '4',
      type: QuestionTypeLanguage.WordOrder,
      question: 'Mets ces mots dans le bon ordre:',
      words: ['suis', 'Je', 'étudiant', 'français'],
      correctOrder: ['Je', 'suis', 'étudiant', 'français'],
      explanation: 'En français: "Je suis étudiant français" - Je (sujeto) + suis (verbo) + étudiant français (predicado).'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejercicio en francés mostrando la versatilidad multiidioma.'
      }
    }
  }
};

export const QuestionFormation: Story = {
  args: {
    question: {
      id: '5',
      type: QuestionTypeLanguage.WordOrder,
      question: 'Create a question in English:',
      words: ['you', 'How', 'are', '?'],
      correctOrder: ['How', 'are', 'you', '?'],
      explanation: 'Questions in English often start with question words: "How are you?"'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejercicio específico para formar preguntas en inglés.'
      }
    }
  }
};

export const NegativeSentence: Story = {
  args: {
    question: {
      id: '6',
      type: QuestionTypeLanguage.WordOrder,
      question: 'Form a negative sentence:',
      words: ['not', 'do', 'I', 'coffee', 'like'],
      correctOrder: ['I', 'do', 'not', 'like', 'coffee'],
      explanation: 'Negative sentences in English use "do not" (don\'t) before the main verb.'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejercicio para formar oraciones negativas con auxiliary verbs.'
      }
    }
  }
};

export const InteractiveDemo: Story = {
  render: () => {
    const demoQuestion: WordOrderQuestion = {
      id: 'demo',
      type: QuestionTypeLanguage.WordOrder,
      question: 'Arrange these words to make a sentence:',
      words: ['book', 'reading', 'am', 'I', 'a'],
      correctOrder: ['I', 'am', 'reading', 'a', 'book'],
      explanation: 'Present continuous: Subject + am/is/are + verb-ing + object.'
    };

    return (
      <div className="space-y-6">
        <div className="bg-orange-50 p-4 rounded-lg">
          <h3 className="font-semibold text-orange-800 mb-2">🔄 Instrucciones:</h3>
          <ul className="text-orange-700 text-sm space-y-1">
            <li>• Haz clic en las palabras para moverlas al área de orden</li>
            <li>• Haz clic en palabras ordenadas para devolverlas</li>
            <li>• Se envía automáticamente cuando está completo</li>
            <li>• Usa &quot;Reiniciar&quot; para empezar de nuevo</li>
          </ul>
        </div>

        <WordOrderExercise
          question={demoQuestion}
          onAnswer={(orderedWords) => console.log('Word order:', orderedWords)}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demo interactivo mostrando la funcionalidad completa de ordenamiento de palabras.'
      }
    }
  }
};