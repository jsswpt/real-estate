import type { Meta, StoryObj } from '@storybook/react';
import { TestComponent as Component } from './index';

const meta = {
  title: 'Atoms/TestComponent',
  component: Component,
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof Component>;

type Story = StoryObj<typeof meta>;

export const TestComponent: Story = {
  args: {}
};

export default meta;