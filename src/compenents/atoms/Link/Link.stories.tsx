import type { Meta, StoryObj } from '@storybook/react-vite';

import Link from './Link';

const meta = {
  title: 'Atoms/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'dark', 'inverted'] },
  },
  args: {
    href: 'https://example.com',
    children: 'Example link',
    variant: 'default',
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Dark: Story = {
  args: { variant: 'dark' },
};

export const External: Story = {
  args: { href: 'https://storybook.js.org', children: 'Storybook (external)' },
};
