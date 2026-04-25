import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import Button from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'primary-outlined',
        'tonal',
        'success',
        'success-outlined',
        'danger',
        'danger-outlined',
        'blue',
        'blue-outlined',
      ],
    },
    size: {
      control: 'select',
      options: ['default', 'xs', 'sm', 'lg'],
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'Primary Button',
    variant: 'primary',
  },
};

export const PrimaryOutlined: Story = {
  args: {
    label: 'Primary Outlined',
    variant: 'primary-outlined',
  },
};

export const Tonal: Story = {
  args: {
    label: 'Tonal Button',
    variant: 'tonal',
  },
};

export const Success: Story = {
  args: {
    label: 'Success Button',
    variant: 'success',
  },
};

export const SuccessOutlined: Story = {
  args: {
    label: 'Success Outlined',
    variant: 'success-outlined',
  },
};

export const Danger: Story = {
  args: {
    label: 'Danger Button',
    variant: 'danger',
  },
};

export const DangerOutlined: Story = {
  args: {
    label: 'Danger Outlined',
    variant: 'danger-outlined',
  },
};

export const Blue: Story = {
  args: {
    label: 'Blue Button',
    variant: 'blue',
  },
};

export const BlueOutlined: Story = {
  args: {
    label: 'Blue Outlined',
    variant: 'blue-outlined',
  },
};

export const Small: Story = {
  args: {
    label: 'Small Button',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Button',
    size: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    disabled: true,
  },
};