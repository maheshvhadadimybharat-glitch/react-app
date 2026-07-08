import type { Meta, StoryObj } from "@storybook/react-vite";
import FontSizeControls from "./FontSizeControls";

const meta: Meta<typeof FontSizeControls> = {
  title: "Molecules/FontSizeControls",
  component: FontSizeControls,
};

export default meta;
type Story = StoryObj<typeof FontSizeControls>;

export const Default: Story = {};
