import type { Meta, StoryObj } from "@storybook/react";
import Input from "../compenents/Input";
import { theme } from "../design-system/theme";

const inputConfig = theme.components?.input || {};

const meta: Meta<typeof Input> = {
  title: "Design System/Input",
  component: Input,

  tags: ["autodocs"],

  argTypes: {
    variant: {
      control: "select",
      options: Object.keys(inputConfig.variants || {}),
    },
    size: {
      control: "select",
      options: Object.keys(inputConfig.sizes || {}),
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Type here...",
    variant: "default",
    size: "md",
  },
};

export const Outline: Story = {
  args: {
    placeholder: "Outline input",
    variant: "outline",
  },
};

export const Filled: Story = {
  args: {
    placeholder: "Filled input",
    variant: "filled",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled",
    disabled: true,
  },
};

export const AllVariants = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {Object.keys(inputConfig.variants || {}).map((variant) => (
        <Input key={variant} placeholder={variant} variant={variant as any} />
      ))}
    </div>
  ),
};