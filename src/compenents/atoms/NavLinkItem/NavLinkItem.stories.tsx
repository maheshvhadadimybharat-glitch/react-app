import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';

import NavLinkItem from './NavLinkItem';

const meta = {
  title: 'Atoms/NavLinkItem',
  component: NavLinkItem,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
  args: {
    to: '/home',
    label: 'Home',
  },
} satisfies Meta<typeof NavLinkItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
