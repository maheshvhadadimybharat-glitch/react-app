import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import Input from './Input';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'success'],
    },
    size: {
      control: 'select',
      options: ['default', 'lg'],
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search'],
    },
  },
  args: {
    onChange: fn(),
    onBlur: fn(),
    onFocus: fn(),
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'input-default',
    label: 'Default Input',
    placeholder: 'Enter text...',
    type: 'text',
  },
};

export const WithDescription: Story = {
  args: {
    id: 'input-desc',
    label: 'Input with Description',
    placeholder: 'Enter text...',
    description: 'This is a helper text',
    type: 'text',
  },
};

export const Required: Story = {
  args: {
    id: 'input-required',
    label: 'Required Input',
    placeholder: 'Enter text...',
    required: true,
    type: 'text',
  },
};

export const Error: Story = {
  args: {
    id: 'input-error',
    label: 'Error Input',
    placeholder: 'Enter text...',
    variant: 'error',
    description: 'This field has an error',
    type: 'text',
  },
};

export const Success: Story = {
  args: {
    id: 'input-success',
    label: 'Success Input',
    placeholder: 'Enter text...',
    variant: 'success',
    description: 'Valid input',
    type: 'text',
  },
};

export const Large: Story = {
  args: {
    id: 'input-lg',
    label: 'Large Input',
    placeholder: 'Large input...',
    size: 'lg',
    type: 'text',
  },
};

export const Password: Story = {
  args: {
    id: 'input-password',
    label: 'Password',
    placeholder: 'Enter password...',
    type: 'password',
  },
};

export const Email: Story = {
  args: {
    id: 'input-email',
    label: 'Email',
    placeholder: 'Enter email...',
    type: 'email',
  },
};

export const Number: Story = {
  args: {
    id: 'input-number',
    label: 'Number',
    placeholder: 'Enter number...',
    type: 'number',
  },
};

export const Search: Story = {
  args: {
    id: 'input-search',
    label: 'Search',
    placeholder: 'Search...',
    type: 'search',
  },
};