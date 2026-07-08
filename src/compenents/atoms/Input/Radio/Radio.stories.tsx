import type { Meta, StoryObj } from '@storybook/react-vite';

import Radio from './Radio';

const meta = {
  title: 'Atoms/Input/Radio',
  component: Radio,
  tags: ['autodocs'],
  args: {
    id: 'radio-1',
    label: 'Option A',
    name: 'group1',
    labelPosition: 'right',
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
