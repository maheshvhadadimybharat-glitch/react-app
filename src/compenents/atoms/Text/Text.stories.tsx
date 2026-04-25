import type { Meta, StoryObj } from '@storybook/react-vite';

import Text from './Text';

const meta = {
  title: 'Atoms/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'base',
        'link',
        'label1',
        'label2',
        'label3',
        'helper',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'title1',
        'title2',
        'title3',
      ],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
    },
    as: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    children: 'Base text',
    variant: 'base',
  },
};

export const Link: Story = {
  args: {
    children: 'Link text',
    variant: 'link',
  },
};

export const Label1: Story = {
  args: {
    children: 'Label 1',
    variant: 'label1',
  },
};

export const Label2: Story = {
  args: {
    children: 'Label 2',
    variant: 'label2',
  },
};

export const Label3: Story = {
  args: {
    children: 'Label 3',
    variant: 'label3',
  },
};

export const Helper: Story = {
  args: {
    children: 'Helper text',
    variant: 'helper',
  },
};

export const Heading1: Story = {
  args: {
    children: 'Heading 1',
    variant: 'h1',
  },
};

export const Heading2: Story = {
  args: {
    children: 'Heading 2',
    variant: 'h2',
  },
};

export const Heading3: Story = {
  args: {
    children: 'Heading 3',
    variant: 'h3',
  },
};

export const Title1: Story = {
  args: {
    children: 'Title 1',
    variant: 'title1',
  },
};

export const Title2: Story = {
  args: {
    children: 'Title 2',
    variant: 'title2',
  },
};

export const Title3: Story = {
  args: {
    children: 'Title 3',
    variant: 'title3',
  },
};

export const SecondaryColor: Story = {
  args: {
    children: 'Secondary text',
    variant: 'base',
    color: 'secondary',
  },
};

export const SuccessColor: Story = {
  args: {
    children: 'Success text',
    variant: 'base',
    color: 'success',
  },
};

export const DangerColor: Story = {
  args: {
    children: 'Danger text',
    variant: 'base',
    color: 'danger',
  },
};

export const CustomElement: Story = {
  args: {
    children: 'Custom element (div)',
    as: 'div',
    variant: 'base',
  },
};