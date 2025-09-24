import type { Meta, StoryObj } from '@storybook/react';
import { WordChip } from '../../../components/language-quiz/atoms/word-chip';
import React from 'react';

const meta: Meta<typeof WordChip> = {
  title: 'Language Quiz/Atoms/WordChip',
  component: WordChip,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    onDragStart: { action: 'dragStart' },
    onDrop: { action: 'dropped' },
    onDragOver: { action: 'dragOver' },
    selected: { control: 'boolean' },
    draggable: { control: 'boolean' },
    className: { control: 'text' }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'palabra'
  }
};

export const Selected: Story = {
  args: {
    children: 'palabra',
    selected: true
  }
};

export const Draggable: Story = {
  args: {
    children: 'arrastra',
    draggable: true
  }
};

export const LongWord: Story = {
  args: {
    children: 'extraordinario'
  }
};

export const WordOrderExample: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Palabras disponibles:</h3>
        <div className="flex flex-wrap gap-2">
          <WordChip onClick={() => { }}>The</WordChip>
          <WordChip onClick={() => { }}>cat</WordChip>
          <WordChip onClick={() => { }}>is</WordChip>
          <WordChip onClick={() => { }}>sleeping</WordChip>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Orden actual:</h3>
        <div className="flex flex-wrap gap-2">
          <WordChip selected onClick={() => { }}>The</WordChip>
          <WordChip selected onClick={() => { }}>cat</WordChip>
        </div>
      </div>
    </div>
  )
};

export const DifferentStates: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <WordChip>Normal</WordChip>
        <WordChip selected>Seleccionada</WordChip>
        <WordChip draggable>Arrastrable</WordChip>
        <WordChip className="bg-green-100 border-green-500">Correcta</WordChip>
        <WordChip className="bg-red-100 border-red-500">Incorrecta</WordChip>
      </div>
    </div>
  )
};