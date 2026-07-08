export default function EmptyState({ analysis }: { analysis: any }) {
    return (  
    <div className="mt-6 rounded-2xl border border-yellow-300 bg-yellow-50 p-6">
        <h2 className="text-xl font-semibold text-yellow-800">
        No Matching Component Found
        </h2>

        <p className="mt-2 text-sm text-gray-700">
        We couldn't find any reusable component matching your description.
        </p>

        <div className="mt-4">
        <p className="font-medium">Prompt</p>

        <code className="mt-2 block rounded bg-white px-3 py-2 text-sm">
            {analysis.prompt}
        </code>
        </div>

        <div className="mt-5">
        <p className="font-medium mb-2">
            Suggestions
        </p>

        <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>Try using more descriptive UI terms.</li>
            <li>Use existing design system terminology.</li>
            <li>Check whether the component exists in the registry.</li>
            <li>
            If this is a new reusable component, consider adding it to the Design
            System.
            </li>
        </ul>
        </div>
    </div>
    )  
}