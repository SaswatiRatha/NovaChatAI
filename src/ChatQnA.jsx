import ReactMarkdown from "react-markdown";
import MarkdownComponents from "./MarkdownComponents";
import { useEffect, useRef } from "react";
const ChatQnA = ({ results }) => {
  const containerRef = useRef(null);
  const latestAnswerRef = useRef(null);

  useEffect(() => {
    const last = results[results.length - 1];

    if (last && !last.loading) {
      latestAnswerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [results]);
  return (
    <div
      ref={containerRef}
      className="container h-120 pt-10 px-2 overflow-y-auto overflow-x-hidden scrollbar-none w-3/4 m-auto"
    >
      <div className="text-white text-left space-y-6">
        {results.map((item, index) => (
          <div key={index}>
            <div className="flex justify-end mb-3">
              <div className="bg-zinc-500 rounded-b-3xl rounded-tl-3xl px-4 py-2 max-w-[70%]">
                {item.question}
              </div>
            </div>

            <div className="flex justify-start">
              <div
                ref={index === results.length - 1 ? latestAnswerRef : null}
                className="bg-zinc-700 rounded-b-2xl rounded-tr-2xl px-4 py-2 max-w-[80%] box-border"
              >
                {item.loading ? (
                  <div className="flex gap-1 py-2">
                    <span className="w-2 h-2 rounded-full bg-white animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:150ms]"></span>
                    <span className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:300ms]"></span>
                  </div>
                ) : (
                  <ReactMarkdown components={MarkdownComponents}>
                    {item.answer}
                  </ReactMarkdown>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatQnA;
