import type { Meta, StoryObj } from '@storybook/react-vite';

import MultiSelect from './MultiSelect';

const meta = {
  title: 'Atoms/SelectBox/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
  args: {
    id: 'multi-1',
    label: 'Notes',
    placeholder: 'Enter notes...',
    description: 'Multi-line input used as a multi-select placeholder in this project',
  },
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
