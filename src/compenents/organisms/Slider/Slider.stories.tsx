import type { Meta, StoryObj } from "@storybook/react-vite";
import Slider from "./Slider";

const meta: Meta<typeof Slider> = {
  title: "Organisms/Slider",
  component: Slider,
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    slides: [
      { image: "https://placehold.co/300x200", heading: "Welcome", description: "Intro slide" },
      { image: "https://placehold.co/300x200", heading: "Features", description: "Some features" },
      { image: "https://placehold.co/300x200", heading: "Get Started", description: "Call to action" },
    ],
    autoPlay: true,
    interval: 4000,
  },
};
