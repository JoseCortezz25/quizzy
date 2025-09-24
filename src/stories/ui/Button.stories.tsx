import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/button';
import { RocketIcon } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'primary', 'secondary', 'ghost', 'link']
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon']
    },
    asChild: {
      table: {
        disable: true
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Button'
  }
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Button'
  }
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Button'
  }
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button'
  }
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button'
  }
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Button'
  }
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Button'
  }
};

export const WithIcon: Story = {
  args: {
    variant: 'default',
    children: (
      <>
        <RocketIcon />
        Button
      </>
    )
  }
};

export const IconOnly: Story = {
  args: {
    variant: 'default',
    size: 'icon',
    children: <RocketIcon />
  }
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Button'
  }
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Button'
  }
};
