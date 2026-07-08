import type { ComponentRegistryItem } from "../../../ai/types/ai";

type ComponentCardProps = {
  component: ComponentRegistryItem;
  warnings: string[];
};

export default function ComponentCard({
  component,
  warnings,
}: ComponentCardProps) {
  return (
    <div className="mt-5 border border-gray-300 rounded-2xl p-6">
      <h3 className="text-xl font-semibold mb-6">
        Recommended Component
      </h3>

      <ul className="space-y-5">
        {/* Component */}
        <li className="border-t border-gray-300 pt-5">
          <span className="font-semibold">
            {component.name}
          </span>

          <span className="ml-2 text-sm text-gray-500">
            ({component.category})
          </span>
        </li>

        {/* Variants */}
        {component.variants?.length ? (
          <li className="border-t border-gray-300 pt-5">
            <p className="font-semibold mb-3">
              Supported Variants
            </p>

            <div className="flex flex-wrap gap-2">
              {component.variants.map((variant) => (
                <span
                  key={variant}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm"
                >
                  {variant}
                </span>
              ))}
            </div>
          </li>
        ) : null}

        {/* Props */}
        {component.props?.length ? (
          <li className="border-t border-gray-300 pt-5">
            <p className="font-semibold mb-2">
              Supported Props
            </p>

            <ul className="list-disc pl-6">
              {component.props.map((prop) => (
                <li key={prop}>{prop}</li>
              ))}
            </ul>
          </li>
        ) : null}

        {/* Import Path */}
        <li className="border-t border-gray-300 pt-5">
          <p className="font-semibold">
            Import Path
          </p>

          <code className="text-sm text-gray-600">
            {component.path}
          </code>
        </li>

        {/* Responsive */}
        {component.responsiveBehavior?.length ? (
          <li className="border-t border-gray-300 pt-5">
            <p className="font-semibold mb-2">
              Responsive Behavior
            </p>

            <ul className="list-disc pl-6">
              {component.responsiveBehavior.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ) : null}

        {/* Accessibility */}
        {component.a11y?.length ? (
          <li className="border-t border-gray-300 pt-5">
            <p className="font-semibold mb-2">
              Accessibility
            </p>

            <ul className="list-disc pl-6">
              {component.a11y.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ) : null}

        {/* Notes */}
        {component.notes?.length ? (
          <li className="border-t border-gray-300 pt-5">
            <p className="font-semibold mb-2">
              Notes
            </p>

            <ul className="list-disc pl-6">
              {component.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </li>
        ) : null}

        {/* Recommended Structure */}
        <li className="border-t border-gray-300 pt-5">
          <div className="rounded-xl bg-amber-50 p-5">
            <h4 className="font-semibold mb-4">
              Recommended Structure
            </h4>

            <p>
              <span className="font-medium">
                Component:
              </span>{" "}
              {component.name}
            </p>

            {component.layout && (
              <p className="mt-2">
                <span className="font-medium">
                  Layout:
                </span>{" "}
                {component.layout}
              </p>
            )}

            {component.children?.length ? (
              <div className="mt-4">
                <p className="font-medium mb-2">
                  Child Components
                </p>

                <ul className="list-disc pl-6">
                  {component.children.map((child) => (
                    <li key={child}>{child}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="mt-3 text-gray-500">
                Can be used independently.
              </p>
            )}

            {component.usage?.length ? (
              <div className="mt-4">
                <p className="font-medium mb-2">
                  Recommended Usage
                </p>

                <ul className="list-disc pl-6">
                  {component.usage.map((usage) => (
                    <li key={usage}>{usage}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </li>

        {/* Warnings */}
        {warnings.length > 0 && (
          <li className="border-t border-gray-300 pt-5">
            <p className="font-semibold text-red-600 mb-2">
              Warnings
            </p>

            <ul className="list-disc pl-6 text-red-600">
              {warnings.map((warning) => (
                <li key={warning}>
                  {warning}
                </li>
              ))}
            </ul>
          </li>
        )}
      </ul>
    </div>
  );
}