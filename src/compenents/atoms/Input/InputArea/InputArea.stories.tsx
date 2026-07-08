import type { Meta, StoryObj } from '@storybook/react-vite';

import InputArea from './InputArea';

const meta = {
  title: 'Atoms/Input/InputArea',
  component: InputArea,
  tags: ['autodocs'],
  args: {
    id: 'ia-1',
    label: 'Comments',
    placeholder: 'Write a comment...',
    description: 'Helpful hint',
  },
} satisfies Meta<typeof InputArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
