import type { Meta, StoryObj } from '@storybook/react-vite';

import Image from './Image';

const meta = {
  title: 'Atoms/Image',
  component: Image,
  tags: ['autodocs'],

  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },

    variant: {
      control: 'select',
      options: ['overlay', 'inline', 'hover'],
    },

    aspectRatio: {
      control: 'select',
      options: ['auto', '1/1', '4/3', '16/9', '3/2'],
    },

    objectFit: {
      control: 'select',
      options: ['cover', 'contain', 'fill', 'none', 'scale-down'],
    },

    loading: {
      control: 'select',
      options: ['lazy', 'eager'],
    },

    fallback: { control: 'text' },

    geo: {
      control: 'object',
    },
  },

  args: {
    src: 'https://placehold.co/300x200',
    alt: 'Placeholder image',
    variant: 'overlay',
    aspectRatio: 'auto',
    objectFit: 'cover',
    loading: 'lazy',
  },

} satisfies Meta<typeof Image>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Inline: Story = {
  args: {
    variant: 'inline',
  },
};

export const Hover: Story = {
  args: {
    variant: 'hover',
  },
};

export const WithGeo: Story = {
  args: {
    geo: {
      lat: 37.7749,
      lng: -122.4194,
      label: 'San Francisco',
    },
  },
};

export const AspectRatio16by9: Story = {
  args: {
    aspectRatio: '16/9',
  },
};

export const Square: Story = {
  args: {
    aspectRatio: '1/1',
  },
};

export const ContainFit: Story = {
  args: {
    objectFit: 'contain',
    aspectRatio: '16/9',
  },
};

export const Fallback: Story = {
  args: {
    src: 'https://invalid-url.com/image.jpg',
    fallback: 'https://placehold.co/300x200?text=Fallback',
  },
};

export const GeoOverlay: Story = {
  args: {
    variant: 'overlay',
    aspectRatio: '16/9',
    geo: {
      lat: 19.076,
      lng: 72.8777,
      label: 'Mumbai',
    },
  },
};
