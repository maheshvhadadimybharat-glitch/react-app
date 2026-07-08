import type { ComponentRegistryItem } from "../../ai/types/ai";

export type AIResponse = {
  recommendedComponents: string[];
  suggestions: string[];
  warnings: string[];
};

export type Analysis = {
  prompt: string;
  result: AIResponse;
  matchedComponents: ComponentRegistryItem[];
};