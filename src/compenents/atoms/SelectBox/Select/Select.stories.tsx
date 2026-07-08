import type { Meta, StoryObj } from '@storybook/react-vite';

import Select from './Select';

const sampleOptions = [
  { value: '1', label: 'One' },
  { value: '2', label: 'Two' },
  { value: '3', label: 'Three' },
];

const meta = {
  title: 'Atoms/SelectBox/Select',
  component: Select,
  tags: ['autodocs'],
  args: {
    id: 'sample-select',
    label: 'Sample Select',
    options: sampleOptions,
    placeholder: 'Choose an option',
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
