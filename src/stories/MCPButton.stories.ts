import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "../compenents/Button"; // your MCP button
import { theme } from "../design-system/theme";

console.log("THEME IN STORYBOOK:", theme);

const buttonConfig = theme.components?.button ?? {};

const meta: Meta<typeof Button> = {
  title: "Design System/Button",
  component: Button,

  tags: ["autodocs"],

  argTypes: {
    variant: {
      control: "select",
      options: Object.keys(buttonConfig.variants || {}),
    },
    size: {
      control: "select",
      options: Object.keys(buttonConfig.sizes || {}),
    },
    disabled: {
      control: "boolean",
    },
  },
};



export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: "Primary Button",
    variant: "primary",
    size: "md",
  },
};

export const Secondary: Story = {
  args: {
    label: "Secondary Button",
    variant: "secondary",
    size: "md",
  },
};

export const Outlined: Story = {
  args: {
    label: "Outlined Button",
    variant: "outline",
    size: "md",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled",
    variant: "primary",
    size: "md",
    disabled: true,
  },
};