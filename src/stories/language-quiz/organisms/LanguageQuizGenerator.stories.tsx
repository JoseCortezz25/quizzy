import type { Meta, StoryObj } from '@storybook/react';
import { LanguageQuizGenerator } from '@/components/language-quiz/organisms/language-quiz-generator';
import { GenerateLanguageQuiz } from '@/lib/types';

const meta: Meta<typeof LanguageQuizGenerator> = {
  title: 'Language Quiz/Organisms/LanguageQuizGenerator',
  component: LanguageQuizGenerator,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**LanguageQuizGenerator** es el componente responsable de generar quizzes de idiomas usando inteligencia artificial basado en las especificaciones del usuario.

### Características principales:
- ✅ Interfaz intuitiva con textarea para describir el tema
- ✅ Selectores de nivel CEFR (A1-C2) y dificultad
- ✅ Generación AI usando Gemini models
- ✅ Loading states y feedback visual
- ✅ Validación de entrada y manejo de errores
- ✅ Toast notifications para feedback del usuario

### Niveles CEFR soportados:
- **A1 - Principiante**: Vocabulario y estructuras muy básicas
- **A2 - Básico**: Expresiones cotidianas y situaciones familiares
- **B1 - Intermedio**: Temas conocidos y experiencias personales
- **B2 - Intermedio Alto**: Ideas principales de textos complejos
- **C1 - Avanzado**: Textos largos y significados implícitos
- **C2 - Dominio**: Comprende prácticamente todo con facilidad

### Niveles de dificultad:
- **Fácil**: Ejercicios simples y directos
- **Medio**: Combinación de ejercicios con complejidad moderada
- **Difícil**: Ejercicios complejos que requieren análisis profundo
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    onQuizGenerated: { action: 'quiz generated' }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock function for demonstration
const mockOnQuizGenerated = (quiz: GenerateLanguageQuiz) => {
  console.log('Generated quiz:', quiz);
};

export const Default: Story = {
  args: {
    onQuizGenerated: mockOnQuizGenerated
  },
  parameters: {
    docs: {
      description: {
        story: 'Estado por defecto del generador con configuración B1 nivel intermedio.'
      }
    }
  }
};

export const EmptyState: Story = {
  args: {
    onQuizGenerated: mockOnQuizGenerated
  },
  parameters: {
    docs: {
      description: {
        story: 'Estado inicial vacío mostrando placeholder y controles disponibles.'
      }
    }
  }
};

export const BeginnerLevel: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="font-semibold text-green-800 mb-2">💡 Sugerencias para Nivel A1-A2:</h3>
        <ul className="text-green-700 text-sm space-y-1">
          <li>• Vocabulario básico: colores, números, familia</li>
          <li>• Saludos y presentaciones en inglés</li>
          <li>• Animales domésticos y sus nombres</li>
          <li>• Comida básica: frutas, verduras, bebidas</li>
        </ul>
      </div>
      <LanguageQuizGenerator onQuizGenerated={mockOnQuizGenerated} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo orientado a usuarios principiantes con sugerencias de temas apropiados para niveles A1-A2.'
      }
    }
  }
};

export const IntermediateLevel: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">🎯 Sugerencias para Nivel B1-B2:</h3>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• Gramática: presente perfecto vs pasado simple</li>
          <li>• Expresiones idiomáticas comunes en inglés</li>
          <li>• Vocabulario de negocios y trabajo</li>
          <li>• Comprensión lectora: artículos de noticias</li>
        </ul>
      </div>
      <LanguageQuizGenerator onQuizGenerated={mockOnQuizGenerated} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo para estudiantes intermedios con temas más complejos apropiados para B1-B2.'
      }
    }
  }
};

export const AdvancedLevel: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="bg-purple-50 p-4 rounded-lg">
        <h3 className="font-semibold text-purple-800 mb-2">🔥 Sugerencias para Nivel C1-C2:</h3>
        <ul className="text-purple-700 text-sm space-y-1">
          <li>• Literatura inglesa: análisis de fragmentos de Shakespeare</li>
          <li>• Lenguaje académico y científico especializado</li>
          <li>• Matices culturales en expresiones regionales</li>
          <li>• Debate y argumentación: conectores avanzados</li>
        </ul>
      </div>
      <LanguageQuizGenerator onQuizGenerated={mockOnQuizGenerated} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo para estudiantes avanzados con temas especializados y complejos para C1-C2.'
      }
    }
  }
};

export const SpecializedTopics: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="bg-orange-50 p-4 rounded-lg">
        <h3 className="font-semibold text-orange-800 mb-2">🎨 Temas Especializados:</h3>
        <ul className="text-orange-700 text-sm space-y-1">
          <li>• Inglés médico: terminología hospitalaria</li>
          <li>• Inglés técnico: programación y tecnología</li>
          <li>• Inglés legal: contratos y documentos</li>
          <li>• Inglés turístico: guías y recomendaciones</li>
        </ul>
      </div>
      <LanguageQuizGenerator onQuizGenerated={mockOnQuizGenerated} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Ejemplos de temas especializados para profesionales específicos o áreas de interés particular.'
      }
    }
  }
};

export const CulturalTopics: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h3 className="font-semibold text-yellow-800 mb-2">🌍 Temas Culturales:</h3>
        <ul className="text-yellow-700 text-sm space-y-1">
          <li>• Tradiciones navideñas en países anglohablantes</li>
          <li>• Diferencias culturales: Reino Unido vs Estados Unidos</li>
          <li>• Historia contemporánea a través del idioma</li>
          <li>• Gastronomía internacional y vocabulario culinario</li>
        </ul>
      </div>
      <LanguageQuizGenerator onQuizGenerated={mockOnQuizGenerated} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Ejemplos enfocados en aspectos culturales e históricos para un aprendizaje más integral del idioma.'
      }
    }
  }
};

export const InteractiveDemo: Story = {
  render: () => {
    const handleQuizGenerated = (quiz: GenerateLanguageQuiz) => {
      console.log('Generated quiz:', quiz);
    };

    return (
      <div className="space-y-6">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <h3 className="font-semibold text-indigo-800 mb-2">🚀 Cómo generar tu quiz:</h3>
          <ol className="text-indigo-700 text-sm space-y-1 list-decimal list-inside">
            <li>Describe el tema o área que quieres practicar</li>
            <li>Selecciona tu nivel CEFR (A1 a C2)</li>
            <li>Elige la dificultad deseada</li>
            <li>Haz clic en generar y espera unos segundos</li>
            <li>¡Disfruta de tu quiz personalizado!</li>
          </ol>
          <div className="mt-3 p-2 bg-indigo-100 rounded text-xs text-indigo-600">
            <strong>Ejemplo:</strong> Quiero practicar conversaciones en un restaurante, vocabulario de comida y cómo hacer pedidos en inglés
          </div>
        </div>

        <LanguageQuizGenerator onQuizGenerated={handleQuizGenerated} />

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2">💡 Tips para mejores resultados:</h4>
          <ul className="text-gray-600 text-sm space-y-1">
            <li>• Sé específico sobre el tema que quieres practicar</li>
            <li>• Menciona el tipo de ejercicios que prefieres</li>
            <li>• Incluye contexto (trabajo, viajes, estudios, etc.)</li>
            <li>• Especifica si quieres enfocarte en gramática o vocabulario</li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demo completamente interactivo con instrucciones detalladas y tips para generar quizzes efectivos.'
      }
    }
  }
};