const MarkdownComponents = {
  h1: ({ children }) => (
    <h1 className="mb-6 text-4xl font-bold text-white">{children}</h1>
  ),

  h2: ({ children }) => (
    <h2 className="mt-8 mb-4 text-3xl font-semibold text-red-400">
      {children}
    </h2>
  ),

  h3: ({ children }) => (
    <h3 className="mt-6 mb-3 text-2xl font-semibold text-yellow-400">
      {children}
    </h3>
  ),

  p: ({ children }) => (
    <p className="mb-4 leading-7 text-gray-300">{children}</p>
  ),

  ul: ({ children }) => (
    <ul className="mb-6 list-disc space-y-2 pl-6">{children}</ul>
  ),

  li: ({ children }) => <li className="text-gray-200">{children}</li>,

  strong: ({ children }) => (
    <strong className="font-bold text-white">{children}</strong>
  ),
  pre: ({ children }) => (
    <pre className="overflow-x-auto rounded-lg bg-zinc-800 p-4 max-w-full">
      {children}
    </pre>
  ),

  code: ({ children, className }) => (
    <code className={`${className} wrap-break whitespace-pre-wrap`}>
      {children}
    </code>
  ),
};

export default MarkdownComponents;
