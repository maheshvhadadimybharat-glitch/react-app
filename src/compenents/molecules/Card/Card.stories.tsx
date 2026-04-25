import type { Meta, StoryObj } from '@storybook/react-vite';

import Card from './Card';

const meta = {
  title: 'Molecules/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Card Title',
    description: 'This is a description for the card.',
    image: 'https://picsum.photos/400/300',
    href: '#',
    cta: 'Learn More',
  },
};

export const WithoutImage: Story = {
  args: {
    title: 'Card Without Image',
    description: 'This card has no image.',
    href: '#',
    cta: 'Click Here',
  },
};

export const WithoutCTA: Story = {
  args: {
    title: 'Card Without CTA',
    description: 'This card has no call-to-action button.',
    image: 'https://picsum.photos/400/300',
  },
};

export const TitleOnly: Story = {
  args: {
    title: 'Card Title Only',
  },
};

export const CustomClassName: Story = {
  args: {
    title: 'Custom Class Card',
    description: 'This card has a custom class name.',
    image: 'https://picsum.photos/400/300',
    href: '#',
    cta: 'Go Here',
    className: 'my-custom-card',
  },
};