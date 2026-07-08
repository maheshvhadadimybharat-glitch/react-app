import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { MdAdd, MdOutlineFilterAlt, MdDeleteOutline } from 'react-icons/md';

import Button from './Button';

const iconMap = {
  MdAdd,
  MdOutlineFilterAlt,
  MdDeleteOutline,
};

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
    icon: {
      control: 'select',
      options: Object.keys(iconMap),
      mapping: iconMap,
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
    icon: MdAdd,
    iconPosition: 'left',
  },
};

export const PrimaryOutlined: Story = {
  args: {
    label: 'Primary Outlined',
    variant: 'primary-outlined',
    icon: MdAdd, 
    iconPosition: 'left',
  },
};

export const Tonal: Story = {
  args: {
    label: 'Tonal Button',
    variant: 'tonal',
    icon: MdAdd,
    iconPosition: 'left',
  },
};

export const Success: Story = {
  args: {
    label: 'Success Button',
    variant: 'success',
    icon: MdAdd,
    iconPosition: 'left',
  },
};

export const SuccessOutlined: Story = {
  args: {
    label: 'Success Outlined',
    variant: 'success-outlined',
    icon: MdAdd,
    iconPosition: 'left',
  },
};

export const Danger: Story = {
  args: {
    label: 'Danger Button',
    variant: 'danger',
    icon: MdAdd,
    iconPosition: 'left',
  },
};

export const DangerOutlined: Story = {
  args: {
    label: 'Danger Outlined',
    variant: 'danger-outlined',
    icon: MdAdd,
    iconPosition: 'left',
  },
};

export const Blue: Story = {
  args: {
    label: 'Blue Button',
    variant: 'blue',
    icon: MdAdd,
    iconPosition: 'left',
  },
};

export const BlueOutlined: Story = {
  args: {
    label: 'Blue Outlined',
    variant: 'blue-outlined',
    icon: MdAdd,
    iconPosition: 'left',
  },
};

export const Small: Story = {
  args: {
    label: 'Small Button',
    size: 'sm',
    icon: MdAdd,
    iconPosition: 'left',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Button',
    size: 'lg',
    icon: MdAdd,
    iconPosition: 'left',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    disabled: true,
    icon: MdAdd,
    iconPosition: 'left',
  },
};