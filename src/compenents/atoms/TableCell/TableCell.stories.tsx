import type { Meta, StoryObj } from '@storybook/react-vite';

import TableCell from './TableCell';

const meta = {
  title: 'Atoms/TableCell',
  component: TableCell,
  tags: ['autodocs'],
  argTypes: {
    align: { control: 'select', options: ['left', 'center', 'right'] },
    as: { control: 'text' },
  },
  args: {
    as: 'div',
    children: 'Cell content',
    align: 'left',
  },
} satisfies Meta<typeof TableCell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Left: Story = {};

export const Center: Story = { args: { align: 'center' } };

export const Right: Story = { args: { align: 'right' } };
