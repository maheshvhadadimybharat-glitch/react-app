import React from "react";

export default function AnalysisSummary({ analysis }: { analysis: any }) {
    return(
        <div className="mt-8 mb-6 rounded-xl    border bg-gray-50 p-4">
          <p className="text-sm text-gray-500">
            Results for
          </p>

          <p className="text-lg font-semibold">
            "{analysis.prompt}"
          </p>

          <p className="mt-2 text-sm text-gray-600">
            {analysis.matchedComponents.length} reusable component
            {analysis.matchedComponents.length !== 1 ? "s" : ""} found
          </p>
        </div>
    )
}

