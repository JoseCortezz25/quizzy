import type { Meta, StoryObj } from '@storybook/react';
import { QuestionText } from '../../../components/language-quiz/atoms/question-text';

const meta: Meta<typeof QuestionText> = {
  title: 'Language Quiz/Atoms/QuestionText',
  component: QuestionText,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '¿Cuál es la traducción correcta de "Hello" en español?'
  }
};

export const Long: Story = {
  args: {
    children: 'Lee el siguiente texto y responde la pregunta sobre la comprensión del contenido presentado en el párrafo anterior.'
  }
};

export const WithCustomClassName: Story = {
  args: {
    children: 'Pregunta con clase personalizada',
    className: 'text-blue-500 text-2xl'
  }
};

export const MultipleChoiceContext: Story = {
  args: {
    children: 'Selecciona todas las respuestas correctas sobre los verbos modales en inglés:'
  }
};

export const WordOrderContext: Story = {
  args: {
    children: 'Ordena las siguientes palabras para formar una oración gramaticalmente correcta:'
  }
};