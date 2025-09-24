import type { Meta, StoryObj } from '@storybook/react';
import { MatchCard } from '@/components/language-quiz/atoms/match-card';

const meta: Meta<typeof MatchCard> = {
  title: 'Language Quiz/Atoms/MatchCard',
  component: MatchCard,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    selected: { control: 'boolean' },
    matched: { control: 'boolean' },
    type: { control: 'select', options: ['word', 'translation'] },
    className: { control: 'text' }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WordCard: Story = {
  args: {
    children: 'House',
    type: 'word'
  }
};

export const TranslationCard: Story = {
  args: {
    children: 'Casa',
    type: 'translation'
  }
};

export const SelectedWord: Story = {
  args: {
    children: 'Book',
    type: 'word',
    selected: true
  }
};

export const SelectedTranslation: Story = {
  args: {
    children: 'Libro',
    type: 'translation',
    selected: true
  }
};

export const MatchedPair: Story = {
  args: {
    children: 'Water',
    type: 'word',
    matched: true
  }
};

export const MatchingGameExample: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 max-w-md">
      <div>
        <h3 className="text-sm font-medium mb-3 text-center">English</h3>
        <div className="space-y-2">
          <MatchCard type="word" onClick={() => { }}>Cat</MatchCard>
          <MatchCard type="word" selected onClick={() => { }}>Dog</MatchCard>
          <MatchCard type="word" matched onClick={() => { }}>House</MatchCard>
          <MatchCard type="word" onClick={() => { }}>Car</MatchCard>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3 text-center">Español</h3>
        <div className="space-y-2">
          <MatchCard type="translation" onClick={() => { }}>Gato</MatchCard>
          <MatchCard type="translation" onClick={() => { }}>Perro</MatchCard>
          <MatchCard type="translation" matched onClick={() => { }}>Casa</MatchCard>
          <MatchCard type="translation" onClick={() => { }}>Coche</MatchCard>
        </div>
      </div>
    </div>
  )
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Word Cards</h4>
        <div className="flex gap-2">
          <MatchCard type="word">Normal</MatchCard>
          <MatchCard type="word" selected>Selected</MatchCard>
          <MatchCard type="word" matched>Matched</MatchCard>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Translation Cards</h4>
        <div className="flex gap-2">
          <MatchCard type="translation">Normal</MatchCard>
          <MatchCard type="translation" selected>Seleccionada</MatchCard>
          <MatchCard type="translation" matched>Emparejada</MatchCard>
        </div>
      </div>
    </div>
  )
};