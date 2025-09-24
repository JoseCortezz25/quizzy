import type { Meta, StoryObj } from '@storybook/react';
import { ReadingComprehensionExercise } from '@/components/language-quiz/molecules/reading-comprehension-exercise';
import { ReadingComprehensionQuestion, QuestionTypeLanguage } from '@/lib/types';

const meta: Meta<typeof ReadingComprehensionExercise> = {
  title: 'Language Quiz/Molecules/ReadingComprehensionExercise',
  component: ReadingComprehensionExercise,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**ReadingComprehensionExercise** evalúa la comprensión lectora mediante textos seguidos de preguntas específicas.

### Características:
- ✅ Texto completo presentado de forma clara
- ✅ Párrafos separados para mejor lectura
- ✅ Pregunta específica sobre el contenido
- ✅ Auto-submit al seleccionar una respuesta

### Casos de uso:
- Comprensión de textos narrativos
- Análisis de información factual
- Inferencia de significados
- Evaluación de nivel de lectura
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

const baseQuestion: ReadingComprehensionQuestion = {
  id: '1',
  type: QuestionTypeLanguage.ReadingComprehension,
  question: '¿Cuál es la actividad principal de María los fines de semana?',
  passage: 'María es una estudiante universitaria que vive en Madrid. Durante la semana estudia mucho y trabaja en una cafetería por las tardes. Los fines de semana le gusta ir al parque con sus amigos para hacer picnic y jugar fútbol. También disfruta leyendo libros en el parque cuando hace buen tiempo.',
  options: [
    { option: 'Trabaja en una cafetería', isCorrect: false },
    { option: 'Estudia en la universidad', isCorrect: false },
    { option: 'Va al parque con amigos', isCorrect: true },
    { option: 'Lee libros en casa', isCorrect: false }
  ],
  explanation: 'Según el texto, los fines de semana María va al parque con sus amigos para hacer picnic y jugar fútbol, siendo esta su actividad principal.'
};

export const Default: Story = {
  args: {
    question: baseQuestion
  },
  parameters: {
    docs: {
      description: {
        story: 'Estado básico mostrando un texto narrativo con pregunta de comprensión.'
      }
    }
  }
};

export const WithSelectedAnswer: Story = {
  args: {
    question: baseQuestion,
    userAnswer: 'Va al parque con amigos'
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejercicio con una respuesta ya seleccionada por el usuario.'
      }
    }
  }
};

export const ShowingCorrectResult: Story = {
  args: {
    question: baseQuestion,
    userAnswer: 'Va al parque con amigos'
  },
  parameters: {
    docs: {
      description: {
        story: 'Resultado correcto con feedback positivo y explicación detallada.'
      }
    }
  }
};

export const ShowingIncorrectResult: Story = {
  args: {
    question: baseQuestion,
    userAnswer: 'Trabaja en una cafetería'
  },
  parameters: {
    docs: {
      description: {
        story: 'Resultado incorrecto mostrando la respuesta incorrecta vs la correcta.'
      }
    }
  }
};

export const EnglishPassage: Story = {
  args: {
    question: {
      id: '2',
      type: QuestionTypeLanguage.ReadingComprehension,
      question: 'What time does the library close on weekdays?',
      passage: 'The Central Library is open Monday through Friday from 9:00 AM to 8:00 PM. On weekends, the library has shorter hours, opening at 10:00 AM and closing at 5:00 PM. The library offers free Wi-Fi, computer access, and quiet study areas for students and visitors.',
      options: [
        { option: '5:00 PM', isCorrect: false },
        { option: '8:00 PM', isCorrect: true },
        { option: '9:00 PM', isCorrect: false },
        { option: '10:00 PM', isCorrect: false }
      ],
      explanation: 'The passage states that the library is open Monday through Friday (weekdays) from 9:00 AM to 8:00 PM.'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejercicio en inglés sobre información factual (horarios).'
      }
    }
  }
};

export const ShortPassage: Story = {
  args: {
    question: {
      id: '3',
      type: QuestionTypeLanguage.ReadingComprehension,
      question: '¿Qué tiempo hace hoy?',
      passage: 'Hoy es un día perfecto para salir. El sol brilla intensamente y no hay ni una sola nube en el cielo. La temperatura es de 25 grados centígrados.',
      options: [
        { option: 'Está lloviendo', isCorrect: false },
        { option: 'Está nublado', isCorrect: false },
        { option: 'Hace sol y calor', isCorrect: true },
        { option: 'Hay viento fuerte', isCorrect: false }
      ],
      explanation: 'El texto describe un día soleado con 25 grados, perfecto para salir.'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Texto corto y directo sobre descripción del clima.'
      }
    }
  }
};

