import type { Meta, StoryObj } from '@storybook/react-vite';
import Icon from './Icon';
import { ICON_REGISTRY } from './iconRegistry';

const colorTokenMap = {
  primary: 'var(--color-primary)',
  primary50: 'var(--color-primary-50)',
  primary100: 'var(--color-primary-100)',
  primary200: 'var(--color-primary-200)',
  success: 'var(--color-success)',
  success50: 'var(--color-success-50)',
  success100: 'var(--color-success-100)',
  success200: 'var(--color-success-200)',
  danger: 'var(--color-danger)',
  danger50: 'var(--color-danger-50)',
  danger100: 'var(--color-danger-100)',
  danger200: 'var(--color-danger-200)',
  info: 'var(--color-blue)',
  info50: 'var(--color-blue-50)',
  info100: 'var(--color-blue-100)',
  info200: 'var(--color-blue-200)',
  textDark: 'var(--color-text-dark)',
  textLight: 'var(--color-text-light)',
};

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: Object.keys(ICON_REGISTRY),
    },
    size: {
      control: 'select',
      options: ['inherit', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
     variant: {
      control: 'select',
      options: ['filled', 'outlined', 'ghost'],
    },
    color: {
      control: 'select',
      options: Object.keys(colorTokenMap),
      mapping: colorTokenMap,
    },
   backgroundColor: {
      control: 'select',
      options: Object.keys(colorTokenMap),
      mapping: colorTokenMap,
      if: { arg: 'variant', eq: 'filled' },
    },
    borderColor: {
      control: 'select',
      options: Object.keys(colorTokenMap),
      mapping: colorTokenMap,
      if: { arg: 'variant', eq: 'outlined' },
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
      if: { arg: 'variant', neq: 'ghost' },
    },
  },
  args: {
    name: 'user',
    size: 'md',
    variant: 'ghost',
    color: 'textDark',
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Ghost: Story = {};

export const Filled: Story = {
  args: {
    variant: 'filled',
    backgroundColor: 'primary',
    color: 'textLight',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    borderColor: 'primary',
    color: 'primary',
  },
};