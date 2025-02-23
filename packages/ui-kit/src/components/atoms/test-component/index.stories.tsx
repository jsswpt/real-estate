import type { Meta, StoryObj } from '@storybook/react'

import { TestComponent as Component } from './index'

const meta = {
  argTypes: {},
  component: Component,
  tags: ['autodocs'],
  title: 'Atoms/TestComponent',
} satisfies Meta<typeof Component>

type Story = StoryObj<typeof meta>

export const TestComponent: Story = {
  args: {},
}

export default meta
