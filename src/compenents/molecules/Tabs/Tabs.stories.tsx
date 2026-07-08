import type { Meta, StoryObj } from "@storybook/react-vite";
import Tabs from "./Tabs";
import React from "react";

const meta: Meta<typeof Tabs> = {
  title: "Molecules/Tabs",
  component: Tabs,
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    items: [
      { label: "First", content: "First panel content" },
      { label: "Second", content: <div>Second panel <strong>HTML</strong></div> },
      { label: "Third", content: "Third content" },
    ],
  },
};
