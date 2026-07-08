import type { Meta, StoryObj } from '@storybook/react-vite';
import Checkbox from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Atoms/Input/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],

  argTypes: {
    labelPosition: {
      control: 'select',
      options: ['left', 'right'] as const,
    },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'] as const,
    },
  },

  args: {
    id: 'chk-accept',
    label: 'Accept terms',
    name: 'accept',
    labelPosition: 'right',
    checked: false,
    size: 'md',
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};