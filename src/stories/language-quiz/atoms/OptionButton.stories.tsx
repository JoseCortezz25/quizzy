import type { Meta, StoryObj } from '@storybook/react';
import { OptionButton } from '../../../components/language-quiz/atoms/option-button';
import React from 'react';

const meta: Meta<typeof OptionButton> = {
  title: 'Language Quiz/Atoms/OptionButton',
  component: OptionButton,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    selected: { control: 'boolean' }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Hola'
  }
};

export const Selected: Story = {
  args: {
    children: 'Hola',
    selected: true
  }
};

export const Correct: Story = {
  args: {
    children: 'Hola'
  }
};

export const Incorrect: Story = {
  args: {
    children: 'Hello'
  }
};

export const Disabled: Story = {
  args: {
    children: 'Bonjour'
  }
};

export const LongText: Story = {
  args: {
    children: 'Esta es una opción muy larga que demuestra cómo se comporta el botón con contenido extenso y múltiples líneas.'
  }
};

export const InteractiveStates: Story = {
  render: () => {
    const handleClick = () => console.log('Button clicked');

    return (
      <div className="space-y-3">
        <OptionButton onClick={handleClick}>Estado Normal</OptionButton>
        <OptionButton onClick={handleClick} selected>Estado Seleccionado</OptionButton>
        <OptionButton onClick={handleClick}>Respuesta Correcta</OptionButton>
        <OptionButton onClick={handleClick}>Respuesta Incorrecta</OptionButton>
        <OptionButton onClick={handleClick}>Estado Deshabilitado</OptionButton>
      </div>
    );
  }
};