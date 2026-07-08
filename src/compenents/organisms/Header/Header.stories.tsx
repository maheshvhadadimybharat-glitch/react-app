import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import Header from './Header';

const mockNavLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];

const meta = {
  title: 'Organisms/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],

  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact', 'auth'],
    },
    withTopbar: {
      control: 'boolean',
    },
    contained: {
      control: 'boolean',
    },
    isAuthenticated: {
      control: 'boolean',
    },
  },

  args: {
    navLinks: mockNavLinks,
    withTopbar: true,
    contained: true,
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    withTopbar: true,
    contained: true,
    isAuthenticated: false,
  },
};

export const Compact: Story = {
  args: {
    variant: 'compact',
    withTopbar: true,
    contained: true,
    isAuthenticated: false,
  },
};

export const Auth: Story = {
  args: {
    variant: 'auth',
    withTopbar: false,
    contained: true,
    isAuthenticated: false,
  },
};

export const WithoutTopbar: Story = {
  args: {
    variant: 'default',
    withTopbar: false,
    contained: true,
    isAuthenticated: false,
  },
};

export const Authenticated: Story = {
  args: {
    variant: 'default',
    withTopbar: true,
    contained: true,
    isAuthenticated: true,
  },
};

export const NotContained: Story = {
  args: {
    variant: 'default',
    withTopbar: true,
    contained: false,
    isAuthenticated: false,
  },
};

