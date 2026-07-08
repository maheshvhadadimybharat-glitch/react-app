import { useCallback, useState } from "react";

import { loadRegistry } from "../../ai/utils/loadRegistry";
import { matchComponents } from "../../ai/utils/matchComponents";

import type { Analysis } from "./types";
import AnalysisSummary from "./components/AnalysisSummary";
import EmptyState from "./components/EmptyState";
import ComponentCard from "./components/ComponentCard";


export default function AIAssistant() {
  const [prompt, setPrompt] = useState("");

  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  //const [analyzedPrompt, setAnalyzedPrompt] = useState("");

  const [loading, setLoading] = useState(false);

  //const [result, setResult] = useState<AIResponse | null>(null);

  //const [matchedComponents, setMatchedComponents] = useState<ComponentRegistryItem[]>([]);

  const handleAnalyze = useCallback(async () => {
  if (!prompt.trim()) {
    setAnalysis({
      prompt: "",
      matchedComponents: [],
      result: {
        recommendedComponents: [],
        suggestions: [],
        warnings: ["Please enter a UI description first."],
      },
    });

    return;
  }

  setLoading(true);

  try {
    const registry = await loadRegistry();

    const matched = matchComponents(prompt, registry);

    const response = {
      recommendedComponents: matched.map((item) => item.name),

      suggestions: matched.map((item) =>
        item.variants?.length
          ? `${item.name} supports variants: ${item.variants.join(", ")}`
          : `Consider using "${item.name}" component`
      ),

      warnings: matched.length
        ? []
        : [
            `No reusable component matches "${prompt}".`,
            "Try using terms like Banner, Tabs, Tile, Section, Hero or Card.",
          ],
    };

    setAnalysis({
      prompt,
      matchedComponents: matched,
      result: response,
    });
  } catch (error) {
    console.error(error);

    setAnalysis({
      prompt,
      matchedComponents: [],
      result: {
        recommendedComponents: [],
        suggestions: [],
        warnings: ["Something went wrong while analyzing."],
      },
    });
  } finally {
    setLoading(false);
  }
}, [prompt]);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        AI Component Recommendation Assistant
      </h1>

      <textarea
        value={prompt}
        onChange={(e) =>
          setPrompt(e.target.value)
        }
        placeholder="Describe the UI section..."
        className="w-full border rounded-lg p-4 min-h-40"
      />

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="mt-4 px-6 py-3 bg-black text-white rounded-lg"
      >
        {loading
          ? "Analyzing..."
          : "Analyze"}
      </button>
      
      {analysis && (
        <>
          <AnalysisSummary analysis={analysis} />

          {analysis.matchedComponents.length === 0 ? (
            <EmptyState analysis={analysis} />
          ) : (
            <>
              {analysis.matchedComponents.map((component) => (
                <ComponentCard
                  key={component.name}
                  component={component}
                  warnings={analysis.result.warnings}
                />
              ))}
            </>
          )}
        </>
      )}

    </div>
  );
}