export const LongPassage: Story = {
  args: {
    question: {
      id: '4',
      type: QuestionTypeLanguage.ReadingComprehension,
      question: 'What is the main benefit of learning a second language according to the passage?',
      passage: 'Learning a second language has numerous benefits for both personal and professional development. Research shows that bilingual individuals often have better problem-solving skills and enhanced cognitive flexibility. In the global job market, speaking multiple languages can open doors to international opportunities and higher-paying positions. Additionally, learning a new language allows people to connect with different cultures and gain a deeper understanding of the world around them. Many language learners also report increased confidence and improved memory as unexpected benefits of their studies.',
      options: [
        { option: 'Better memory', isCorrect: false },
        { option: 'Higher salary', isCorrect: false },
        { option: 'Cognitive and career advantages', isCorrect: true },
        { option: 'Cultural connection only', isCorrect: false }
      ],
      explanation: 'The passage mentions multiple benefits including cognitive improvements, career opportunities, and cultural connections, making "cognitive and career advantages" the most comprehensive answer.'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Texto largo y complejo sobre beneficios del aprendizaje de idiomas.'
      }
    }
  }
};

export const FrenchPassage: Story = {
  args: {
    question: {
      id: '5',
      type: QuestionTypeLanguage.ReadingComprehension,
      question: 'Où habite Pierre?',
      passage: 'Pierre est un étudiant français. Il habite dans un petit appartement près de la Sorbonne à Paris. Chaque matin, il prend le métro pour aller à l\'université. Il étudie la littérature française et rêve de devenir écrivain un jour.',
      options: [
        { option: 'À la Sorbonne', isCorrect: false },
        { option: 'Dans le métro', isCorrect: false },
        { option: 'Près de la Sorbonne', isCorrect: true },
        { option: 'Chez ses parents', isCorrect: false }
      ],
      explanation: 'Le texte dit clairement que Pierre habite dans un petit appartement près de la Sorbonne à Paris.'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejercicio en francés sobre información personal y ubicación.'
      }
    }
  }
};

export const InferenceExercise: Story = {
  args: {
    question: {
      id: '6',
      type: QuestionTypeLanguage.ReadingComprehension,
      question: 'Based on the text, what can we infer about Sarah\'s personality?',
      passage: 'Sarah always arrives at meetings ten minutes early. She brings detailed notes and asks thoughtful questions. When her colleagues need help with projects, she volunteers immediately. Last week, she organized a surprise birthday party for her coworker without being asked.',
      options: [
        { option: 'She is lazy and unreliable', isCorrect: false },
        { option: 'She is organized and helpful', isCorrect: true },
        { option: 'She is shy and quiet', isCorrect: false },
        { option: 'She is competitive and aggressive', isCorrect: false }
      ],
      explanation: 'The text shows Sarah arriving early, being prepared, volunteering to help, and organizing events, which indicates she is organized and helpful.'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejercicio de inferencia que requiere deducir características no explícitas.'
      }
    }
  }
};

export const InteractiveDemo: Story = {
  render: () => {
    const demoQuestion: ReadingComprehensionQuestion = {
      id: 'demo',
      type: QuestionTypeLanguage.ReadingComprehension,
      question: '¿Cuál es el plato favorito de Luis?',
      passage: 'Luis es un chef profesional que trabaja en un restaurante italiano. Su especialidad es la pasta, pero en casa prefiere cocinar algo más simple. Cuando llega después de un largo día de trabajo, su comida favorita es una tortilla española con patatas que aprendió a hacer con su abuela.',
      options: [
        { option: 'Pasta italiana', isCorrect: false },
        { option: 'Tortilla española', isCorrect: true },
        { option: 'Comida del restaurante', isCorrect: false },
        { option: 'Patatas fritas', isCorrect: false }
      ],
      explanation: 'Aunque Luis es chef de comida italiana, el texto dice que su comida favorita es la tortilla española que hace en casa.'
    };

    return (
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">📖 Comprensión Lectora:</h3>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• Lee todo el texto cuidadosamente</li>
            <li>• Busca información específica para la pregunta</li>
            <li>• Selecciona la respuesta más precisa</li>
            <li>• Algunos detalles pueden ser distractores</li>
          </ul>
        </div>

        <ReadingComprehensionExercise
          question={demoQuestion}
          onAnswer={(answer) => console.log('Selected answer:', answer)}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demo interactivo mostrando la funcionalidad completa de comprensión lectora.'
      }
    }
  }
};